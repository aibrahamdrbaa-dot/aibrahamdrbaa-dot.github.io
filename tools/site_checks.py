from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = sorted(ROOT.glob("*.html"))
SOURCE_GLOBS = ("*.html", "*.js", "*.css", "*.json", "*.yml", "*.yaml", "*.md", "*.txt")

ERRORS: list[str] = []


class Parser(HTMLParser):
    def error(self, message: str) -> None:
        ERRORS.append(f"HTML parser error: {message}")


def fail(message: str) -> None:
    ERRORS.append(message)


def local_path(raw: str) -> str | None:
    raw = raw.strip()
    if not raw or raw.startswith("#"):
        return None
    if raw.startswith(("http://", "https://", "mailto:", "tel:", "data:", "javascript:")):
        return None
    raw = raw.split("#", 1)[0].split("?", 1)[0]
    if raw.startswith("/"):
        raw = raw[1:]
    return raw or "index.html"


for path in HTML_FILES:
    text = path.read_text(encoding="utf-8")

    parser = Parser()
    parser.feed(text)
    parser.close()

    if '<meta http-equiv="Content-Security-Policy"' not in text:
        fail(f"{path.name}: missing CSP meta tag")

    required_csp_bits = [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "script-src 'self'",
        "script-src-attr 'none'",
        "style-src 'self'",
        "style-src-attr 'none'",
        "img-src 'self' https://images.unsplash.com",
    ]
    for bit in required_csp_bits:
        if bit not in text:
            fail(f"{path.name}: CSP missing {bit}")

    if re.search(r'<[A-Za-z][^>]*sstyles*=', text, re.IGNORECASE):
        fail(f"{path.name}: inline style remains; CSP is intended to allow only local stylesheets")

    if re.search(r'on(?:abort|blur|change|click|error|focus|input|load|mouseover|submit)s*=', text, re.IGNORECASE):
        fail(f"{path.name}: inline event handler found")

    if "javascript:" in text.lower():
        fail(f"{path.name}: javascript: URL found")

    for tag in re.findall(r'<a[^>]*>', text, re.IGNORECASE):
        if re.search(r'targets*=s*["']_blank["']', tag, re.IGNORECASE):
            rel = re.search(r'rels*=s*["']([^"']+)["']', tag, re.IGNORECASE)
            rel_tokens = set(rel.group(1).lower().split() if rel else [])
            if "noopener" not in rel_tokens or "noreferrer" not in rel_tokens:
                fail(f"{path.name}: target=_blank without noopener+noreferrer: {tag}")

    refs = re.findall(r'(?:href|src)s*=s*["']([^"']+)["']', text, re.IGNORECASE)
    for ref in refs:
        lp = local_path(ref)
        if lp is None:
            continue
        candidate = ROOT / lp
        if not candidate.exists():
            fail(f"{path.name}: missing local asset/link: {ref}")

secret_patterns = [
    (re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"), "private key"),
    (re.compile(r"gh[pousr]_[A-Za-z0-9_]{20,}"), "GitHub token"),
    (re.compile(r"github_pat_[A-Za-z0-9_]{20,}"), "GitHub fine-grained token"),
    (re.compile(r"AKIA[0-9A-Z]{16}"), "AWS access key"),
    (re.compile(r"AIza[0-9A-Za-z_-]{30,}"), "Google API key"),
    (re.compile(r"sk-(?:live|test)-[A-Za-z0-9_-]{20,}"), "secret API key"),
]

for pattern, label in secret_patterns:
    for path in ROOT.glob("*"):
        if path.is_file() and path.name not in {"favicon.ico"}:
            try:
                text = path.read_text(encoding="utf-8")
            except (UnicodeDecodeError, OSError):
                continue
            if pattern.search(text):
                fail(f"{path.name}: possible {label} detected")

script_text = (ROOT / "script.js").read_text(encoding="utf-8")
for forbidden in ("eval(", "new Function", "document.write", ".innerHTML", ".outerHTML", "javascript:"):
    if forbidden in script_text:
        fail(f"script.js: forbidden dangerous sink/pattern: {forbidden}")

headers = (ROOT / "_headers").read_text(encoding="utf-8")
for required in (
    "Strict-Transport-Security:",
    "X-Content-Type-Options: nosniff",
    "X-Frame-Options: DENY",
    "Referrer-Policy:",
    "Permissions-Policy:",
    "Cross-Origin-Opener-Policy:",
    "Content-Security-Policy:",
    "frame-ancestors 'none'",
    "script-src 'self'",
    "script-src-attr 'none'",
    "style-src 'self'",
    "style-src-attr 'none'",
    "object-src 'none'",
):
    if required not in headers:
        fail(f"_headers: missing {required}")

if not ERRORS:
    print(f"PASS: {len(HTML_FILES)} HTML pages, CSP/header checks, link checks, secret-pattern checks, and JS sink checks")
    sys.exit(0)

print("
".join(f"FAIL: {e}" for e in ERRORS))
sys.exit(1)

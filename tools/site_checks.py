from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = sorted(ROOT.glob("*.html"))
ERRORS: list[str] = []


class Parser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.attrs_by_tag: list[tuple[str, dict[str, str]]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.attrs_by_tag.append((tag.lower(), {k.lower(): (v or "") for k, v in attrs}))

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

    if 'http-equiv="Content-Security-Policy"' not in text:
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

    lower = text.lower()
    if " style=" in lower:
        fail(f"{path.name}: inline style attribute remains")
    for event_name in ("onclick", "onload", "onsubmit", "onerror", "onfocus", "onblur", "onchange", "oninput", "onmouseover"):
        if event_name in lower:
            fail(f"{path.name}: possible inline event handler found: {event_name}")
    if "javascript:" in lower:
        fail(f"{path.name}: javascript: URL found")

    for tag, attrs in parser.attrs_by_tag:
        if tag == "a" and attrs.get("target", "").lower() == "_blank":
            rel_tokens = set(attrs.get("rel", "").lower().split())
            if "noopener" not in rel_tokens or "noreferrer" not in rel_tokens:
                fail(f"{path.name}: target=_blank without noopener+noreferrer")

        for key in ("src", "href"):
            ref = attrs.get(key)
            if not ref:
                continue
            lp = local_path(ref)
            if lp is not None and not (ROOT / lp).exists():
                fail(f"{path.name}: missing local asset/link: {ref}")

SECRET_PATTERNS = [
    (re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"), "private key"),
    (re.compile(r"gh[pousr]_[A-Za-z0-9_]{20,}"), "GitHub token"),
    (re.compile(r"github_pat_[A-Za-z0-9_]{20,}"), "GitHub fine-grained token"),
    (re.compile(r"AKIA[0-9A-Z]{16}"), "AWS access key"),
    (re.compile(r"AIza[0-9A-Za-z_-]{30,}"), "Google API key"),
    (re.compile(r"sk-(?:live|test|proj)-[A-Za-z0-9_-]{16,}"), "API secret key"),
]

for path in ROOT.rglob("*"):
    if not path.is_file() or ".git" in path.parts or path.name == "favicon.ico":
        continue
    try:
        content = path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        continue
    for pattern, label in SECRET_PATTERNS:
        if pattern.search(content):
            fail(f"{path.relative_to(ROOT)}: possible {label} detected")

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
    print(f"PASS: {len(HTML_FILES)} HTML pages, CSP/header checks, DOM link checks, secret-pattern checks, and JS sink checks")
    sys.exit(0)

print("\n".join(f"FAIL: {e}" for e in ERRORS))
sys.exit(1)

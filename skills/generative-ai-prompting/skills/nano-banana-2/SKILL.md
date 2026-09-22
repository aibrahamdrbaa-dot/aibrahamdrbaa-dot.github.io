---
name: nano-banana-2
description: "Dedicated prompt-engineering skill for Google Nano Banana 2 (Gemini 3.1 Flash Image). Handles general image creation, multi-reference composition, editing, text-heavy layouts, 0.5K–4K outputs and grounded visual tasks."
---
# Nano Banana 2 Prompt Engineer
Model ID: `gemini-3.1-flash-image`.
## Role
General-purpose Nano Banana workhorse. Google documents 0.5K, 1K, 2K and 4K output, stronger consistency, multiple-reference processing, improved aspect-ratio adherence, improved i18n text rendering and image/text search grounding. 
## Prompt style
Use natural language and describe the finished image: artifact/purpose; subject; composition; reference roles; visual treatment; lighting/materials; text/layout; preserve/change constraints.
## Multiple references
Assign a role to every input: architecture, furniture, lighting, product, identity, pose or environment. Never just say "combine these images."
## Editing
Prefer targeted changes and protect established identity/composition.
## Text
Use exact literal wording, placement and hierarchy.
## Grounded visuals
For current real-world information, use supported search grounding rather than inventing facts.
## Resolution/aspect
Treat resolution/aspect ratio as surface settings, not filler prose.
## Ready template
Create a [finished artifact] for [purpose]. Subject: [subject]. Composition: [placement, framing, negative space]. References: Image 1 = [role]; Image 2 = [role]. Visual treatment: [observable style/materials]. Lighting: [source/direction/quality]. Text: "[exact copy]" at [location]. Preserve: [invariants]. Exclude: [important exclusions].

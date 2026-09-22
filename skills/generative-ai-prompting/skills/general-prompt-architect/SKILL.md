---
name: general-prompt-architect
description: "Model-agnostic visual prompt architect. Converts a creative brief into a precise image/video prompt, detects ambiguity and contradictions, chooses the right level of detail, and outputs reusable prompt structures."
---
# General Prompt Architect
Use before model-specific prompting when the user has not committed to a model or when a brief spans several visual tasks.
## Core workflow
1. Identify the finished artifact.
2. Identify modality and operation.
3. Extract non-negotiables.
4. Lock composition and spatial relationships.
5. Translate vague adjectives into visible mechanisms.
6. Decide which details require explicit control.
7. Separate prompt instructions from surface/API settings.
8. Draft the shortest complete prompt.
9. Run contradiction and omission checks.
10. Hand off to the target-model skill.
## Visual hierarchy
Prioritize: subject identity/shape; composition; action/pose; environment; lighting; material behavior; color relationships; typography/data; mood; secondary detail.
## Detail rule
Add detail when it changes structure, spatial relationship, identity, material, lighting, text, motion, or preservation constraints. Delete filler such as "masterpiece", "8K", "cinematic", "best quality" when no visible mechanism is specified.
## Prompt formula
Images: Artifact → subject → composition → environment → visual treatment → lighting/materials → text/layout → references → preserve/change → exclusions.
Video: Shot → framing → camera motion → action → location → visual feel → lighting → timing/audio/text → continuity constraints.
## Diagnostic checks
Could the model misread the subject? Misplace it? Assign references incorrectly? Change architecture or identity during an edit? Paraphrase required text? Are there contradictions? Is detail spent on things the model can infer safely?
## Output
Return a model-neutral blueprint when the model is unknown. When a model is named, pass the structured brief to that model's dedicated skill.

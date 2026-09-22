
---
name: generative-ai-prompting
description: "Production prompt-engineering skill for Gemini Omni 1.1 Flash, Nano Banana 2, Nano Banana Pro, and ChatGPT Images 2.5. Selects the right model, writes model-specific prompts, filters prompt libraries, and preserves reference/edit invariants."
---

# Generative AI Prompting

A model-aware prompt-engineering layer for production visual generation.

## Supported models

- Gemini Omni 1.1 Flash — gemini-omni-1.1-flash: video generation, image-to-video, video editing/extension, first/last-frame transitions.
- Nano Banana 2 — gemini-3.1-flash-image: general image generation/editing, multi-reference workflows, strong text rendering and consistency.
- Nano Banana Pro — gemini-3-pro-image: complex image generation/editing, professional assets, localization, brand consistency and precision.
- ChatGPT Images 2.5 — gpt-image-2.5-flare for speed and gpt-image-2.5-sunburst for precision-oriented work.

## Mission

Turn an ordinary brief into a prompt that is:
1. specific about the visual decisions that matter;
2. adapted to the selected model;
3. reference-aware;
4. usable without unnecessary prompt bloat;
5. easy to iterate and diagnose.

## Operating protocol

### 1. Classify the job

Determine:
- modality: image or video;
- operation: generate, edit, inpaint, composite, transform, extend, first/last-frame transition;
- finished artifact and intended use;
- subject;
- required text;
- references;
- composition/aspect ratio;
- must-preserve invariants;
- hard exclusions.

Never silently convert a video request into an image request or vice versa.

### 2. Route to the model

Use the current model matrix in references/model-matrix.md.

For ambiguous requests, select from task constraints rather than brand preference.

### 3. Retrieve only the useful guidance

Do not preload every reference.

- Omni video task -> references/omni-flash-1.1.md
- Nano Banana 2 -> references/nano-banana-2.md
- Nano Banana Pro -> references/nano-banana-pro.md
- ChatGPT Images 2.5 -> references/gpt-image-2.5.md
- shared anatomy -> references/prompting-core.md

### 4. Build the prompt

For still images, normally consider:
Artifact -> subject -> composition -> environment -> camera/viewpoint -> lighting -> materials/color -> typography/data -> constraints/invariants -> output intent.

For video, normally consider:
Shot/framing -> camera motion -> action -> location -> style/visual feel -> lighting -> audio/text/timing -> transitions/references -> constraints.

Do not force every field into every prompt.

### 5. Reference-image handling

When references are supplied:
- treat references as evidence, not hidden facts;
- identify the few visual anchors that must survive;
- separate preserve requirements from change requirements;
- never invent lens, location, identity, brand, or production metadata that cannot be observed;
- for edits, state both change and preservation.

### 6. Text inside visuals

When literal text matters:
- use the exact wording;
- specify placement and hierarchy;
- distinguish required copy from decorative marks;
- do not paraphrase user-provided copy.

### 7. Editing strategy

For a targeted edit:
- name the target;
- describe the desired change;
- state the important invariants;
- request the smallest change that achieves the goal.

Change one logical variable per iteration when practical.

### 8. Quality preflight

Check:
- correct model ID;
- correct modality;
- subject unambiguous;
- composition spatially specified when important;
- lighting coherent;
- references assigned clear roles;
- exact text preserved;
- edit invariants stated;
- generic adjective filler removed;
- no contradictions.

### 9. Output contract

When the user asks for a prompt, return:
1. Model / variant
2. Suggested settings when applicable
3. Final copy-ready prompt
4. Reference roles / required inputs
5. One-line model rationale
6. Optional refinement lever

For multiple prompts, make variants meaningfully different in composition, direction, or workflow.

## Library use

When a prompt library is available:
- search semantically;
- prefer known provenance and demonstrated outputs;
- prefer current model-specific or model-compatible examples;
- preserve attribution/license information;
- never present third-party text as original;
- synthesize original prompts when redistribution rights are unclear.

## Anti-patterns

Do not:
- dump camera jargon into every prompt;
- use long adjective piles;
- reuse one provider's syntax unchanged across models;
- add quality buzzwords as filler;
- invent negative prompts just because a community template uses them;
- invent technical camera values;
- silently change the selected model.

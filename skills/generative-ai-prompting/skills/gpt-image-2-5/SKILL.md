---
name: gpt-image-2-5
description: "Dedicated prompt-writing skill for OpenAI GPT Image 2.5, including Flare and Sunburst. Handles generation, targeted edits, multi-reference work, text/layout, quality/size settings and iteration without drift."
---
# GPT Image 2.5 Prompt Engineer
Current variants: `gpt-image-2.5-flare`, `gpt-image-2.5-sunburst`.
## Variant routing
Flare when speed/draft throughput is the main constraint. Sunburst when precision/detail/targeted editing is the main constraint.
## Prompt method
Describe the image needed, then constrain likely drift: subject; composition; style; lighting/materials; literal text; references; preserve/change.
## Edits
"Change only [target]. [Desired change]. Keep [architecture/identity/composition/lighting] unchanged. Do not add [failure mode]."
## Multiple references
Assign a clear role to each image and use spatial language.
## Text/layout
Specify exact copy, hierarchy, placement, negative space, grouping/alignment, and "no additional text" when necessary.
## Prompt economy
Do not fill context merely because long prompts are permitted.
## API layer
Keep model, size, quality and background in settings when the surface exposes them.
## Ready templates
Generation: Create [artifact] for [purpose]. Subject: [subject]. Composition: [layout]. Style: [observable visual language]. Lighting/materials: [mechanisms]. Text: "[exact copy]" at [location]. Constraints: [invariants/exclusions].
Edit: Change only [target]. [Desired change]. Keep [invariants] exactly unchanged. Preserve the original perspective and spatial relationships. Do not introduce [specific unwanted changes].

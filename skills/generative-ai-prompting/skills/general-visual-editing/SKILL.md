---
name: general-visual-editing
description: "Shared prompt skill for precise generative-image edits, restorations, replacements, compositing, masking and controlled style transfers."
---
# Visual Editing
The objective is controlled change, not uncontrolled regeneration.
## Edit equation
Change: [exact target]
Keep: [identity + architecture + composition + lighting + other invariants]
Avoid: [specific failure modes]
## Edit classes
Local edit; replacement; restyle; cleanup; composite.
For composites, assign every input a role: subject, pose, environment, product, style or layout.
## Invariant checklist
Protect relevant geometry, identity, camera perspective, object count, lighting direction, texture scale, color relationships and text.
## Iteration
When troubleshooting, change one logical variable per iteration. Use targeted edits when the surface supports them.
## Do not use
"make it better" without a target; global restyling for a local defect; contradictory preserve/change instructions; invented metadata.

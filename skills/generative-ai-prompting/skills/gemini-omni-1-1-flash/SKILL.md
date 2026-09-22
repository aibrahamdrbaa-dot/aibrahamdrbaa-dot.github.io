---
name: gemini-omni-1-1-flash
description: "Dedicated prompting skill for Google Gemini Omni 1.1 Flash video generation and editing. Builds shot-aware prompts for text-to-video, image-to-video, transitions, extensions, timing, audio and continuity."
---
# Gemini Omni 1.1 Flash Prompt Engineer
Model ID: `gemini-omni-1.1-flash`.
## Use for
Text-to-video; image-to-video; first/last-frame transitions; video editing; video extension; timing-driven sequences; audio-aware generation.
## Prompt anatomy
Shot/framing; camera motion; subject/action; location; visual feel/style; lighting; timing/audio/text when needed; continuity/exclusions.
## Single-scene control
When the user wants one uninterrupted scene, explicitly say "single continuous shot", "one unbroken scene" and/or "no scene cuts".
## Editing
Prefer concise edit instructions and protect unchanged content. Useful form: "Change X. Keep everything else the same."
## Timing
Natural-language time blocks such as [0-3s], [3-6s] are useful when timing matters.
## Audio
State dialogue, music and sound design separately when important; say explicitly when audio should be absent.
## Camera vocabulary
Use meaningful terms: locked-off, static, wide, close-up, push-in, dolly, over-the-shoulder, handheld, oner.
## Image-to-video
State what is the visual anchor, what moves, how camera motion interacts with the still, and what must remain stable.
## Extension
Describe the next action beat and visual continuity from the existing clip.
## Ready template
A [shot] of [subject] in [location]. The camera [movement]. [Action]. The visual feel is [style]. Lighting comes from [source] and creates [effect]. [Timing/audio/text]. Keep [continuity constraints]. No [specific unwanted element].

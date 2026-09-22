
# Model Adapters

## Gemini Omni 1.1 Flash

Model: gemini-omni-1.1-flash

OFFICIAL guidance centers prompting on shot framing/motion, style, lighting, location and action.

High-control pattern:

~~~text
Shot: [framing + viewpoint + camera movement]
Action: [what happens]
Location: [environment]
Visual feel: [style]
Lighting: [source + effect]
Timing/text/audio: [only when needed]
Constraints: [important exclusions]
~~~

Useful camera vocabulary includes one continuous shot / oner, static, locked off, push in, punch in, dolly zoom, over-the-shoulder and whip-pan.

For first/last-frame transitions, define the exact start state, transition motion and exact end state.

## Nano Banana 2

Model: gemini-3.1-flash-image

OFFICIAL guidance: general-purpose image generation/editing with multiple references, text rendering, consistency and 4K output.

~~~text
Create a [finished artifact] showing [subject] in [environment].
Composition: [spatial hierarchy].
Visual treatment: [style + materials].
Lighting: [source + direction + quality].
Important text: "[literal copy]" at [location].
References: [role of each reference].
Constraints: [preserve/exclude].
~~~

Prefer clear natural language and explicit reference roles.

## Nano Banana Pro

Model: gemini-3-pro-image

OFFICIAL guidance: complex visual tasks, professional assets, localization, brand consistency and precision creative control.

~~~text
Create a [professional artifact] for [purpose].
Primary subject: [subject].
Composition: [layout].
References:
- Image 1 = [role]
- Image 2 = [role]
- Image 3 = [role]
Environment: [setting].
Materials/color: [visual mechanisms].
Lighting: [source + effect].
Typography: "[exact words]" at [location].
Preserve: [invariants].
Change: [requested changes].
Exclude: [critical exclusions].
~~~

For current real-world accuracy, separate factual grounding from visual styling.

## GPT Images 2.5

Variants:
- gpt-image-2.5-flare: speed-oriented
- gpt-image-2.5-sunburst: quality/precision-oriented

OFFICIAL guidance: describe the desired image, subject, composition, style and constraints. For edits, identify what changes and what must remain.

~~~text
Create [artifact] for [purpose].
Subject: [subject].
Composition: [placement/framing/negative space].
Style: [observable visual language].
Lighting/materials: [important mechanisms].
Text: "[exact copy]" at [location].
Constraints: [invariants + exclusions].
~~~

Targeted edit pattern:

~~~text
Change only [target].
Make it [desired result].
Keep [invariants] unchanged.
Do not introduce [specific unwanted change].
~~~

Current GPT Image prompts may be long, but readability is more useful than filling the maximum.

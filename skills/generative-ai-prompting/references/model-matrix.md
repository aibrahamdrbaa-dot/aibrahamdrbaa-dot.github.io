
# Model Matrix

## Current identifiers

### Gemini Omni 1.1 Flash
gemini-omni-1.1-flash

Video creation and editing workflows, including text-to-video, image-to-video, video editing/extension, and first/last-frame transitions.

### Nano Banana 2
gemini-3.1-flash-image

Current Nano Banana 2 model. General-purpose image model with advanced 4K output, world knowledge, text rendering, multiple-reference processing and consistency.

### Nano Banana Pro
gemini-3-pro-image

Current Nano Banana Pro model. Complex visual tasks, professional assets, localization, brand consistency and precision creative control.

### ChatGPT Images 2.5
API variants:
- gpt-image-2.5-flare
- gpt-image-2.5-sunburst

Flare is speed-oriented. Sunburst is quality/precision-oriented.

## Prompt routing

| Need | Starting route | Rationale |
|---|---|---|
| Video from text | Omni 1.1 Flash | video-native |
| Video from image | Omni 1.1 Flash | native image-to-video |
| Video continuation | Omni 1.1 Flash | native extension |
| Everyday/product/social image | Nano Banana 2 | general purpose |
| Many references + consistency | Nano Banana 2 | multi-reference strength |
| Complex professional image | Nano Banana Pro | complex-task focus |
| Localization-sensitive image | Nano Banana Pro | documented localization focus |
| Brand-sensitive asset | Nano Banana Pro | brand consistency focus |
| Fast GPT Image 2.5 image | Flare | speed-oriented |
| Precision GPT Image 2.5 edit | Sunburst | precision-oriented |

## Prompt-shape differences

### Omni 1.1 Flash
Think in moving shots: framing + camera movement, action, location, style, lighting, timing/audio/text only when needed.

### Nano Banana 2 / Pro
Use natural language describing the finished image and its visual relationships. Assign clear roles to references. For edits, state the change and important preserved structure.

### GPT Images 2.5
Start from the desired image, then specify subject, composition, style and constraints. For edits, identify what changes and what remains.

## Settings are not prompt prose

When a surface exposes aspect ratio, resolution or quality as request settings, keep those in the settings layer. Use prompt text for visual decisions.

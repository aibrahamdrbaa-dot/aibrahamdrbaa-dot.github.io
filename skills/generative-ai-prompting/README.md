
# Generative AI Prompting Skill

A production-oriented prompt layer for four current visual models:

- Gemini Omni 1.1 Flash — video
- Nano Banana 2 — image
- Nano Banana Pro — image
- ChatGPT Images 2.5 — image

This package combines model-aware prompting with disciplined prompt curation.

## Architecture

SKILL.md is the router.

references/ contains shared and provider-specific rules.

examples/ready-to-use.md contains original prompts written for this package.

## Model map

| Model | Native ID | Primary role | Prompt emphasis |
|---|---|---|---|
| Omni 1.1 Flash | gemini-omni-1.1-flash | Video | framing, motion, action, style, lighting, location |
| Nano Banana 2 | gemini-3.1-flash-image | Image | intent, references, composition, realistic detail, text |
| Nano Banana Pro | gemini-3-pro-image | Image | complex instructions, localization, brand consistency |
| GPT Images 2.5 Flare | gpt-image-2.5-flare | Image | fast generation and drafts |
| GPT Images 2.5 Sunburst | gpt-image-2.5-sunburst | Image | precision edits and detailed creative work |

## Routing

Video -> Omni 1.1 Flash.

Image, general purpose or multiple references -> Nano Banana 2.

Image, complex professional, localization-sensitive or brand-sensitive -> Nano Banana Pro.

GPT Image 2.5, fast draft -> Flare.

GPT Image 2.5, precision edit/detail -> Sunburst.

These are task-fit rules, not an overall model ranking.

## Research philosophy

Source priority:
1. official provider documentation;
2. maintained model-specific skills;
3. current curated prompt libraries with provenance/output evidence;
4. community prompt collections;
5. generic templates.

Third-party galleries are research material. The ready-to-use prompts in this package are original syntheses.

Version: v1.0 — 2026-09-23

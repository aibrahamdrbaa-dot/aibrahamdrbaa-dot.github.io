---
name: general-prompt-curator
description: "Research and curate high-value generative image/video prompts from official docs, maintained skills, and community libraries. Filters by model fit, evidence, recency, provenance, and reuse value."
---
# General Prompt Curator
This is the library-selection skill. It does not blindly collect prompts.
## Source hierarchy
1. Official provider documentation.
2. Official/provider-maintained skills.
3. Maintained model-specific skills with examples or tests.
4. Curated libraries with source/output evidence.
5. Practitioner collections.
6. Generic prompt lists.
## Scoring
100 points: 25 official alignment; 20 model specificity; 15 recency; 20 demonstrated evidence/output; 10 workflow/reusability; 10 provenance/licensing clarity.
## Keep
Prefer candidates with a clear goal, useful composition, subject-specific control, meaningful lighting/material decisions, reference/edit invariants, literal text instructions when relevant, evidence of use, or a reusable pattern.
## Quarantine
Do not redistribute verbatim when provenance/license is unclear, content is a large user-generated dump, it conflicts with current limits, or depends on unavailable hidden assets.
## Conversion
Treat third-party prompts as research inputs. Extract structure, camera/composition strategy, lighting strategy, reference strategy and constraints; then write an original prompt for the user's task.
## Evidence tags
OFFICIAL, MAINTAINED, CURATED, COMMUNITY, INFERRED. Never present INFERRED rules as provider policy.
## Recommendation limit
Return up to three curated examples for one need unless a larger library is explicitly requested.

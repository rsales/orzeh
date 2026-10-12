# AGENTS.md — orzeh (landing page) contributor guide

The single canonical instruction file for AI coding agents working in this
repository (Claude Code, Codex, Cursor, Copilot and other AGENTS-aware tools).
`CLAUDE.md` only imports it. Humans should read it too. Workspace-wide rules
(documentation conventions, git workflow, Linear, language) are in
[`finance-project/AGENTS.md`](https://github.com/SalesCreations/finance-project/blob/main/AGENTS.md).

## What this project is for

`orzeh.com` explains Orzeh to couples who have never heard of it and turns them
into people asking for a beta invite: the mission (end money fights with
transparency), the features (family group, automated DRE, yearly
consolidation), the P.A.R.D. method and the security promises. Every word and
section is edited by the maintainer in Storyblok's Visual Editor, without a
deploy. The code's job is to render Storyblok blocks faithfully and fast.

When a choice is unclear, prefer the option that keeps content editable in
Storyblok over hard-coding it in a component.

## Repository layout

```
app/
├── pages/[...slug].vue          catch-all route: loads the story for the slug
├── storyblok/                   one Vue component per Storyblok block
├── plugins/storyblok-components.ts   explicit registration of snake_case blocks
├── layouts/default.vue
└── assets/css/main.css          design tokens (colors, fonts, radius), Tailwind 4
storyblok-schemas/               block schemas (JSON) to import into the Space
nuxt.config.ts                   @storyblok/nuxt, Tailwind via Vite, mkcert HTTPS
netlify.toml                     build settings
```

## Commands

```bash
pnpm install
pnpm run dev          # https://localhost:3000 (mkcert; Visual Editor needs HTTPS)
pnpm run lint         # ESLint (Vue + TypeScript)
pnpm run typecheck    # vue-tsc --noEmit
pnpm run build
```

The gate is in [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Invariants (do not violate)

1. **Content lives in Storyblok.** Text, links, images and section order come
   from block fields. A component never hard-codes copy that the maintainer
   would want to edit.
2. **One block, one component, one schema.** Adding or changing a block updates
   `app/storyblok/<Name>.vue`, `storyblok-schemas/<name>.json` and, if the name
   has `_`, the plugin registration, in the same commit.
3. **Blocks are editable in place.** Every block root binds `v-editable="blok"`
   so the Visual Editor can select it.
4. **Tokens are not committed.** `STORYBLOK_DELIVERY_API_TOKEN` and management
   tokens live in `.env` and in Netlify.

## Gotchas

- Block names with `_` (`mission_section`) never auto-resolve to
  `MissionSection.vue`: Vue maps PascalCase and kebab-case, not snake_case.
  Register them in `app/plugins/storyblok-components.ts`, otherwise the console
  shows `Component could not be found for blok "..."`.
- `useAsyncStoryblok` requires `bridge: {}` in its options (`@storyblok/nuxt` v9+).
- A Preview token reads `version: 'draft'`; a Public token only reads
  `'published'`. The catch-all route uses `draft`.
- The Management API takes the token as the `Authorization` header value
  directly, without a `Bearer` prefix.
- Import schemas in dependency order: nestable blocks before the blocks whose
  `component_whitelist` references them, `page` last (see
  [`docs/storyblok.md`](docs/storyblok.md)).

## Project maintenance rules

- **Branches:** from `main`, named `feature/<slug>` (or `feature/ORZ-<n>-<slug>`);
  PRs target `main`. Netlify deploys `main`.
- **Docs move with the code**: a new block updates the block list in
  [`docs/storyblok.md`](docs/storyblok.md); user-visible changes go in
  `CHANGELOG.md` under `## [Unreleased]`.
- **The human decides.** Agents never publish content in Storyblok, change the
  Space, merge or deploy without explicit approval. Management API scripts run
  only when asked, against the Space named in the request.

## Documentation map

- [`README.md`](README.md): what it is for, quick start.
- [`docs/storyblok.md`](docs/storyblok.md): Space setup, block library, Visual
  Editor, reference copy.
- [`CONTRIBUTING.md`](CONTRIBUTING.md): the pre-PR gate.
- [`CHANGELOG.md`](CHANGELOG.md): user-visible changes.

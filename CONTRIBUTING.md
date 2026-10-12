# Contributing to orzeh

Workspace-wide conventions (git workflow, documentation, Linear) are in
[`finance-project/AGENTS.md`](https://github.com/SalesCreations/finance-project/blob/main/AGENTS.md).

## Gate

```bash
pnpm run lint
pnpm run typecheck
pnpm run build
```

## Checklist

- [ ] Branch from `main`; PR targets `main`.
- [ ] Commits grouped by step, Conventional Commits messages.
- [ ] New or changed blocks: component, schema and (for snake_case names) plugin
      registration in the same commit; block table in `docs/storyblok.md` updated.
- [ ] No copy hard-coded in components; no tokens in the diff.
- [ ] Screenshot of the changed section, desktop and mobile.

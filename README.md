# orzeh

The public landing page of **Orzeh** at `orzeh.com`. It tells couples why money
fights happen and how Orzeh helps them run their finances together, and invites
them to ask for access to the private beta. All content is edited in
Storyblok's Visual Editor, so copy and sections change without a deploy.

Built with Nuxt 4, `@storyblok/nuxt` v9 and Tailwind CSS 4, on top of the
[Storyblok Core Space Blueprint for Nuxt](https://github.com/storyblok/blueprint-core-nuxt).
The product itself lives in
[finance-front](https://github.com/SalesCreations/finance-front) and
[finance-api](https://github.com/SalesCreations/finance-api).

## Quick start

Requirements: Node (see `.nvmrc`), pnpm.

```bash
pnpm install
cp .env.example .env          # STORYBLOK_DELIVERY_API_TOKEN, STORYBLOK_REGION=eu
pnpm run dev                  # https://localhost:3000
```

The dev server uses HTTPS through `vite-plugin-mkcert` because the Visual Editor
only embeds HTTPS pages. The first run may ask for your system password to
install a local certificate authority; that happens once.

To set up a new Space, import the block schemas and configure the Visual Editor,
follow [docs/storyblok.md](docs/storyblok.md).

## Everyday commands

```bash
pnpm run lint         # ESLint (Vue + TypeScript); lint:fix to repair
pnpm run typecheck    # vue-tsc --noEmit
pnpm run build
```

## Deploy

Netlify builds `main`. Set `STORYBLOK_DELIVERY_API_TOKEN` and
`STORYBLOK_REGION` (`eu`) in the site's environment.

## Contributing

Read [`AGENTS.md`](AGENTS.md) (conventions and Storyblok gotchas, for people and
coding agents) and pass the gate in [`CONTRIBUTING.md`](CONTRIBUTING.md).
Details: [architecture](docs/ARCHITECTURE.md).

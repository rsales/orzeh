# Storyblok

How the landing page's content is modelled and how to set up a Space from
scratch. The production Space is in the EU region.

## Tokens and content version

| Token type (Delivery API) | Version it can read |
| --- | --- |
| Preview | draft and published |
| Public | published only |

`app/pages/[...slug].vue` always requests `version: 'draft'`. With a Public
token, change it to `'published'`.

Environment variables (local `.env` and Netlify): `STORYBLOK_DELIVERY_API_TOKEN`,
`STORYBLOK_REGION` (`eu`).

## Setting up a Space

1. Create a Space at app.storyblok.com and copy the Delivery API token
   (Settings → Access Tokens) into `.env`.
2. Import the block schemas from `storyblok-schemas/` **in this order** (nestable
   blocks must exist before the blocks that list them in `component_whitelist`):
   1. `nav_link.json`
   2. `progress_segment.json`
   3. `feature_card.json`
   4. `methodology_step.json`
   5. `mission_cell.json`
   6. `security_cell.json`
   7. `navbar.json`
   8. `hero.json`
   9. `mission_section.json`
   10. `features_section.json`
   11. `methodology_section.json`
   12. `security_section.json`
   13. `footer.json`
   14. `page.json` (root content type, last)

   With the Storyblok CLI:

   ```bash
   npx storyblok login
   npx storyblok push-components storyblok-schemas/navbar.json --space=<SPACE_ID>
   # repeat for each file, in the order above
   ```

3. In Content, create a root story `home` of content type `page` and add the
   blocks to `body` in visual order:
   `navbar → hero → mission_section → features_section → methodology_section → security_section → footer`.
4. Visual Editor: Settings → Visual Editor → default environment
   `https://localhost:3000/`; in the `home` story's Config, set Real path to `/`.

## Block library

| Block | Component | Kind | Registered in plugin |
| --- | --- | --- | --- |
| `page` | `Page.vue` | content type | no |
| `navbar` | `Navbar.vue` | section | no |
| `hero` | `Hero.vue` | section | no |
| `mission_section` | `MissionSection.vue` | section | yes |
| `features_section` | `FeaturesSection.vue` | section | yes |
| `methodology_section` | `MethodologySection.vue` | section | yes |
| `security_section` | `SecuritySection.vue` | section | yes |
| `footer` | `Footer.vue` | section | no |
| `mission_cell` | `MissionCell.vue` | nestable | yes |
| `feature_card` | `FeatureCard.vue` | nestable | yes |
| `methodology_step` | `MethodologyStep.vue` | nestable | yes |
| `security_cell` | `SecurityCell.vue` | nestable | yes |
| `nav_link` | rendered inside `Navbar.vue` | nestable | — |
| `progress_segment` | rendered inside `Hero.vue` | nestable | — |

Blocks with `_` in the name must be registered in
`app/plugins/storyblok-components.ts` (see the gotcha in `AGENTS.md`).

## Reference copy (from the Figma design)

The original copy, in Portuguese, for recreating the `home` story.

**Hero**

- Badge: `BETA PRIVADO` `- SOMENTE POR CONVITE`
- Headline: `Finanças que a família constrói junta!`
- Body: `Orzeh` `é o ecossistema financeiro feito para casais e famílias. Registre, analise e planeje a vida financeira em um lugar só — com transparência, sem cobrança.`
- Floating card: `REGRA 50 - 30 -10`; segments: Básico (50%, blue `#3b82f6`), Estilo (38%, amber `#f59e0b`), Investir (23%, green `#22c55e`)

**Mission (01)**

- Eyebrow: `01 — MISSÃO`
- Headline: `Acabar com os 69% das brigas por dinheiro.`
- Body (richtext): `A falta de comunicação financeira é a maior causa de conflito entre casais. **Orzeh** foi desenhado para o "momento mágico" da colaboração - onde transparência substitui cobrança, e metas viram um plano construído a dois.`
- Cells: Transparência / Sem cobrança / Alinhamento / Educação

**Features (02)**

- Eyebrow: `02 — RECURSOS`
- Headline: `A evolução digital da planilha de casal.`
- Cards: Family Group (I) / DRE Pessoal automatizada (II) / Consolidação anual (III)

**Methodology (03)**

- Eyebrow: `03 — METODOLOGIA`
- Headline (richtext): `Método *P.A.R.D.* - controle de impulso antes da compra.`
- Steps: P. Perceba / A. Analise / R. Reflita / D. Decida

**Security (04)**

- Eyebrow: `04 — SEGURANÇA`
- Headline: `Dark Premium por padrão.`
- Cells: Cookies httpOnly / Tokens JWT / Backups automáticos / Open Finance no roadmap

**Footer**

- Brand: `Orzeh` `- Created by Sales Creations`
- Copyright: `© {year}`

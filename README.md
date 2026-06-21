# orzeh — landing page institucional

Landing page (`orzeh.com`) construída em **Nuxt 4** + **Tailwind CSS v4** + **Storyblok** (Headless CMS), com base no [Storyblok Core Space Blueprint: Nuxt](https://github.com/storyblok/blueprint-core-nuxt).

## Stack

- **Nuxt 4** (estrutura `app/`, rota catch-all `app/pages/[...slug].vue`)
- **@storyblok/nuxt** v9 — CMS headless, conteúdo 100% editável por blocos
- **Tailwind CSS v4** (via plugin Vite, sem PostCSS)
- **vite-plugin-mkcert** — HTTPS local com certificado confiável (exigido pelo Visual Editor)
- **lucide-vue-next** — ícones

## Setup local

```bash
pnpm install
cp .env.example .env
# preencha STORYBLOK_DELIVERY_API_TOKEN com o token do seu Space
pnpm run dev
```

O servidor sobe em **HTTPS** (`https://localhost:3000`) via `vite-plugin-mkcert`. Na primeira execução, pode pedir sua senha de admin do sistema para instalar a CA local confiável — é esperado, só acontece uma vez.

```bash
pnpm run lint        # eslint (Vue + TypeScript)
pnpm run lint:fix    # corrige automaticamente o que for possível
pnpm run typecheck   # vue-tsc --noEmit
```

### Token e versão de conteúdo

A Storyblok tem dois tipos de token de Delivery API:

| Tipo de token | Versão buscada |
|---|---|
| **Preview** | rascunho (draft) |
| **Public** | apenas publicado |

A rota `app/pages/[...slug].vue` busca sempre `version: 'draft'`. Se o seu token for **Public**, troque para `version: 'published'` nesse arquivo.

## Configurando o Storyblok (primeira vez)

### 1. Crie o Space

Crie um Space em [app.storyblok.com](https://app.storyblok.com). Copie o **token de Delivery API** (Settings → Access Tokens) para o `.env`.

### 2. Importe os componentes (Block Library)

Os schemas estão em `storyblok-schemas/*.json`. Importe **nessa ordem** (blocos nestable precisam existir antes dos blocos que os referenciam via `component_whitelist`):

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
14. `page.json` (root content type — importar por último)

Via [Storyblok CLI](https://github.com/storyblok/storyblok-cli):

```bash
npx storyblok login
npx storyblok push-components storyblok-schemas/navbar.json --space=<SPACE_ID>
# repita para cada arquivo, na ordem acima
```

### 3. Crie a story "home"

Em **Content**, crie uma story na raiz chamada `home`, do Content Type `page`. No campo `body`, adicione os blocos na ordem visual:

```
navbar → hero → mission_section → features_section → methodology_section → security_section → footer
```

### 4. Visual Editor (preview ao vivo)

A rota `app/pages/[...slug].vue` é **catch-all**: resolve qualquer slug dinamicamente. Configure em **Settings → Visual Editor**:

1. Default environment: `https://localhost:3000/`

E na story `home`, em **Config** (ícone de engrenagem):

2. Campo **Real path**: `/`

## Conteúdo de referência (copy original do Figma)

<details>
<summary>Textos por seção</summary>

**Hero**
- Badge: `BETA PRIVADO` `- SOMENTE POR CONVITE`
- Headline: `Finanças que a família constrói junta!`
- Body: `Orzeh` `é o ecossistema financeiro feito para casais e famílias. Registre, analise e planeje a vida financeira em um lugar só — com transparência, sem cobrança.`
- Card flutuante: `REGRA 50 - 30 -10` — segmentos: Básico (50%, azul `#3b82f6`), Estilo (38%, âmbar `#f59e0b`), Investir (23%, verde `#22c55e`)

**Missão (01)**
- Eyebrow: `01 — MISSÃO`
- Headline: `Acabar com os 69% das brigas por dinheiro.`
- Body (richtext): `A falta de comunicação financeira é a maior causa de conflito entre casais. **Orzeh** foi desenhado para o "momento mágico" da colaboração - onde transparência substitui cobrança, e metas viram um plano construído a dois.`
- Células: Transparência / Sem cobrança / Alinhamento / Educação

**Recursos (02)**
- Eyebrow: `02 — RECURSOS`
- Headline: `A evolução digital da planilha de casal.`
- Cards: Family Group (I) / DRE Pessoal automatizada (II) / Consolidação anual (III)

**Metodologia (03)**
- Eyebrow: `03 — METODOLOGIA`
- Headline (richtext): `Método *P.A.R.D.* - controle de impulso antes da compra.`
- Steps: P. Perceba / A. Analise / R. Reflita / D. Decida

**Segurança (04)**
- Eyebrow: `04 — SEGURANÇA`
- Headline: `Dark Premium por padrão.`
- Células: Cookies httpOnly / Tokens JWT / Backups automáticos / Open Finance no roadmap

**Footer**
- Brand: `Orzeh` `- Created by Sales Creations`
- Copyright: `© {year}`

</details>

## Estrutura do projeto

```
app/
├── storyblok/              # Um componente Vue por bloco Storyblok (componentsDir padrão do módulo)
├── plugins/
│   └── storyblok-components.ts  # Registra manualmente blocos com "_" no nome (ver nota abaixo)
├── pages/[...slug].vue     # Rota catch-all: busca a story pelo slug
├── layouts/default.vue     # Layout raiz (mínimo)
├── assets/css/main.css     # Tokens de design (cores, fontes, radius)
storyblok-schemas/          # JSON schemas para importar no Space
```

### Nota: blocos com "_" no nome precisam de registro manual

O `StoryblokComponent` resolve o nome do bloco usando o valor **exato** de `blok.component` primeiro (ex: `mission_section`), e só tenta a conversão para `kebab-case` como fallback. O algoritmo de resolução nativo do Vue entende `PascalCase` ↔ `kebab-case` automaticamente, mas **não** entende `snake_case` como equivalente — então um arquivo `MissionSection.vue` nunca casa automaticamente com um bloco chamado `mission_section`.

Por isso, `app/plugins/storyblok-components.ts` registra explicitamente (via `app.component(...)`) todo bloco cujo nome técnico tem `_`: `mission_section`, `mission_cell`, `features_section`, `feature_card`, `methodology_section`, `methodology_step`, `security_section`, `security_cell`. Blocos sem `_` (`navbar`, `hero`, `footer`, `page`) continuam resolvendo via auto-import normal, sem precisar de entrada nesse plugin.

**Se criar um novo bloco no Storyblok com `_` no nome**, adicione o import e o `app.component(...)` correspondente nesse plugin — caso contrário, vai aparecer o erro `Component could not be found for blok "..."` no console, mesmo com o arquivo `.vue` existindo corretamente em `app/storyblok/`.

## Deploy

Variáveis de ambiente necessárias no provedor de deploy (Netlify):

- `STORYBLOK_DELIVERY_API_TOKEN`
- `STORYBLOK_REGION` (`eu`)

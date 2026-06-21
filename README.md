# orzeh — landing page institucional

Landing page (`orzeh.com`) construída em **Nuxt 4** + **Tailwind CSS v4** + **Storyblok** (Headless CMS).
Substitui a versão anterior (HTML/CSS/JS estático no Netlify).

## Stack

- **Nuxt 4** (estrutura `app/`, `compatibilityVersion: 4`)
- **Tailwind CSS v4** (via plugin Vite, sem PostCSS)
- **@storyblok/nuxt** v9+ — CMS headless, conteúdo 100% editável por blocos
- **lucide-vue-next** — ícones

## Setup local

```bash
pnpm install
cp .env.example .env
# preencha STORYBLOK_DELIVERY_API_TOKEN com o Preview Token do seu Space
pnpm run dev
```

O servidor sobe automaticamente em **HTTPS** (`https://localhost:3000`), com certificado autoassinado gerado pelo próprio Nuxt — sem precisar de `mkcert` ou OpenSSL manual. Isso é necessário porque o Visual Editor da Storyblok só conecta a projetos servidos via HTTPS. No primeiro acesso, seu navegador vai alertar sobre o certificado não ser confiável; é esperado em ambiente local — clique em "avançar"/"continuar mesmo assim".

```bash
pnpm run lint       # eslint (Vue + TypeScript)
pnpm run lint:fix   # corrige automaticamente o que for possível
```

## Configurando o Storyblok (primeira vez)

### 1. Crie o Space

Crie um Space novo em [app.storyblok.com](https://app.storyblok.com). Anote o **Preview Token** (Settings → Access Tokens) e coloque em `.env`.

### 2. Importe os componentes (Block Library)

Os schemas estão em `storyblok-schemas/*.json`. Importe **nessa ordem** (os blocos nestable precisam existir antes dos blocos que os referenciam via `component_whitelist`):

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

**Como importar:** no Storyblok, vá em **Components** → ⓘ (canto superior direito) → **Import from JSON**, ou use a [Storyblok CLI](https://github.com/storyblok/storyblok-cli):

```bash
npx storyblok login
npx storyblok push-components storyblok-schemas/navbar.json --space=<SPACE_ID>
# repita para cada arquivo, na ordem acima
```

### 3. Crie a story "home"

Em **Content**, crie uma nova story na raiz chamada `home`, do Content Type `page`. Dentro do campo `body`, adicione os blocos na ordem visual da página:

1. `navbar`
2. `hero`
3. `mission_section`
4. `features_section`
5. `methodology_section`
6. `security_section`
7. `footer`

Preencha cada campo com o conteúdo (os textos de referência usados no design estão na seção abaixo).

### 4. Visual Editor (opcional)

Para usar o editor visual com preview ao vivo, configure em **Settings → Visual Editor**:

- Default environment: `https://localhost:3000/` (note o **https** — o servidor de dev já sobe nesse protocolo automaticamente)

### Região do Space

O `.env` tem `STORYBLOK_REGION=eu` por padrão, que é a região correta para o Space `293327625493385` (💡 Site Orzeh). Só altere se migrar para outro Space hospedado em outra região (`us`, `cn`, `ap`, `ca`).

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

## Relação com o Core Blueprint oficial da Storyblok

Este projeto não usa o [blueprint-core-nuxt](https://github.com/storyblok/blueprint-core-nuxt) diretamente — ele traz blocos genéricos (`page`, `teaser`, `grid`, `feature`) que não correspondem ao design real do Orzeh. Em vez disso, adotamos as práticas recomendadas que o blueprint encapsula:

- ✅ Estrutura `app/` do Nuxt 4 com `useAsyncStoryblok` em `app/pages/index.vue`
- ✅ Componentes Storyblok em PascalCase, importados automaticamente
- ✅ **HTTPS local automático** (`devServer.https: true`), exigido pelo Visual Editor — resolvido nativamente pelo Nuxt, sem certificados manuais
- ✅ `pnpm` como gerenciador de pacotes (padrão usado nos blueprints oficiais)
- ❌ Não adotamos os blocos genéricos `teaser`/`grid`/`feature` — nossos 14 componentes (`hero`, `mission_section`, `feature_card` etc.) já são fiéis ao design Figma e ao conteúdo real do produto

## Estrutura do projeto

```
app/
├── components/storyblok/   # Um componente Vue por bloco Storyblok
├── pages/index.vue         # Busca a story "home" e renderiza
├── assets/css/main.css     # Tokens de design (cores, fontes, radius)
└── app.vue
storyblok-schemas/          # JSON schemas para importar no Space
```

## Deploy

Configurado para Netlify (mesmo provedor do repositório anterior). Variáveis de ambiente necessárias no painel do Netlify:

- `STORYBLOK_DELIVERY_API_TOKEN`
- `STORYBLOK_REGION` (`eu`)
- `STORYBLOK_VERSION` (`published` em produção)

import mkcert from "vite-plugin-mkcert";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2026-01-13",
  devtools: { enabled: false },
  modules: ["@storyblok/nuxt", ["@nuxt/eslint", { config: { typescript: { strict: true } } }]],

  storyblok: {
    accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
    apiOptions: {
      /** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
      region: process.env.STORYBLOK_REGION || "eu",
      /** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
      endpoint: process.env.STORYBLOK_API_BASE_URL
        ? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
        : undefined,
    },
  },

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      htmlAttrs: { lang: "pt-BR" },
      title: "Orzeh — Finanças que a família constrói junta",
      meta: [
        {
          name: "description",
          content:
            "Orzeh é o ecossistema financeiro feito para casais e famílias. Registre, analise e planeje a vida financeira em um lugar só — com transparência, sem cobrança.",
        },
      ],
    },
  },

  ssr: true,

  devServer: {
    https: true,
  },

  vite: {
    plugins: [mkcert(), tailwindcss()],
  },
});

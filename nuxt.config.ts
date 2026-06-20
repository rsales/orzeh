import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-01-10',

  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  modules: ['@storyblok/nuxt'],

  storyblok: {
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
    bridge: process.env.STORYBLOK_VERSION !== 'published',
    apiOptions: {
      region: 'us',
    },
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      storyblokVersion: process.env.STORYBLOK_VERSION || 'published',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Orzeh — Finanças que a família constrói junta',
      meta: [
        {
          name: 'description',
          content:
            'Orzeh é o ecossistema financeiro feito para casais e famílias. Registre, analise e planeje a vida financeira em um lugar só — com transparência, sem cobrança.',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
})

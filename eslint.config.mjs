// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    // Componentes em app/storyblok/ têm nome 1:1 com o bloco no Space
    // (ex: Hero.vue -> bloco "hero"); nome de uma palavra é intencional aqui.
    files: ['app/storyblok/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
)

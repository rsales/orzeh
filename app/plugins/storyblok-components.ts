/**
 * Registra explicitamente os componentes Storyblok cujo nome técnico usa
 * snake_case (ex: "mission_section", "feature_card").
 *
 * Por que isso é necessário: o resolvedor interno do @storyblok/vue
 * (StoryblokComponent) busca primeiro pelo nome EXATO do bloco
 * (`resolveComponent(blok.component)`), e só usa kebab-case como fallback.
 * O algoritmo de matching nativo do Vue não reconhece "_" como separador
 * equivalente à mudança de case do PascalCase do arquivo .vue — então
 * "MissionSection.vue" nunca casa automaticamente com o bloco
 * "mission_section". Blocos sem "_" no nome (ex: "navbar", "hero") não
 * têm esse problema e continuam resolvendo via auto-import normal.
 */
import MissionSection from '~/storyblok/MissionSection.vue'
import MissionCell from '~/storyblok/MissionCell.vue'
import FeaturesSection from '~/storyblok/FeaturesSection.vue'
import FeatureCard from '~/storyblok/FeatureCard.vue'
import MethodologySection from '~/storyblok/MethodologySection.vue'
import MethodologyStep from '~/storyblok/MethodologyStep.vue'
import SecuritySection from '~/storyblok/SecuritySection.vue'
import SecurityCell from '~/storyblok/SecurityCell.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('mission_section', MissionSection)
  nuxtApp.vueApp.component('mission_cell', MissionCell)
  nuxtApp.vueApp.component('features_section', FeaturesSection)
  nuxtApp.vueApp.component('feature_card', FeatureCard)
  nuxtApp.vueApp.component('methodology_section', MethodologySection)
  nuxtApp.vueApp.component('methodology_step', MethodologyStep)
  nuxtApp.vueApp.component('security_section', SecuritySection)
  nuxtApp.vueApp.component('security_cell', SecurityCell)
})

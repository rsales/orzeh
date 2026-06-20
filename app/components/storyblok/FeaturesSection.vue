<script setup lang="ts">
import type { SbBlokData } from '@storyblok/vue'

interface FeaturesSectionBlok extends SbBlokData {
  eyebrow?: string
  headline?: string
  body_text?: string
  cards?: SbBlokData[]
}

defineProps<{ blok: FeaturesSectionBlok }>()
</script>

<template>
  <section
    v-editable="blok"
    class="flex w-full flex-col items-start gap-12 bg-[var(--color-background)] px-6 py-16 lg:px-[190px] lg:py-[90px]"
  >
    <div class="flex w-full flex-col items-start justify-between gap-6 text-[var(--color-primary)] lg:flex-row lg:items-center">
      <div class="flex flex-col items-start gap-1.5">
        <p class="text-sm font-light">{{ blok.eyebrow }}</p>
        <h2 class="max-w-[556px] text-3xl font-extrabold leading-tight sm:text-4xl">{{ blok.headline }}</h2>
      </div>
      <p class="max-w-[387px] text-sm leading-5">{{ blok.body_text }}</p>
    </div>

    <div class="flex w-full flex-col items-center gap-5 lg:flex-row">
      <StoryblokComponent v-for="card in blok.cards" :key="card._uid" :blok="card" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SbBlokData } from '@storyblok/vue'
import { renderRichText } from '@storyblok/vue'

interface MissionSectionBlok extends SbBlokData {
  eyebrow?: string
  headline?: string
  body?: unknown
  cells?: SbBlokData[]
}

const props = defineProps<{ blok: MissionSectionBlok }>()

const bodyHtml = computed(() => (props.blok.body ? renderRichText(props.blok.body) : ''))
</script>

<template>
  <section
    v-editable="blok"
    class="flex w-full flex-col items-start justify-between gap-16 border-b border-[var(--color-sidebar-ring)] bg-[var(--color-background)] px-6 py-16 lg:flex-row lg:gap-0 lg:px-[190px] lg:py-[154px]"
  >
    <div class="flex w-full max-w-[460px] flex-col items-start gap-7 text-[var(--color-primary)]">
      <div class="flex flex-col items-start gap-1.5">
        <p class="text-sm font-light">{{ blok.eyebrow }}</p>
        <h2 class="text-3xl font-extrabold leading-tight sm:text-4xl">{{ blok.headline }}</h2>
      </div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="max-w-[432px] text-sm leading-5 [&_strong]:font-bold [&_em]:italic" v-html="bodyHtml" />
    </div>

    <div class="grid w-full max-w-[652px] grid-cols-1 sm:grid-cols-2">
      <StoryblokComponent v-for="cell in blok.cells" :key="cell._uid" :blok="cell" />
    </div>
  </section>
</template>

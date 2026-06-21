<script setup lang="ts">
import type { SbBlokData, StoryblokRichTextNode } from '@storyblok/vue'
import { renderRichText } from '@storyblok/vue'

interface MethodologySectionBlok extends Omit<SbBlokData, 'headline'> {
  eyebrow?: string
  headline?: StoryblokRichTextNode<string>
  body_text?: string
  steps?: SbBlokData[]
}

const props = defineProps<{ blok: MethodologySectionBlok }>()

const headlineHtml = computed(() => (props.blok.headline ? renderRichText(props.blok.headline) : ''))
</script>

<template>
  <section
    v-editable="blok"
    class="mx-4 my-8 flex flex-col items-start gap-16 rounded-[var(--radius-rounded-3xl)] bg-[var(--color-foreground)] px-6 py-16 sm:mx-12 lg:mx-[95px] lg:px-[95px] lg:pb-32 lg:pt-[75px]"
  >
    <div class="flex w-full max-w-[652px] flex-col items-start gap-7 text-[var(--color-secondary)]">
      <div class="flex w-full flex-col items-start gap-1.5">
        <p class="text-sm font-light">{{ blok.eyebrow }}</p>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <h2 class="text-3xl font-extrabold leading-tight sm:text-4xl [&_em]:font-extrabold [&_em]:italic" v-html="headlineHtml" />
      </div>
      <p class="w-full text-sm leading-5">{{ blok.body_text }}</p>
    </div>

    <div class="flex w-full flex-col items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
      <StoryblokComponent v-for="step in blok.steps" :key="step._uid" :blok="step" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SbBlokData } from '@storyblok/vue'

interface FeatureCardBlok extends SbBlokData {
  numeral?: string
  title?: string
  description?: string
  image?: { filename?: string; alt?: string }
}

defineProps<{ blok: FeatureCardBlok }>()
</script>

<template>
  <article
    v-editable="blok"
    class="flex w-full max-w-[364px] shrink-0 flex-col items-center gap-10 rounded-[var(--radius-rounded-md)] border border-[var(--color-border)] bg-[var(--color-background)] pb-12"
  >
    <div class="h-[273px] w-full overflow-hidden rounded-t-[var(--radius-rounded-md)] border border-[var(--color-border)]">
      <img
        v-if="blok.image?.filename"
        :src="blok.image.filename"
        :alt="blok.image.alt || blok.title || ''"
        class="size-full object-cover"
        loading="lazy"
      >
      <div v-else class="size-full bg-[var(--color-border)]" />
    </div>
    <div class="flex w-full flex-col gap-1 px-5 text-[var(--color-primary)]">
      <p class="font-serif-display text-xl italic" aria-hidden="true">{{ blok.numeral }}</p>
      <h3 class="text-xl font-bold leading-7">{{ blok.title }}</h3>
      <p class="text-sm leading-5 text-[var(--color-primary)]/80">{{ blok.description }}</p>
    </div>
  </article>
</template>

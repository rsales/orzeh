<script setup lang="ts">
import type { SbBlokData } from '@storyblok/vue'

interface ProgressSegmentBlok extends SbBlokData {
  label?: string
  // Campos do tipo "number" no Storyblok são serializados como string pela API.
  percent?: string
  color?: string
}

interface HeroBlok extends SbBlokData {
  badge_highlight?: string
  badge_text?: string
  headline?: string
  body_highlight?: string
  body_text?: string
  image?: { filename?: string; alt?: string }
  floating_card_label?: string
  floating_card_segments?: ProgressSegmentBlok[]
}

defineProps<{ blok: HeroBlok }>()
</script>

<template>
  <section v-editable="blok" class="relative w-full overflow-hidden bg-[var(--color-background)] pb-16 pt-[180px] sm:pt-[210px]">
    <div class="mx-auto flex max-w-[868px] flex-col items-center gap-7 px-6 text-center">
      <div class="flex flex-col items-center gap-2.5">
        <span
          class="inline-flex items-center gap-2 rounded-[var(--radius-rounded-full)] border border-[var(--color-foreground)] px-3.5 py-2 text-xs text-[var(--color-foreground)]"
        >
          <span class="size-[7px] shrink-0 rounded-full bg-[var(--color-foreground)]" aria-hidden="true" />
          <span class="font-bold">{{ blok.badge_highlight }}</span>
          <span> {{ blok.badge_text }}</span>
        </span>
        <h1 class="text-4xl font-black leading-none text-[var(--color-primary)] sm:text-6xl lg:text-[72px]">
          {{ blok.headline }}
        </h1>
      </div>
      <p class="max-w-[525px] text-base leading-6 text-[var(--color-primary)]">
        <span class="font-bold italic">{{ blok.body_highlight }}</span>
        {{ ' ' }}{{ blok.body_text }}
      </p>
    </div>

    <div class="relative mx-auto mt-20 w-full max-w-[728px] px-6">
      <div class="relative aspect-[728/460] w-full overflow-hidden rounded-[28px] bg-[#d9d9d9] sm:rounded-[43.5px]">
        <img
          v-if="blok.image?.filename"
          :src="blok.image.filename"
          :alt="blok.image.alt || ''"
          class="size-full object-cover"
          loading="eager"
        >
      </div>

      <div
        v-if="blok.floating_card_segments?.length"
        class="absolute -bottom-10 left-6 flex w-[208px] flex-col gap-[11px] rounded-[9px] bg-[var(--color-background)] px-5 py-[22px] shadow-[0px_8px_5px_rgba(0,0,0,0.1),0px_20px_12.5px_rgba(0,0,0,0.1)] sm:left-12"
      >
        <p class="text-xs text-[var(--color-foreground)]">{{ blok.floating_card_label }}</p>
        <div class="flex h-1.5 w-full overflow-hidden rounded-[var(--radius-rounded-full)]">
          <span
            v-for="segment in blok.floating_card_segments"
            :key="segment._uid"
            class="h-full"
            :style="{ width: `${segment.percent}%`, backgroundColor: segment.color }"
          />
        </div>
        <div class="flex justify-between text-xs font-light text-[var(--color-foreground)]">
          <span v-for="segment in blok.floating_card_segments" :key="segment._uid">{{ segment.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

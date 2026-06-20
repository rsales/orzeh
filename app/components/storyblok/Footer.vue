<script setup lang="ts">
import type { SbBlokData } from '@storyblok/vue'

interface FooterBlok extends SbBlokData {
  logo?: { filename?: string; alt?: string }
  brand_highlight?: string
  tagline?: string
  copyright?: string
}

const props = defineProps<{ blok: FooterBlok }>()

const currentYear = new Date().getFullYear()
const copyrightText = computed(() => props.blok.copyright?.replace('{year}', String(currentYear)) || `© ${currentYear}`)
</script>

<template>
  <footer
    v-editable="blok"
    class="relative flex h-[320px] w-full flex-col items-center justify-end overflow-hidden rounded-t-[70px] bg-[var(--color-foreground)] pb-10 sm:h-[420px] lg:h-[487px]"
  >
    <div class="absolute inset-x-0 bottom-[28%] flex justify-center px-6">
      <img
        v-if="blok.logo?.filename"
        :src="blok.logo.filename"
        :alt="blok.logo.alt || 'Orzeh'"
        class="h-auto w-full max-w-[1060px] object-contain"
      >
      <span v-else class="text-[15vw] font-black italic text-[var(--color-secondary)] sm:text-8xl">orzeh.</span>
    </div>

    <div class="z-10 flex w-full max-w-[1059px] flex-col items-center justify-between gap-2 px-6 text-center text-[var(--color-secondary)] sm:flex-row sm:gap-0">
      <p class="text-base">
        <span class="font-bold italic">{{ blok.brand_highlight || 'Orzeh' }}</span>
        {{ ' ' }}{{ blok.tagline }}
      </p>
      <p class="text-base">{{ copyrightText }}</p>
    </div>
  </footer>
</template>

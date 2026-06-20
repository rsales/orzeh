<script setup lang="ts">
import type { SbBlokData } from '@storyblok/vue'

interface MethodologyStepBlok extends SbBlokData {
  index?: string
  letter?: string
  word?: string
  description?: string
}

defineProps<{ blok: MethodologyStepBlok }>()
</script>

<template>
  <div v-editable="blok" class="flex w-full max-w-[268px] flex-col items-start gap-3.5 text-white">
    <p class="text-sm leading-5 opacity-40">{{ blok.index }}</p>
    <div class="flex items-end gap-3 whitespace-nowrap">
      <p class="text-[60px] font-black leading-none">{{ blok.letter }}</p>
      <p class="font-light italic text-2xl leading-8">{{ blok.word }}</p>
    </div>
    <p class="text-sm leading-5">{{ blok.description }}</p>
  </div>
</template>

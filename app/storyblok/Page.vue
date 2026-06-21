<script setup lang="ts">
import type { SbBlokData } from '@storyblok/vue'

interface PageBlok extends SbBlokData {
  body?: SbBlokData[]
}

defineProps<{ blok: PageBlok }>()
</script>

<template>
  <main v-editable="blok">
    <StoryblokComponent v-for="block in blok.body" :key="block._uid" :blok="block" />
  </main>
</template>

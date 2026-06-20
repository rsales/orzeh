<script setup lang="ts">
import type { SbBlokData } from '@storyblok/vue'

interface SecurityCellBlok extends SbBlokData {
  title?: string
  description?: string
}

defineProps<{ blok: SecurityCellBlok }>()
</script>

<template>
  <div
    v-editable="blok"
    class="-mb-px flex w-full flex-col items-start border border-[var(--color-sidebar-ring)] bg-[var(--color-background)] px-5 py-7 first:rounded-t-[var(--radius-rounded-lg)] last:mb-0 last:rounded-b-[var(--radius-rounded-lg)]"
  >
    <div class="flex w-full items-center justify-between gap-6 text-[var(--color-primary)]">
      <h3 class="shrink-0 whitespace-nowrap text-base font-extrabold leading-6">{{ blok.title }}</h3>
      <p class="text-right text-sm leading-5">{{ blok.description }}</p>
    </div>
  </div>
</template>

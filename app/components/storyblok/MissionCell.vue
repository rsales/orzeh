<script setup lang="ts">
import type { SbBlokData } from '@storyblok/vue'

interface MissionCellBlok extends SbBlokData {
  title?: string
  description?: string
}

defineProps<{ blok: MissionCellBlok }>()
</script>

<template>
  <div
    v-editable="blok"
    class="-mb-px -mr-px flex h-[151px] min-w-px flex-1 flex-col items-start border border-[var(--color-sidebar-ring)] bg-[var(--color-background)] px-[30px] pb-[47px] pt-[34px]"
  >
    <div class="flex flex-col items-start gap-1.5 text-[var(--color-primary)]">
      <h3 class="text-base font-extrabold leading-6">{{ blok.title }}</h3>
      <p class="w-[251px] text-sm leading-5">{{ blok.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SbBlokData } from '@storyblok/vue'
import { ArrowUpRight } from 'lucide-vue-next'

interface NavLink {
  _uid: string
  label: string
  url?: { url?: string }
}

interface NavbarBlok extends SbBlokData {
  logo?: { filename?: string; alt?: string }
  links?: NavLink[]
  cta_label?: string
  cta_url?: { url?: string; cached_url?: string }
}

const props = defineProps<{ blok: NavbarBlok }>()

const ctaHref = computed(() => props.blok.cta_url?.url || props.blok.cta_url?.cached_url || 'https://app.orzeh.com')
</script>

<template>
  <header
    v-editable="blok"
    class="fixed inset-x-0 top-0 z-50 mx-auto mt-6 flex h-[70px] w-[calc(100%-2.5rem)] max-w-[1132px] items-center justify-between rounded-[var(--radius-rounded-full)] border-[0.5px] border-[var(--color-foreground)] bg-[var(--color-background)]/90 pl-5 pr-px backdrop-blur-md sm:pl-7"
  >
    <NuxtLink to="/" class="flex h-[30px] w-auto items-center">
      <img
        v-if="blok.logo?.filename"
        :src="blok.logo.filename"
        :alt="blok.logo.alt || 'Orzeh'"
        class="h-full w-auto"
      >
      <span v-else class="text-lg font-black italic">orzeh.</span>
    </NuxtLink>

    <nav class="hidden items-center justify-center gap-6 text-base font-medium text-[var(--color-foreground)] md:flex">
      <a
        v-for="link in blok.links"
        :key="link._uid"
        :href="link.url?.url || '#'"
        class="transition-opacity hover:opacity-60"
      >
        {{ link.label }}
      </a>
    </nav>

    <a
      :href="ctaHref"
      class="flex h-full items-center justify-center gap-2 rounded-r-[var(--radius-rounded-full)] bg-[var(--color-foreground)] px-5 py-4 text-base text-[var(--color-secondary)] transition-opacity hover:opacity-90 sm:text-xl"
    >
      {{ blok.cta_label || 'Entrar' }}
      <ArrowUpRight class="size-5 shrink-0 sm:size-6" />
    </a>
  </header>
</template>

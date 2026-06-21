<script setup lang="ts">
const config = useRuntimeConfig()

const { data: story } = await useAsyncStoryblok('home', {
  api: {
    version: config.public.storyblokVersion as 'draft' | 'published',
  },
})
</script>

<template>
  <div>
    <StoryblokComponent v-if="story" :blok="story.content" />
    <div v-else class="flex min-h-screen items-center justify-center text-[var(--color-primary)]">
      <p>Conteúdo não encontrado. Verifique se a story "home" existe no Storyblok.</p>
    </div>
  </div>
</template>

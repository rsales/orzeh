<script setup lang="ts">
const route = useRoute()

const slugParam = route.params.slug as string[] | undefined
const slug = slugParam && slugParam.length > 0 ? slugParam.join('/') : 'home'

const { story, error } = await useAsyncStoryblok(slug, {
  api: {
    version: 'draft',
  },
  bridge: {},
})

if (error.value) {
  console.error(`[Storyblok] Falha ao buscar a story "${slug}":`, error.value)
}
</script>

<template>
  <div>
    <StoryblokComponent v-if="story?.content" :blok="story.content" />
    <div v-else class="flex min-h-screen items-center justify-center text-[var(--color-primary)]">
      <p>Conteúdo não encontrado. Verifique se a story "{{ slug }}" existe no Storyblok e se a versão/token estão corretos no .env.</p>
    </div>
  </div>
</template>

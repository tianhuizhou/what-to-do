<template>
  <div
    class="card project-card py-2 px-3 d-flex flex-column justify-content-between cursor-pointer"
    style="background-image: url(https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/purty_wood_dark.png)"
    @click="openProjectDetails(data.id)"
  >
    <h3 class="fw-bold text-light mb-0">{{ data.name }}</h3>

    <div class="text-end">
      <button class="btn btn-sm border-0 p-0 favorite-btn" @click.stop>
        <i :class="data.favorite ? 'fis-star text-favorite' : 'fir-star'" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  const props = defineProps<{
    data: Project
  }>()
  const emit = defineEmits<{
    (e: 'change', value: number): void
    (e: 'update', value: string): void
  }>()

  const router = useRouter()
  function openProjectDetails(project_id: string): void {
    router.push({ path: `/workspace/${project_id}` as string })
  }
</script>

<style scoped></style>

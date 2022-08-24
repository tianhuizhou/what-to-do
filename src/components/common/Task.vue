<template>
  <div class="card card-border">
    <span class="mb-0">{{ data.name }}</span>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'
  const props = defineProps<{
    data: Task
  }>()
</script>

<style scoped></style>

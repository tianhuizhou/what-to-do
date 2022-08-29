<template>
  <div class="row gx-3 gy-2">
    <div class="col-12 col-md d-flex align-items-center">
      <div v-if="back" class="me-3">
        <button class="btn text-primary btn-circle px-1 border-0" @click="emit('back')">
          <i class="fis-chevron-left fs-1"></i>
        </button>
      </div>

      <div class="d-lg-flex align-items-center flex-grow-lg-1 gap-lg-2">
        <slot name="left">
          <h1 v-if="title" class="mb-0">{{ title }}</h1>
        </slot>
        <slot name="after-title"></slot>
      </div>
    </div>

    <div class="col-12 col-md-auto d-flex justify-content-end align-items-center">
      <slot name="right"></slot>
    </div>
  </div>

  <hr class="text-gray-300" />
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits, withDefaults } from 'vue'

  withDefaults(
    defineProps<{
      title: string
      back?: boolean
    }>(),
    {
      back: false,
    },
  )

  const emit = defineEmits<{
    (e: 'back'): void
  }>()
</script>
<style scoped></style>

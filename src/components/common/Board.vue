<template>
  <div>
    <div class="card card-border border-draggable">
      <div class="card-body row align-items-center p-0">
        <div class="col-auto text-truncate">
          <h4 class="mb-0 fw-bold">{{ props.data.name }}</h4>
        </div>
        <div class="col d-flex justify-content-end">
          <button class="btn btn-circle btn-outline-secondary btn-sm border-0 fw-bold"><i class="fir-add" /></button>
        </div>
      </div>
    </div>

    <slot name="task-list"></slot>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue'
  import Draggable from 'vuedraggable'
  import Task from './Task.vue'
  const props = defineProps<{
    data: Board
  }>()
</script>

<style scoped></style>

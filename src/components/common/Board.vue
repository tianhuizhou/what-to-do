<template>
  <div class="app-board">
    <div
      class="card card-border border-draggable border-top border-4 cursor-pointer"
      :style="{ 'border-color': `${data.theme}!important` }"
    >
      <div class="card-body row align-items-center p-0">
        <div class="col-8 d-flex align-items-center">
          <h4 class="mb-0 fw-bold text-truncate">{{ props.data.name }}sdfasdfasdfasdfasdfafsasd fasdfasfasdf</h4>
          <el-tooltip effect="dark" :content="`${props.data.tasks.length} tasks`" placement="top-start">
            <el-button size="small">{{ props.data.tasks.length }}</el-button>
          </el-tooltip>
        </div>
        <div class="col-4 d-flex justify-content-end">
          <button class="btn btn-circle btn-outline-secondary btn-sm border-0 fw-bold p-0">
            <i class="fir-add" />
          </button>
        </div>
      </div>
    </div>
    <el-scrollbar>
      <slot name="task-list"></slot>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue'

  const props = defineProps<{
    data: Board
  }>()
</script>

<style scoped></style>

<template>
  <div class="app-board">
    <div
      class="card card-border border-draggable border-top border-4 cursor-pointer"
      :style="{ 'border-color': `${data.theme}!important` }"
    >
      <div class="card-body row align-items-center p-0">
        <div class="col-8 d-flex align-items-center gap-2">
          <h4 class="mb-0 fw-bold text-truncate">{{ props.data.name }}</h4>
          <el-tooltip effect="dark" :content="`${props.data.tasks.length} tasks`" placement="top-start">
            <el-button size="small">{{ props.data.tasks.length }}</el-button>
          </el-tooltip>
        </div>
        <div class="col-4 d-flex justify-content-end">
          <el-dropdown @command="handleActions($event)" trigger="click">
            <div class="el-dropdown-link"><i class="fis-more text-secondary mx-0 fs-1" /></div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="edit" class="text-muted"> Edit board </el-dropdown-item>
                <el-dropdown-item command="delete" class="text-danger"> Delete board </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <el-scrollbar>
      <slot name="task-list"></slot>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
  import { defineEmits, defineProps } from 'vue'

  const props = defineProps<{
    data: Board
  }>()
  const emit = defineEmits<{
    (e: 'update'): void
    (e: 'delete'): void
  }>()

  function handleActions(action: string) {
    if (action === 'edit') emit('update')
    else if (action === 'delete') emit('delete')
  }
</script>

<style scoped></style>

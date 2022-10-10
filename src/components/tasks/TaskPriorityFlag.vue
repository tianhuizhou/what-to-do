<template>
  <el-dropdown trigger="click" @command="updatePriority($event)" title="Change task priority">
    <el-button circle class="border-0 p-1">
      <i :class="[getPriorityIcon(cur_priority), getPriorityClass(cur_priority)]"></i>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="priority in available_priorities" :key="priority" :command="priority">
          <i :class="[getPriorityIcon(priority), getPriorityClass(priority)]"></i>
          <span class="ms-2">{{ getPriorityLabel(priority) }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
  import TaskData from '@/utils/task_data'
  import { defineProps, onMounted, ref, watch } from 'vue'
  import api from '@/helper/api'

  const props = defineProps<{
    priority: string
    task_id: number
  }>()

  const cur_priority = ref<string>('none')

  function updatePriority(priority: string) {
    if (!props.task_id) return
    cur_priority.value = priority
    api.updateTask(props.task_id, { 'priority': priority })
  }

  onMounted(() => {
    cur_priority.value = props.priority
  })

  watch(
    () => props.priority,
    (to) => {
      cur_priority.value = to
    },
  )

  /* Task Priority */
  const available_priorities = ['urgent', 'high', 'normal', 'low', 'none']
  const getPriorityLabel = TaskData.getPriorityLabel
  const getPriorityClass = TaskData.getPriorityClass
  const getPriorityIcon = TaskData.getPriorityIcon
</script>

<style scoped></style>

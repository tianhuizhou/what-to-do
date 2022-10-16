<template>
  <div class="app-task card cursor-pointer task-card">
    <div class="fs-6 fw-bolder text-muted mb-2">Workspace > {{ project_title }}</div>

    <div class="row align-items-center">
      <div class="col col-8 text-break">
        {{ data.name }}
        <el-popover
          :width="300"
          :show-after="200"
          popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
        >
          <template #reference>
            <button class="btn btn-circle btn-sm btn-outline-secondary border-0 opacity-50">
              <i class="fir-list" />
            </button>
          </template>
          <template #default>
            <div v-html="data.description" />
          </template>
        </el-popover>
      </div>

      <div class="col-4 text-center ps-0">
        <UserAssignments :task_id="data.id" :users="data.users" />
      </div>

      <div class="col-12 mb-2 mt-3">
        <div class="text-muted fs-5 mb-1">
          <i class="fir-timer" /> <span>Estimated: {{ common.minutesToTimeUnit(data.estimated_time) }}</span>
        </div>
        <el-tag :type="getDueDateTag(data.is_completed, data.due_date)" effect="dark">
          <i :class="data.is_completed ? 'fir-checkbox-checked' : 'fir-clock'" />
          <span v-if="data.due_date">Due: {{ common.getLocalDate(data.due_date) }}</span>
        </el-tag>
      </div>

      <div class="col-12 d-flex align-items-center gap-1 my-2">
        <el-tag size="small">Tag 1</el-tag>
        <el-tag type="success" size="small">Tag 1</el-tag>
      </div>
    </div>

    <div class="row align-items-center border-top border-1 mt-2 pt-2">
      <div class="col text-start">
        <TaskPriorityFlag :priority="data.priority" :task_id="data.id" />
        <DatePickerPopover :value="data.due_date" @input="updateTaskDueDate" title="Due Date" />

        <!--        <el-button circle class="border-0 p-1"><i class="fir-calendar-clock fs-2" /></el-button>-->
      </div>
      <div class="col text-end">
        <el-button
          size="small"
          circle
          class="border-0 mx-2"
          :type="data.is_completed ? 'success' : ''"
          @click="toggleTaskStatus(!data.is_completed)"
        >
          <i class="fis-checkmark fw-bold" />
        </el-button>

        <el-dropdown trigger="click" @command="handleTaskAction" title="Change task priority">
          <el-button size="small" circle class="border-0"><i class="fis-more fs-2" /></el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="clone" class="text-primary"><i class="fir-copy-add" />Clone</el-dropdown-item>
              <el-dropdown-item command="delete" class="text-danger"><i class="fir-delete" />Delete</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineEmits, defineProps, withDefaults } from 'vue'
  import TaskPriorityFlag from '@/components/tasks/TaskPriorityFlag.vue'
  import UserAssignments from '@/components/common/UserAssignments.vue'
  import DatePickerPopover from '@/components/common/DatePickerPopover.vue'
  import api from '@/helper/api'
  import common from '@/helper/common'
  import { ElMessage } from 'element-plus'

  const props = withDefaults(
    defineProps<{
      data: Task
      project_title?: string
    }>(),
    {
      project_title: '',
    },
  )
  const emit = defineEmits<{
    (e: 'delete'): void
  }>()

  function handleTaskAction(action: string) {
    if (action === 'clone') cloneTask()
    else if (action === 'delete') emit('delete')
  }

  function cloneTask() {
    // create a task by copy all the information of the selected task
    if (!props.data) return
    const payload: Task = {
      'name': `Copy of ${props.data.name}`,
      'priority': props.data.priority,
      'description': props.data.description,
      'board_id': props.data.board_id,
    }
    api
      .createTask(payload)
      .then(() => {
        ElMessage.success(`${payload.name} has been clone successfully.`)
      })
      .catch((err) => {
        console.error(err)
        ElMessage.error(`Failed to clone the task ${payload.name}`)
      })
  }
  function toggleTaskStatus(value: boolean) {
    if (!props.data || !props.data.id) return
    api
      .updateTask(props.data.id, { 'is_completed': value })
      .then(() => {
        ElMessage.success(`${props.data.name} has been ${value ? 'checked' : 'unchecked'} successfully.`)
      })
      .catch((err) => {
        console.error(err)
        ElMessage.error(`Failed to ${value ? 'checked' : 'unchecked'}, please try again.`)
      })
  }

  function updateTaskDueDate(value: string) {
    if (!props.data || !props.data.id) return
    api.updateTask(props.data.id, { 'due_date': value })
  }

  /* DOM functions */
  function getDueDateTag(is_completed: boolean, date: string) {
    if (is_completed) return 'success'
    const is_expired = new Date(date) <= new Date()
    if (!is_completed && is_expired) return 'danger'
    else return 'warning'
  }
</script>

<style scoped></style>

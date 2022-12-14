<template>
  <div class="drawer__content" v-loading="loading">
    <div class="drawer__header">
      <h2>Create task</h2>
      <button class="btn border-0 text-secondary" @click="closeDrawer()">
        <i class="fir-dismiss fs-2" />
      </button>
    </div>

    <el-scrollbar class="scroll">
      <div class="my-3">
        <h4>Name</h4>
        <el-input v-model="form_data.name" :class="{ 'invalid': !form_data.name }" placeholder="Task name" />
      </div>

      <div class="my-3">
        <h4>Priority</h4>
        <el-select v-model="form_data.priority" placeholder="Priority">
          <template #prefix>
            <i :class="[getPriorityIcon(form_data.priority), getPriorityClass(form_data.priority)]" />
          </template>
          <el-option
            v-for="priority in available_priorities"
            :key="priority"
            :label="getPriorityLabel(priority)"
            :value="priority"
          >
            <i :class="[getPriorityIcon(priority), getPriorityClass(priority)]"></i>
            <span class="ms-2">{{ getPriorityLabel(priority) }}</span>
          </el-option>
        </el-select>
      </div>

      <div class="my-3">
        <h4>Description</h4>

        <MarkdownEditor :value="form_data.description" @input="form_data.description = $event" />
      </div>

      <!--      <div class="my-3">-->
      <!--        <h4>Tags</h4>-->
      <!--      </div>-->

      <div class="my-3">
        <h4>Estimated time</h4>
        <TimeAutoInput :value="form_data.estimated_time" @input="form_data.estimated_time = $event" />
      </div>

      <div class="my-3">
        <h4>Due date</h4>
        <el-date-picker v-model="form_data.due_date" value-format="YYYY-MM-DDTHH:mm:ss.sssZ" class="w-100" />
      </div>
    </el-scrollbar>

    <div class="drawer__footer">
      <button class="btn btn-outline-secondary btn-drawer-width me-2" @click="closeDrawer()">Cancel</button>
      <button class="btn btn-primary btn-drawer-width me-2" @click="upsertTask()">
        {{ props.data.id ? 'Update' : 'Create' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineEmits, defineProps, reactive, ref } from 'vue'
  import TaskData from '@/utils/task_data'
  import MarkdownEditor from '@/components/common/MarkdownEditor'
  import TimeAutoInput from '@/components/common/TimeAutoInput'
  import { ElMessage } from 'element-plus'
  import api from '@/helper/api'

  const props = defineProps<{
    data: Task
  }>()
  const emit = defineEmits<{
    (e: 'close'): void
  }>()

  let loading = ref<boolean>(false)
  function closeDrawer() {
    emit('close')
  }

  let form_data = reactive<Task>({
    'name': props.data.name,
    'priority': props.data.priority,
    'description': props.data.description,
    'board_id': props.data.board_id,
    'estimated_time': props.data.estimated_time,
    'due_date': props.data.due_date,
  })

  function upsertTask() {
    if (!formValidation(form_data)) {
      ElMessage.error('Please fill up all the required fields')
      return
    }
    if (props.data.id) updateTask(props.data.id)
    else createTask()
  }
  function createTask() {
    loading.value = true
    api
      .createTask(form_data)
      .then(() => {
        ElMessage.success(`${form_data.name} has been created successfully.`)
        closeDrawer()
      })
      .catch((err) => {
        console.error(err)
        ElMessage.error(`Failed to create the task ${form_data.name}`)
      })
      .finally(() => {
        loading.value = false
      })
  }
  function updateTask(task_id: number) {
    loading.value = true
    api
      .updateTask(task_id, form_data)
      .then(() => {
        ElMessage.success(`${form_data.name} has been created successfully.`)
        closeDrawer()
      })
      .catch((err) => {
        console.error(err)
        ElMessage.error(`Failed to create the task ${form_data.name}`)
      })
      .finally(() => {
        loading.value = false
      })
  }

  function formValidation(dto: Task): boolean {
    if (!dto.name) return false
    else if (!dto.board_id) return false
    return true
  }
  /* Task Priority */
  const available_priorities = ['urgent', 'high', 'normal', 'low', 'none']
  const getPriorityLabel = TaskData.getPriorityLabel
  const getPriorityClass = TaskData.getPriorityClass
  const getPriorityIcon = TaskData.getPriorityIcon
</script>

<style scoped></style>

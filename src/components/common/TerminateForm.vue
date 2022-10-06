<template>
  <div class="text-break">
    <p class="fs-3 text-secondary">
      Are you sure you would like to permanently terminate
      <span class="fw-bold text-dark">{{ name }}</span>
      ?
    </p>

    <p class="fs-3 fw-bold">
      You won't be able to revert this. The process of user un-assignment can last several minutes.
    </p>

    <p class="fs-3">Confirm you want to permanently terminate this {{ type }} by entering its name below.</p>

    <div class="d-flex row-light bg-mixed align-items-center my-2">
      <pre class="mb-0">{{ name }}</pre>
    </div>

    <el-input
      v-model="confirm_text"
      :class="{ 'invalid': error }"
      :placeholder="`Enter the name of this ${type}`"
      @change="inputValidation"
    />
    <span class="text-danger" v-if="error">{{ error }}</span>

    <div class="d-flex justify-content-center gap-2 align-items-center mt-4">
      <button class="btn btn-secondary" @click="closeDialog()">Cancel</button>
      <button class="btn btn-danger" @click="confirmTerminate()">Terminate</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineEmits, defineProps, ref } from 'vue'
  import api from '@/helper/api'
  import { ElMessage } from 'element-plus/es'

  const props = defineProps<{
    id: number
    name: string
    type: string
  }>()
  const emit = defineEmits<{
    (e: 'close'): void
  }>()

  let confirm_text = ref<string>('')
  let error = ref<string>('')

  function inputValidation() {
    error.value = ''
    if (confirm_text.value !== props.name) error.value = 'Please enter the exactly same name'
  }

  function closeDialog() {
    emit('close')
  }
  function confirmTerminate() {
    let promise = null
    if (props.type === 'board') promise = api.deleteBoard(props.id)
    else if (props.type === 'task') promise = api.deleteTask(props.id)

    if (!promise) return

    promise
      .then(() => {
        ElMessage.error(`Delete ${props.name} successfully`)
        closeDialog()
      })
      .catch((err) => {
        console.error(err)
        ElMessage.error('Failed to delete')
      })
  }
</script>

<style scoped></style>

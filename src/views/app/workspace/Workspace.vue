<template>
  Workspace
  <div v-loading="loading" class="card-header">
    <el-popover placement="right" :width="400" trigger="click">
      <template #reference> Workspace </template>
    </el-popover>
  </div>
  <pre>{{ project_list }}</pre>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import api from '@/helper/api'
  import { Project } from '@/helper/types'

  let loading = ref(false)

  let project_list = ref<Project[]>([])
  function getAllProjects() {
    loading.value = true
    api
      .getAllProjects()
      .then((resp) => {
        console.log(resp)
        project_list.value = [...resp]
      })
      .finally(() => {
        loading.value = false
      })
  }
  onMounted(() => {
    getAllProjects()
  })
</script>

<style scoped></style>

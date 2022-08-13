<template>
  <div>
    <PageHeader title="Workspace">
      <template v-slot:right>
        <el-button plain>Filter</el-button>
        <el-button plain class="mx-0">Sort by</el-button>
        <el-button-group>
          <el-button type="default" plain>Me</el-button>
          <el-button type="default" plain>Assignees</el-button>
        </el-button-group>
      </template>
    </PageHeader>
    <div v-loading="loading" class="card-header"></div>
    <pre>{{ project_list }}</pre>
  </div>
</template>

<script lang="ts" setup>
  import PageHeader from '@/components/common/PageHeader.vue'
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
    //getAllProjects()
  })
</script>

<style scoped></style>

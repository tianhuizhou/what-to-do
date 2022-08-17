<template>
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
</template>

<script lang="ts" setup>
  import PageHeader from '@/components/common/PageHeader.vue'
  import { onMounted, ref } from 'vue'
  import api from '@/helper/api'
  import { useGetters, useMutations, useActions } from '@/helper/vuex'

  let loading = ref(false)

  /* Vuex */
  // vuex getter functions
  const { list: project_list } = useGetters(['list'], 'projects')
  const { load: loadProjects } = useActions(['load'], 'projects')

  // eslint-disable-next-line no-undef
  // let project_list = ref<Project[]>([])
  function loadData() {
    loading.value = true
    loadProjects().finally(() => {
      loading.value = false
    })
  }
  onMounted(() => {
    loadData()
    api.getProjectRealtime('m217xIKXrwswXF1BSxzS')
  })
</script>

<style scoped></style>

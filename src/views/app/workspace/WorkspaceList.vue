<template>
  <div>
    <div class="row gx-3">
      <div class="col-12 col-md d-flex">
        <div class="d-flex gap-2">
          <el-avatar
            shape="square"
            :size="60"
            src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
          />
          <div>
            <h2 class="mb-0 fw-bold">Workspace name</h2>
            <span class="text-muted fw-semibold"><i class="fir-lock" /> Private</span>
          </div>
          <button class="btn btn-outline-secondary btn-circle btn-sm p-0 border-0"><i class="fir-edit" /></button>
        </div>
      </div>
      <div class="col-12 col-md-auto d-flex justify-content-end align-items-center">
        <button class="btn btn-primary"><i class="fir-people-add" />Invite Workspace members</button>
      </div>
    </div>

    <hr class="text-gray-300" />
  </div>
  <div class="card mb-4 mx-auto" style="min-height: 45vh">
    <div class="card-body">
      <div class="row gy-2 gx-3 align-items-center">
        <div class="col">
          <h2 class="mb-0 fw-bold">Projects</h2>
        </div>

        <div class="col col-sm-auto order-md-2 text-end">
          <FilterPopUp :filter_props="filter_props" @change="changeFilters($event)" />
        </div>

        <div class="col-12 col-sm-6 ms-sm-auto col-md-3 order-md-1">
          <el-input />
        </div>
      </div>

      <div class="my-5 d-flex gap-3 flex-wrap">
        <div
          class="card project-card bg-main d-flex flex-column justify-content-center cursor-pointer"
          style="height: 100px; width: 300px"
        >
          <div class="text-center">Create new project</div>
        </div>

        <ProjectCard v-for="project in project_list" :key="project.id" :data="project" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, watch, ref, computed } from 'vue'
  import { useGetters, useMutations, useActions } from '@/helper/vuex'
  import FilterPopUp from '@/components/common/FilterPopUp.vue'
  import ProjectCard from '@/components/common/ProjectCard.vue'

  /* Filters */
  const filter_props = computed(() => {
    return {
      'active': {
        'type': 'select',
        'options': [
          { 'value': 'active', 'label': 'Active' },
          { 'value': 'expired', 'label': 'Not active' },
        ],
        'label': 'Active',
        'placeholder': 'Active - All',
        'multiple': false,
      },
      'category': {
        'type': 'select',
        'options': [],
        'label': 'Category',
        'placeholder': 'Category',
        'multiple': true,
      },
      'labels': {
        'type': 'select',
        'options': [],
        'label': 'Tag',
        'placeholder': 'Tag',
        'multiple': true,
      },
    }
  })
  function changeFilters(dto) {}

  let loading = ref<boolean>(false)

  /* All Projects */
  const { list: project_list } = useGetters(['list'], 'projects')
  const { load: loadProjects } = useActions(['load'], 'projects')
  function loadData() {
    loading.value = true
    loadProjects()
      .then(() => projectsLoaded())
      .catch(() => (loading.value = false))
  }
  function projectsLoaded() {
    loading.value = false
  }

  onMounted(() => {
    loadData()
  })
</script>

<style scoped></style>

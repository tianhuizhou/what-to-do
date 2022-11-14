<template>
  <div>
    <PageHeader title="My Projects">
      <template v-slot:right>
        <el-alert title="Projects include public projects and your own private projects" type="warning"
      /></template>
    </PageHeader>
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

        <div class="my-5 d-flex gap-3 flex-wrap" v-loading="loading">
          <div
            v-if="!loading"
            class="card project-card bg-main d-flex flex-column justify-content-center cursor-pointer"
            @click="openProjectForm()"
          >
            <i class="fir-add fs-1 text-center" />
            <div class="text-center">Create new project</div>
          </div>

          <ProjectCard
            v-for="project in project_list"
            :key="project.id"
            :data="project"
            @edit="openProjectForm(project.id)"
            @delete="deleteProject(project.id)"
          />
        </div>
      </div>
    </div>
  </div>

  <el-drawer v-model="drawer.is_show" custom-class="drawer-320 drawer-pe-none" append-to-body :with-header="false">
    <ProjectForm :project_id="drawer.project_id" @close="drawer.is_show = false" />
  </el-drawer>
</template>

<script lang="ts" setup>
  import { onMounted, watch, ref, computed, reactive } from 'vue'
  import { useGetters, useMutations, useActions } from '@/helper/vuex'
  import PageHeader from '@/components/common/PageHeader.vue'
  import FilterPopUp from '@/components/common/FilterPopUp.vue'
  import ProjectCard from '@/components/projects/ProjectCard.vue'
  import ProjectForm from '@/components/projects/ProjectForm.vue'
  import api from '@/helper/api'
  import { ElMessage } from 'element-plus'

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

  onMounted(() => {
    loading.value = true
    loadProjects().finally(() => {
      loading.value = false
    })
  })

  /* Upsert Project */
  let drawer = reactive({
    is_show: false,
    project_id: null as number | null,
  })
  function openProjectForm(project_id: number | null = null) {
    drawer.is_show = true
    drawer.project_id = project_id
  }

  /* Delete Project */
  const { delete: deleteProjectVuex } = useMutations(['delete'], 'projects')
  function deleteProject(project_id: number) {
    loading.value = true
    api
      .deleteProject(project_id)
      .then(() => {
        deleteProjectVuex({ 'id': project_id })
        ElMessage.success('Delete project successfully')
      })
      .catch((err) => {
        ElMessage.error(err.error)
        console.error(err)
      })
      .finally(() => {
        loading.value = false
      })
  }
</script>

<style scoped></style>

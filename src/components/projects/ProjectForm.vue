<template>
  <div class="drawer__content" v-loading="loading">
    <div class="drawer__header">
      <h2>{{ is_update ? 'Update' : 'Create' }} project</h2>
      <button class="btn border-0 text-secondary" @click="closeDrawer()">
        <i class="fir-dismiss fs-2" />
      </button>
    </div>

    <el-scrollbar class="scroll">
      <div class="my-3">
        <h4>Name</h4>
        <el-input v-model="form_data.name" :class="{ 'invalid': !form_data.name }" placeholder="Project name" />
      </div>

      <div class="my-3">
        <h4>Description</h4>
        <el-input
          v-model="form_data.description"
          placeholder="Project description"
          :autosize="{ minRows: 3, maxRows: 6 }"
          type="textarea"
        />
      </div>

      <div class="my-3">
        <h4>Visibility</h4>
        <el-radio-group v-model="form_data.visibility" class="ml-4">
          <el-radio label="public">Public</el-radio>
          <el-radio label="private">Private</el-radio>
        </el-radio-group>
      </div>

      <div class="my-3 d-flex align-items-center">
        <h4 class="mb-0">Favorite</h4>
        <el-switch v-model="form_data.favorite" :width="48" class="ms-3" />
      </div>
    </el-scrollbar>

    <div class="drawer__footer">
      <button class="btn btn-outline-secondary btn-drawer-width me-2" @click="closeDrawer()">Cancel</button>
      <button class="btn btn-primary btn-drawer-width me-2" @click="upsertProject()">
        {{ is_update ? 'Update' : 'Create' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineProps, defineEmits, computed, reactive, onMounted, watch } from 'vue'
  import { useGetters, useMutations, useActions } from '@/helper/vuex'
  import api from '@/helper/api'
  import { ElMessage } from 'element-plus'

  const props = defineProps<{
    project_id: number | null
  }>()
  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'update', value: string): void
  }>()
  function closeDrawer() {
    emit('close')
    setupForm()
  }

  const is_update = computed(() => {
    return !!props.project_id
  })

  let loading = ref<boolean>(false)

  const { by_id: getProject } = useGetters(['by_id'], 'projects')
  let form_data = reactive<Project>({
    'name': '',
    'description': '',
    'visibility': 'public',
    'favorite': false,
  })
  function setupForm(dto: Partial<Project> = {}) {
    form_data.name = dto.name || ''
    form_data.description = dto.description || ''
    form_data.visibility = dto.visibility || 'public'
    form_data.favorite = dto.favorite || false
  }
  function initFormData() {
    if (is_update.value) setupForm(getProject(props.project_id))
    else setupForm()
  }

  const { upsert: upsertProjectVuex } = useMutations(['upsert'], 'projects')
  function upsertProject() {
    if (!is_update.value) createProject()
  }
  function createProject() {
    loading.value = true
    api
      .createProject(form_data)
      .then((resp) => {
        console.log(resp)
        upsertProjectVuex(resp.data)
        ElMessage.success(`Project ${form_data.name} created successfully`)
        closeDrawer()
      })
      .catch((err) => {
        console.log(err)
        ElMessage.error(`Failed to create project`)
      })
      .finally(() => {
        loading.value = false
      })
  }
  watch(
    () => props.project_id,
    (to, from) => {
      if (to !== from) initFormData()
    },
  )
</script>

<style scoped></style>

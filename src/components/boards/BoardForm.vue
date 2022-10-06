<template>
  <div class="drawer__content" v-loading="loading">
    <div class="drawer__header">
      <h2>{{ is_update ? 'Update' : 'Create' }} board</h2>
      <button class="btn border-0 text-secondary" @click="closeDrawer()">
        <i class="fir-dismiss fs-2" />
      </button>
    </div>

    <el-scrollbar class="scroll">
      <div class="my-3">
        <h4>Name</h4>
        <el-input v-model="form_data.name" :class="{ 'invalid': !form_data.name }" placeholder="Board name" />
      </div>

      <div class="my-3">
        <h4>Color theme</h4>
        <el-select v-model="form_data.theme">
          <el-option v-for="theme in theme_list" :key="theme.value" :value="theme.value" :label="theme.label">
            <el-tag :type="theme.value" effect="dark" />
            <span class="mx-3 fw-semibold">{{ theme.label }}</span>
          </el-option>
        </el-select>
      </div>
    </el-scrollbar>

    <div class="drawer__footer">
      <button class="btn btn-outline-secondary btn-drawer-width me-2" @click="closeDrawer()">Cancel</button>
      <button class="btn btn-primary btn-drawer-width me-2" @click="upsertBoard()">
        {{ is_update ? 'Update' : 'Create' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, defineEmits, defineProps, onMounted, reactive, ref, watch } from 'vue'
  import BoardData from '@/utils/board_data'
  import { ElMessage } from 'element-plus'
  import api from '@/helper/api'

  const props = defineProps<{
    data: Board
  }>()
  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'update', value: string): void
  }>()
  function closeDrawer() {
    emit('close')
  }
  const is_update = computed(() => {
    return !!props.data.id
  })
  let loading = ref<boolean>(false)

  let form_data = reactive<Board>({
    'name': '',
    'theme': '',
  })
  const theme_list = ref<{ 'value': string; 'label': string }[]>(BoardData.getBoardColors())
  function setupForm(dto: Partial<Board>) {
    form_data.name = dto.name || ''
    form_data.theme = dto.theme || ''
    form_data.project_id = dto.project_id
  }

  function formValidation(dto: Partial<Board>) {
    if (!dto.name) return false
    else if (!is_update.value && !dto.project_id) return false
    return true
  }
  function upsertBoard() {
    if (!formValidation(form_data)) {
      ElMessage.error('Please fill up all the required fields')
      return
    }

    if (is_update.value && props.data.id) {
      loading.value = true
      api
        .updateBoard(props.data.id, form_data)
        .then(() => {
          ElMessage.success(`${form_data.name} has been updated successfully.`)
          closeDrawer()
        })
        .catch((err) => {
          console.error(err)
          ElMessage.error(`Failed to update the board ${form_data.name}`)
        })
        .finally(() => {
          loading.value = false
        })
    } else if (!is_update.value) {
      loading.value = true
      api
        .createBoard(form_data)
        .then(() => {
          ElMessage.success(`${form_data.name} has been created successfully.`)
          closeDrawer()
        })
        .catch((err) => {
          console.error(err)
          ElMessage.error(`Failed to create the board ${form_data.name}`)
        })
        .finally(() => {
          loading.value = false
        })
    }
  }

  onMounted(() => {
    setupForm(props.data)
  })
</script>

<style scoped></style>

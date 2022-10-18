<template>
  <div v-loading="loading">
    <div class="my-2">
      <h4>Preview</h4>
      <div class="row-light text-center">
        <WtdTag class="mx-3 my-2" :color="form_data.theme">{{ form_data.name }}</WtdTag>
      </div>
    </div>

    <div class="my-2">
      <h4>Name</h4>
      <el-input
        v-model="form_data.name"
        @change="form_data.name = form_data.name.trim()"
        placeholder="Tag name"
        size="small"
        :class="{ 'invalid': !form_data.name }"
      />
    </div>

    <div class="my-2">
      <h4>Select a color</h4>
      <div class="d-flex justify-content-between flex-wrap gap-2">
        <div
          class="d-flex align-items-center cursor-pointer color-picker-item"
          :class="{ 'selected': form_data.theme === item.value }"
          v-for="item in color_list"
          :key="item.value"
          @click="form_data.theme = item.class"
        >
          <el-tag class="p-0" :style="`background-color: ${item.value}`" size="large" />
        </div>
      </div>

      <div class="d-flex align-items-center justify-content-center my-1">
        <button class="btn btn-sm btn-link text-secondary" @click="form_data.theme = ''">
          <i class="fir-dismiss-circle" />Remove color
        </button>
      </div>
    </div>

    <hr class="text-gray-300" />

    <div class="d-flex justify-content-between align-items-center">
      <button class="btn btn-sm btn-primary" @click="upsertTag">{{ data ? 'Update' : 'Create' }}</button>
      <button v-if="props.data && props.data.id" class="btn btn-sm btn-danger" @click="deleteTag">Delete</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, ref, reactive, onMounted, defineEmits, watch } from 'vue'
  import { useStore } from 'vuex'
  import WtdTag from '@/components/common/WtdTag.vue'
  import { ElMessage } from 'element-plus'
  import api from '@/helper/api'

  const color_list = [
    { 'label': 'Blue', 'value': '#bdecf3', 'class': 'light-blue' },
    { 'label': 'Green', 'value': '#4bbf6b', 'class': 'success' },
    { 'label': 'Yellow', 'value': '#f5ea92', 'class': 'yellow' },
    { 'label': 'Purple', 'value': '#a86cc1', 'class': 'purple' },
    { 'label': 'Red', 'value': '#cf513d', 'class': 'danger' },
    { 'label': 'Pink', 'value': '#ff8ed4', 'class': 'pink' },
    { 'label': 'Orange', 'value': '#e79217', 'class': 'warning' },
    { 'label': 'Navy', 'value': '#026aa7', 'class': 'navy' },
    { 'label': 'Black', 'value': '#505f79', 'class': 'dark' },
  ]

  const props = defineProps<{
    data: Tag | null
  }>()
  const emit = defineEmits<{
    (e: 'close'): void
  }>()

  const store = useStore() // vuex
  const upsertTagVuex = (dto: Tag) => store.commit('tags/upsert', dto)
  const deleteTagVuex = (dto: { 'id': number }) => store.commit('tags/delete', dto)

  let form_data = reactive<Tag>({
    name: '',
    theme: '',
  })
  let loading = ref<boolean>(false)
  function deleteTag() {
    const tag_id = props.data?.id
    if (!tag_id) return
    loading.value = true
    api
      .deleteTag(tag_id)
      .then(() => {
        loading.value = false
        deleteTagVuex({ 'id': tag_id })
        emit('close')
        ElMessage.warning(`Tag has been deleted successfully.`)
      })
      .catch(() => {
        loading.value = false
        ElMessage.error(`Failed to delete.`)
      })
  }
  function upsertTag() {
    if (!form_data.name) return
    loading.value = true
    let promise = null
    if (props.data && props.data.id) promise = api.updateTag(props.data.id, getPayload())
    else promise = api.createTag(getPayload())

    promise
      .then((dto) => {
        loading.value = false
        upsertTagVuex(dto.data as Tag)
        emit('close')
        ElMessage.success(`Tag ${form_data.name} has been ${props.data?.id ? 'updated' : 'created'} successfully.`)
      })
      .catch(() => {
        loading.value = false
        ElMessage.error(`Failed to ${props.data?.id ? 'updated' : 'created'}.`)
      })
  }
  function getPayload() {
    return {
      'name': form_data.name,
      'theme': form_data.theme,
    }
  }

  function initFormData() {
    form_data.name = props.data?.name || ''
    form_data.theme = props.data?.theme || ''
  }
  onMounted(() => {
    initFormData()
  })
  watch(
    () => props.data,
    () => {
      initFormData()
    },
  )
</script>

<style lang="scss"></style>

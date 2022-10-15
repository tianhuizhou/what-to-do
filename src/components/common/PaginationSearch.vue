<template>
  <div class="d-inline">
    <el-input @input="searchData" v-model="search.query" type="text" placeholder="Search" :size="size">
      <template #prefix>
        <i class="fir-search" />
      </template>
    </el-input>
  </div>
</template>

<script lang="ts" setup>
  import Fuse from 'fuse.js'
  import { defineEmits, defineProps, reactive, ref, watch } from 'vue'

  const props = defineProps<{
    data: []
    keys: string[]
    size: string
  }>()
  const emit = defineEmits<{
    (e: 'searchedData', value: []): void
  }>()

  let search = reactive({
    query: '',
    debounce: null as any,
  })
  let fuse_search = ref([])

  function searchData() {
    if (search.debounce) clearTimeout(search.debounce)
    search.debounce = setTimeout(() => emitSearch(), 300)
  }
  function emitSearch() {
    let result = props.data
    if (search.query !== '') result = fuse_search.value.search(search.query).map((i: any) => i.item)
    emit('searchedData', result)
  }

  watch(
    () => props.data,
    () => {
      if (!(props.data.length === 0 && fuse_search.value.length === 0)) {
        console.log('init fuse_search')
        fuse_search.value = new Fuse(props.data, { keys: props.keys, threshold: 0.12, ignoreLocation: true })
        emitSearch()
      }
    },
  )
</script>

<style scoped></style>

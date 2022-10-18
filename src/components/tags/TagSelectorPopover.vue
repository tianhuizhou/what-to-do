<template>
  <el-popover placement="bottom-start" :width="250" trigger="click" v-model:visible="is_popover">
    <template #reference>
      <el-button circle class="border-0 p-1 m-0"><i class="fir-tag fs-2" /></el-button>
    </template>

    <div class="mb-2">
      <PopoverHeader
        :show_back="tag_detail_form.is_show"
        :title="popover_title"
        @close="is_popover = false"
        @back="backToListView"
      />

      <div v-show="!tag_detail_form.is_show">
        <PaginationSearch
          :data="is_popover ? tag_list : []"
          :keys="['name']"
          @searchedData="searchedData"
          size="small"
        />

        <el-scrollbar :max-height="400">
          <div v-for="tag in searched_tags" :key="tag.id" class="row m-0 align-items-center my-2">
            <div class="col-auto p-0">
              <el-checkbox
                :model-value="props.tags.some((item) => item.id === tag.id)"
                size="large"
                @click="selectTag(tag.id)"
              />
            </div>
            <div class="col-9 text-truncate pe-0">
              <WtdTag class="w-100" :color="tag.theme">{{ tag.name }}</WtdTag>
            </div>
            <div class="col p-0">
              <el-button circle class="border-0 p-1 m-0 float-end" @click="upsertTag(tag)"
                ><i class="fir-edit fs-2"
              /></el-button>
            </div>
          </div>

          <div
            v-if="searched_tags.length === 0"
            class="row-light d-flex align-items-center justify-content-center my-2"
          >
            <span v-if="!loading"> No result </span>
            <span v-else>loading data...</span>
          </div>
        </el-scrollbar>

        <div class="d-flex justify-content-center align-items-center">
          <button class="btn btn-link btn-sm" @click="upsertTag(null)">Create a new tag</button>
        </div>
      </div>

      <TagForm v-show="tag_detail_form.is_show" :data="tag_detail_form.dto" @close="backToListView" />
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
  import { computed, defineProps, onMounted, reactive, ref, withDefaults } from 'vue'
  import { useStore } from 'vuex'
  import PopoverHeader from '@/components/common/PopoverHeader.vue'
  import PaginationSearch from '@/components/common/PaginationSearch.vue'
  import WtdTag from '@/components/common/WtdTag.vue'
  import TagForm from '@/components/tags/TagForm.vue'
  import api from '@/helper/api'
  import { useGetters } from '@/helper/vuex'

  const props = withDefaults(
    defineProps<{
      task_id: number
      tags: Tag[]
    }>(),
    {
      tags: () => [],
    },
  )

  const popover_title = computed(() => {
    if (tag_detail_form.is_show) {
      if (tag_detail_form.dto) return 'Edit tag'
      else return 'Create tag'
    } else return 'Tags'
  })
  let loading = ref<boolean>(false)
  let is_popover = ref<boolean>(false)

  const store = useStore() // vuex
  // const tag_list = ref<Tag[]>(store.getters['tags/list'])
  const { list: tag_list } = useGetters(['list'], 'tags')
  const loadTags = () => store.dispatch('tags/load')

  let searched_tags = ref<Tag[]>([])
  function searchedData(result: Tag[]) {
    searched_tags.value = result
  }

  function isAssigned(tag_id: number) {
    return props.tags.some((tag) => tag.id === tag_id)
  }
  function selectTag(tag_id: number) {
    let selected_tags: { 'id': number }[] = props.tags.map((item) => {
      return { 'id': item.id as number }
    })
    if (!isAssigned(tag_id)) {
      selected_tags.push({ 'id': tag_id })
    } else {
      selected_tags.splice(
        selected_tags.findIndex((item) => item.id === tag_id),
        1,
      )
    }
    api.updateTask(props.task_id, { 'tags': selected_tags })
  }

  /* Tag management */
  let tag_detail_form = reactive({
    is_show: false,
    dto: null as Tag | null,
  })
  function upsertTag(tag: Tag | null) {
    tag_detail_form.dto = tag
    tag_detail_form.is_show = true
  }
  function backToListView() {
    tag_detail_form.is_show = false
    tag_detail_form.dto = null
  }

  onMounted(() => {
    loadTags()
  })
</script>

<style lang="scss"></style>

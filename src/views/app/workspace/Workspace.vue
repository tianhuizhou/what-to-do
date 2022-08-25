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

    <div v-if="realtime_data.boards">
      <el-scrollbar>
        <Draggable
          class="d-flex gap-4 main-content"
          handle=".border-draggable"
          :list="realtime_data.boards"
          group="board"
        >
          <template #item="{ element }">
            <Board :data="element">
              <template #task-list>
                <Draggable class="mt-5" :list="element.tasks" group="task">
                  <template #item="{ element }">
                    <Task :data="element" class="my-2" />
                  </template>
                </Draggable>

                <button class="btn btn-sm btn-link px-0"><i class="fir-add" />New task</button>
              </template>
            </Board>
          </template>
        </Draggable>
      </el-scrollbar>
    </div>
    <pre>{{ realtime_data }}</pre>
  </div>
</template>

<script lang="ts" setup>
  import PageHeader from '@/components/common/PageHeader.vue'
  import Draggable from 'vuedraggable'
  import Board from '@/components/common/Board.vue'
  import Task from '@/components/common/Task.vue'
  import api from '@/helper/api'

  import { onMounted, ref, computed, reactive, onUnmounted } from 'vue'
  import { useGetters, useMutations, useActions } from '@/helper/vuex'
  import { useRoute } from 'vue-router'
  import { Unsubscribe } from '@firebase/firestore'

  // route
  const route = useRoute()
  const project_id = computed<string>(() => {
    return route.params.id as string
  })

  /* Vuex */
  // vuex getter functions
  const { load: loadProjects } = useActions(['load'], 'projects')

  // eslint-disable-next-line no-undef
  const realtime_data = ref<Partial<Project>>({})
  let unsub: Unsubscribe | null = null

  let loading = ref(false)
  function loadData() {
    loading.value = true
    loadProjects().finally(() => {
      loading.value = false
    })
  }
  onMounted(() => {
    loadData()
    // start listener
    unsub = api.getProjectRealtimeRef(project_id.value, realtime_data)
  })
  onUnmounted(() => {
    if (unsub) unsub()
  })
</script>

<style scoped></style>

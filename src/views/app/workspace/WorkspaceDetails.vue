<template>
  <div>
    <PageHeader :title="`Workspace - ${getProjectNameById(project_id)}`" back @back="exitPage"> </PageHeader>

    <div
      v-if="realtime_data.boards"
      class="card card-body"
      style="background-image: url(https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/purty_wood_dark.png)"
    >
      <!--      <el-scrollbar>-->
      <Draggable
        class="d-flex gap-4 main-content"
        handle=".border-draggable"
        :list="realtime_data.boards"
        group="board"
        itemKey="id"
      >
        <template #item="{ element }">
          <BoardCard :data="element">
            <template #task-list>
              <div class="pt-5">
                <Draggable style="height: 50vh" :list="element.tasks" group="task" itemKey="id">
                  <template #item="{ element }">
                    <TaskCard :data="element" :project_title="getProjectNameById(project_id)" class="my-2" />
                  </template>
                  <template #footer>
                    <button class="card btn-create-task fw-bold text-secondary">
                      <i class="fir-add fw-bold" />New task
                    </button>
                  </template>
                </Draggable>
              </div>
            </template>
          </BoardCard>
        </template>

        <template #footer>
          <div>
            <button class="card btn-create-status text-white fw-bold">
              <i class="fir-add fw-bold" /> <span>Add Status</span>
            </button>
          </div>
        </template>
      </Draggable>
      <!--      </el-scrollbar>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
  import PageHeader from '@/components/common/PageHeader.vue'
  import Draggable from 'vuedraggable'
  import BoardCard from '@/components/common/BoardCard.vue'
  import TaskCard from '@/components/common/TaskCard.vue'
  import api from '@/helper/api'

  import { onMounted, ref, computed, reactive, onUnmounted } from 'vue'
  import { useGetters, useMutations, useActions } from '@/helper/vuex'
  import { useRoute, useRouter } from 'vue-router'
  import { Unsubscribe } from '@firebase/firestore'

  // route and router
  const route = useRoute()
  const project_id = computed<string>(() => {
    return route.params.id as string
  })
  const router = useRouter()
  function exitPage() {
    router.push({ path: '/workspace' })
  }
  /* Vuex */
  // vuex getter functions
  const { name_by_id: getProjectNameById } = useGetters(['name_by_id'], 'projects')
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

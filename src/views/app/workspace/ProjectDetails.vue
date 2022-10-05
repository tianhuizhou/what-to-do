<template>
  <div>
    <PageHeader :title="`Workspace - ${project_data.name || ''}`" back @back="exitPage"> </PageHeader>

    <div
      v-if="project_data.boards"
      class="card card-body"
      style="background-image: url(https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/purty_wood_dark.png)"
    >
      <!--      <el-scrollbar>-->
      <Draggable
        class="d-flex gap-4 main-content"
        handle=".border-draggable"
        :list="project_data.boards"
        group="board"
        itemKey="id"
      >
        <template #item="{ element: board }">
          <BoardCard :data="board" @update="upsertBoard(board)" @delete="openTerminateDialog('board', board)">
            <template #task-list>
              <div class="pt-5">
                <Draggable style="height: 50vh" :list="board.tasks" group="task" itemKey="id">
                  <template #item="{ element: task }">
                    <TaskCard :data="task" :project_title="project_data.name" class="my-2" />
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
            <button class="card btn-create-status text-white fw-bold" @click="upsertBoard(null)">
              <i class="fir-add fw-bold" /> <span>Add another list</span>
            </button>
          </div>
        </template>
      </Draggable>
      <!--      </el-scrollbar>-->
    </div>

    <el-drawer
      v-model="drawer.is_show"
      custom-class="drawer-320 drawer-pe-none"
      append-to-body
      :with-header="false"
      @close="closeDrawer"
    >
      <BoardFormUpsert v-if="drawer.type === 'board'" :data="drawer.dto" @close="closeDrawer" />
    </el-drawer>

    <el-dialog
      v-model="dialog.is_show"
      :show-close="false"
      :close-on-click-modal="false"
      width="420px"
      top="25vh"
      center
    >
      <template #header>
        <div class="row align-items-center">
          <div class="col-4 offset-4">
            <h2 class="mb-0">Warning</h2>
          </div>
          <div class="col-4 text-end">
            <button class="btn btn-sm btn-link text-secondary px-0" @click="closeDialog()">
              <i class="fir-dismiss" />
            </button>
          </div>
        </div>
      </template>

      <TerminateForm
        :id="dialog.id"
        :name="dialog.name"
        :type="dialog.type"
        @close="closeDialog()"
        @terminate="confirmTermination($event.type, $event.id)"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import PageHeader from '@/components/common/PageHeader.vue'
  import Draggable from 'vuedraggable'
  import BoardCard from '@/components/boards/BoardCard.vue'
  import BoardFormUpsert from '@/components/boards/BoardFormUpsert.vue'
  import TaskCard from '@/components/tasks/TaskCard.vue'
  import TerminateForm from '@/components/common/TerminateForm.vue'

  import api from '@/helper/api'
  import { ElMessage } from 'element-plus'

  import { onMounted, ref, computed, reactive, onUnmounted } from 'vue'
  import { useGetters, useMutations, useActions } from '@/helper/vuex'
  import { useRoute, useRouter } from 'vue-router'
  import { Unsubscribe } from '@firebase/firestore'

  // route and router
  const route = useRoute()
  const session_id = computed<string>(() => {
    return route.params.id as string
  })
  const router = useRouter()
  function exitPage() {
    router.push({ path: '/workspace' })
  }

  /* Vuex */
  // vuex getter functions
  const { load: loadProjects } = useActions(['load'], 'projects')

  // eslint-disable-next-line no-undef
  const project_data = ref<Partial<Project>>({})
  let unsub: Unsubscribe | null = null

  let loading = ref(false)
  function loadData() {
    loading.value = true
    loadProjects().finally(() => {
      loading.value = false
    })
  }

  /* Drawer: create/update data */
  let drawer = reactive({
    is_show: false as boolean,
    type: null as 'board' | 'task' | null,
    dto: null as Board | null,
  })
  function closeDrawer() {
    // reset drawer data
    drawer.is_show = false
    drawer.type = null
    drawer.dto = null
  }
  // Upsert Board
  function upsertBoard(board?: Board) {
    drawer.is_show = true
    drawer.type = 'board'
    if (board) drawer.dto = { 'id': board.id, 'name': board.name, 'theme': board.theme }
    else drawer.dto = { 'name': '', 'theme': '', 'project_id': project_data.value.id }
  }

  function moveBoard() {}
  /* Drawer: Task */

  /* Dialog: delete data  */
  let dialog = reactive({
    is_show: false as boolean,
    id: null as number | null,
    name: '' as string,
    type: '' as 'board' | 'task' | '',
  })
  function closeDialog() {
    dialog.is_show = false
    dialog.type = ''
    dialog.name = ''
    dialog.id = null
  }
  function openTerminateDialog(type: 'board' | 'task', dto: { id: number; name: string }) {
    dialog.is_show = true
    dialog.type = type
    dialog.name = dto.name
    dialog.id = dto.id
  }
  function confirmTermination(type: 'board' | 'task', id: number) {
    if (type === 'board') deleteBoard(id)
  }
  function deleteBoard(id: number) {
    api.deleteBoard(id).catch((err) => {
      console.error(err)
      ElMessage.error('Failed to delete')
    })
  }

  /* Lifecycle */
  onMounted(() => {
    loadData()
    // start listener
    unsub = api.getProjectRealtimeRef(session_id.value, project_data)
  })
  onUnmounted(() => {
    if (unsub) unsub()
  })
</script>
<style scoped></style>

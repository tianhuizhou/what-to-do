<template>
  <div>
    <PageHeader :title="`Workspace - ${project_data.name || ''}`" back @back="exitPage"> </PageHeader>

    <div
      v-loading="loading"
      class="card card-body"
      style="min-height: 75vh; background-size: cover; background-repeat: no-repeat"
      :style="
        project_data.background ? `background-image: url(${project_data.background});` : 'background-color: #6bb7e7'
      "
    >
      <el-scrollbar>
        <Draggable
          class="d-flex gap-5 main-content"
          handle=".border-draggable"
          :list="project_data.boards ?? []"
          group="board"
          itemKey="id"
          @change="moveBoard"
        >
          <template #item="{ element: board }">
            <BoardCard :data="board" @update="openDrawer('board', board)" @delete="openTerminateDialog('board', board)">
              <template #task-list>
                <div class="pt-5">
                  <Draggable
                    style="height: 50vh"
                    :list="board.tasks"
                    group="task"
                    itemKey="id"
                    @change="moveTask($event, board)"
                  >
                    <template #item="{ element: task }">
                      <TaskCard
                        :data="task"
                        :project_title="project_data.name"
                        class="my-3"
                        @open:details="openDrawer('task', { 'board_id': board.id, ...task })"
                        @delete="openTerminateDialog('task', task)"
                      />
                    </template>
                    <template #footer>
                      <button
                        class="card btn-create-task fw-bold text-white"
                        @click="openDrawer('task', { 'board_id': board.id })"
                      >
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
              <button class="card btn-create-status text-white fw-bold" @click="openDrawer('board', null)">
                <i class="fir-add fw-bold" /> <span>Add another list</span>
              </button>
            </div>
          </template>
        </Draggable>
      </el-scrollbar>
    </div>

    <el-drawer
      v-model="drawer.is_show"
      custom-class="drawer-320 drawer-pe-none"
      append-to-body
      :with-header="false"
      @close="closeDrawer"
    >
      <BoardForm v-if="drawer.type === 'board'" :data="drawer.dto" @close="closeDrawer" />
      <TaskForm v-else-if="drawer.type === 'task'" :data="drawer.dto" @close="closeDrawer" />
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

      <TerminateForm :id="dialog.id" :name="dialog.name" :type="dialog.type" @close="closeDialog()" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import PageHeader from '@/components/common/PageHeader.vue'
  import Draggable from 'vuedraggable'
  import BoardCard from '@/components/boards/BoardCard.vue'
  import BoardForm from '@/components/boards/BoardForm.vue'
  import TaskCard from '@/components/tasks/TaskCard.vue'
  import TaskForm from '@/components/tasks/TaskForm.vue'
  import TerminateForm from '@/components/common/TerminateForm.vue'

  import api from '@/helper/api'

  import { onMounted, ref, computed, reactive, onUnmounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { Unsubscribe } from '@firebase/firestore'

  let loading = ref<boolean>(false)
  let loading_effect: any = null

  /* Route and router */
  const route = useRoute()
  const session_id = computed<string>(() => {
    return route.params.id as string
  })
  const router = useRouter()
  function exitPage() {
    router.push({ path: '/workspace' })
  }

  /* Realtime data from Firestore */
  const project_data = ref<Partial<Project>>({})
  let unsub: Unsubscribe | null = null

  /* Drawer: create/update data */
  let drawer = reactive({
    is_show: false as boolean,
    type: null as 'board' | 'task' | null,
    dto: null as Board | Task | null,
  })
  function closeDrawer() {
    // reset drawer data
    drawer.is_show = false
    drawer.type = null
    drawer.dto = null
  }
  function openDrawer(type: 'board' | 'task', dto?: any) {
    if (type == 'board') {
      if (dto) drawer.dto = { 'id': dto.id, 'name': dto.name, 'theme': dto.theme }
      else drawer.dto = { 'name': '', 'theme': '', 'project_id': project_data.value.id }
    } else if (type == 'task') {
      drawer.dto = dto
    }

    drawer.is_show = true
    drawer.type = type
  }

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

  /* Dragging Board/Task */
  let board_timeout_id: NodeJS.Timeout | null = null
  function moveBoard() {
    if (board_timeout_id) clearTimeout(board_timeout_id)

    const board_order = project_data.value.boards?.map((item) => {
      return item.id as number
    })
    board_timeout_id = setTimeout(() => {
      api.moveBoard(project_data.value.id as number, board_order ?? [])
      board_timeout_id = null
    }, 1000)
  }

  let task_timeout: { timeout_id: NodeJS.Timeout; task_id: number } | null = null
  function moveTask(dto: any, target_board: Board) {
    const moved_within_board = dto.moved ?? null
    const moved_across_board = dto.added ?? null

    if (!moved_across_board && !moved_within_board) return
    const elem = moved_within_board?.element ?? moved_across_board?.element
    if (task_timeout) {
      if (task_timeout.task_id === elem.id) clearTimeout(task_timeout.timeout_id)
    }
    if (moved_within_board) {
      // Only need to call Board endpoint to update the 'task_order' property
      const task_order = target_board.tasks?.map((item) => {
        return item.id as number
      })
      task_timeout = {
        'task_id': elem.id,
        'timeout_id': setTimeout(() => {
          api.updateBoard(target_board.id as number, { 'task_order': task_order })
          task_timeout = null
        }, 1000),
      }
    } else if (moved_across_board) {
      // moveTaskAcrossBoard
      const payload = {
        'old_board_id': elem.board_id as number,
        'new_board_id': target_board.id as number,
        'new_board_position': moved_across_board.newIndex as number,
      }

      task_timeout = {
        'task_id': elem.id,
        'timeout_id': setTimeout(() => {
          api.moveTaskAcrossBoard(elem.id, payload)
          task_timeout = null
        }, 1000),
      }
    }
  }

  /* Lifecycle */
  onMounted(() => {
    // loading_effect = ElLoading.service({
    //   lock: loading.value,
    //   text: 'Loading',
    //   background: 'rgba(0, 0, 0, 0.7)',
    // })
    loading.value = true
    // start listener
    unsub = api.getProjectRealtimeRef(session_id.value, project_data, loading)
  })
  onUnmounted(() => {
    if (unsub) unsub()
  })
</script>
<style scoped></style>

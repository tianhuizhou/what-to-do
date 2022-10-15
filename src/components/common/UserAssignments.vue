<template>
  <el-popover placement="bottom-start" :width="300" trigger="click" :visible="is_popover">
    <template #reference>
      <el-badge v-if="props.users.length" :value="props.users.length" class="user-assignment-btn" type="primary">
        <el-avatar @click="is_popover = !is_popover" :size="32" v-if="!props.users[0].photo_b64">
          {{ props.users[0].name[0] }}
        </el-avatar>
      </el-badge>
      <el-badge v-else class="ms-3" @click="is_popover = !is_popover">
        <el-button size="large" circle><i class="fir-people-team-add" /></el-button>
      </el-badge>
    </template>

    <div>
      <h4 class="text-center border-bottom-1"><i class="fir-people-team" />Members</h4>
      <hr class="text-secondary" />
      <PaginationSearch :data="user_list" :keys="['name', 'email']" @searchedData="searchedData" size="small" />
      <el-scrollbar :max-height="400" class="my-2">
        <div
          v-for="user in searched_users"
          :key="user.id"
          class="row-light row-hover row m-0 align-items-center"
          :class="{ 'selected': props.users.some((item) => item.id === user.id) }"
          @click="selectUser(user.id)"
        >
          <div class="col-auto p-0">
            <el-avatar :size="32" v-if="!user.photo_b64">
              {{ user.name[0] }}
            </el-avatar>
            <el-avatar v-else fit="cover" :size="32" :src="`data:image/png;base64,${user.photo_b64}`" />
          </div>
          <div class="col-9 text-truncate">
            <div>{{ user.name }}</div>
            <div>{{ user.email }}</div>
          </div>
          <div class="col p-0" v-if="props.users.some((item) => item.id === user.id)">
            <div class="w-100 text-end"><i class="fir-checkmark" /></div>
          </div>
        </div>
      </el-scrollbar>

      <button class="btn btn-sm btn-primary float-end" @click="is_popover = false">Close</button>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
  import { defineProps, onMounted, ref } from 'vue'
  import { useGetters, useActions } from '@/helper/vuex'
  import PaginationSearch from '@/components/common/PaginationSearch.vue'
  import api from '@/helper/api'

  const props = defineProps<{
    task_id: number
    users: User[]
  }>()

  let is_popover = ref<boolean>(false)

  const { list: user_list } = useGetters(['list'], 'users')
  const { load: loadUsers } = useActions(['load'], 'users')

  function isAssigned(user_id: number) {
    return props.users.some((user) => user.id === user_id)
  }
  function selectUser(user_id: number) {
    if (!isAssigned(user_id)) api.assignTask(props.task_id, user_id)
    else api.unassignTask(props.task_id, user_id)
  }

  let searched_users = ref<User[]>()
  function searchedData(result: User[]) {
    searched_users.value = result
  }

  onMounted(() => {
    loadUsers()
  })
</script>

<style scoped></style>

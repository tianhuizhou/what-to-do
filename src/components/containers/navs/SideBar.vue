<template>
  <aside class="sidebar" :class="{ 'is-collapse': is_collapse }">
    <div class="d-flex justify-content-start align-items-center ms-2 mb-2" style="height: 70px">
      <button class="btn btn-lg btn-compose" :class="{ 'ps-2': !is_collapse, 'px-3 py-0': is_collapse }" @click="">
        <i class="fis-organization" /> <span v-if="!is_collapse" class="ps-2">Organization</span>
      </button>
    </div>
    <el-menu
      :default-active="selected_item"
      :collapse="is_collapse"
      :collapse-transition="false"
      @select="selectMenuItem($event)"
      class=""
    >
      <!--      <el-menu-item index="favorite" class="my-2">-->
      <!--        <i class="fir-star" /><span class="fw-bold ps-3">Favorite</span>-->
      <!--      </el-menu-item>-->

      <el-menu-item index="/home" class="my-2">
        <i class="fir-home" />
        <span class="fw-bold ps-3">Home</span>
      </el-menu-item>

      <!--      <el-menu-item index="workspace" class="my-2">-->
      <!--        <i class="fir-grid" />-->
      <!--        <span class="fw-bold ps-3">Workspace</span>-->
      <!--      </el-menu-item>-->
    </el-menu>

    <el-collapse>
      <el-collapse-item name="favorite">
        <template #title>
          <div class="flex-grow-1 fw-bold px-4 h4 mb-0">Favorite</div>
        </template>

        <p class="px-4 pt-2 pb-3 h6 mb-0">You don't have any Favorites yet. Learn how to create one or hide this.</p>
      </el-collapse-item>
      <el-collapse-item name="workspace">
        <template #title>
          <div class="flex-grow-1 fw-bold px-4">Workspace</div>
        </template>

        <el-menu
          :default-active="selected_item"
          :collapse="is_collapse"
          :collapse-transition="false"
          @select="selectMenuItem($event)"
          class=""
        >
          <el-menu-item :index="`/workspace/${item.id}`" class="my-2" v-for="item in project_list" :key="item.id">
            <i class="fir-grid" />
            <span class="fw-bold ps-3">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-collapse-item>
    </el-collapse>
  </aside>
</template>

<script lang="ts" setup>
  import { onMounted, watch, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useGetters, useMutations, useActions } from '@/helper/vuex'

  /* Side Menu */
  const router = useRouter()
  const selectMenuItem = (item: string): void => {
    router.push({ path: item })
    changeSelectedMenuItem(item.toLowerCase())
  }
  /* Vuex */
  // vuex getter functions
  const { getMenuType: is_collapse, getSelectedMenuItem: selected_item } = useGetters([
    'getMenuType',
    'getSelectedMenuItem',
  ])
  const { changeSelectedMenuItem } = useMutations(['changeSelectedMenuItem'])
  const { list: project_list } = useGetters(['list'], 'projects')
  const { load: loadProjects } = useActions(['load'], 'projects')
  /* Life circle hooks */
  const route = useRoute()
  watch(
    () => route.name,
    (to, from) => {
      if (to !== from) changeSelectedMenuItem(to)
    },
  )
  onMounted(() => {
    if (selected_item !== route.name) changeSelectedMenuItem(route.name)
    loadProjects()
  })
</script>

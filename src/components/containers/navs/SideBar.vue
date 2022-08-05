<template>
  <aside class="sidebar" :class="{ 'is-collapse': is_collapse }">
    <div class="d-flex justify-content-start align-items-center ms-2 mb-2" style="height: 70px">
      <button class="btn btn-lg btn-compose" :class="{ 'ps-2': !is_collapse, 'px-3 py-0': is_collapse }" @click="">
        <i class="fis-compose" /> <span v-if="!is_collapse" class="ps-2">Compose</span>
      </button>
    </div>
    <el-menu
      :default-active="selected_item"
      :collapse="is_collapse"
      :collapse-transition="false"
      @select="selectMenuItem($event)"
    >
      <el-menu-item index="favorite" class="my-2">
        <i class="fir-star" />
        <span class="fw-bold ps-3">Favorite</span>
      </el-menu-item>

      <el-menu-item index="home" class="my-2">
        <i class="fir-home" />
        <span class="fw-bold ps-3">Home</span>
      </el-menu-item>

      <el-menu-item index="workspace" class="my-2">
        <i class="fir-grid" />
        <span class="fw-bold ps-3">Workspace</span>
      </el-menu-item>
    </el-menu>
  </aside>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'
  import { useGetters, useMutations } from '@/helper/vuex'

  export default defineComponent({
    setup() {
      /* Side Menu */
      const router = useRouter()
      const selectMenuItem = (item: string): void => {
        router.push({ 'path': item })
        changeSelectedMenuItem(item)
      }
      /* Vuex */
      // vuex getter functions
      const { getMenuType: is_collapse, getSelectedMenuItem: selected_item } = useGetters([
        'getMenuType',
        'getSelectedMenuItem',
      ])
      const { changeSelectedMenuItem } = useMutations(['changeSelectedMenuItem'])

      return {
        is_collapse,
        selected_item,
        selectMenuItem,
      }
    },
  })
</script>

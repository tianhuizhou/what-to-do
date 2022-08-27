<template>
  <div class="sidebar" @click.stop="() => {}">
    <div class="main-menu">
      <el-scrollbar>
        <ul class="list-unstyled">
          <li
            v-for="(item, index) in menuItems"
            :class="{
              'active': viewingParentMenu === item.id,
            }"
            class="text-center"
            :key="`parent_${index}`"
            :data-flag="item.id"
          >
            <div>
              <router-link @click="changeSelectedParentHasNoSubmenu(item.id)" :to="item.to">
                <i :class="item.icon" />
                {{ item.label }}
              </router-link>
            </div>
          </li>
        </ul>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, watch, ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useGetters, useMutations, useActions } from '@/helper/vuex'

  const menuItems = ref([
    { 'id': 'home', 'label': 'Home', 'icon': 'fir-home', 'to': '/home' },
    { 'id': 'workspace', 'label': 'Workspace', 'icon': 'fir-apps', 'to': '/workspace' },
  ])
  const { getMenuType: menuType, getSelectedMenuHasSubItems: selectedMenuHasSubItems } = useGetters([
    'getMenuType',
    'getSelectedMenuHasSubItems',
  ])
  const { changeSelectedMenuHasSubItems, changeSideMenuStatus } = useMutations([
    'changeSelectedMenuHasSubItems',
    'changeSideMenuStatus',
  ])

  let viewingParentMenu = ref<string>('')

  function changeSelectedParentHasNoSubmenu(parentMenu: string) {
    viewingParentMenu.value = parentMenu
    changeSelectedMenuHasSubItems(false)
    changeSideMenuStatus({
      step: 0,
      classNames: menuType.value,
      selectedMenuHasSubItems: false,
    })
  }

  const route = useRoute()
  function selectMenu() {
    const currentParentUrl = route.path.split('/').filter((x) => x !== '')[0]
    if (currentParentUrl) {
      viewingParentMenu.value = currentParentUrl.toLowerCase()
    } else {
      viewingParentMenu.value = 'home'
    }
  }

  onMounted(() => {
    selectMenu()
  })

  watch(
    () => route.path,
    (to, from) => {
      if (to !== from) {
        const toParentUrl = to.split('/').filter((x) => x !== '')[0]
        if (toParentUrl) {
          viewingParentMenu.value = toParentUrl.toLowerCase()
        } else {
          viewingParentMenu.value = 'home'
        }
        selectMenu()
        changeSideMenuStatus({
          step: 0,
          classNames: menuType.value,
          selectedMenuHasSubItems: selectedMenuHasSubItems.value,
        })
      }
    },
  )
</script>

<template>
  <nav class="navbar fixed-top">
    <div class="d-flex align-items-center navbar-left">
      <a
        href="#"
        class="menu-button d-none d-md-block"
        @click.prevent.stop="
          changeSideMenuStatus({ step: menuClickCount + 1, classNames: menuType, selectedMenuHasSubItems })
        "
      >
        <MenuIcon />
      </a>
      <a
        href="#"
        class="menu-button-mobile d-xs-block d-sm-block d-md-none"
        @click.prevent.stop="changeSideMenuForMobile(menuType)"
      >
        <MobileMenuIcon />
      </a>

      <router-link class="navbar-logo" to="/home">
        <span class="logo d-none d-sm-block"></span>
        <span class="logo-mobile d-block d-sm-none"></span>
      </router-link>
    </div>

    <!--    <router-link class="navbar-logo" to="/home">-->
    <!--      <span class="logo d-none d-sm-block"></span>-->
    <!--      <span class="logo-mobile d-block d-sm-none"></span>-->
    <!--    </router-link>-->

    <div class="d-flex align-items-center justify-content-end me-3">
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="el-dropdown-link d-flex align-items-center">
          <el-avatar :size="32">{{ user_name_initial }}</el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu style="width: 150px">
            <el-dropdown-item command="profile">Profile</el-dropdown-item>
            <el-dropdown-item command="auth_token">Auth Token</el-dropdown-item>
            <el-dropdown-item divided command="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </nav>
</template>

<script lang="ts" setup>
  import MenuIcon from '@/components/svg/MenuIcon.vue'
  import MobileMenuIcon from '@/components/svg/MobileMenuIcon.vue'
  import api from '@/helper/api'
  import { useGetters, useMutations } from '@/helper/vuex'
  import { useRouter } from 'vue-router'
  import { computed } from 'vue'

  const { log_token, user_data } = useGetters(['log_token', 'user_data'])
  const user_name_initial = computed(() => {
    return user_data.value.display_name[0] ?? ''
  })

  function handleCommand(command: string) {
    switch (command) {
      case 'logout':
        return logoutUser()
      case 'auth_token':
        console.log(log_token.value)
        return
      default:
        console.log(command)
    }
  }

  const router = useRouter()
  const logoutUser = () => {
    api.logout().finally(() => {
      removeUser()
      api.logout()
      router.replace({ path: '/user/login' as string })
    })
  }

  /* Vuex */
  const {
    getMenuClickCount: menuClickCount,
    getSelectedMenuHasSubItems: selectedMenuHasSubItems,
    getMenuType: menuType,
  } = useGetters(['getMenuClickCount', 'getSelectedMenuHasSubItems', 'getMenuType'])
  const { changeSideMenuStatus, changeSideMenuForMobile, removeUser } = useMutations([
    'changeSideMenuStatus',
    'changeSideMenuForMobile',
    'removeUser',
  ])
</script>

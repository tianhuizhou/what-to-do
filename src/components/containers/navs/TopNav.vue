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
    </div>

    <router-link class="navbar-logo" to="/home">
      <span class="logo d-none d-sm-block"></span>
      <span class="logo-mobile d-block d-sm-none"></span>
    </router-link>

    <div class="d-flex align-items-center justify-content-end me-3">
      <!-- Help in development -->
      <!-- <button
        class="btn btn-secondary btn-sm btn-circle me-2 me-md-3"
        @click="refreshUserDetails()"
        title="Reload permissions"
      >
        <i class="fis-arrow-clockwise"></i>
      </button> -->

      <el-dropdown trigger="click" @command="handleCommand">
        <div class="el-dropdown-link d-flex align-items-center">
          <!-- :src="`https://ui-avatars.com/api/?name=${user_initials}&color=2c2c2c&background=f8f8f8&rounded=true`" -->
          <!--          <div class="user-avatar">-->
          <!--            <el-avatar v-if="!has_picture" :size="40">{{ user_initials }}</el-avatar>-->
          <!--            <el-avatar v-else fit="cover" :size="40" :src="`data:${type_picture};base64,${user_picture_b64}`" />-->
          <!--          </div>-->
          <!--          <div class="text-truncate d-none d-sm-block ms-1" style="width: 100px">-->
          <!--            <span>@{{ logged_user.username }}</span>-->
          <!--            <br /><small class="text-muted">{{ logged_user.group_access_name }}</small>-->
          <!--          </div>-->
          <el-avatar :size="32">TZ</el-avatar>
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

  const { log_token } = useGetters(['log_token'])
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

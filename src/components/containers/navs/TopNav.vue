<template>
  <nav class="row fixed-top align-items-center px-3">
    <div class="col-auto d-flex align-items-center menu-logo">
      <button class="btn btn-outline-secondary btn-circle border-0 opacity-50" @click="changeSideMenuStatus()">
        <i class="fir-navigation fw-bold text-dark" />
      </button>
      <router-link class="navbar-logo" v-slot="{ navigate }" to="/">
        <span class="logo d-block" @click="navigate" />
        <span class="logo-mobile d-block d-sm-none" @click="navigate" />
      </router-link>
    </div>

    <div class="col d-flex">
      <el-input style="max-width: 568px">
        <template v-slot:prefix><i class="fir-search" /></template>
      </el-input>
    </div>

    <div class="col-auto">
      <div class="d-flex align-items-center justify-content-end">
        <el-dropdown trigger="click" @command="menuClicked">
          <div class="el-dropdown-link d-flex align-items-center">
            <!-- :src="`https://ui-avatars.com/api/?name=${user_initials}&color=2c2c2c&background=f8f8f8&rounded=true`" -->
            <div class="d-flex flex-column justify-content-center user-avatar">
              <el-avatar :size="32">TZ</el-avatar>
              <!--            <el-avatar v-if="!has_picture" :size="40">{{ user_initials }}</el-avatar>-->
              <!--            <el-avatar v-else fit="cover" :size="40" :src="`data:${type_picture};base64,${user_picture_b64}`" />-->
            </div>
            <!--          <div class="text-truncate d-none d-sm-block ms-1" style="width: 100px"></div>-->
          </div>
          <template #dropdown>
            <el-dropdown-menu style="width: 150px">
              <el-dropdown-item command="profile">Profile</el-dropdown-item>
              <el-dropdown-item divided command="logout">Logout</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useMutations } from '@/helper/vuex'

  export default defineComponent({
    setup() {
      // Menu
      const menuClicked = (command: string) => {
        console.log(command)
      }
      /* Vuex */
      //vuex mutations
      const { changeSideMenuStatus } = useMutations(['changeSideMenuStatus'])

      return {
        // function
        menuClicked,
        // vuex
        changeSideMenuStatus,
      }
    },
  })
</script>

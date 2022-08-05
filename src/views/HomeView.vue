<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    {{ user.name }}
    <el-tag @click="user.name = 'bobbbbb'">asd</el-tag>
    <div class="card bg-primary">asdfasdfadsfasdf</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

  interface User {
    id: number
    name: string
    settings: (string | number)[]
  }

  export default defineComponent({
    name: 'HomeView',
    components: {
      HelloWorld,
    },
    setup() {
      const user = reactive<User>({
        id: 1,
        name: 'Bob',
        settings: [12, 'asd'],
      })

      return {
        // Reactive data
        user,
        // Computed variable
      }
    },
  })
</script>

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    {{ user.name }}
    <el-tag>asd</el-tag>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

  export default defineComponent({
    name: 'HomeView',
    components: {
      HelloWorld,
    },
    setup() {
      interface User {
        id: number
        name: string
        settings: (string | number)[]
      }

      const user: User = reactive({
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

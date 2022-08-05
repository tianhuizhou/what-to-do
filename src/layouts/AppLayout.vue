<template>
  <TopNav />
  <div class="app-container">
    <SideBar />
    <main class="card">
      <slot> </slot>
    </main>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'
  import TopNav from '@/components/containers/navs/TopNav.vue'
  import SideBar from '@/components/containers/navs/SideBar.vue'
  import Footer from '@/components/containers/navs/Footer.vue'

  onMounted(() => {
    setTimeout(() => {
      document.body.classList.add('default-transition')
    }, 100)
  })
</script>

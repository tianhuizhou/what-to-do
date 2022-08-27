<template>
  <div id="app-container" :class="getMenuType">
    <TopNav />
    <SideBar />
    <main>
      <div class="container-fluid" style="max-width: 1920px">
        <slot></slot>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'
  import TopNav from '@/components/containers/navs/TopNav.vue'
  import SideBar from '@/components/containers/navs/SideBar.vue'
  import Footer from '@/components/containers/navs/Footer.vue'
  import { useGetters } from '@/helper/vuex'

  const { getMenuType } = useGetters(['getMenuType'])

  onMounted(() => {
    setTimeout(() => {
      document.body.classList.add('default-transition')
    }, 100)
  })
</script>

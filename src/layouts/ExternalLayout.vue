<template>
  <div id="root" class="menu-hidden">
    <TopNavExternal />
    <main class="app-container d-flex justify-content-center">
      <slot> </slot>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
  import TopNavExternal from '@/components/containers/navs/TopNavExternal.vue'
  import Footer from '@/components/containers/navs/Footer.vue'
</script>

<style scoped></style>

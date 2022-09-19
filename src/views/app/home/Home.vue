<template>
  <h2>Home page</h2>
  <button class="btn btn-primary" @click="showLogToken">Log token</button>
</template>

<script setup lang="ts">
  import { useGetters } from '@/helper/vuex'
  import api from '@/helper/api'
  const { log_token } = useGetters(['log_token'])
  function showLogToken() {
    console.log(log_token.value)
  }
</script>

<style scoped></style>

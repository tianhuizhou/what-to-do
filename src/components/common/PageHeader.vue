<template>
  <div class="row m-0 align-items-center page-header" :style="`height: ${height}px`">
    <div class="col-12 col-md d-flex align-items-center">
      <h2 v-if="title" class="mb-0">{{ title }}</h2>
    </div>

    <div class="col-12 col-md-auto d-flex justify-content-end align-items-center gap-1">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { ref } from 'vue'

  export default {
    props: {
      title: String,
      height: { type: Number, default: 45 },
    },
  }
</script>
<style scoped></style>

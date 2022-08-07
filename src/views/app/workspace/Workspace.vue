<template>
  Workspace
  <div class="card-header">
    <el-popover placement="right" :width="400" trigger="click">
      <template #reference> Workspace </template>
    </el-popover>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Workspace',
    setup() {
      return {}
    },
  })
</script>

<style scoped></style>

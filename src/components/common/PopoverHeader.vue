<template>
  <div class="row m-0 align-items-center">
    <div class="col-2 p-0">
      <el-button v-show="show_back" size="mini" link class="float-start p-0" @click="emit('back')">
        <i class="fis-chevron-left m-0" />
      </el-button>
    </div>

    <div class="col-8 text-center">
      <h4 class="mb-0"><i class="fir-tag" />{{ props.title }}</h4>
    </div>

    <div class="col-2 p-0">
      <el-button size="mini" link class="float-end p-0" @click="emit('close')">
        <i class="fir-dismiss m-0" />
      </el-button>
    </div>
  </div>

  <hr class="text-gray-300" />
</template>

<script lang="ts" setup>
  import { defineEmits, defineProps, withDefaults } from 'vue'

  const props = withDefaults(
    defineProps<{
      title: string
      show_back: boolean
    }>(),
    {
      title: '',
      show_back: false,
    },
  )
  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'back'): void
  }>()
</script>

<style scoped></style>

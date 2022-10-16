<template>
  <el-popover placement="bottom-start" :width="250" trigger="click" v-model:visible="is_popover">
    <template #reference>
      <el-button circle class="border-0 p-1"><i class="fir-calendar-clock fs-2" /></el-button>
    </template>

    <div class="mb-2">
      <h4 class="text-center border-bottom-1"><i class="fir-calendar" />{{ props.title }}</h4>

      <hr class="text-secondary" />
      <el-date-picker
        v-model="date_value"
        @change="changeParent"
        size="small"
        value-format="YYYY-MM-DDTHH:mm:ss.sssZ"
        :clearable="false"
      />
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
  import { defineEmits, defineProps, onMounted, ref, watch, withDefaults } from 'vue'
  const props = withDefaults(
    defineProps<{
      value: string | null
      title: string
    }>(),
    {
      value: null,
      title: '',
    },
  )
  const emit = defineEmits<{
    (e: 'input', value: string): void
  }>()

  let is_popover = ref<boolean>(false)
  let date_value = ref<string | null>('')
  function changeParent(value: string) {
    emit('input', value)
  }

  onMounted(() => {
    date_value.value = props.value
  })

  watch(
    () => props.value,
    (to, from) => {
      if (to !== from) date_value.value = props.value
    },
  )
</script>

<style scoped></style>

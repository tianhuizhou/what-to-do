<template>
  <el-autocomplete
    @focus="statusManagement('focus')"
    @blur="statusManagement('blur')"
    @select="statusManagement('select', $event)"
    v-model="input_content"
    :fetch-suggestions="querySearch"
    :trigger-on-focus="false"
    clearable
    value-key="label"
    class="inline-input w-100"
    placeholder="Enter time e.g. 1 hour"
    :size="size"
    :disabled="disabled"
    highlight-first-item
    select-when-unmatched
  />
</template>

<script lang="ts" setup>
  import { defineEmits, defineProps, reactive, ref, watch, withDefaults } from 'vue'

  interface TimeInputItem {
    value: number
    label: string
  }
  const props = withDefaults(
    defineProps<{
      value: number
      size: string
      disabled: boolean
    }>(),
    {
      value: 0,
      size: '',
      disabled: false,
    },
  )
  const emit = defineEmits<{
    (e: 'input', value: number | null): void
  }>()

  const HOUR = 60
  const DAY = HOUR * 24
  const WEEK = DAY * 7

  const input_content = ref('')
  const input_status = reactive({
    'focus': false,
    'selected': false,
  })
  const input_suggestions = ref<TimeInputItem[]>([])
  const querySearch = (query_string: string, cb: any) => {
    const extract_input = extractInputContent(query_string.toLowerCase())

    if (!extract_input.length) {
      input_suggestions.value = []
      cb([])
    } else {
      let result = [generateSuggestion(extract_input)]
      input_suggestions.value = result
      cb(result)
    }
  }
  const extractInputContent = (input: string) => {
    /* To extract all the valid patterns in the input (Support multiple patterns)
     * Valid pattern: 1d; Number + Char(valid unit)
     * */
    let res = []
    const regexp = /(\d+)\s*([wdhm])/g
    const input_arr = [...input.trim().matchAll(regexp)]
    for (const pattern of input_arr) {
      res.push({ 'number': parseInt(pattern[1]), 'unit': pattern[2] })
    }
    return res as { unit: 'w' | 'd' | 'h' | 'm'; number: number }[]
  }
  const generateSuggestion = (input_list = [] as { unit: 'w' | 'd' | 'h' | 'm'; number: number }[]) => {
    let res = { 'value': 0, 'label': '' }
    let unit_map = {
      'w': 0,
      'd': 0,
      'h': 0,
      'm': 0,
    }
    // time calculation for input_list
    for (const pattern of input_list) {
      // each pattern is string: number+unit, e.g 12d
      const unit = pattern.unit // the last char means unit
      const number = pattern.number
      unit_map[unit] += number
    }

    if (unit_map.w) res.value += unit_map.w * WEEK
    if (unit_map.d) res.value += unit_map.d * DAY
    if (unit_map.h) res.value += unit_map.h * HOUR
    if (unit_map.m) res.value += unit_map.m
    res.label = minutesToTimeUnit(res.value)

    return res
  }
  const minutesToTimeUnit = (minutes: number) => {
    let res = ''
    let cur = minutes
    if (cur / WEEK >= 1) {
      const cur_week = Math.floor(cur / WEEK)
      res += cur_week + (cur_week > 1 ? ' weeks' : ' week') + ' '
      cur = cur % WEEK
    }

    if (cur / DAY >= 1) {
      const cur_day = Math.floor(cur / DAY)
      res += cur_day + (cur_day > 1 ? ' days' : ' day') + ' '
      cur = cur % DAY
    }
    if (cur / HOUR >= 1) {
      const cur_hour = Math.floor(cur / HOUR)
      res += cur_hour + (cur_hour > 1 ? ' hours' : ' hour') + ' '
      cur = cur % HOUR
    }
    if (cur) {
      res += cur + cur > 1 ? ' minutes' : ' minute'
    }
    return res
  }

  const statusManagement = (event: string, input?: TimeInputItem) => {
    /* event order: focus, change, blur, select
     * The event logic control can force the input always from selection
     */
    if (event === 'select') {
      input_status.selected = true
      const value = getInputValue(input)
      if (!value) input_content.value = ''
      changeParent(value)
    }
    if (event === 'blur') {
      input_status.focus = false
      if (input_content.value) input_content.value = props.value ? minutesToTimeUnit(props.value) : ''
      else changeParent()
    }
    if (event === 'focus') {
      input_status.selected = false
      input_status.focus = true
    }
  }
  const getInputValue = (dto) => {
    console.log(dto)
    if (!dto.label) {
      return input_suggestions.value.find((item) => item.label === dto.value)?.value || null
    } else return dto.value
  }
  const changeParent = (value = null) => {
    /* value: Int; in minutes */
    emit('input', value)
  }

  watch(
    () => props.value,
    (new_time) => {
      if (new_time !== input_suggestions.value[0]?.value) input_content.value = minutesToTimeUnit(new_time)
    },
  )
</script>

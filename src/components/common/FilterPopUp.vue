<template>
  <div class="d-inline">
    <el-popover
      :value="filters_popup"
      trigger="click"
      placement="bottom"
      width="320"
      @show="togglePopup(true)"
      @hide="togglePopup(false)"
    >
      <div>
        <div class="row align-items-center mb-2">
          <h3 class="col mb-0">Filters</h3>

          <div class="col-auto">
            <el-tooltip content="Restore filters" placement="top" :open-delay="200">
              <button class="btn btn-circle btn-sm ms-1" @click="restoreFilters()">
                <i class="fir-backspace text-secondary fs-2" />
              </button>
            </el-tooltip>
          </div>
        </div>

        <!-- Filters body   -->
        <div v-for="(item, key) in props.filter_props" :key="key">
          <!--  Type of Select  -->
          <el-select
            v-if="item.type === 'select'"
            v-model="filter[key]"
            size="small"
            class="mb-4"
            clearable
            filterable
            :placeholder="item.placeholder"
            :multiple="item.multiple"
            :disabled="item.disabled"
            collapse-tags
          >
            <el-option
              v-for="(option, op_idx) in item.options"
              :key="op_idx"
              :value="option.value"
              :label="`${item.label} - ${option.label}`"
            >
              {{ option.label }}
            </el-option>
          </el-select>

          <!--  Type of Cascader    -->
          <el-cascader
            v-else-if="item.type === 'cascader'"
            v-model="filter[key]"
            class="mb-4 p-0"
            type="text"
            size="small"
            :options="item.options"
            :props="item.props"
            filterable
            :placeholder="' ' + item.placeholder"
            collapse-tags
          />

          <!--  Type of Datepicker  -->
          <el-date-picker
            v-else-if="item.type === 'date_picker'"
            v-model="filter[key]"
            type="daterange"
            unlink-panels
            align="right"
            size="small"
            class="mb-4"
            :picker-options="{
              shortcuts: item.shortcuts || shortcuts,
              disabledDate: (date) =>
                item.full_date_range
                  ? null
                  : date < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            }"
            :clearable="item.clearable"
            :start-placeholder="item.placeholder[0]"
            :end-placeholder="item.placeholder[1]"
            value-format="yyyy-MM-dd"
          />
        </div>

        <!-- Footer buttons -->
        <div class="text-end mt-2">
          <button class="btn btn-sm btn-outline-secondary ms-2 px-4" @click="togglePopup()">Close</button>
          <button class="btn btn-sm btn-primary ms-2 px-4" @click="applyFilters()">Apply</button>
        </div>
      </div>

      <!-- Button to toggle the filters popup -->
      <template #reference>
        <button class="btn btn-input-like btn-primary pe-2" :class="filters_popup ? 'btn-input-active' : ''">
          Filters
          <span
            v-if="applied_filters_count > 0"
            class="badge rounded-pill fs-6"
            :class="filters_popup ? 'bg-light text-primary' : 'bg-secondary'"
          >
            {{ applied_filters_count }}
          </span>
          <i class="fis-caret-down fs-4 ms-3" />
        </button>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts">
  import { computed, defineEmits, onMounted, reactive, ref, watch } from 'vue'
  import { cloneDeep } from 'lodash'
  import { FilterProps, Filter } from '@/helper/types'

  export default {
    props: {
      'value': { type: Boolean, default: false },
      'filter_props': { type: Object, required: true },
    },
    setup(props: { value: boolean; filter_props: FilterProps }) {
      /* Constant and Emit event*/
      const shortcuts = [
        {
          text: 'Next week',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          },
        },
        {
          text: 'Next month',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          },
        },
      ]
      const emit = defineEmits(['change', 'input'])

      /* Variable */
      let filters_popup = ref<boolean>(props.value)
      let filter = reactive<Filter>({})
      let applied_filter = reactive<Filter>({})
      const applied_filters_count = computed(() => {
        let count = 0
        for (const key in props.filter_props) {
          if (applied_filter[key]) {
            if (props.filter_props[key].multiple) {
              if (applied_filter[key].length > 0) count++
            } else count++
          }
        }

        return count
      })

      /* Method */
      const applyFilters = () => {
        applied_filter = cloneDeep(filter)

        emitFilters()
        togglePopup(false)
      }
      const emitFilters = () => {
        // generate out_obj based on filters_prop
        let out_obj: Filter = {}
        for (const key in props.filter_props) {
          out_obj[key] = filter[key]
        }
        emit('change', out_obj)
      }
      const togglePopup = (state = !filters_popup.value) => {
        filters_popup.value = state
        emit('input', filters_popup.value)

        // On open popup, save the current state
        if (filters_popup.value) applied_filter = cloneDeep(filter)
        // On close popup, restore the previous state
        else filter = cloneDeep(applied_filter)
      }
      const restoreFilters = () => {
        // reassign filter
        initFilters(true)
      }
      const initFilters = (reset = false) => {
        for (const key in props.filter_props) {
          if (reset || filter[key] === undefined) {
            filter[key] = props.filter_props[key].default
          }
        }
        if (!reset) applyFilters()
      }

      /* Life cycle hooks */
      onMounted(() => {
        initFilters()
      })

      watch(
        () => props.value,
        (to) => {
          filters_popup.value = to
        },
      )
      return {
        filters_popup,
        shortcuts,
        filter,
        applied_filter,
        restoreFilters,
        togglePopup,
        applyFilters,
        applied_filters_count,
        props,
      }
    },
  }
</script>

<style scoped></style>

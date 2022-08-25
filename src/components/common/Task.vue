<template>
  <div class="app-task card card-border">
    <div class="fs-6 fw-bolder text-muted mb-2">Workspace > Project12</div>

    <div class="row align-items-center">
      <div class="col col-9 text-break">
        {{ data.name }}
        <el-popover
          :width="300"
          :show-after="200"
          popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
        >
          <template #reference>
            <button class="btn btn-circle btn-sm btn-outline-secondary border-0 opacity-50">
              <i class="fir-list" />
            </button>
          </template>
          <template #default>
            <div class="demo-rich-conent" style="display: flex; gap: 16px; flex-direction: column">
              <div>
                <p class="demo-rich-content__name" style="margin: 0; font-weight: 500">Element Plus</p>
                <p class="demo-rich-content__mention" style="margin: 0; font-size: 14px; color: var(--el-color-info)">
                  @element-plus
                </p>
              </div>

              <p class="demo-rich-content__desc" style="margin: 0">
                Element Plus, a Vue 3 based component library for developers, designers and product managers
              </p>
            </div>
          </template>
        </el-popover>
      </div>

      <div class="col-3 text-end">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" size="small" />
      </div>

      <div class="col-12 d-flex align-items-center my-2">
        <div class="text-muted fs-6"><i class="fir-timer" /> 1h30m</div>
      </div>

      <div class="col-12 d-flex align-items-center gap-1 my-2">
        <el-tag size="small">Tag 1</el-tag>
        <el-tag type="success" size="small">Tag 1</el-tag>
      </div>
    </div>

    <div class="row border-top border-1 mt-2 pt-2">
      <div class="col">
        <el-button size="small" circle class="border-0"><i class="fir-flag fs-3" /></el-button>
        <el-button size="small" circle class="border-0"><i class="fir-calendar-checkmark fs-3" /></el-button>
      </div>
      <div class="col text-end">
        <el-button size="small" circle class="border-0"><i class="fis-checkmark fs-2 fw-bold" /></el-button>
        <el-button size="small" circle class="border-0"><i class="fis-more fs-1" /></el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'
  const props = defineProps<{
    data: Task
  }>()
</script>

<style scoped></style>

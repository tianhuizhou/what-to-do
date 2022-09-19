<template>
  <div
    class="card project-card py-2 px-3 d-flex flex-column justify-content-between cursor-pointer"
    style="background-image: url(https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/purty_wood_dark.png)"
    @click="openProjectDetails(data.id)"
  >
    <div class="d-flex align-items-center justify-content-between">
      <h3 class="fw-bold text-light mb-0">{{ data.name }}</h3>

      <el-dropdown @command="accessProject($event)" trigger="click">
        <div class="el-dropdown-link" @click.stop><i class="fis-more mx-0 fs-1"></i></div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="edit" class="text-muted"> Edit </el-dropdown-item>
            <el-dropdown-item command="delete" class="text-danger"> Delete </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="text-end">
      <button class="btn btn-sm border-0 p-0 favorite-btn" @click.stop>
        <i :class="data.favorite ? 'fis-star text-favorite' : 'fir-star'" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { ElMessageBox } from 'element-plus'

  const props = defineProps<{
    data: Project
  }>()
  const emit = defineEmits<{
    (e: 'delete'): void
    (e: 'edit'): void
  }>()

  const router = useRouter()
  function openProjectDetails(project_id: string): void {
    router.push({ path: `/workspace/${project_id}` as string })
  }

  function accessProject(event: string) {
    if (event === 'edit') emit('edit')
    else if (event === 'delete') {
      ElMessageBox.confirm('It will permanently delete the project. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          emit('delete')
        })
        .catch(() => {})
    }
  }
</script>

<style scoped></style>

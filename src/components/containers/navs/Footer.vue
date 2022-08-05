<template>
  <footer class="page-footer py-2">
    <div class="footer-content h-100">
      <div class="container h-100 px-0" style="max-width: 1920px">
        <div class="d-flex align-items-center justify-content-between h-100">
          <!-- <div class="flex-grow-1"></div> -->
          <p class="mb-0 text-muted text-end">©{{ year }} - All rights reserved by Bob Dev</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
  const year = new Date().getFullYear()
</script>

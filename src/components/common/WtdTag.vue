<template>
  <div class="wtd-tag" :class="`${small ? 'small' : ''} ${color}`">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, withDefaults } from 'vue'

  const props = withDefaults(
    defineProps<{
      small?: boolean
      color: string
    }>(),
    {
      small: false,
      color: '',
    },
  )
</script>

<style lang="scss">
  .wtd-tag {
    background-color: rgba(#dfe0e6, 0.5);
    border-color: rgba(#dfe0e6, 1);
    color: darken(#dfe0e6, 55);
    height: 32px;
    padding: 0 9px;
    font-size: 12px;
    line-height: 30px;
    border-width: 2px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
    --el-icon-size: 14px;
    &.small {
      height: 24px;
      line-height: 24px;
      border: none;
      max-width: 100px;
    }
    &.success {
      background-color: rgba(#4bbf6b, 0.5);
      border-color: rgba(#4bbf6b, 1);
      color: darken(#4bbf6b, 55);
    }
    &.light-blue {
      background-color: rgba(#bdecf3, 0.5);
      border-color: rgba(#bdecf3, 1);
      color: darken(#bdecf3, 55);
    }
    &.yellow {
      background-color: rgba(#f5ea92, 0.5);
      border-color: rgba(#f5ea92, 1);
      color: darken(#f5ea92, 55);
    }
    &.purple {
      background-color: rgba(#a86cc1, 0.5);
      border-color: rgba(#a86cc1, 1);
      color: darken(#a86cc1, 55);
    }
    &.danger {
      background-color: rgba(#cf513d, 0.5);
      border-color: rgba(#cf513d, 1);
      color: darken(#cf513d, 55);
    }
    &.pink {
      background-color: rgba(#ff8ed4, 0.5);
      border-color: rgba(#ff8ed4, 1);
      color: darken(#ff8ed4, 55);
    }
    &.warning {
      background-color: rgba(#e79217, 0.5);
      border-color: rgba(#e79217, 1);
      color: darken(#e79217, 55);
    }
    &.navy {
      background-color: rgba(#026aa7, 0.5);
      border-color: rgba(#026aa7, 1);
      color: darken(#026aa7, 55);
    }
    &.dark {
      background-color: rgba(#505f79, 0.5);
      border-color: rgba(#505f79, 1);
      color: darken(#505f79, 55);
    }
  }
</style>

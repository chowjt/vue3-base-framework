<template>
  <div class="home-view">
    <h1>欢迎使用 Vue3 基础框架</h1>
    <p>技术栈：Vue 3 + Vite + Pinia + Vue Router + Axios + Sass</p>
    <div class="home-view__actions">
      <BaseButton type="primary">主要按钮</BaseButton>
      <BaseButton type="success">成功按钮</BaseButton>
      <BaseButton type="warning">警告按钮</BaseButton>
      <BaseButton type="danger">危险按钮</BaseButton>
      <BaseButton type="info">信息按钮</BaseButton>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
</script>

<style scoped lang="scss">
.home-view {
  text-align: center;
  padding: $spacing-xl;

  h1 {
    font-size: 28px;
    color: $text-color-primary;
    margin-bottom: $spacing-md;
  }

  p {
    font-size: 16px;
    color: $text-color-secondary;
    margin-bottom: $spacing-lg;
  }

  &__actions {
    display: flex;
    justify-content: center;
    gap: $spacing-sm;
    flex-wrap: wrap;
  }
}
</style>

<template>
  <div class="default-layout">
    <header class="default-layout__header">
      <div class="default-layout__logo">Vue3 基础框架</div>
      <nav class="default-layout__nav">
        <router-link to="/" class="default-layout__nav-link">首页</router-link>
      </nav>
      <div class="default-layout__user">
        <span v-if="userStore.isLoggedIn">{{ userStore.userInfo.username || '用户' }}</span>
        <BaseButton type="danger" @click="handleLogout" v-if="userStore.isLoggedIn">退出</BaseButton>
      </div>
    </header>
    <main class="default-layout__main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/modules/user'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'

const userStore = useUserStore()
const router = useRouter()

function handleLogout() {
  userStore.logout()
  router.push({ name: 'Login' })
}
</script>

<style scoped lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 $spacing-md;
    height: 56px;
    background-color: $bg-color;
    border-bottom: 1px solid $border-color-light;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  }

  &__logo {
    font-size: 18px;
    font-weight: 600;
    color: $text-color-primary;
  }

  &__nav {
    display: flex;
    gap: $spacing-md;
  }

  &__nav-link {
    color: $text-color-regular;
    font-size: 14px;
    transition: color 0.3s;

    &:hover,
    &.router-link-active {
      color: $primary-color;
    }
  }

  &__user {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    font-size: 14px;
    color: $text-color-regular;
  }

  &__main {
    flex: 1;
    padding: $spacing-md;
  }
}
</style>

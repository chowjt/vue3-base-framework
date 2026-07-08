<template>
  <div class="login-view">
    <div class="login-view__card">
      <h2 class="login-view__title">登录</h2>
      <form class="login-view__form" @submit.prevent="handleLogin">
        <div class="login-view__field">
          <label for="username">用户名</label>
          <input v-model="form.username" type="text" placeholder="请输入用户名" required />
        </div>
        <div class="login-view__field">
          <label for="password">密码</label>
          <input v-model="form.password" type="password" placeholder="请输入密码" required />
        </div>
        <p v-if="errorMsg" class="login-view__error">{{ errorMsg }}</p>
        <BaseButton type="primary" :disabled="loading" class="login-view__submit">
          {{ loading ? '登录中...' : '登录' }}
        </BaseButton>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { login } from '@/api'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const form = reactive({
  username: '',
  password: ''
})

const loading = ref(false)
const errorMsg = ref('')

async function handleLogin() {
  errorMsg.value = ''
  loading.value = true

  try {
    // Mock 登录：开发阶段无需后端，用户名 admin / 密码 123456
    const MOCK_USER = { username: 'admin', password: '123456' }
    if (form.username === MOCK_USER.username && form.password === MOCK_USER.password) {
      const mockToken = 'mock-token-' + Date.now()
      const mockUserInfo = { username: 'admin', permissions: ['dashboard', 'user', 'role'] }
      userStore.setTokenAction(mockToken)
      userStore.setUserInfo(mockUserInfo)
      const redirect = route.query.redirect || '/'
      router.push(redirect)
    } else {
      // 尝试调用真实后端 API
      const res = await login(form)
      userStore.setTokenAction(res.token)
      userStore.setUserInfo(res.userInfo || {})
      const redirect = route.query.redirect || '/'
      router.push(redirect)
    }
  } catch (error) {
    errorMsg.value = error.message || '登录失败，请重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: $bg-color-page;

  &__card {
    width: 400px;
    padding: $spacing-lg;
    background-color: $bg-color;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }

  &__title {
    text-align: center;
    font-size: 24px;
    color: $text-color-primary;
    margin-bottom: $spacing-lg;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;

    label {
      font-size: 14px;
      color: $text-color-regular;
    }

    input {
      padding: 8px 12px;
      border: 1px solid $border-color-base;
      border-radius: 4px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.3s;

      &:focus {
        border-color: $primary-color;
      }
    }
  }

  &__error {
    color: $danger-color;
    font-size: 13px;
    text-align: center;
  }

  &__submit {
    width: 100%;
    padding: 10px;
    font-size: 16px;
  }
}
</style>

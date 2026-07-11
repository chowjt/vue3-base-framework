<template>
  <div class="login-view">
    <div class="login-view__card">
      <button
        class="login-view__close"
        type="button"
        @click="goHome"
      >
        ×
      </button>
      <h2 class="login-view__title">
        登录
      </h2>

      <form
        class="login-view__form"
        @submit.prevent="handleLogin"
      >
        <BaseInput
          v-model="form.username"
          label="用户名"
          placeholder="请输入用户名"
          :error="errors.username"
          @blur="validateField('username')"
        />

        <BaseInput
          v-model="form.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :error="errors.password"
          @blur="validateField('password')"
        />

        <p
          v-if="errorMsg"
          class="login-view__error"
        >
          {{ errorMsg }}
        </p>

        <BaseButton
          type="primary"
          class="login-view__submit"
          :disabled="!isFormValid || loading"
          native-type="submit"
        >
          {{ loading ? '登录中...' : '登录' }}
        </BaseButton>
      </form>

      <div class="login-view__footer">
        <router-link :to="{ name: 'Register' }">
          还没有账号？去注册
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { login } from '@/api'
import { sanitizeRedirect } from '@/utils/security'
import { encryptWithPublicKey } from '@/utils/crypto'
import { validateUsername, validatePassword } from '@/utils/validators'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const form = reactive({
  username: '',
  password: ''
})
const errors = reactive({
  username: '',
  password: ''
})

const loading = ref(false)
const errorMsg = ref('')

const validators = {
  username: validateUsername,
  password: validatePassword
}

function validateField(field) {
  errors[field] = validators[field](form[field])
  return !errors[field]
}

function validateAll() {
  let valid = true
  valid = validateField('username') && valid
  valid = validateField('password') && valid
  return valid
}

const isFormValid = computed(() => {
  return (
    form.username &&
    form.password &&
    Object.values(errors).every((msg) => !msg)
  )
})

function goHome() {
  router.push({ name: 'Home' })
}

async function handleLogin() {
  errorMsg.value = ''
  if (!validateAll()) return

  loading.value = true
  try {
    const res = await login({
      username: form.username,
      password: await encryptWithPublicKey(form.password)
    })

    userStore.setUserInfo(res.userInfo || {})

    const redirect = sanitizeRedirect(route.query.redirect, '/home')
    router.push(redirect)
  } catch (error) {
    errorMsg.value = error?.message || '登录失败，请检查登录信息'
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
  background: url('/images/login-bg.jpg') no-repeat center center fixed;
  background-size: cover;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.35);
  }

  &__card {
    position: relative;
    z-index: 1;
    width: 420px;
    padding: $spacing-lg;
    background-color: $bg-color;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }

  &__close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    color: $text-color-secondary;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
      color: $text-color-primary;
    }
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

  &__footer {
    margin-top: $spacing-md;
    text-align: center;
    font-size: 13px;
  }
}
</style>

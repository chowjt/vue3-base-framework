import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import request from '@/utils/request'

const REMEMBER_ME_KEY = 'remember_me'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const initialized = ref(false)
  const rememberMe = ref(localStorage.getItem(REMEMBER_ME_KEY) === 'true')

  const isLoggedIn = computed(() => !!userInfo.value?.id)

  function setUserInfo(info) {
    userInfo.value = info || {}
  }

  function setRememberMe(value) {
    rememberMe.value = !!value
    if (value) {
      localStorage.setItem(REMEMBER_ME_KEY, 'true')
    } else {
      localStorage.removeItem(REMEMBER_ME_KEY)
    }
  }

  async function initUserInfo() {
    if (initialized.value) return
    try {
      const data = await request.get('/auth/userinfo')
      userInfo.value = data || {}
    } catch {
      userInfo.value = {}
    } finally {
      initialized.value = true
    }
  }

  function logout() {
    userInfo.value = {}
    initialized.value = false
    rememberMe.value = false
    localStorage.removeItem(REMEMBER_ME_KEY)
  }

  return {
    userInfo,
    isLoggedIn,
    initialized,
    rememberMe,
    setUserInfo,
    setRememberMe,
    initUserInfo,
    logout
  }
})

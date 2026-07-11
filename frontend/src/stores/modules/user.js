import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import request from '@/utils/request'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const initialized = ref(false)

  const isLoggedIn = computed(() => !!userInfo.value?.id)

  function setUserInfo(info) {
    userInfo.value = info || {}
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
  }

  return {
    userInfo,
    isLoggedIn,
    initialized,
    setUserInfo,
    initUserInfo,
    logout
  }
})

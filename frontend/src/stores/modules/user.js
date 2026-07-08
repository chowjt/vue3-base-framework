import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getToken, setToken, removeToken } from '@/utils/storage'

export const useUserStore = defineStore('user', () => {
  const token = ref(getToken() || '')
  const userInfo = ref({})

  const isLoggedIn = computed(() => !!token.value)

  function setTokenAction(newToken) {
    token.value = newToken
    setToken(newToken)
  }

  function setUserInfo(info) {
    userInfo.value = info
  }

  function logout() {
    token.value = ''
    userInfo.value = {}
    removeToken()
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    setTokenAction,
    setUserInfo,
    logout
  }
})

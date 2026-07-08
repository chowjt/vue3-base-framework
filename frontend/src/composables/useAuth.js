import { ref } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { login, getUserInfo } from '@/api'
import { useRouter } from 'vue-router'

export function useAuth() {
  const loading = ref(false)
  const error = ref('')
  const userStore = useUserStore()
  const router = useRouter()

  async function loginAction(credentials) {
    loading.value = true
    error.value = ''

    try {
      const res = await login(credentials)
      userStore.setTokenAction(res.token)
      const userInfo = await getUserInfo()
      userStore.setUserInfo(userInfo)
      router.push('/')
    } catch (err) {
      error.value = err.message || '登录失败'
    } finally {
      loading.value = false
    }
  }

  function logoutAction() {
    userStore.logout()
    router.push({ name: 'Login' })
  }

  return {
    loading,
    error,
    loginAction,
    logoutAction
  }
}

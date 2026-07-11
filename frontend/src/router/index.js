import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useUserStore } from '@/stores/modules/user'
import { sanitizeRedirect } from '@/utils/security'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  if (!userStore.initialized) {
    await userStore.initUserInfo()
  }

  const isLoggedIn = userStore.isLoggedIn

  if (to.meta.guest && isLoggedIn) {
    next({ name: 'UserHome' })
    return
  }

  if (to.meta.requiresAuth && !isLoggedIn) {
    const redirect = sanitizeRedirect(to.fullPath)
    next({ name: 'Login', query: { redirect } })
    return
  }

  next()
})

export default router

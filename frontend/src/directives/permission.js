import { useUserStore } from '@/stores/modules/user'

export default {
  mounted(el, binding) {
    const userStore = useUserStore()
    const requiredPermissions = binding.value

    if (Array.isArray(requiredPermissions)) {
      const hasPermission = requiredPermissions.some(
        (permission) => userStore.userInfo.permissions?.includes(permission)
      )
      if (!hasPermission) {
        el.parentNode?.removeChild(el)
      }
    } else if (typeof requiredPermissions === 'string') {
      if (!userStore.userInfo.permissions?.includes(requiredPermissions)) {
        el.parentNode?.removeChild(el)
      }
    }
  }
}

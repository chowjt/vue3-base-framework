import axios from 'axios'
import router from '@/router'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true
})

let isRefreshing = false
let waitingRequests = []

async function refreshToken() {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      waitingRequests.push({ resolve, reject })
    })
  }
  isRefreshing = true
  try {
    await axios.post('/auth/refresh', {}, {
      baseURL: import.meta.env.VITE_API_BASE_URL,
      withCredentials: true
    })
    waitingRequests.forEach((r) => r.resolve())
    waitingRequests = []
  } catch (err) {
    waitingRequests.forEach((r) => r.reject(err))
    waitingRequests = []
    throw err
  } finally {
    isRefreshing = false
  }
}

request.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res && res.code === 0) {
      return res.data
    }
    return Promise.reject(new Error(res?.message || '请求失败'))
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await refreshToken()
        return request(originalRequest)
      } catch {
        router.push({ name: 'Login' })
      }
    }

    let message = '网络异常，请稍后重试'
    if (error.response?.data?.message) {
      message = error.response.data.message
    }
    return Promise.reject(new Error(message))
  }
)

export default request

import request from '@/utils/request'

export function login(data) {
  return request.post('/auth/login', data)
}

export function register(data) {
  return request.post('/auth/register', data)
}

export function getUserInfo() {
  return request.get('/auth/userinfo')
}

export function logout() {
  return request.post('/auth/logout')
}

export function refreshToken() {
  return request.post('/auth/refresh')
}

export function sendSmsCode(data) {
  return request.post('/auth/sms/code', data)
}

export function sendEmailCode(data) {
  return request.post('/auth/email/code', data)
}

export function getPublicKey() {
  return request.get('/auth/public-key')
}

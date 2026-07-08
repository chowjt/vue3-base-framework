const TOKEN_KEY = 'access_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function getStorage(key) {
  const value = localStorage.getItem(key)
  if (value) {
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }
  return null
}

export function setStorage(key, value) {
  if (typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.setItem(key, value)
  }
}

export function removeStorage(key) {
  localStorage.removeItem(key)
}

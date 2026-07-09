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
    const sanitized = sanitizeObject(value)
    localStorage.setItem(key, JSON.stringify(sanitized))
  } else {
    localStorage.setItem(key, value)
  }
}

export function removeStorage(key) {
  localStorage.removeItem(key)
}

function sanitizeObject(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  const sanitized = Array.isArray(obj) ? [] : {}
  for (const [key, value] of Object.entries(obj)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue
    }
    sanitized[key] = typeof value === 'object' ? sanitizeObject(value) : value
  }
  return sanitized
}

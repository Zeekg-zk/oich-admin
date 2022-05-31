// 用户当前的权限
let currentAuth = ['admin']
let loginStatus = true

// 获取当前用户的权限
export function getCurrentAuth() {
  return currentAuth
}

/**
 * 检查当前用户权限
 * @param {Array} val 
 * @returns 
 */
export function checkAuth(val) {
  const curAuth = getCurrentAuth()
  return curAuth.some(item => val.includes(item))
}

/**
 * 
 * @returns 返回是否登录 true-已登录 false-未登录
 */
export function isLogin() {
  return loginStatus
}

/**
 * 改为登录状态
 */
export function logined(flag) {
  loginStatus = flag
}
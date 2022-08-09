import store from '@/store/index'
import { ElMessage } from 'element-plus'
import { getAuth } from 'firebase/auth'

export default (to: any, from: any, next: any) => {
  const is_logged = store.getters['is_logged']
  const meta = to.meta ? to.meta : { 'login': false }

  // If it's redirected from home don't show error, just go to login
  if (to.redirectedFrom === '/' && !is_logged) return next({ path: '/user/login' })

  // Login not required
  if (!meta.login) return next()

  // Route requires login and user is not logged
  if (meta.login && !is_logged) {
    ElMessage.error('Please login firstly')
    return next(`/user/login?redirect=${encodeURIComponent(to.path)}`)
  }

  return next()
}

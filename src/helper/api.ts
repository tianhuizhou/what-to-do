import axiosHelper from './axios_helper.js'
import store from '@/store'

function getHeaders(use_token = true) {
  const headers: Array<object> = []
  headers.push({ 'Content-Type': 'application/json' })

  const user = store.getters['user_data']
  if (user.token && use_token) headers.push({ 'x-access-token': user.token })

  return Object.assign({}, ...headers)
}

export default {}

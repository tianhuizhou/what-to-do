import { createStore } from 'vuex'

import menu from './app/menu'
import logged_user from '@/store/app/logged_user'
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    'menu': menu,
    'logged_user': logged_user,
  },
})

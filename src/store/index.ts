import { createStore } from 'vuex'

import menu from './app/menu'
import logged_user from '@/store/app/logged_user'
import vuex_modules from '@/store/custom/vuex_modules'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    'menu': menu,
    'logged_user': logged_user,
    'projects': vuex_modules.projects_module,
    'users': vuex_modules.users_module,
    'tags': vuex_modules.tags_module,
  },
})

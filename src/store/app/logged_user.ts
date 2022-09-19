interface User {
  user_id?: string
  email?: string
  display_name?: string
  photo_url?: string
  phone_number?: number
  expire_time?: number
  token?: string
}

interface UserState {
  token: string
  user: User
  expire_time: number
}

const userModule = {
  state: <UserState>{
    user: {},
    expire_time: 0,
    token: '',
  },

  getters: {
    is_logged: (state: UserState): boolean => {
      if (!state.user || !state.user) return false
      const now = new Date().getTime()
      return state.expire_time >= now
    },
    user_data: (state: UserState) => {
      return state.user
    },
    log_token: (state: UserState) => {
      return state.token
    },
  },

  mutations: {
    setUser(state: UserState, user_str: string): void {
      const original_user_data = JSON.parse(user_str)
      localStorage.setItem('WhatToDoUser', user_str)
      state.user = {
        user_id: original_user_data.uid,
        email: original_user_data.email,
        display_name: original_user_data.providerData[0]?.displayName,
        photo_url: original_user_data.providerData[0]?.photoURL,
        phone_number: original_user_data.providerData[0]?.phoneNumber,
      }
      state.expire_time = original_user_data.stsTokenManager.expirationTime || new Date().getTime() + 60 * 1000
      state.token = original_user_data.stsTokenManager.accessToken
    },
    removeUser(state: UserState): void {
      localStorage.removeItem('WhatToDoUser')
      state.user = {}
      state.expire_time = 0
      state.token = ''
    },
  },
  actions: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    load_user({ commit }): void {
      const user_str = localStorage.getItem('WhatToDoUser')
      if (user_str) commit('setUser', user_str)
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    logout_user({ commit }): void {
      commit('removeUser')
    },
  },
}

export default userModule

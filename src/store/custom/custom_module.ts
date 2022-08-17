import common from '@/helper/common'
import { Module } from 'vuex'

interface ModuleState {
  map: { [key: string | number]: any }
  timestamp: null | Date
  promise: null | Promise<any>
  loaded: boolean
  loading: boolean
}

class CustomModule implements Module<any, any> {
  namespaced: boolean
  state: any
  getters: any
  mutations: any
  actions: any
  constructor(
    endpoint: () => Promise<any>,
    args = {
      mutations: {},
      state: {},
      getters: {},
      actions: {},
    },
    timeout = 120,
  ) {
    this.namespaced = true
    this.state = this.getDefaultState(args.state)
    this.getters = this.getDefaultVuexGetters(args.getters)
    this.mutations = this.getDefaultVuexMutations(args.mutations)
    this.actions = this.getDefaultVuexActions(args.actions, endpoint, timeout)
  }

  /* Default method */
  getDefaultState(state: { [key: string]: any }) {
    return {
      map: {},
      timestamp: null,
      promise: null,
      loaded: false,
      loading: false,
      ...state,
    }
  }

  getDefaultVuexGetters(getters: { [key: string]: any }) {
    return {
      list: (state: ModuleState) => {
        return Object.values(state.map)
      },
      by_id: (state: ModuleState) => (id: number | string) => {
        return state.map[id]
      },
      name_by_id: (state: ModuleState) => (id: number | string) => {
        const item = state.map[id]
        if (!item) return ''
        return item.title || item.name
      },
      filter_options: (state: ModuleState, getters: { [key: string]: any }) => {
        const res = []
        for (const key in state.map) {
          res.push({ 'value': state.map[key].id, 'label': getters.name_by_id(key) })
        }
        return res
      },
      is_loaded: (state: ModuleState) => state.loaded,
      is_loading: (state: ModuleState) => state.loading,
      error_msg: (state: ModuleState) => {
        if (!state.promise) return ''
        state.promise.catch((err) => {
          return err.details ? err.details : err.error
        })
      },
      ...getters,
    }
  }

  getDefaultVuexMutations(mutations: { [key: string]: any }) {
    return {
      loaded(state: ModuleState, response: object) {
        /* Be aware of the response that should be JSON format with only one key/property
         *  If not, please pass custom function to override it */
        state.map = {}
        for (const item of Object.values(response)) state.map[item.id] = item
      },
      upsert(state: ModuleState, item: { 'id': string | number }) {
        state.map[item.id] = item
      },
      delete(state: ModuleState, item: { 'id': string | number }) {
        delete state.map[item.id]
      },
      invalidate(state: ModuleState) {
        state.timestamp = null
      },
      ...mutations,
    }
  }

  getDefaultVuexActions(actions: object, endpoint: () => Promise<any>, timeout: number) {
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      load({ commit, state }) {
        const is_expired = !state.timestamp || common.isDateExpired(state.timestamp, timeout)
        if (!is_expired && state.promise) return state.promise

        state.promise = endpoint()
        state.timestamp = new Date()
        state.loading = true

        state.promise
          .then(
            (resp: object | null) => commit('loaded', resp),
            (err: object | null) => console.error(err),
          )
          .finally(() => {
            state.loaded = true
            state.loading = false
          })

        return state.promise
      },
      ...actions,
    }
  }
}

export default CustomModule

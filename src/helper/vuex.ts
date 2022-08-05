import { computed } from 'vue'
import { mapGetters, mapState, mapMutations, mapActions, useStore, createNamespacedHelpers } from 'vuex'
import { Computed, Mapper } from 'vuex/types/helpers'

const useMapper = (mapper: string[], mapFn: Mapper<Computed>, isFn = false) => {
  const store = useStore()
  const storeStateFns = mapFn(mapper)
  const storeState: any = {}
  Object.keys(storeStateFns).forEach((keyFn) => {
    const fn = storeStateFns[keyFn].bind({ $store: store })

    storeState[keyFn] = isFn ? fn : computed(fn)
  })
  return storeState
}

const useState = (mapper: string[], moduleName?: string) => {
  let mapperFn = mapState
  if (moduleName && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapState
  }
  return useMapper(mapper, mapperFn)
}

const useGetters = (mapper: string[], moduleName?: string) => {
  let mapperFn = mapGetters
  if (moduleName && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapGetters
  }
  return useMapper(mapper, mapperFn)
}

// Note: mapActions and mapMutations could be used in compositionAPI directly
const useMutations = (mapper: string[], moduleName?: string) => {
  let mapperFn = mapMutations
  if (moduleName && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapMutations
  }
  return useMapper(mapper, mapperFn, true)
}

const useActions = (mapper: string[], moduleName?: string) => {
  let mapperFn = mapActions
  if (moduleName && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapActions
  }
  return useMapper(mapper, mapperFn, true)
}

export { useGetters, useState, useActions, useMutations }

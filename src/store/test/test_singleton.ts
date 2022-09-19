/* Test about Singletons for demonstrate that if we can create our own State-management functionality */
import { ref } from 'vue'
class BobStore {
  readonly name: string
  private item_list = ref<string[]>([])

  private static instance: BobStore
  private constructor(name: string) {
    this.name = name
  }

  static getInstance() {
    if (BobStore.instance) {
      return this.instance
    }
    this.instance = new BobStore('bob_vuex')
    return this.instance
  }

  set addItem(name: string) {
    this.item_list.value.push(name)
  }

  get ItemList(): string[] {
    return this.item_list.value
  }
}

export { BobStore }

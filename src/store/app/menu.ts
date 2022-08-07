/* Custom Type definition */
type menuItem = 'home' | 'workspace' | 'favorite' | ''
interface MenuState {
  is_collapse: boolean
  selected_menu_item: menuItem
}

/* Variable, Function definition */
const state = <MenuState>{
  is_collapse: false,
  selected_menu_item: '',
}

const getters = {
  getMenuType(state: MenuState): boolean {
    return state.is_collapse
  },
  getSelectedMenuItem(state: MenuState): string {
    return state.selected_menu_item
  },
}

const mutations = {
  changeSideMenuStatus(state: MenuState): void {
    state.is_collapse = !state.is_collapse
  },
  changeSelectedMenuItem(state: MenuState, item: menuItem): void {
    state.selected_menu_item = item
  },
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions,
}

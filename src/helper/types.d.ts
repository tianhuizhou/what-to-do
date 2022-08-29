/* Global Interface */
declare interface Project {
  id?: string
  name: string
  visibility: string
  description?: string
  favorite?: boolean
  boards: Board[]
  user: User[]
}

declare interface Board {
  id?: string
  name: string
  theme?: string
  tasks: Task[]
}

declare interface Task {
  id?: string
  name: string
  priority: string
  description?: string
}

declare interface User {
  id?: string
  name: string
}

declare interface FilterProps {
  [key: string]: {
    type: string
    options: Array<{ value: string; label: string }>
    label: string
    placeholder: string
    multiple: boolean
    default: string | string[]
  }
}

declare interface Filter {
  [key: string]: string | string[]
}

declare interface MenuState {
  menuType: string
  clickCount: number
  selectedMenuHasSubItems: boolean
}

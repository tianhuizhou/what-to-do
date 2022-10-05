/* Global Interface */
declare interface Project {
  id?: number
  name: string
  visibility?: string
  description?: string
  favorite?: boolean
  board_order?: number[]
  boards?: Board[]
  session_uid?: string
  created_at?: Date
  updated_at?: Date
  // user: User[]
}

declare interface Board {
  id?: number
  name: string
  theme?: string
  task_order?: number[]
  project_id?: number
  tasks?: Task[]
}

declare interface Task {
  id?: number
  name: string
  priority: string
  description?: string
  board_id?: number
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

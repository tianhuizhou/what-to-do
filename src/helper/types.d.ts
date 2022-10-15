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
  background?: string
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
  priority?: string
  description?: string
  tags?: [{ 'id': number }]
  board_id?: number
  estimated_time?: string
  due_date?: string
  is_completed?: boolean
  users?: User[]
}

declare interface Tag {
  id?: number
  name: string
  theme: string
}

declare interface User {
  id?: number
  name: string
  email: string
  user_uid?: string
  photo_b64?: string
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

declare interface TaskPriority {
  [key: string]: {
    icon: string
    class: string
    label: string
  }
}

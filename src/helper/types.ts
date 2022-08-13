/* Interface */
interface Project {
  uuid: string
  name: string
  favorite: boolean
  description?: string
  created_at: Date
  updated_at: Date
  boards?: Board[]
  users?: User[]
}

interface Board {
  name: string
  favorite: boolean
  created_at: Date
  updated_at: Date
  tasks: Task[]
}

interface Task {
  name: string
  priority: string
  state: string
  description?: string
  due_date: Date
  created_at: Date
  updated_at: Date
}

interface User {
  name: string
  uid: string
}

interface FilterProps {
  [key: string]: {
    type: string
    options: Array<{ value: string; label: string }>
    label: string
    placeholder: string
    multiple: boolean
    default: string | string[]
  }
}

interface Filter {
  [key: string]: string | string[]
}
export { Project, Board, Task, FilterProps, Filter }

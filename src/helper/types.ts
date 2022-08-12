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
export { Project, Board, Task }

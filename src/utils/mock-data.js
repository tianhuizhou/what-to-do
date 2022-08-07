const organization_list = [
  {
    id: 1,
    name: 'organization 1',
    created_at: new Date(),
    updated_at: new Date(),
    favorite: true,
    projects: [],
    users: [],
  },
]

const project_list = [
  {
    id: 1,
    name: 'project 1',
    created_at: new Date(),
    updated_at: new Date(),
    favorite: true,
    sections: [],
    users: [],
  },
  {
    id: 2,
    name: 'project 2',
    created_at: new Date(),
    updated_at: new Date(),
    favorite: true,
    sections: [],
    users: [],
  },
]

const section_list = [
  {
    id: 1,
    name: 'board name',
    created_at: new Date(),
    updated_at: new Date(),
    tasks: [],
  },
]

const task_list = [
  {
    id: 1,
    name: 'task name',
    priority: 'high',
    state: 'complete/draft/in_progress',
    description: 'task description in string',
    due_date: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  },
]

export default { organization_list, project_list, section_list, task_list }

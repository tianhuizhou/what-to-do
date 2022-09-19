import api from '@/helper/api'
import { useMutations } from '@/helper/vuex'

const { upsert: upsertProject } = useMutations(['upsert'], 'projects')

class ProjectForm {
  is_showing: boolean
  form_data: Project

  constructor(args: Partial<Project>) {
    this.is_showing = false
    this.form_data = {
      id: args.id,
      name: args.name || '',
      visibility: args.visibility || 'public',
      description: args.description || '',
      favorite: args.favorite || false,
    }
  }

  saveProject() {
    if (!this.form_data.id) {
      api.createProject(this.form_data).then((resp) => {
        upsertProject(resp.data[0])
      })
    }
  }
}

export default ProjectForm

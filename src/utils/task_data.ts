// Priority

const task_priorities: TaskPriority = {
  'urgent': { icon: 'fis-flag', class: 'text-danger', label: 'Urgent' },
  'high': { icon: 'fis-flag', class: 'text-warning', label: 'High' },
  'normal': { icon: 'fis-flag', class: 'text-info', label: 'Normal' },
  'low': { icon: 'fis-flag', class: 'text-secondary', label: 'Low' },
  'none': { icon: 'fir-flag', class: 'text-secondary', label: 'None' },
  '_default': { icon: 'fir-flag', class: 'text-secondary', label: '' },
}

function getPriorityLabel(priority: string): string {
  if (task_priorities[priority]) return task_priorities[priority].label
  else return priority
}
function getPriorityClass(priority: string): string {
  if (task_priorities[priority]) return task_priorities[priority].class
  else return task_priorities['_default'].class
}
function getPriorityIcon(priority: string): string {
  if (task_priorities[priority]) return task_priorities[priority].icon
  else return task_priorities['_default'].icon
}

export default {
  // Priority
  getPriorityLabel,
  getPriorityClass,
  getPriorityIcon,
}

const available_colors = [
  { 'value': 'info', 'label': 'Info' },
  { 'value': 'success', 'label': 'Success' },
  { 'value': 'default', 'label': 'Default' },
  { 'value': 'warning', 'label': 'Warning' },
  { 'value': 'danger', 'label': 'Danger' },
]

function getBoardColors() {
  return available_colors
}

export default {
  getBoardColors,
}

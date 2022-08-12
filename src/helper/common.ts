import { v4 as uuid_v4 } from 'uuid'

// Create and return a UUID v4
function generateUUID() {
  return uuid_v4()
}

export default {
  generateUUID,
}

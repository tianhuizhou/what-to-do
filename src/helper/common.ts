import { v4 as uuid_v4 } from 'uuid'

// Create and return a UUID v4
function generateUUID() {
  return uuid_v4()
}

function isDateExpired(date: Date, seconds: number): boolean {
  if (!date) return true

  const diff: number = new Date().getTime() - date.getTime()
  return diff > seconds * 1000
}

export default {
  generateUUID,
  isDateExpired,
}

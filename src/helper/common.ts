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

function minutesToTimeUnit(minutes: number) {
  const HOUR = 60
  const DAY = HOUR * 24
  const WEEK = DAY * 7

  let res = ''
  let cur = minutes
  if (cur / WEEK >= 1) {
    const cur_week = Math.floor(cur / WEEK)
    res += cur_week + (cur_week > 1 ? ' weeks' : ' week') + ' '
    cur = cur % WEEK
  }

  if (cur / DAY >= 1) {
    const cur_day = Math.floor(cur / DAY)
    res += cur_day + (cur_day > 1 ? ' days' : ' day') + ' '
    cur = cur % DAY
  }
  if (cur / HOUR >= 1) {
    const cur_hour = Math.floor(cur / HOUR)
    res += cur_hour + (cur_hour > 1 ? ' hours' : ' hour') + ' '
    cur = cur % HOUR
  }
  if (cur) {
    res += cur + cur > 1 ? ' minutes' : ' minute'
  }
  return res
}

// Return the data converted to user's location
function getLocalDate(utc_string: string) {
  const local_time = new Date(utc_string).toLocaleString('en-US')
  return local_time.split(',')[0]
}

export default {
  generateUUID,
  isDateExpired,
  minutesToTimeUnit,
  getLocalDate,
}

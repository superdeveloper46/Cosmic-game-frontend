export function getTimeLeft() {
  const now = new Date()
  const next7am = new Date()
  next7am.setUTCHours(7, 0, 0, 0)
  if (next7am < now) {
    next7am.setUTCDate(next7am.getUTCDate() + 1)
  }
  const totalSeconds = Math.floor((next7am - now) / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  return { hours, minutes }
}

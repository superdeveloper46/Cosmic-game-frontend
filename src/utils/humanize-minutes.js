const humanizeMinutes = minutes => {
  if (!minutes || minutes < 0) return ''

  const h = Math.floor(minutes / 60)
  const m = minutes % 60

   if (h > 0 && m > 0) return `${h}h ${m}m`
   else if (h > 0 && m === 0) return `${h}h`
   else if (h === 0 && m > 0) return `${m}m`
   else return `0m`
}

export default humanizeMinutes

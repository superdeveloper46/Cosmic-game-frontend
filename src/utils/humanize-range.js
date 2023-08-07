const humanizeRange = (lowest, highest) => {
  if (!highest) {
    return lowest
  } else if (!lowest) {
    return highest
  } else {
    return `${lowest} - ${highest}`
  }
}

export default humanizeRange

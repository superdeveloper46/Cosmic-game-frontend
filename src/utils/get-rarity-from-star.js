const rarities = [
  'Common',
  'Uncommon',
  'Rare',
  'Epic',
  'Legendary',
  'Primordial',
]

const getRarityFromStar = star => {
  if (star <= 0 || star > rarities.length) return 'Common'
  
  return rarities[star - 1]
}

export default getRarityFromStar

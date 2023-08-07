const getBonusesFromPowerEffect = (powerEffect) => {
  let bonuses = {
    stamina: 0,
    inventory: 0,
    luckBonus: 0,
    missionReduction: 0,
    experienceGain: 0,
    goldGain: 0,
    animalGain: 0,
    mineralGain: 0,
    plantGain: 0
  }

  if (!powerEffect) return bonuses

  const effects = powerEffect?.effects || []

  let index = 0
  while (index < effects.length) {
    const effect = effects[index]
    if (effect.type === 'duration') {
      bonuses = {
        ...bonuses,
        missionReduction: bonuses.missionReduction + effect.amount
      }
    } else if (effect.type === 'mineral') {
      bonuses = {
        ...bonuses,
        mineralGain: bonuses.mineralGain + effect.amount
      }
    } else if (effect.type === 'luck') {
      bonuses = {
        ...bonuses,
        luckBonus: bonuses.luckBonus + effect.amount
      }
    } else if (effect.type === 'experience') {
      bonuses = {
        ...bonuses,
        experienceGain: bonuses.experienceGain + effect.amount
      }
    } else if (effect.type === 'plant') {
      bonuses = {
        ...bonuses,
        plantGain: bonuses.plantGain + effect.amount
      }
    } else if (effect.type === 'animal') {
      bonuses = {
        ...bonuses,
        animalGain: bonuses.animalGain + effect.amount
      }
    } else if (effect.type === 'gold') {
      bonuses = {
        ...bonuses,
        goldGain: bonuses.goldGain + effect.amount
      }
    }

    index ++
  }

  return bonuses
}

export default getBonusesFromPowerEffect

const getBonusesFromEquippedItems = (equippedItems) => {
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

  const effects = (equippedItems || []).filter(e => !!e.Inventory && !!e.Inventory.Effect  && !!e.Inventory.Item)
      .map(e => e.Inventory)
      .map(inv => {
    return {
      type: inv.Effect.type,
      bonus: (Math.max(inv?.efficiency/inv?.Item.efficiency,inv?.Effect?.minimum_efficiency) * inv?.Effect?.bonus)
    }
  })

  let index = 0
  while (index < effects.length) {
    const effect = effects[index]
    if (effect.type === 'speed') {
      bonuses = {
        ...bonuses,
        missionReduction: bonuses.missionReduction + effect.bonus
      }
    } else if (effect.type === 'smash') {
      bonuses = {
        ...bonuses,
        mineralGain: bonuses.mineralGain + effect.bonus
      }
    } else if (effect.type === 'luck') {
      bonuses = {
        ...bonuses,
        luckBonus: bonuses.luckBonus + effect.bonus
      }
    } else if (effect.type === 'aptitude') {
      bonuses = {
        ...bonuses,
        experienceGain: bonuses.experienceGain + effect.bonus
      }
    } else if (effect.type === 'harvest') {
      bonuses = {
        ...bonuses,
        plantGain: bonuses.plantGain + effect.bonus
      }
    } else if (effect.type === 'hunt') {
      bonuses = {
        ...bonuses,
        animalGain: bonuses.animalGain + effect.bonus
      }
    } else if (effect.type === 'prosperity') {
      bonuses = {
        ...bonuses,
        goldGain: bonuses.goldGain + effect.bonus
      }
    }

    index ++
  }

  return bonuses
}

export default getBonusesFromEquippedItems

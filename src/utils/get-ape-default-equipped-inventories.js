const getApeDefaultEquippedInventories = apes => {
  const res = {}
  apes.forEach(ape => {
    res[ape.mint] = (ape.gameData?.default_items || []).map(
      defaultItem => (ape.gameData?.Inventories || []).find(inv => defaultItem.inventory_id === inv.id)
    ).filter(inv => !!inv)
  });

  return res
}

export default getApeDefaultEquippedInventories
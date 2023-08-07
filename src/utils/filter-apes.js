const filterApes = ({
  nameFilter = '',
  stateFilter = '',
  items = [],
  apes = [],
  powers = [],
  powerFilter = 'All Powers',
  tierFilter = 0,
}) => {
  const power = powers.find(power => power.power === powerFilter)

  let filteredApes =
    items.length === 0
      ? apes.filter(
          (ape) =>
            (ape.data?.name || '')
              .toLowerCase()
              .includes(nameFilter.toLowerCase()) &&
            (!stateFilter ||
              (stateFilter === 'idle'
                ? !ape.gameData?.active_mission
                : stateFilter === 'crusading'
                ? ape.gameData?.activeMissionEffect?.remainingMinutes > 0
                : stateFilter === 'claimable'
                ? ape.gameData?.activeMissionEffect?.remainingMinutes <= 0
                : !!ape)),
        ).filter(ape => powerFilter === 'All Powers' || ape.gameData?.power === (!!power ? power.slug : null))
        .filter(ape => tierFilter === 0 || tierFilter === -1 || ape.gameData?.Tier?.tier === tierFilter)
      : apes.filter(
            (ape) =>
              ape.gameData?.Inventories.map((x) => x.Item.category).filter(
                (item) =>
                  items
                    .map((y) => y.toLowerCase())
                    .includes(item.toLowerCase()),
              ).length > 0,
          ).filter(
            (ape) =>
              (ape.data?.name || '')
                .toLowerCase()
                .includes(nameFilter.toLowerCase()) &&
              (!stateFilter ||
                (stateFilter === 'idle'
                  ? !ape.gameData?.active_mission
                  : stateFilter === 'crusading'
                  ? ape.gameData?.activeMissionEffect?.remainingMinutes > 0
                  : stateFilter === 'claimable'
                  ? ape.gameData?.activeMissionEffect?.remainingMinutes <= 0
                  : !!ape)),
          ).filter(ape => powerFilter === 'All Powers' || ape.gameData?.power === (!!power ? power.slug : null))
          .filter(ape => tierFilter === 0 || tierFilter === -1 || ape.gameData?.Tier?.tier === tierFilter)
  return filteredApes
}

export default filterApes

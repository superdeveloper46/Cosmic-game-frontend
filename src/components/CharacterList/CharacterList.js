import React from 'react'
import { useSelector } from 'react-redux'
import CharacterItem from '../CharacterItem/character-item'

const CharacterList = ({ crownedApeId, apes, setProfileApe }) => {
  const powers = useSelector((state) => state.apes.powers)

  return (
    <div className='character-list-container gap-3 p-2 custom-scroll'>
      {apes.map((ape, index) => (
        <CharacterItem
          key={`character-wrapper-item-${index}`}
          image={ape.info.image}
          favorite={!!ape?.gameData?.is_favorited}
          crowned={crownedApeId === ape.gameData.id}
          tier={ape.gameData.tier}
          level={ape.gameData.Level.level}
          handleClick={() => setProfileApe(ape)}
          power={powers.find(power => power.slug === ape.gameData.power)}
        />
      ))}
    </div>
  )
}

export default CharacterList

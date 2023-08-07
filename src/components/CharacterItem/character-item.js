import React from 'react'
import { Image } from 'react-bootstrap'
import './characterItem.scss'

const CharacterItem = ({
  image,
  tier,
  favorite,
  crowned,
  power,
  level,
  handleClick,
  activehover=false,
}) => {
  return (
    <div className={`character-image-wrapper ${activehover ? 'character-active' : ''}`} onClick={handleClick}>
      <div>
        <Image className='ape-img' src={image} />
        {
          !!power
          ? <Image
            className='power'
            src={`/images/v2/power/${power.icon}`}
          />
          : null
        }
        {
          favorite ? (
            <Image
              className='favorite'
              src='/images/v2/game-ui/Favourite-Active.png'
              alt='favorite'
            />
          ) : null
          // <Image
          //   src='/images/v2/game-ui/Favourite-Inactive.png'
          //   alt='favorite'
          //   className='favorite'
          // />
        }
        {crowned ? (
          <Image
            className='crown'
            src='/images/v2/game-ui/Crown-Active.png'
            alt='crown'
          />
        ) : null
        // <Image
        //   className='crown'
        //   src='/images/v2/game-ui/Crown-Inactive.png'
        //   alt='crown'
        // />
        }
      </div>
      <div>
        <Image src={`/images/v2/Tier${tier}.png`} />
        Lv. {level}
      </div>
    </div>
  )
}

export default CharacterItem

import React, { useEffect, useState } from "react"
import { Image } from "react-bootstrap"
import levelUp from "../../utils/level-up"
import ItemSlot from "../ItemSlot"
import NormalButton from "../NormalButton"

const ApeProfileLevelUp = ({
  ape,
  reloadApes,
  setMessage,
  gotoEvolution,
}) => {

  return (
    <div className="d-flex justify-content-center align-items-center flex-column p-4" style={{ border: '1px solid #3980DA', background: '#16305F' }}>
      <div className="d-flex justify-content-around align-items-center w-100">
        <div className="d-flex">
          <div style={{ width: '180px' }} className="m-2">
            <Image src={ ape?.info?.image } fluid />
          </div>
        </div>
        {
          !!ape?.gameData?.nextLevel
          ? <div className="d-flex justify-content-center align-items-center flex-column">
            <div className="character-stat">
              <div className="character-stat-description">
                Level: 
              </div>
              <div className="character-stat-current-value">
                { (ape?.gameData?.Level?.level || 0) } 
              </div>
              <Image src="/images/move_right.png" className="right-direction-image"/>
              <div className="character-stat-next-value">
                { (ape?.gameData?.nextLevel?.level || 0) }
              </div>
            </div>
            <div className="character-stat">
              <div className="character-stat-description">
                Luck Rate: 
              </div>
              <div className="character-stat-current-value">
                { (ape?.gameData?.Level?.lr_bonus || 0) / 100 }% 
              </div>
              <Image src="/images/move_right.png" className="right-direction-image"/>
              <div className="character-stat-next-value">
                { (ape?.gameData?.nextLevel?.lr_bonus || 0) / 100 }%
              </div>
            </div>
            <div className="character-stat">
              <div className="character-stat-description">
                Inventory: 
              </div>
              <div className="character-stat-current-value">
                { ape?.gameData?.Level?.inventory || 0 }
              </div>
              <Image src="/images/move_right.png" className="right-direction-image"/>
              <div className="character-stat-next-value">
                { ape?.gameData?.nextLevel?.inventory || 0 }
              </div>
            </div>
            <div className="character-stat">
              <div className="character-stat-description">
              Stamina: 
              </div>
              <div className="character-stat-current-value">
                { ape?.gameData?.Level?.stamina || 0 }
              </div>
              <Image src="/images/move_right.png" className="right-direction-image"/>
              <div className="character-stat-next-value">
                { ape?.gameData?.nextLevel?.stamina || 0 }
              </div>
            </div>
          </div>
          : <div className="d-flex justify-content-center align-items-center flex-column">
            <div className="character-stat">
              <div className="character-stat-description">
                Level: 
              </div>
              <div className="character-stat-current-value">
                { (ape?.gameData?.Level?.level || 0)  }
              </div>
            </div>
            <div className="character-stat">
              <div className="character-stat-description">
                Luck Rate: 
              </div>
              <div className="character-stat-current-value">
                { (ape?.gameData?.Level?.lr_bonus || 0) / 100 }%
              </div>
            </div>
            <div className="character-stat">
              <div className="character-stat-description">
                Inventory: 
              </div>
              <div className="character-stat-current-value">
              { ape?.gameData?.Level?.inventory || 0 }
              </div>
            </div>
            <div className="character-stat">
              <div className="character-stat-description">
                Stamina: 
              </div>
              <div className="character-stat-current-value">
                { ape?.gameData?.Level?.stamina || 0 }
              </div>
            </div>
          </div>
        }
      </div>
      {
        !!ape?.gameData?.nextLevel && !!ape?.gameData?.Tier
        ? ape.gameData.Tier.max_level > ape.gameData.Level.level
        ? <div className="d-flex justify-content-center align-items-center flex-column w-100">
          <div className="d-flex justify-content-around align-items-center w-100">
            <div className="p-2 m-1 text-center" style={{ border: '1px solid #3980DA', flex: 1 }}>
              Select Materials
            </div>
            <div className="p-2 m-1 text-center" style={{ border: '1px solid #3980DA', flex: 1 }}>
              Select Materials
            </div>
          </div>
          <div className="d-flex justify-content-around align-items-center w-50">
            <NormalButton className="m-1" style={{ flex: 1 }} inactive>Auto-Select</NormalButton>
            <NormalButton 
              className="m-1" 
              style={{ flex: 1 }} 
              image="/images/orb.png" 
              onClick={() => setMessage({
                type: 'confirm',
                text: `Are you sure level up ${ape.data.name} from ${(ape?.gameData?.Level?.level || 0) } to ${(ape?.gameData?.nextLevel?.level || 0) }?`,
                callback: confirm => {
                  if (confirm === 'yes') {
                    levelUp({
                      address: ape.mint,
                      wallet: ape.gameData.owner,
                      callback: () => reloadApes([ ape.mint ]),
                      setMessage,
                    })
                  }
                }
              })}
              inactive
            >
              {
                ape.gameData.nextLevel.cp || 0
              }
            </NormalButton>
          </div>
        </div>
        : <div className="d-flex justify-content-around align-items-center flex-column">
          INCREASE MAX LEVEL WITH COSMIC ASCENSION
          <NormalButton className="m-1" onClick={() => gotoEvolution()} inactive>ASCENSION</NormalButton>
        </div>
        : <div className="d-flex justify-content-center align-items-center text-danger">
          This Ape is already reached to max level
        </div>
      }
    </div>
  )
}

export default ApeProfileLevelUp
import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import evolute from '../../utils/evolute'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import ItemSlot from '../ItemSlot'
import NormalButton from '../NormalButton'

const ApeProfileEvolution = ({ ape, reloadApes, setMessage, gotoLevelUp }) => {
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])

  return (
    <div
      className='d-flex justify-content-center align-items-center flex-column p-4'
      style={{ border: '1px solid #3980DA', background: '#16305F' }}
    >
      <div className='d-flex justify-content-around align-items-center w-100'>
        <div className='d-flex'>
          <div style={{ width: '180px' }} className='m-2'>
            <Image src={ape?.info?.image} fluid />
          </div>
        </div>
        {!!ape?.gameData?.nextTier ? (
          <div className='d-flex justify-content-center align-items-center flex-column'>
            <div className='character-stat'>
              <div className='character-stat-description'>Tier:</div>
              <div className='character-stat-current-value'>
                {ape?.gameData?.Tier?.tier || 0}
              </div>
              <Image
                src='/images/move_right.png'
                className='right-direction-image'
              />
              <div className='character-stat-next-value'>
                {ape?.gameData?.nextTier?.tier || 0}
              </div>
            </div>
            <div className='character-stat'>
              <div className='character-stat-description'>Level:</div>
              <div className='character-stat-current-value'>
                {ape?.gameData?.Level?.level || 0}
              </div>
              <Image
                src='/images/move_right.png'
                className='right-direction-image'
              />
              <div className='character-stat-next-value'>
                {ape?.gameData?.Level?.level || 0}
              </div>
            </div>
            <div className='character-stat'>
              <div className='character-stat-description'>Luck Rate:</div>
              <div className='character-stat-current-value'>
                {(ape?.gameData?.Level?.lr_bonus || 0) / 100}%
              </div>
              <Image
                src='/images/move_right.png'
                className='right-direction-image'
              />
              <div className='character-stat-next-value'>
                {(ape?.gameData?.Level?.lr_bonus || 0) / 100}%
              </div>
            </div>
            <div className='character-stat'>
              <div className='character-stat-description'>Inventory:</div>
              <div className='character-stat-current-value'>
                {ape?.gameData?.Level?.inventory || 0}
              </div>
              <Image
                src='/images/move_right.png'
                className='right-direction-image'
              />
              <div className='character-stat-next-value'>
                {ape?.gameData?.Level?.inventory || 0}
              </div>
            </div>
            <div className='character-stat'>
              <div className='character-stat-description'>Stamina:</div>
              <div className='character-stat-current-value'>
                {ape?.gameData?.Level?.stamina || 0}
              </div>
              <Image
                src='/images/move_right.png'
                className='right-direction-image'
              />
              <div className='character-stat-next-value'>
                {ape?.gameData?.Level?.stamina || 0}
              </div>
            </div>
          </div>
        ) : (
          <div className='d-flex justify-content-center align-items-center flex-column'>
            <div className='character-stat'>
              <div className='character-stat-description'>Level:</div>
              <div className='character-stat-current-value'>
                {(ape?.gameData?.Level?.level || 0) + 1}
              </div>
            </div>
            <div className='character-stat'>
              <div className='character-stat-description'>Luck Rate:</div>
              <div className='character-stat-current-value'>
                {(ape?.gameData?.Level?.lr_bonus || 0) / 100}%
              </div>
            </div>
            <div className='character-stat'>
              <div className='character-stat-description'>Inventory:</div>
              <div className='character-stat-current-value'>
                {ape?.gameData?.Level?.inventory || 0}
              </div>
            </div>
            <div className='character-stat'>
              <div className='character-stat-description'>Stamina:</div>
              <div className='character-stat-current-value'>
                {ape?.gameData?.Level?.stamina || 0}
              </div>
            </div>
          </div>
        )}
      </div>
      {!!ape?.gameData?.nextTier && !!ape?.gameData?.Tier ? (
        ape.gameData.Tier.max_level === ape.gameData.Level.level ? (
          <div className='d-flex justify-content-center align-items-center flex-column w-100'>
            <div style={{ fontSize: '14px' }}>
              MAX LEVEL INCREASES AFTER COSMIC ASCENSION
            </div>
            <div className='d-flex justify-content-around align-items-center'>
              <div className='d-flex justify-content-center align-items-center flex-column'>
                <div
                  className='p-2 m-1 text-center'
                  style={{ fontSize: '12px' }}
                >
                  Materials Required:
                </div>
                <div
                  className='p-2 m-1 text-center'
                  style={{ border: '1px solid #3980DA' }}
                >
                  Materials Here
                </div>
              </div>
              <div
                className='d-flex justify-content-center align-items-center'
                style={{ maxWidth: '50%' }}
              >
                <div className='d-flex justify-content-center align-items-center flex-column'>
                  <div className='text-center'>Current Max Level</div>
                  <div className='d-flex align-items-center'>
                    Lv.
                    <span style={{ fontSize: '32px', marginLeft: '0.25rem' }}>
                      {ape?.gameData?.Tier?.max_level || 0}
                    </span>
                  </div>
                </div>
                <Image
                  src='/images/move_right.png'
                  style={{ width: '32px', margin: '0 1rem' }}
                />
                <div className='d-flex justify-content-center align-items-center flex-column'>
                  <div className='text-center'>Ascended Max Level</div>
                  <div className='d-flex align-items-center'>
                    Lv.
                    <span style={{ fontSize: '32px', marginLeft: '0.25rem' }}>
                      {ape?.gameData?.nextTier?.max_level || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-around align-items-center w-25'>
              <NormalButton
                className='m-1'
                style={{ flex: 1 }}
                image='/images/orb.png'
                onClick={() => {
                  generalSound()
                  setMessage({
                    type: 'confirm',
                    text: `Are you sure evolute ${ape.data.name} from Tier ${
                      ape?.gameData?.Tier?.tier || 0
                    } to Tier ${ape?.gameData?.nextTier?.tier || 0}?`,
                    callback: (confirm) => {
                      if (confirm === 'yes') {
                        evolute({
                          address: ape.mint,
                          wallet: ape.gameData.owner,
                          callback: () => reloadApes([ape.mint]),
                          setMessage,
                        })
                      }
                    },
                  })
                }}
                inactive
              >
                {ape.gameData.nextTier.cp || 0}
              </NormalButton>
            </div>
          </div>
        ) : (
          <div className='d-flex justify-content-around align-items-center flex-column text-center'>
            YOU MUST BE THE MAX LEVEL OF A TIER TO BE ABLE TO PERFORM COSMIC
            ASCENSION
            <NormalButton
              className='m-1'
              onClick={() => {
                generalSound()
                gotoLevelUp()
              }}
              inactive
            >
              Level
            </NormalButton>
          </div>
        )
      ) : (
        <div className='d-flex justify-content-center align-items-center text-danger text-center'>
          This Ape is already reached to max tier
        </div>
      )}
    </div>
  )
}

export default ApeProfileEvolution

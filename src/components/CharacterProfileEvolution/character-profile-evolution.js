import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import evolute from '../../utils/evolute'
import setApeFavorite from '../../utils/set-ape-favorite'
import IconTextButton from '../IconTextButton'
import ProfileErrorLabelBar from '../ProfileErrorLabelBar/profile-error-label-bar'
import MaterialsSlot from '../MaterialsSlot/materials-slot'
import TierItemSlot from '../TierItemSlot'
import { useDispatch, useSelector } from 'react-redux'
import { getAccount } from '../../slices/accountSlice'
import { useWallet } from '@solana/wallet-adapter-react'
import { fetchMoreInventories } from '../../slices/inventorySlice'

const CharacterProfileEvolution = ({
  crownedApeId,
  switchCrown,
  ape,
  reloadApes,
  setMessage,
}) => {
  const { publicKey } = useWallet()
  const dispatch = useDispatch()

  const evolutionCosts = useSelector((state) => state.apes.evolutionCosts)
  const resources = useSelector((state) => state.resources.resources)
  const reloadAccount = publicKey => dispatch(getAccount(publicKey))
  const account = useSelector((state) => state.accounts.account)

  const evolutionCost = (evolutionCosts || []).find(cost => cost.tier === ((ape?.gameData?.tier || 0) + 1))
  const goldCost = (evolutionCost?.materials || []).find(material => material.name === 'Gold')
  const ascCost = (evolutionCost?.materials || []).find(material => material.name === 'Ascension')
  const resourcesCost = (evolutionCost?.materials || []).filter(material => material.type !== 'Currency')
  const [favorite, setFavorite] = useState(!!ape?.gameData?.is_favorited)

  const inventories = useSelector((state) => state.inventories.inventories)

  useEffect(() => {
    dispatch(fetchMoreInventories({
      address: publicKey,
      type: 'resource',
      subType: 'Enhancement Material',
      after: 0,
      count: 50
    }))
  }, [])

  useEffect(() => {
    if (!!ape) {
      setFavorite(!!ape.gameData?.is_favorited)
    }
  }, [ape])

  return (
    <div className='d-flex justify-content-around p-4 position-relative'>
      <div className='d-flex justify-content-center align-items-center flex-column'>
        <div className='d-flex item-box-responsiveness'>
          <div className='m-3 crown-fav-responsiveness d-flex flex-column align-items-center'>
            <button
              onClick={() => switchCrown(ape.gameData.id)}
              className='crown-btn my-3'
            >
              {crownedApeId === ape.gameData.id ? (
                <img src='/images/v2/game-ui/Crown-Active.png' alt='crown' />
              ) : (
                <img src='/images/v2/game-ui/Crown-Inactive.png' alt='crown' />
              )}
            </button>
            <button
              className='crown-btn'
              onClick={() => {
                setApeFavorite({
                  address: ape.mint,
                  wallet: ape.gameData.owner,
                  favorite: !favorite,
                  rollback: () => setFavorite(favorite),
                  callback: () => reloadApes([ape.mint]),
                })
                setFavorite(!favorite)
              }}
            >
              {favorite ? (
                <img
                  src='/images/v2/game-ui/Favourite-Active.png'
                  alt='favorite'
                />
              ) : (
                <img
                  src='/images/v2/game-ui/Favourite-Inactive.png'
                  alt='favorite'
                />
              )}
            </button>
          </div>
          <div
            style={{ width: '300px' }}
            className='m-2 d-flex justify-content-center align-items-center character-profile-main-img'
          >
            <Image src={ape?.info?.image} fluid />
          </div>
          <div style={{ width: '90px' }} />
        </div>
        <div className='m-2 d-flex justify-content-center align-items-center flex-column'>
          <div className='m-1 h6 pb-2'>MAX LEVEL INCREASES AFTER ASCENDING</div>
          <p className='mb-0'>Materials Required:</p>
        </div>
        <div className='d-flex justify-content-center'>
          {(resourcesCost || []).map((resourceInfo, id) => {
            const resource = resources.find(res => res.name === resourceInfo.name)

            return <MaterialsSlot 
              key={`character-evolution-material-slot-${id}`} 
              resource={ resource }
              style={{ 
                color: (Number(inventories.find(inv => inv.id === resource?.id)?.quantity || 0) >= Number(resourceInfo.amount || 0) ? '#07da42' : 'red') 
              }}
              text={ `${inventories.find(inv => inv.id === resource?.id)?.quantity || 0 } / ${resourceInfo.amount || 0}` }
            />
          })}
        </div>
        <div className='d-flex'>
          <IconTextButton
            className='m-1 evolve-box-responsiveness mt-3'
            style={{ flex: 1 }}
            info={[
              {
                id: 'character-profile-evolve-gold-cosmic',
                image: '/images/v2/currencies/Gold.png',
                text: goldCost?.amount || 0,
                available: (account?.currencies || []).find(currency => currency.Currency?.name === 'Gold')?.amount
              },
              {
                id: 'character-profile-evolve-pink-cosmic',
                image: '/images/v2/currencies/Ascension.png',
                text: ascCost?.amount || 0,
                available: (account?.character_currencies || []).find(currency => currency.name === 'Ascension')?.amount
              },
            ]}
            onClick={() =>
              setMessage({
                type: 'confirm',
                text: `Are you sure evolute ${ape.data.name} from Tier ${
                  ape?.gameData?.Tier?.tier || 1
                } to Tier ${ape?.gameData?.nextTier?.tier || 1}?`,
                callback: (confirm) => {
                  if (confirm === 'yes') {
                    evolute({
                      address: ape.mint,
                      wallet: ape.gameData.owner,
                      callback: () => {
                        reloadApes([ape.mint])
                        reloadAccount(ape.gameData.owner)
                        dispatch(fetchMoreInventories({
                          address: publicKey,
                          type: 'resource',
                          subType: 'Enhancement Material',
                          after: 0,
                          count: 50
                        }))
                      },
                      setMessage,
                    })
                  }
                },
              })
            }
            inactive={
              (ape.gameData.level < ape.gameData.Tier.max_level) 
              || !ape?.gameData?.nextTier
              || Number(goldCost?.amount || 0) > Number((account?.currencies || []).find(currency => currency.Currency?.name === 'Gold')?.amount)
              || Number(ascCost?.amount || 0) > Number((account?.character_currencies || []).find(currency => currency.name === 'Ascension')?.amount)
              || !!(resourcesCost || []).find((resourceInfo) => {
                const resource = resources.find(res => res.name === resourceInfo.name)
    
                return Number(inventories.find(inv => inv.id === resource?.id)?.quantity || 0) < Number(resourceInfo.amount || 0)
              })
            }
          >
            Ascend
          </IconTextButton>
        </div>
      </div>
      <ProfileErrorLabelBar
        isShow={(ape.gameData.level < ape.gameData.Tier.max_level) || !ape?.gameData?.nextTier}
        label={!!ape?.gameData?.nextTier ? 'Insufficient Crusader Level' : 'Max Tier Reached'}
      />
    </div>
  )
}

export default CharacterProfileEvolution

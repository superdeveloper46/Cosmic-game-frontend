import React from 'react'
import { Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import AVAILABLE_RESOURCES from '../../consts/available-resources'
import CharacterItem from '../CharacterItem/character-item'
import Divider from '../Divider'
import RewardCurrency from '../RewardCurrency/reward-currency'
import RewardItem from '../RewardItem/reward-item'
import RewardResource from '../RewardResource/reward-resource'
import { setDetailImage, setSelectedItem } from '../../slices/ItemDialogSlice'
import TextWithImage from '../TextWithImage'

const RewardRow = ({
  crownedApeId,
  reward,
  resources,
  currencies = [],
  onClick,
  setIsItemOpen,
  setIsEquip,
  selectedInventory,
  onItemCallback = false,
  setSelectedInventory,
}) => {
  const dispatch = useDispatch()
  const cosmic = currencies.find((currency) => currency.name === 'Cosmic')
  const gold = currencies.find((currency) => currency.name === 'Gold')
  const ascension = currencies.find((currency) => currency.name === 'Ascension')
  const experience = currencies.find(
    (currency) => currency.name === 'Experience',
  )
  const powers = useSelector((state) => state.apes.powers)
  const inventories = useSelector((state) => state.inventories.inventories)

  return (
    <div
      className='mission-reward-item-row-container d-flex p-2 position-relative'
      style={{
        background: '#5B6C991A',
        border: '2px solid #3980DA',
        margin: '0.5rem',
      }}
    >
      <div className='d-flex align-items-center'>
        <CharacterItem
          image={reward.ape?.image}
          favorite={!!reward.ape?.is_favorited}
          crowned={crownedApeId === reward.ape?.id}
          tier={reward.ape?.tier}
          level={reward.ape?.level}
          power={powers.find((power) => power.slug === reward.ape?.power)}
          handleClick={() => {
            if (onClick) onClick(reward?.ape)
            if (setSelectedInventory) setSelectedInventory(null)
          }}
          activehover
        />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-start align-items-center mission-title'>
          <div className='mx-2 my-1'>
            {reward.ape?.active_mission?.Mission?.secondary_branch || ''}
          </div>
        </div>
        <div className='d-flex justify-content-center align-items-center m-2'>
          <Divider />
          <div className='d-flex justify-content-center align-items-start m-2 flex-column'>
            <RewardCurrency
              key={`reward-currency-cosmic`}
              currency={cosmic}
              amount={
                reward.accountTransactions.find(
                  (trx) => trx.currency_id === cosmic.id,
                )?.amount || 0
              }
            />
            <RewardCurrency
              key={`reward-currency-gold`}
              currency={gold}
              amount={
                reward.accountTransactions.find(
                  (trx) => trx.currency_id === gold.id,
                )?.amount || 0
              }
            />
            <RewardCurrency
              key={`reward-currency-ascension`}
              currency={ascension}
              amount={
                reward.characterTransactions.find(
                  (trx) => trx.currency_id === ascension.id,
                )?.amount || 0
              }
            />
            <RewardCurrency
              key={`reward-currency-experience`}
              currency={experience}
              amount={reward.experience || 0}
            />
          </div>
          <Divider />
          <div
            className='d-flex justify-content-center align-items-center m-2 flex-wrap'
            style={{ width: '180px' }}
          >
            {(reward.itemRewards || []).map((item) => (
              <RewardItem
                key={`reward-item-${item?.inventory.id}`}
                item={item}
                onClick={() => {
                  if (onItemCallback && onClick) {
                    onClick(reward.ape)
                    if (!!setSelectedInventory) setSelectedInventory(null)
                  }
                  if (!!setSelectedInventory) {
                    setSelectedInventory({
                      ...(selectedInventory || {}),
                      equipped: {
                        ...item.inventory,
                        type: 'Equipment',
                        ape_name: reward.ape.name,
                        ape_id: reward.ape.id,
                        ape_image: reward.ape.image,
                      },
                    })
                    setIsItemOpen(true)
                    setIsEquip(false)
                    dispatch(setDetailImage(null))
                    dispatch(
                      setSelectedItem({
                        ...item.inventory,
                        type: 'Equipment',
                        ape_name: reward.ape.name,
                        ape_id: reward.ape.id,
                        ape_image: reward.ape.image,
                      }),
                    )
                  }
                }}
              />
            ))}
            {[...Array(4 - (reward.itemRewards || []).length)].map((_, id) => (
              <RewardItem key={`reward-item-inactive-${id}`} />
            ))}
          </div>
          <Divider />
          <div
            className='d-flex justify-content-center align-items-center m-2 flex-wrap'
            style={{ width: '270px' }}
          >
            {(reward.resourceRewards || []).map((resource) => (
              <RewardResource
                key={`reward-resource-${resource.id}`}
                resource={resource.Resource || resource.Utility}
                quantity={resource.amount || 0}
                onClick={() => {
                  if (onItemCallback && onClick) {
                    onClick(reward.ape)
                    if (!!setSelectedInventory) setSelectedInventory(null)
                  }
                  if (!!setSelectedInventory) {
                    setSelectedInventory({
                      ...(selectedInventory || {}),
                      equipped: { ...resource, type: 'Resource' },
                    })
                    setIsItemOpen(true)
                    dispatch(setDetailImage(null))
                    dispatch(setSelectedItem({ ...resource, type: 'Resource' }))
                    setIsEquip(false)
                  }
                }}
              />
            ))}
            {[...Array(6 - (reward.resourceRewards || []).length)].map(
              (_, id) => (
                <RewardResource key={`reward-resource-inactive-${id}`} />
              ),
            )}
          </div>
        </div>
      </div>
      {!!reward.isSuccess ? null : (
        <div className='position-absolute d-flex justify-content-center w-100'>
          <Image src='/images/v2/game-ui/Mission_Failed.png' />
        </div>
      )}
    </div>
  )
}

export default RewardRow

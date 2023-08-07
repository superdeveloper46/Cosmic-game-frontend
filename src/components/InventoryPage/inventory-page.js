import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDetailImage, setSelectedItem } from '../../slices/ItemDialogSlice'
import { Image } from 'react-bootstrap'
import AccountInventoryPage from '../AccountInventoryPage/account-inventory-page'
import { equipmentTypes } from '../../pages/MenuPage/menu-page'
import Tooltip from '../Tooltip/tooltip'
import DetailedTooltip from '../DetailedTooltip/detailed-tooltip'
import { getTimeLeft } from '../../utils/get-time-left-utc7'
import { rarityIcons } from '../ItemDetailsCard/item-details-card'

const InventoryPage = ({
  inventoryMission,
  ape,
  setIsEquip,
  setIsItemOpen,
  accountResources,
  selectedInventory,
  setSelectedInventory,
}) => {
  const dispatch = useDispatch()
  const account = useSelector((state) => state.accounts.account)
  const selectedApes = useSelector((state) => state.apes.selectedApes)
  const [stamina, setStamina] = useState(0)
  const [selectedSubType, setSelectedSubType] = useState(equipmentTypes[0])
  const [keyRequired, setKeyRequired] = useState(null)
  const [keysAvailable, setKeysAvailable] = useState(0)

  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  const findAndSetKey = () => {
    if (!!inventoryMission) {
      let keys = inventoryMission?.Mission_Resource_Rewards?.filter(
        (r) => r.reward_type === 'cost' && r.name === 'Key',
      ).map((r) => r.Resource)
      if (!!keys && keys.length > 0) {
        let key = keys[0]
        let keysAvailable =
          accountResources.find(
            (r) => r?.name?.toLowerCase() === key.name.toLowerCase(),
          )?.quantity || 0
        setKeyRequired(key)
        setKeysAvailable(keysAvailable)
      } else {
        setKeyRequired(null)
        setKeysAvailable(0)
      }
    }
  }

  useEffect(() => {
    findAndSetKey()
    const intervalId = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    findAndSetKey()
    if (inventoryMission && !!selectedApes && selectedApes.length) {
      if (Object.keys(selectedApes[0]).length === 0) {
        setStamina(0)
      } else {
        setStamina(
          inventoryMission?.Mission_Currencies.filter(
            (inv) => inv?.Currency?.name === 'Stamina',
          )[0]?.lowest_amount * selectedApes.length,
        )
      }
    }
  }, [inventoryMission, selectedApes])

  return (
    <div className='d-flex flex-column justify-content-between h-100'>
      <h2 className='tab-title'>INVENTORY</h2>
      {inventoryMission && !!ape ? (
        <AccountInventoryPage
          style={{
            maxHeight: 'calc(100vh - 350px)',
          }}
          onClick={(inventory) => {
            if (!!setSelectedInventory) {
              setSelectedInventory({
                ...(selectedInventory || {}),
                selected: { ...inventory, Item: inventory },
              })
              setIsEquip(true)
              dispatch(setSelectedItem({ ...inventory, Item: inventory }))
            }
          }}
          onDoubleClick={() => {
            setIsItemOpen(true)
            dispatch(setDetailImage(null))
          }}
          selectedSubType={selectedSubType}
          setSelectedSubType={setSelectedSubType}
        />
      ) : (
        <div className='d-flex justify-content-center align-items-center h-100 overflow-hidden'>
          <h2 className='tab-title'>SELECT A CHARACTER TO CONTINUE</h2>
        </div>
      )}
      <div className='d-flex w-100 align-items-center justify-content-around'>
        {!!keyRequired && (
          <div className='d-flex justify-content-center align-items-center'>
            <div
              className='key-image'
              style={{
                backgroundImage: `url(${
                  rarityIcons[keyRequired?.name.split(' ')[0] || 'Common']
                })`,
              }}
            >
              <Image src={`/images/v2/resources/${keyRequired.icon}`} />
            </div>

            <div
              className={`d-flex flex-grow-1 pl-2 ${
                selectedApes.length > keysAvailable ? 'text-danger' : ''
              }`}
            >
              {selectedApes.length || 0} / {keysAvailable}
            </div>
          </div>
        )}
        <div className='d-flex justify-content-center'>
          <Tooltip
            childrenClassName='wallet-info-item ongoing-ape-count d-flex align-items-center'
            tooltipElement={
              <DetailedTooltip
                image='/images/v2/currencies/Stamina.png'
                title='Energy'
                content='Energy is needed for missions. Recharges everyday at 7am UTC'
                bottomBar={
                  <div>
                    Recharge Time: {timeLeft.hours}h {timeLeft.minutes}m
                  </div>
                }
              />
            }
          >
            <Image
              src='/images/v2/currencies/Stamina.png'
              style={{ width: '50px', height: '50px', marginRight: '10px' }}
            />
            <div
              className={`d-flex flex-grow-1 pl-2 ${
                stamina > (account?.stamina || 0) ? 'text-danger' : ''
              }`}
            >
              {selectedApes.length ? stamina : 0} / {account?.stamina || 0}
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default InventoryPage

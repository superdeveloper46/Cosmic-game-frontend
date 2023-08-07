import { useWallet } from '@solana/wallet-adapter-react'
import classNames from 'classnames'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Waypoint } from 'react-waypoint'
import {
  clearInventories,
  fetchMoreInventories,
} from '../../slices/inventorySlice'
import Loading from '../Loading/loading'
import NewLayoutInventoryItem from '../NewLayoutInventoryItem/new-layout-inventory-item'
import { equipmentTypes } from '../../pages/MenuPage/menu-page'

import './account-inventory-page.scss'

const pageSize = 50

const AccountInventoryPage = ({
  style = {},
  onClick,
  onDoubleClick,
  activeInv,
  selectedSubType,
  setSelectedSubType,
}) => {
  const inactiveSound = useAudio(AUDIOLIST['INACTIVE_BUTTON'])
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])
  const { publicKey } = useWallet()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const selectedInventory = useSelector(
    (state) => state.inventories.selectedInventory,
  )

  const inventories = useSelector((state) => state.inventories.inventories)
  const isMoreAvailable = useSelector(
    (state) => state.inventories.isMoreAvailable,
  )
  const loading = useSelector((state) => state.inventories.loading)

  useEffect(() => {
    if (!!selectedSubType) {
      dispatch(clearInventories())

      const type = 'item'
      const subType = selectedSubType.toLowerCase()
      const after = 0
      const count = pageSize

      fetchMore({ type, subType, after, count })
    }
  }, [selectedSubType])

  const fetchMore = ({ type, subType, after, count }) =>
    dispatch(
      fetchMoreInventories({
        address: publicKey,
        type,
        subType,
        after,
        count,
      }),
    )

  return (
    <div className='account-inventory-page d-flex flex-column justify-content-between h-100'>
      <div className='d-flex flex-grow-1 flex-column'>
        <div className='custom-border-bottom mb-4 d-flex w-100'>
          <div className='d-flex justify-content-start align-items-center tap-btns flex-grow-1'>
            {equipmentTypes.map((itemType, index) => (
              <button
                key={`item-type-${index}`}
                className={classNames('flex-grow-1', {
                  active: itemType === selectedSubType,
                })}
                onClick={() => {
                  generalSound()
                  setSelectedSubType(itemType)
                }}
              >
                {itemType}
              </button>
            ))}
          </div>
        </div>
        <div
          className='d-flex inventories-container justify-content-center'
          style={style}
        >
          <div className='d-flex flex-wrap custom-scroll overflow-auto justify-content-center'>
            {inventories.map((inv, index) => (
              <NewLayoutInventoryItem
                key={index}
                inventory={inv}
                active={
                  activeInv
                    ? inv.inv_id === activeInv?.inv_id
                    : inv.inv_id === selectedInventory?.selected?.inv_id
                }
                style={{ margin: '8px' }}
                onClick={() => {
                  generalSound()
                  onClick(inv)
                }}
                onDoubleClick={() => {
                  generalSound()
                  onDoubleClick()
                }}
                onApeDoubleClick={() =>
                  navigate('/characters/list', {
                    state: {
                      ape_id: inv.ape_id,
                    },
                  })
                }
                equip
              />
            ))}
            {!!loading ? <Loading isLoading={loading} /> : null}
            {!!isMoreAvailable && !loading ? (
              <Waypoint
                onEnter={() => {
                  fetchMore({
                    type: 'item',
                    subType: selectedSubType.toLowerCase(),
                    after: inventories.length + 1,
                    count: pageSize,
                  })
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountInventoryPage

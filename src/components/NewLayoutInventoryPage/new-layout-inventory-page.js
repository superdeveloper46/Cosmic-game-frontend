import { useWallet } from '@solana/wallet-adapter-react'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import { Image } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Waypoint } from 'react-waypoint'
import { getAccount } from '../../slices/accountSlice'
import fetchInventories from '../../utils/fetch-inventories'
import salvageInventories from '../../utils/salvage-inventories'
import sellInventories from '../../utils/sell-inventories'
import ApplyButton from '../ApplyButton'
import Loading from '../Loading/loading'
import NewLayoutInventoryItem from '../NewLayoutInventoryItem/new-layout-inventory-item'
import NewLayoutItemDetailsCard from '../NewLayoutItemDetailsCard/new-layout-item-details-card'
import NewLayoutResourceFolder from '../NewLayoutResourceItemFolder/new-layout-resource-folder'
import NewLayoutResourceItem from '../NewLayoutResourceItemSlot/new-layout-resource-item'
import SalvageButton from '../SalvageButton/salvage-button'
import SellButton from '../SellButton/sell-button'

import './new-layout-inventory-page.scss'
import ItemDetailsCard from '../ItemDetailsCard/item-details-card'
import NewLayoutCurrencyItem from '../NewLayoutCurrencyItem/new-layout-currency-item'
import { getAccountResources } from '../../slices/resourceSlice'

const inventoryTypes = ['Resources', 'Equipment', 'Currency']
const resourceTypes = ['Enhancement Material', 'Resource Material', 'Other']
const equipmentTypes = ['Trinket', 'Jewelry', 'Footwear']
const currencyTypes = ['All']
const pageSize = 50

const NewLayoutInventoryPage = ({ setMessage }) => {
  const { publicKey } = useWallet()
  const cancelSound = useAudio(AUDIOLIST['CANCEL_BUTTON'])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const reloadAccount = (publicKey) => dispatch(getAccount(publicKey))
  const reloadAccountResources = (publicKey) => dispatch(getAccountResources(publicKey))

  const [selectedType, setSelectedType] = useState(inventoryTypes[0])
  const [fetchedType, setFetchedType] = useState(null)
  const [selectedSubType, setSelectedSubType] = useState(resourceTypes[0])
  const [inventory, setInventory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isMoreAvailable, setIsMoreAvailable] = useState(false)
  const [inventories, setInventories] = useState([])
  const [resource, setResource] = useState(null)
  const [mode, setMode] = useState(null)
  const [selectedInventories, setSelectedInventories] = useState([])

  useEffect(() => {
    setInventory(null)
    if (selectedType === inventoryTypes[0]) {
      setSelectedSubType(resourceTypes[0])
    } else if (selectedType === inventoryTypes[1]) {
      setSelectedSubType(equipmentTypes[0])
    } else if (selectedType === inventoryTypes[2]) {
      setSelectedSubType(currencyTypes[0])
      setMode(null)
      setSelectedInventories([])
    }
  }, [selectedType])

  useEffect(() => {
    setResource(null)

    if (resourceTypes.includes(selectedSubType)) {
      setInventory(null)
      setInventories([])
      setFetchedType(null)

      const type = 'resource'
      const subType = selectedSubType
      const after = 0
      const count = pageSize

      fetchMore({ type, subType, after, count })
    } else if (equipmentTypes.includes(selectedSubType)) {
      setInventories([])
      setInventory(null)
      setFetchedType(null)

      const type = 'item'
      const subType = selectedSubType.toLowerCase()
      const after = 0
      const count = pageSize

      fetchMore({ type, subType, after, count })
    } else if (currencyTypes.includes(selectedSubType)) {
      setInventories([])
      setInventory(null)
      setFetchedType(null)

      const type = 'currency'
      const subType = selectedSubType
      const after = 0
      const count = pageSize

      fetchMore({ type, subType, after, count })
    }
  }, [selectedSubType])

  useEffect(() => {
    if (resourceTypes.includes(selectedSubType)) {
      setInventories([])
      setFetchedType(null)

      const type = 'resource'
      const subType = selectedSubType
      const after = 0
      const count = pageSize
      const resourceId = resource?.id || ''

      fetchMore({ type, subType, after, count, resourceId })
    }
  }, [resource])

  useEffect(() => {
    if (!mode) {
      setSelectedInventories([])
    }
  }, [mode])

  const fetchMore = async ({ type, subType, after, count, resourceId }) => {
    setLoading(true)

    const fetchedInventories = await fetchInventories({
      address: publicKey,
      type,
      subType: subType === 'Other' ? 'Currency' : subType,
      after,
      count,
      resourceId,
    })

    setLoading(false)

    setFetchedType(fetchedInventories?.metadata?.type || type)
    setIsMoreAvailable(!!fetchedInventories?.metadata?.isNextAvailable)

    if (after === 0) {
      setInventories(fetchedInventories?.data || [])
    } else {
      setInventories([...inventories, ...(fetchedInventories?.data || [])])
    }
  }

  const handlePushInventory = (inv) => {
    if (
      !!selectedInventories.find(
        (sinv) =>
          sinv.id === inv.id &&
          sinv.inv_id === inv.inv_id &&
          sinv.inv_type === inv.inv_type &&
          sinv.is_folder === inv.is_folder,
      )
    ) {
      setSelectedInventories(
        selectedInventories.filter(
          (sinv) =>
            !(
              sinv.id === inv.id &&
              sinv.inv_id === inv.inv_id &&
              sinv.inv_type === inv.inv_type &&
              sinv.is_folder === inv.is_folder
            ),
        ),
      )
    } else {
      setSelectedInventories([...selectedInventories, inv])
    }
  }

  const confirmSellSalvage = (sellSalvage) => (invs) => {
    if (sellSalvage === 'sell') {
      sellInventories({
        address: publicKey,
        inventories: invs.map((inv) => ({
          id: inv.id,
          inv_id: inv.inv_id,
          inv_type: inv.inv_type,
          is_folder: inv.is_folder,
        })),
        setMessage,
        callback: () => {
          reloadAccount(publicKey)
          reloadAccountResources(publicKey)
          setInventories(
            inventories.filter(
              (rinv) =>
                !invs.find(
                  (inv) =>
                    rinv.id === inv.id &&
                    rinv.inv_id === inv.inv_id &&
                    rinv.inv_type === inv.inv_type &&
                    rinv.is_folder === inv.is_folder,
                ),
            ),
          )
        },
      })
      setMode(null)
    } else if (sellSalvage === 'salvage') {
      salvageInventories({
        address: publicKey,
        inventories: invs.map((inv) => ({
          id: inv.id,
          inv_id: inv.inv_id,
          inv_type: inv.inv_type,
          is_folder: inv.is_folder,
        })),
        setMessage,
        callback: () => {
          reloadAccount(publicKey)
          reloadAccountResources(publicKey)
          setInventories(
            inventories.filter(
              (rinv) =>
                !invs.find(
                  (inv) =>
                    rinv.id === inv.id &&
                    rinv.inv_id === inv.inv_id &&
                    rinv.inv_type === inv.inv_type &&
                    rinv.is_folder === inv.is_folder,
                ),
            ),
          )
        },
      })
      setMode(null)
    }
  }

  return (
    <div className='new-layout-inventory-page d-flex flex-column justify-content-between h-100 w-100'>
      <div className='d-flex flex-grow-1'>
        <div className='d-flex flex-grow-1 flex-column'>
          <div className='custom-border-bottom mb-4 d-flex'>
            <div className='d-flex justify-content-start align-items-center tap-btns'>
              {inventoryTypes.map((inventoryType, index) => (
                <button
                  key={`inventory-type-${index}`}
                  className={classNames('type-tab', {
                    active: inventoryType === selectedType,
                  })}
                  onClick={() => setSelectedType(inventoryType)}
                >
                  {inventoryType}
                </button>
              ))}
            </div>
            <div className='d-flex flex-grow-1'></div>
          </div>
          <div className='custom-border-bottom mb-4 d-flex subtype-tabs'>
            {!mode ? (
              <div className='d-flex justify-content-start align-items-center tap-btns'>
                {selectedType === inventoryTypes[0]
                  ? resourceTypes.map((resourceType, index) => (
                      <button
                        key={`resource-type-${index}`}
                        className={classNames('subtype-tab', {
                          active: resourceType === selectedSubType,
                        })}
                        onClick={() => {
                          if (resourceType === selectedSubType && !!resource) {
                            setResource(null)
                          } else {
                            setSelectedSubType(resourceType)
                          }
                        }}
                      >
                        {resourceType}
                        {!!resource && resourceType === selectedSubType
                          ? ` / ${resource.name}`
                          : ''}
                      </button>
                    ))
                  : selectedType === inventoryTypes[1]
                  ? equipmentTypes.map((itemType, index) => (
                      <button
                        key={`item-type-${index}`}
                        className={classNames('subtype-tab', {
                          active: itemType === selectedSubType,
                        })}
                        onClick={() => setSelectedSubType(itemType)}
                      >
                        {itemType}
                      </button>
                    ))
                  : currencyTypes.map((itemType, index) => (
                    <button
                      key={`currency-type-${index}`}
                      className={classNames('subtype-tab', {
                        active: itemType === selectedSubType,
                      })}
                      onClick={() => setSelectedSubType(itemType)}
                    >
                      {itemType}
                    </button>
                  ))
                  }
              </div>
            ) : (
              <div className='d-flex justify-content-start align-items-center'>
                <ApplyButton
                  className={'m-2'}
                  inactive={selectedInventories.length === 0}
                  onClick={() => confirmSellSalvage(mode)(selectedInventories)}
                >
                  Confirm {mode === 'sell' ? 'Sell' : 'Salvage'}
                </ApplyButton>
                {mode === 'sell' ? (
                  <Image
                    src='/images/v2/currencies/Gold.png'
                    style={{ width: '50px', margin: '5px' }}
                  />
                ) : (
                  <Image
                    src='/images/v2/currencies/Salvage.png'
                    style={{ width: '50px', margin: '5px' }}
                  />
                )}
                {mode === 'sell'
                  ? `+${selectedInventories
                      .map(
                        (inv) =>
                          (inv.gold || 0) *
                          (inv.inv_type === 'item' ? 1 : inv.quantity || 0),
                      )
                      .reduce((a, b) => a + b, 0)}`
                  : `+${selectedInventories
                      .map(
                        (inv) =>
                          (inv.salvage || 0) *
                          (inv.inv_type === 'item' ? 1 : inv.quantity || 0),
                      )
                      .reduce((a, b) => a + b, 0)}`}
              </div>
            )}
            <div className='flex-grow-1'></div>
            {
              selectedType !== inventoryTypes[2]
              ? <div className='d-flex justify-content-end align-items-center'>
                <ApplyButton
                  className={classNames('m-1', {
                    'unequip-btn': mode === 'salvage',
                  })}
                  style={{ minWidth: '90px' }}
                  onClick={() => {
                    if (mode === 'salvage') cancelSound()
                    setMode(mode === 'salvage' ? null : 'salvage')
                  }}
                >
                  {mode === 'salvage' ? 'Cancel' : 'Salvage'}
                </ApplyButton>
                <ApplyButton
                  className={classNames('m-1', {
                    'unequip-btn': mode === 'sell',
                  })}
                  style={{ minWidth: '90px' }}
                  onClick={() => {
                    if (mode === 'sell') cancelSound()
                    setMode(mode === 'sell' ? null : 'sell')
                  }}
                >
                  {mode === 'sell' ? 'Cancel' : 'Sell'}
                </ApplyButton>
              </div>
              : null
            }            
          </div>
          <div className='d-flex justify-content-start align-items-start flex-wrap custom-scroll inventories-container'>
            {inventories.map((inv) =>
              fetchedType === 'resource' ? (
                !!inv.is_folder ? (
                  <NewLayoutResourceFolder
                    key={inv.id}
                    inventory={inv}
                    style={{ margin: '8px' }}
                    checked={
                      !!selectedInventories.find(
                        (sinv) =>
                          sinv.id === inv.id &&
                          sinv.inv_id === inv.inv_id &&
                          sinv.inv_type === inv.inv_type &&
                          sinv.is_folder === inv.is_folder,
                      )
                    }
                    onClick={() =>
                      !!mode ? handlePushInventory(inv) : setInventory(inv)
                    }
                    onDoubleClick={() =>
                      !!mode ? handlePushInventory(inv) : setResource(inv)
                    }
                  />
                ) : (
                  <NewLayoutResourceItem
                    key={inv.inv_id}
                    inventory={inv}
                    style={{ margin: '8px' }}
                    checked={
                      !!selectedInventories.find(
                        (sinv) =>
                          sinv.id === inv.id &&
                          sinv.inv_id === inv.inv_id &&
                          sinv.inv_type === inv.inv_type &&
                          sinv.is_folder === inv.is_folder,
                      )
                    }
                    onClick={() =>
                      !!mode ? handlePushInventory(inv) : setInventory(inv)
                    }
                    onApeDoubleClick={() =>
                      navigate('/characters/list', {
                        state: {
                          ape_id: inv.ape_id,
                        },
                      })
                    }
                  />
                )
              ) : fetchedType === 'item' ? (
                <NewLayoutInventoryItem
                  key={inv.inv_id}
                  inventory={inv}
                  active={inv.inv_id === inventory?.inv_id}
                  style={{ margin: '8px' }}
                  checked={
                    !!selectedInventories.find(
                      (sinv) =>
                        sinv.id === inv.id &&
                        sinv.inv_id === inv.inv_id &&
                        sinv.inv_type === inv.inv_type &&
                        sinv.is_folder === inv.is_folder,
                    )
                  }
                  onClick={() =>
                    !!mode && !inv.mission_equip
                      ? handlePushInventory(inv)
                      : setInventory(inv)
                  }
                  onApeDoubleClick={() =>
                    navigate('/characters/list', {
                      state: {
                        ape_id: inv.ape_id,
                      },
                    })
                  }
                  equip
                />
              ) : fetchedType === 'currency' ? (
                <NewLayoutCurrencyItem
                  key={inv.inv_id}
                  currency={inv}
                  style={{ margin: '8px' }}
                />
              ) : null,
            )}
            {!!loading ? <Loading isLoading={loading} /> : null}
            {!!isMoreAvailable && !loading ? (
              <Waypoint
                onEnter={() => {
                  fetchMore({
                    type:
                      selectedType === inventoryTypes[0] ? 'resource' : 'item',
                    subType:
                      selectedType === inventoryTypes[0]
                        ? selectedSubType
                        : selectedSubType.toLowerCase(),
                    after: inventories.length,
                    count: pageSize,
                    resourceId: resource?.id || '',
                  })
                }}
              />
            ) : null}
          </div>
        </div>
        <div
          className='d-flex flex-column'
          style={{ minWidth: '420px', minHeight: 'calc(100vh - 265px)' }}
        >
          <div className='custom-border-bottom mb-4'>
            <h2 className='tab-title'>ITEM DETAILS</h2>
          </div>
          <div
            className={classNames('pb-4 flex-grow-1', {
              'custom-border-bottom': selectedType === inventoryTypes[1],
            })}
          >

            {!!inventory && (
              <ItemDetailsCard
                item={{
                  icon: inventory?.icon,
                  name: inventory?.name,
                  rarity: inventory?.rarity,
                  effect:inventory?.effect,
                  effect_bonus:inventory?.effect_bonus,
                  efficiency: inventory?.efficiency,
                  max_efficiency: inventory?.item_efficiency,
                  actual_bonus:inventory?.actual_bonus,
                  minimum_efficiency:inventory?.minimum_efficiency,
                  tier: inventory?.tier,
                  description:
                    inventory?.item_detail_description || inventory.description,
                  type: inventory?.type,
                }}
                inventory={inventory}
              />
            )}
            {!inventory && <ItemDetailsCard />}
          </div>
          {selectedType === inventoryTypes[1] ? (
            <div className='d-flex m-2 justify-content-center'>
              <ApplyButton
                className='m-1 px-5'
                onClick={() =>
                  navigate('/characters/repair', {
                    state: {
                      selectedInv: inventory,
                      category: selectedSubType,
                    },
                  })
                }
              >
                Repair
              </ApplyButton>
              <ApplyButton
                className='m-1 px-5'
                onClick={() =>
                  navigate('/characters/limitbreak', {
                    state: {
                      selectedInv: inventory,
                      category: selectedSubType,
                    },
                  })
                }
              >
                Limit Break
              </ApplyButton>
            </div>
          ) : null}
        </div>
      </div>
      <div className='d-flex flex-column h-100 justify-content-between'>
        <div className='d-flex flex-wrap'></div>
        <div className='custom-border-bottom mb-3' />
      </div>
    </div>
  )
}

export default NewLayoutInventoryPage

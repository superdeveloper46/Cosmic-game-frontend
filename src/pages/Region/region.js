import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import useAudio from '../../components/Audio/audio'
import { tabList } from '../../components/TapButtons/tabButtons'
import {
  getApes,
  getPowers,
  setApes,
  setFocusedApe,
  setSelectedApes,
} from '../../slices/apeSlice'
import { getMaps } from '../../slices/mapSlice'
import {
  getMissions,
  setInventoryMission as setMission,
} from '../../slices/missionSlice'
import { fetchCrownedApe } from '../../utils/fetch-crowned-ape'
import { getResources } from '../../slices/resourceSlice'
import { getDifficulties } from '../../slices/missionSlice'
import refetchApeInfos from '../../utils/refetch-ape-infos'
import startMissionForMultipleApes from '../../utils/start-mission-for-multiple-apes'
import getApeDefaultEquippedInventories from '../../utils/get-ape-default-equipped-inventories'
import MessageDialog from '../../components/MessageDialog/message-dialog'
import TopNav from '../../components/TopNav'
import TabButtons from '../../components/TapButtons/tabButtons'
import RegionSelect from '../../components/RegionSelect/region-select'
import MissionSelect from '../../components/MissionSelect/mission-select'
import CharacterSelect from '../../components/CharacterSelect/character-select'
import TabPanel from '../../components/TabPanel/tab-panel'
import InventoryPage from '../../components/InventoryPage/inventory-page'
import NormalButton from '../../components/NormalButton'
import Loading from '../../components/Loading/loading'
import ApplyButton from '../../components/ApplyButton'
import equip from '../../utils/equip'
import ItemDescriptionDialog from '../../components/ItemDescriptionDialog/item-description-dialog'
import {
  refetchInventory,
  setSelectedInventory,
} from '../../slices/inventorySlice'
import { useNavigate } from 'react-router-dom'
import { getAccountResources } from '../../slices/resourceSlice'
import { getAccount } from '../../slices/accountSlice'
import '../../styles/components/rewards-page.scss'
import WalletConnectPage from '../../components/WalletConnectPage'
import { getLevels } from '../../slices/accountSlice'
import { AUDIOLIST } from '../../consts/audio-list'

const Region = () => {
  const startmissionSound = useAudio(AUDIOLIST['MISSION_START_BUTTON'])
  const inactiveSound = useAudio(AUDIOLIST['INACTIVE_BUTTON'])
  const equipSound = useAudio(AUDIOLIST['EQUIP_ITEM_SFX'])
  const unequipSound = useAudio(AUDIOLIST['UNEQUIP_ITEM_SFX'])

  const { publicKey, connected, disconnecting } = useWallet()
  const navigate = useNavigate()

  const missions = useSelector((state) => state.missions.missions)
  const inventoryMission = useSelector(
    (state) => state.missions.inventoryMission,
  )
  const maps = useSelector((state) => state.maps.maps)
  const apes = useSelector((state) => state.apes.apes)
  const account = useSelector((state) => state.accounts.account)
  const selectedApes = useSelector((state) => state.apes.selectedApes)
  const focusedApe = useSelector((state) => state.apes.focusedApe)
  const selectedInventory = useSelector(
    (state) => state.inventories.selectedInventory,
  )
  const powers = useSelector((state) => state.apes.powers)
  const dispatchSetSelectedInventory = (inventory) =>
    dispatch(setSelectedInventory(inventory))
  const dispatch = useDispatch()
  const location = useLocation()
  const accountResources = useSelector(
    (state) => state.resources.accountResources,
  )

  const [selected, setSelected] = useState(tabList[1])
  const [selectedRegion, setSelectedRegion] = useState(maps[0])
  const [inventoryEquips, setInventoryEquips] = useState(
    getApeDefaultEquippedInventories(apes),
  )
  const [loading, setLoading] = useState(false)
  const [isMissionLoading, setIsMissionLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isVisible, setIsVisible] = useState(true)
  const [crownedApeId, setCrownedApeId] = useState(null)
  const [isItemOpen, setIsItemOpen] = useState(false)
  const [isEquip, setIsEquip] = useState(true)
  const [equipLoading, setEquipLoading] = useState(false)
  const [verified, setVerified] = useState(
    !!JSON.parse(localStorage.getItem('verification') || '{}')?.verify,
  )
  const setInventoryMission = (mission) => dispatch(setMission(mission))
  const reloadInventory = (inventory) => dispatch(refetchInventory(inventory))

  useEffect(() => {
    if (selected === tabList[0]) {
      navigate('/characters/list')
    } else if (selected === tabList[2]) {
      navigate('/shop')
    }
  }, [selected])

  useEffect(() => {
    if (
      !!inventoryMission &&
      !inventoryMission.Mission_Item_Rewards &&
      !!maps &&
      maps.length > 0 &&
      !!missions &&
      missions.length > 0
    ) {
      setInventoryMission(
        missions.find((mission) => mission.id === inventoryMission.id),
      )
      setSelectedRegion(maps.find((map) => map.id === inventoryMission.map_id))
    }
  }, [inventoryMission, maps, missions])

  const reloadApes = async (addresses) => {
    if (!addresses) return
    const refetchedApes = await refetchApeInfos(addresses)

    const updatedApes = apes.map((cApe) => {
      const refetchedInfo = refetchedApes.find(
        (fetchedApe) => fetchedApe.address === cApe.gameData.address,
      )

      return {
        ...cApe,
        gameData: !!refetchedInfo ? refetchedInfo : cApe.gameData,
      }
    })

    dispatch(setApes(updatedApes))

    let fApe = updatedApes.find((a) => a.mint === focusedApe.mint)
    if (!!fApe) {
      dispatch(setFocusedApe(fApe))
    }

    const updatedSelectedApes = (selectedApes || []).map((cApe) =>
      (addresses || []).includes(cApe.mint)
        ? updatedApes.find((updatedApe) => updatedApe.mint === cApe.mint) ||
          cApe
        : cApe,
    )
    dispatch(setSelectedApes(updatedSelectedApes))
  }

  const getCrownedApe = async (address) => {
    if (!address) return
    const res = await fetchCrownedApe(address)
    if (res.crownedApe?.id) {
      setCrownedApeId(res.crownedApe?.id)
    } else {
      setCrownedApeId(null)
    }
  }

  const loadApes = async () => {
    setLoading(true)

    if (!apes || apes.length === 0) {
      dispatch(getApes(publicKey))
    }
    await getCrownedApe(publicKey)
    setLoading(false)
  }
  useEffect(() => {
    if (!!publicKey) {
      loadApes()

      if (!account) {
        dispatch(getAccount(publicKey))
        navigate('/')
      }

      const verification = JSON.parse(
        localStorage.getItem('verification') || '{}',
      )
      if (!!verification && !!verification.verify) {
        setVerified(true)
      }

      if (!accountResources || accountResources.length === 0) {
        dispatch(getAccountResources(publicKey))
      }
    } else {
      setVerified(false)
    }
  }, [publicKey])

  useEffect(() => {
    if (!!disconnecting) {
      localStorage.removeItem('verification')
      setVerified(false)
    }
  }, [disconnecting])

  useEffect(() => {
    if (!selectedRegion) {
      setSelectedRegion(maps[0])
    }
  }, [maps])

  useEffect(() => {
    dispatch(getMissions())
    dispatch(getMaps())
    dispatch(getLevels())
    dispatch(getResources())
    dispatch(getDifficulties())

    if (!powers || powers.length === 0) {
      dispatch(getPowers())
    }

    if (location) {
      if (location?.state?.mission) {
        setSelectedRegion(location.state.mission[0].Map)
        setInventoryMission(location?.state?.mission[0])
      } else {
        setSelectedRegion(null)
        setInventoryMission(null)
      }
    }
  }, [])

  useEffect(() => {
    setInventoryEquips(getApeDefaultEquippedInventories(apes))
  }, [apes])

  return (
    <div>
      {!!publicKey && !!verified ? (
        <div>
          {!!isVisible ? (
            <div className='main rewards-wrapper'>
              <TopNav
                crownedApeId={crownedApeId}
                account={account}
                apes={apes}
                selectedApes={selectedApes}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
              />
              <TabPanel>
                <MissionSelect
                  inventoryMission={
                    !!inventoryMission?.Mission_Item_Rewards && inventoryMission
                  }
                  selectedRegion={selectedRegion}
                  setInventoryMission={setInventoryMission}
                  setIsEquip={setIsEquip}
                  setIsItemOpen={setIsItemOpen}
                  selectedInventory={selectedInventory}
                  setSelectedInventory={dispatchSetSelectedInventory}
                />
                <CharacterSelect
                  inventoryMission={
                    !!inventoryMission?.Mission_Item_Rewards && inventoryMission
                  }
                  setIsItemOpen={setIsItemOpen}
                  setIsEquip={setIsEquip}
                  selectedInventory={selectedInventory}
                  setSelectedInventory={dispatchSetSelectedInventory}
                  crownedApeId={crownedApeId}
                  setMessage={setMessage}
                />
                <div
                  className='inventory-page-container d-flex flex-column justify-content-between'
                  style={{ flex: 1, width: '' }}
                >
                  <InventoryPage
                    inventoryMission={
                      !!inventoryMission?.Mission_Item_Rewards &&
                      inventoryMission
                    }
                    ape={
                      selectedApes.length > 0
                        ? selectedApes[selectedApes.length - 1]
                        : null
                    }
                    accountResources={accountResources}
                    setIsEquip={setIsEquip}
                    setIsItemOpen={setIsItemOpen}
                    selectedInventory={selectedInventory}
                    setSelectedInventory={dispatchSetSelectedInventory}
                  />
                  {!!inventoryMission?.Mission_Item_Rewards &&
                    inventoryMission &&
                    selectedApes.length > 0 && (
                      <div className='d-flex align-items-center justify-content-center'>
                        <ApplyButton
                          style={{
                            margin: '0.5rem',
                            padding: '0.5rem',
                            color: 'white',
                            width: '150px',
                            height: '40px',
                            overflow: 'hidden',
                          }}
                          className={`${isEquip ? '' : 'unequip-btn'}`}
                          onClick={() => {
                            const inv_to_refresh =
                              Object.keys(focusedApe).length !== 0
                                ? focusedApe.gameData?.default_items.flatMap(
                                    (di) => di.Inventory.id,
                                  )
                                : selectedApes[
                                    selectedApes.length - 1
                                  ].gameData?.default_items.flatMap(
                                    (di) => di.Inventory.id,
                                  )
                            inv_to_refresh.push(
                              selectedInventory?.selected?.inv_id,
                            )
                            if (!equipLoading && selectedInventory) {
                              if (isEquip) {
                                equipSound()
                                equip({
                                  address:
                                    Object.keys(focusedApe).length > 0
                                      ? focusedApe.mint
                                      : selectedApes[selectedApes.length - 1]
                                          ?.mint,
                                  wallet:
                                    Object.keys(focusedApe).length > 0
                                      ? focusedApe?.gameData?.owner
                                      : selectedApes[selectedApes.length - 1]
                                          ?.gameData?.owner,
                                  inventoryId:
                                    selectedInventory?.selected?.inv_id ||
                                    selectedInventory?.selected?.inv_id,
                                  action: 'equip',
                                  setMessage,
                                  setLoading: setEquipLoading,
                                  callback: () => {
                                    reloadApes([
                                      Object.keys(focusedApe).length !== 0
                                        ? focusedApe?.mint
                                        : selectedApes[selectedApes.length - 1]
                                            ?.mint,
                                      selectedInventory?.selected?.ape_address,
                                    ])
                                    inv_to_refresh.forEach((di) =>
                                      reloadInventory({
                                        inv_id: di,
                                      }),
                                    )

                                    setSelectedInventory({
                                      ...selectedInventory,
                                      selected: null,
                                    })
                                  },
                                })
                              } else {
                                unequipSound()
                                equip({
                                  address:
                                    Object.keys(focusedApe).length !== 0
                                      ? focusedApe?.mint
                                      : selectedApes[selectedApes.length - 1]
                                          ?.mint,
                                  wallet:
                                    Object.keys(focusedApe).length !== 0
                                      ? focusedApe?.gameData?.owner
                                      : selectedApes[selectedApes.length - 1]
                                          ?.gameData?.owner,
                                  inventoryId: selectedInventory?.equipped?.id,
                                  action: 'unequip',
                                  setMessage,
                                  setLoading: setEquipLoading,
                                  callback: () => {
                                    reloadApes([
                                      Object.keys(focusedApe).length !== 0
                                        ? focusedApe?.mint
                                        : selectedApes[selectedApes.length - 1]
                                            ?.mint,
                                      selectedInventory?.selected?.ape_address,
                                    ])
                                    reloadInventory({
                                      inv_id: selectedInventory?.equipped?.id,
                                    })
                                    setSelectedInventory({
                                      ...selectedInventory,
                                      selected: null,
                                    })
                                  },
                                })
                              }
                            }
                          }}
                          inactive={
                            !selectedInventory ||
                            !!selectedInventory?.selected?.mission_equip
                          }
                          key='inventory-modal-equip-button'
                        >
                          {equipLoading ? (
                            <Loading isLoading={equipLoading} sm />
                          ) : isEquip ? (
                            'EQUIP'
                          ) : (
                            'UNEQUIP'
                          )}
                        </ApplyButton>
                        <NormalButton
                          style={{
                            margin: '0.5rem',
                            padding: '0.5rem',
                            width: '150px',
                          }}
                          onClick={() => {
                            if (!isMissionLoading) {
                              startmissionSound()
                              startMissionForMultipleApes({
                                apes: selectedApes,
                                inventoryEquips,
                                mission: inventoryMission,
                                wallet: publicKey,
                                setLoading: setIsMissionLoading,
                                setMessage,
                                cb: () => {
                                  dispatch(getApes(publicKey))
                                  dispatch(getAccount(publicKey))
                                  dispatch(getAccountResources(publicKey))
                                },
                              })
                            } else {
                              inactiveSound()
                            }
                          }}
                          inactive={
                            !inventoryMission ||
                            !selectedApes.length > 0 ||
                            Object.keys(selectedApes[0]).length === 0 ||
                            selectedApes.length > accountResources[8]?.quantity
                          }
                          disabled={
                            !inventoryMission ||
                            !selectedApes.length > 0 ||
                            Object.keys(selectedApes[0]).length === 0 ||
                            selectedApes.length > accountResources[8]?.quantity
                          }
                          key='inventory-modal-start-button'
                        >
                          {isMissionLoading ? (
                            <Loading isLoading={isMissionLoading} sm />
                          ) : (
                            'START MISSION'
                          )}
                        </NormalButton>
                      </div>
                    )}
                </div>
              </TabPanel>
            </div>
          ) : (
            <div className='main'>
              <TopNav
                apes={apes}
                selectedApes={selectedApes}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                setMessage={setMessage}
              />
            </div>
          )}
          <MessageDialog message={message} setMessage={setMessage} />
          <ItemDescriptionDialog
            item={
              isEquip
                ? selectedInventory?.selected?.Item
                : selectedInventory?.equipped?.Item
            }
            inventory={
              isEquip
                ? selectedInventory?.selected
                : selectedInventory?.equipped
            }
            open={isItemOpen}
            setIsItemOpen={setIsItemOpen}
            equipLoading={equipLoading}
            isEquip={isEquip}
            setIsEquip={setIsEquip}
            setSelectedInventory={dispatchSetSelectedInventory}
            apes={apes}
            equip={() => {
              if (isEquip) {
                equipSound()
                equip({
                  address: selectedApes[selectedApes.length - 1]?.mint,
                  wallet:
                    selectedApes[selectedApes.length - 1]?.gameData?.owner,
                  itemId: selectedInventory?.selected.Item.id,
                  action: 'equip',
                  setMessage,
                  setLoading: setEquipLoading,
                  callback: () => {
                    reloadApes([
                      selectedApes[selectedApes.length - 1]?.mint,
                      selectedInventory?.selected?.ape_address,
                    ])
                    setSelectedInventory({
                      ...selectedInventory,
                      selected: null,
                    })
                  },
                })
              } else {
                unequipSound()
                equip({
                  address: selectedApes[selectedApes.length - 1]?.mint,
                  wallet:
                    selectedApes[selectedApes.length - 1]?.gameData?.owner,
                  itemId: selectedInventory?.equipped.Item.id,
                  action: 'unequip',
                  setMessage,
                  setLoading: setEquipLoading,
                  callback: () => {
                    reloadApes([
                      selectedApes[selectedApes.length - 1]?.mint,
                      selectedInventory?.selected?.ape_address,
                    ])
                    setSelectedInventory({
                      ...selectedInventory,
                      selected: null,
                    })
                  },
                })
              }
            }}
          />
          <Loading isLoading={loading} fullScreen className='text-primary' />
        </div>
      ) : (
        <WalletConnectPage callback={setVerified} />
      )}
    </div>
  )
}

export default Region

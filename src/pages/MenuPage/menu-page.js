import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  getApes,
  getEvolutionCosts,
  getPowerEffects,
  getPowers,
  setApes,
  setSelectedApes,
} from '../../slices/apeSlice'
import {
  crownApe,
  fetchCrownedApe,
  unCrownApe,
} from '../../utils/fetch-crowned-ape'
import ItemDescriptionDialog from '../../components/ItemDescriptionDialog/item-description-dialog'
import refetchApeInfos from '../../utils/refetch-ape-infos'
import TopNav from '../../components/TopNav'
import LeftPanel from '../../components/LeftPanel/left-panel'
import PanelDivider from '../../components/PanelDivider/panel-divider'
import MiddlePanel from '../../components/MiddlePanel/middle-panel'
import RightPanel from '../../components/RightPanel/right-panel'

import '../../styles/components/rewards-page.scss'
import MessageDialog from '../../components/MessageDialog/message-dialog'
import {
  getLimitBreakResources,
  getRepairCosts,
  setSelectedInventory,
  setSelectedRecipe,
} from '../../slices/inventorySlice'
import { getAccount } from '../../slices/accountSlice'
import { getAccountResources, getResources } from '../../slices/resourceSlice'
import { getLevels } from '../../slices/levelSlice'
import VideoPlayer from '../../components/VideoPlayer/video-player'
import WalletConnectPage from '../../components/WalletConnectPage'
import NewLayoutInventoryPage from '../../components/NewLayoutInventoryPage/new-layout-inventory-page'
import fetchAccountResources from '../../utils/fetch-account-resources'
import { setDetailImage, setSelectedItem } from '../../slices/ItemDialogSlice'

export const equipmentTypes = ['Trinket', 'Jewelry', 'Footwear']

const MenuPage = ({ tab }) => {
  const { publicKey, disconnecting } = useWallet()

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const apes = useSelector((state) => state.apes.apes)
  const account = useSelector((state) => state.accounts.account)
  const selectedApes = useSelector((state) => state.apes.selectedApes)
  const ape = useSelector((state) => state.apes.selectedApes[0])
  const selectedInventory = useSelector(
    (state) => state.inventories.selectedInventory,
  )
  const selectedRecipe = useSelector(
    (state) => state.inventories.selectedRecipe,
  )
  const limitBreeakRecipes = useSelector(
    (state) => state.inventories.limitBreeakRecipes,
  )
  const accountResources = useSelector(
    (state) => state.resources.accountResources,
  )
  const resources = useSelector((state) => state.resources.resources)
  const levels = useSelector((state) => state.levels.levels)
  const repairCosts = useSelector((state) => state.inventories.repairCosts)
  const evolutionCosts = useSelector((state) => state.apes.evolutionCosts)
  const powerEffects = useSelector((state) => state.apes.powerEffects)
  const powers = useSelector((state) => state.apes.powers)

  const [selected, setSelected] = useState()
  const [crownedApeId, setCrownedApeId] = useState(null)
  const [selectedForgeInventory, setSelectedForgeInv] = useState(null)
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [selectedRepairInventory, setSelectedRepairInv] = useState(null)
  const [selectedRepairMaterials, setSelectedRepairMaterials] = useState([])
  const [isItemOpen, setIsItemOpen] = useState(false)
  const [message, setMessage] = useState(null)
  const [video, setVideo] = useState(null)
  const [selectedSubType, setSelectedSubType] = useState(equipmentTypes[0])
  const [verified, setVerified] = useState(
    !!JSON.parse(localStorage.getItem('verification') || '{}')?.verify,
  )
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

  const setApe = (newApe) => dispatch(setSelectedApes([newApe]))

  const dispatchSetSelectedInventory = (inventory) =>
    dispatch(setSelectedInventory(inventory))
  const dispatchSetSelectedRecipe = (recipe) =>
    dispatch(setSelectedRecipe(recipe))

  const gotoLeftApe = () => {
    if (apes.length === 0) return

    const apeIndex = apes.findIndex((cApe) => cApe === ape)
    if (apeIndex === -1) return

    setApe(apes[(apeIndex - 1 + apes.length) % apes.length])
    dispatchSetSelectedInventory(null)
    dispatchSetSelectedRecipe(null)
    setSelectedForgeInv(null)
    setSelectedMaterials([])
    setSelectedRepairInv(null)
    setSelectedRepairMaterials([])
  }

  const gotoRightApe = () => {
    if (apes.length === 0) return

    const apeIndex = apes.findIndex((cApe) => cApe === ape)
    if (apeIndex === -1) return

    setApe(apes[(apeIndex + 1) % apes.length])

    dispatchSetSelectedInventory(null)
    dispatchSetSelectedRecipe(null)
    setSelectedForgeInv(null)
    setSelectedMaterials([])
    setSelectedRepairInv(null)
    setSelectedRepairMaterials([])
  }

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

    const updatedSelectedApes = (selectedApes || []).map((cApe) =>
      (addresses || []).includes(cApe.mint)
        ? updatedApes.find((updatedApe) => updatedApe.mint === cApe.mint) ||
          cApe
        : cApe,
    )
    dispatch(setSelectedApes(updatedSelectedApes))
  }

  const crown = async (address, apeId) => {
    const res = await crownApe(address, apeId)
    if (res?.crownedApe?.id) setCrownedApeId(res.crownedApe.id)
  }

  const uncrown = async (address, apeId) => {
    const res = await unCrownApe(address, apeId)
    if (res.msg === 'Success') setCrownedApeId(null)
  }

  const switchCrown = async (apeId) => {
    if (crownedApeId === apeId) {
      await uncrown(publicKey, apeId).catch((err) => console.log(err))
    } else {
      await crown(publicKey, apeId).catch((err) => console.log(err))
    }
  }

  const getCrownedApe = async (address) => {
    if (!address) return
    const res = await fetchCrownedApe(address)
    if (res?.crownedApe?.id) {
      setCrownedApeId(res.crownedApe.id)
    } else {
      setCrownedApeId(null)
    }
  }

  const handleSelectResource = (resource) => {
    setIsItemOpen(true)
    dispatch(setDetailImage(null))
    dispatch(setSelectedItem(resource))
  }

  useEffect(() => {
    if (!!publicKey) {
      if (!apes || apes.length === 0) {
        dispatch(getApes(publicKey))
      }

      if (!account) {
        dispatch(getAccount(publicKey))
        navigate('/')
      }

      getCrownedApe(publicKey)

      if (!accountResources || accountResources.length === 0) {
        dispatch(getAccountResources(publicKey))
      }

      if (!limitBreeakRecipes || limitBreeakRecipes.length === 0) {
        dispatch(getLimitBreakResources())
      }

      if (!resources || resources.length === 0) {
        dispatch(getResources())
      }

      if (!levels || levels.length === 0) {
        dispatch(getLevels())
      }

      if (!repairCosts || repairCosts.length === 0) {
        dispatch(getRepairCosts())
      }

      if (!evolutionCosts || evolutionCosts.length === 0) {
        dispatch(getEvolutionCosts())
      }

      if (!powerEffects || powerEffects.length === 0) {
        dispatch(getPowerEffects())
      }

      if (!powers || powers.length === 0) {
        dispatch(getPowers())
      }

      const verification = JSON.parse(
        localStorage.getItem('verification') || '{}',
      )
      if (!!verification && !!verification.verify) {
        setVerified(true)
      }
    } else {
      setVerified(false)
    }
  }, [publicKey])

  useEffect(() => {
    if (location) {
      if (location?.state?.inventory) {
        dispatchSetSelectedInventory(location?.state?.inventory)
        if (
          location?.state?.inventory?.equipped?.Item?.category !==
          selectedSubType.toLowerCase()
        ) {
          setSelectedSubType(
            capitalize(location?.state?.inventory?.equipped?.Item?.category),
          )
        }
      } else if (location?.state?.category) {
        if (location?.state?.category !== selectedSubType.toLowerCase()) {
          setSelectedSubType(capitalize(location?.state?.category))
          dispatchSetSelectedInventory(null)
        }
      }

      if (location?.state?.ape_id) {
        setApe(apes.find((ape) => ape.gameData.id === location?.state?.ape_id))
      } else {
        if (!ape) setApe(apes[0])
      }
    } else {
      if (!ape) setApe(apes[0])
    }
  }, [location, apes])

  useEffect(() => {
    if (!!disconnecting) {
      localStorage.removeItem('verification')
      setVerified(false)
    }
  }, [disconnecting])

  useEffect(() => {
    const dItem = (ape?.gameData?.default_items || []).find(
      (dItem) =>
        dItem?.Inventory?.Item?.category === selectedSubType.toLowerCase(),
    )
    if (dItem) {
      dispatchSetSelectedInventory({
        ...(selectedInventory || {}),
        equipped: dItem.Inventory,
      })
    } else {
      dispatchSetSelectedInventory({
        ...(selectedInventory || {}),
        equipped: null,
      })
    }
  }, [selectedSubType, ape])

  return (
    <div>
      {!!publicKey && !!verified ? (
        <div className='main rewards-wrapper'>
          <TopNav
            crownedApeId={crownedApeId}
            account={account}
            apes={apes}
            selectedApes={selectedApes}
            setMessage={setMessage}
          />
          {!!ape && Object.keys(ape).length > 0 ? (
            <div className='ape-profile-dialog-container'>
              <div className='ape-profile-container'>
                {tab !== 'Inventory' ? (
                  <div className='d-flex h-100'>
                    <LeftPanel
                      ape={ape}
                      tab={tab}
                      selected={selected}
                      setSelected={setSelected}
                      selectedInventory={selectedInventory}
                      setSelectedInventory={dispatchSetSelectedInventory}
                      apes={apes}
                      crownedApeId={crownedApeId}
                      limitBreeakRecipes={limitBreeakRecipes}
                      selectedRecipe={selectedRecipe}
                      setSelectedRecipe={dispatchSetSelectedRecipe}
                      selectedForgeInventory={selectedForgeInventory}
                      setSelectedForgeInv={setSelectedForgeInv}
                      selectedMaterials={selectedMaterials}
                      setSelectedMaterials={setSelectedMaterials}
                      selectedRepairInventory={selectedRepairInventory}
                      setSelectedRepairInv={setSelectedRepairInv}
                      selectedRepairMaterials={selectedRepairMaterials}
                      setSelectedRepairMaterials={setSelectedRepairMaterials}
                      setSelectedResource={handleSelectResource}
                      selectedSubType={selectedSubType}
                      setSelectedSubType={setSelectedSubType}
                    />
                    <PanelDivider vertically />
                    <MiddlePanel
                      ape={ape}
                      gotoLeftApe={gotoLeftApe}
                      gotoRightApe={gotoRightApe}
                      crownedApeId={crownedApeId}
                      switchCrown={switchCrown}
                      reloadApes={reloadApes}
                      reloadAccount={() => dispatch(getAccount(publicKey))}
                      tab={tab}
                      setMessage={setMessage}
                      selectedInventory={selectedInventory}
                      setSelectedItem={handleSelectResource}
                      setSelectedInventory={(item) => {
                        dispatchSetSelectedInventory(item)
                        if (
                          item?.equipped?.Item?.category !==
                          selectedSubType.toLowerCase()
                        ) {
                          setSelectedSubType(
                            capitalize(item?.equipped?.Item?.category),
                          )
                        }
                      }}
                      selectedForgeInventory={selectedForgeInventory}
                      setSelectedForgeInv={setSelectedForgeInv}
                      selectedMaterials={selectedMaterials}
                      setSelectedMaterials={setSelectedMaterials}
                      selectedRecipe={selectedRecipe}
                      setSelectedRecipe={dispatchSetSelectedRecipe}
                      selectedRepairInventory={selectedRepairInventory}
                      setSelectedRepairInv={setSelectedRepairInv}
                      selectedRepairMaterials={selectedRepairMaterials}
                      setSelectedRepairMaterials={setSelectedRepairMaterials}
                    />
                    <PanelDivider vertically />
                    <RightPanel
                      ape={ape}
                      apes={apes}
                      tab={tab}
                      setMessage={setMessage}
                      setVideo={setVideo}
                      reloadApes={reloadApes}
                      selectedInventory={selectedInventory}
                      setSelectedInventory={dispatchSetSelectedInventory}
                      selectedRecipe={selectedRecipe}
                      selectedMaterials={selectedMaterials}
                      selectedForgeInventory={selectedForgeInventory}
                      setSelectedRecipe={dispatchSetSelectedRecipe}
                      selectedRepairInventory={selectedRepairInventory}
                      setSelectedRepairInv={setSelectedRepairInv}
                      selectedRepairMaterials={selectedRepairMaterials}
                      setSelectedRepairMaterials={setSelectedRepairMaterials}
                    />
                  </div>
                ) : (
                  <div className='d-flex h-100'>
                    <NewLayoutInventoryPage setMessage={setMessage} />
                  </div>
                )}
              </div>
            </div>
          ) : null}
          <MessageDialog message={message} setMessage={setMessage} />
          <VideoPlayer info={video} onClose={() => setVideo(null)} />
          <ItemDescriptionDialog
            open={isItemOpen}
            isEquip={true}
            setIsItemOpen={setIsItemOpen}
          />
        </div>
      ) : (
        <WalletConnectPage callback={setVerified} />
      )}
    </div>
  )
}

export default MenuPage

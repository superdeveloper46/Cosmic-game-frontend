import React, { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCrownedApe } from '../../utils/fetch-crowned-ape'
import fetchItems from '../../utils/fetch-items'
import fetchLimitBreakRecipes from '../../utils/fetch-limit-break-recipes'
import { getApes, getPowers, setSelectedApes } from '../../slices/apeSlice'
import { getAccount, getLevels } from '../../slices/accountSlice'
import BottomNav from '../BottomNav'
import TopNav from '../TopNav'
import WalletConnectPage from '../WalletConnectPage'
import PreviewDialog from '../PreviewDialog/preview-dialog'
import MessageDialog from '../MessageDialog/message-dialog'
import Loading from '../Loading/loading'
import RewardsDialog from '../RewardsDialog/rewards-dialog'
import GameMap from '../GameMap/game-map'
import ItemDescriptionDialog from '../ItemDescriptionDialog/item-description-dialog'
import { setSelectedInventory } from '../../slices/inventorySlice'
import './index.css'
import fetchCurrencies from '../../utils/fetch-currencies'
import { getResources } from '../../slices/resourceSlice'
import { getMissions } from '../../slices/missionSlice'
import {getCurrencies} from "../../slices/curencySlice";

const Home = () => {
  const { publicKey, connected, disconnecting } = useWallet()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const account = useSelector((state) => state.accounts.account)
  const levels = useSelector((state) => state.accounts.levels)
  const apes = useSelector((state) => state.apes.apes)
  const currencies  = useSelector((state) => state.currencies.currencies )
  const selectedApes = useSelector((state) => state.apes.selectedApes)
  const resources = useSelector((state) => state.resources.resources)
  const missions = useSelector((state) => state.missions.missions)
  const powers = useSelector((state) => state.apes.powers)
  const selectedInventory = useSelector(
    (state) => state.inventories.selectedInventory,
  )
  const dispatchSetSelectedInventory = (inventory) =>
    dispatch(setSelectedInventory(inventory))


  const [craftRecipes, setCraftRecipes] = useState([])
  const [items, setItems] = useState([])
  const [legendaries, setLegendaries] = useState([])
  const [loading, setLoading] = useState(false)
  const [isItemOpen, setIsItemOpen] = useState(false)
  const [isEquip, setIsEquip] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [crownedApeId, setCrownedApeId] = useState(null)
  const [missionListDialogOpen, setMissionListDialogOpen] = useState(false)
  const [preview, setPreview] = useState(null)
  const [inventoryMission, setInventoryMission] = useState(null)
  const [rewards, setRewards] = useState(null)
  const [message, setMessage] = useState(null)
  const [verified, setVerified] = useState(
    !!JSON.parse(localStorage.getItem('verification') || '{}')?.verify 
    && !!publicKey 
    && publicKey.toBase58() === JSON.parse(localStorage.getItem('verification') || '{}')?.publicKey
  )

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
      await dispatch(getApes(publicKey))
    }
    await getCrownedApe(publicKey)
    setLoading(false)
  }

  useEffect(() => {
    if (!!publicKey) {
      loadApes()

      if (!account) {
        dispatch(getAccount(publicKey))
      }

      const verification = JSON.parse(
        localStorage.getItem('verification') || '{}',
      )
      if (
        !!verification 
        && !!verification.verify
        && publicKey.toBase58() === verification.publicKey
      ) {
        setVerified(true)
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
    if(!missions || missions.length===0) {
      dispatch(getMissions())
    }

    if(!levels || levels.length===0) {
      dispatch(getLevels())
    }
    if(!currencies || currencies.length===0){
      dispatch(getCurrencies())
    }
    fetchItems().then((fetchedItems) => setItems(fetchedItems))
    fetchLimitBreakRecipes().then((fetchedCraftRecipes) =>
      setCraftRecipes(fetchedCraftRecipes),
    )

    if (!resources || resources.length === 0) {
      dispatch(getResources())
    }

    if (!powers || powers.length === 0) {
      dispatch(getPowers())
    }
  }, [])

  useEffect(() => {
    if (!!inventoryMission && !missionListDialogOpen) {
      setMissionListDialogOpen(true)
    }
  }, [inventoryMission])

  return (
    <div>
      {!!publicKey && !!verified ? (
        !!isVisible ? (
          <div className='main'>
            <TopNav
              crownedApeId={crownedApeId}
              account={account}
              apes={apes}
              selectedApes={selectedApes}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              setMessage={setMessage}
            />
            <div
              className='content-wrapper'
              style={{ flexDirection: 'column', color: 'white' }}
            >
              <GameMap missions={missions}  />
              <PreviewDialog
                preview={preview}
                setPreview={setPreview}
                setInventoryMission={setInventoryMission}
              />
              <RewardsDialog
                open={!!rewards}
                rewards={rewards}
                resources={resources}
                currencies={currencies}
                onCloseParentAlso={() => {
                  setRewards(null)
                }}
                onClick={(e) => {
                  navigate('/characters/list', { state: { ape_id: e.id } })
                }}
                setIsItemOpen={setIsItemOpen}
                isEquip={isEquip}
                setIsEquip={setIsEquip}
                setSelectedInventory={dispatchSetSelectedInventory}
              />
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
                isEquip={isEquip}
                setIsEquip={setIsEquip}
                setSelectedInventory={dispatchSetSelectedInventory}
                apes={apes}
              />
            </div>
            <BottomNav
              apes={apes}
              items={items}
              crownedApeId={crownedApeId}
              legendaries={legendaries}
              resources={resources}
              setMissionListDialogOpen={setMissionListDialogOpen}
              setPreview={setPreview}
              setMessage={setMessage}
              setRewards={setRewards}
              reloadApes={() => dispatch(getApes(publicKey))}
              reloadAccount={() => dispatch(getAccount(publicKey))}
              setProfileApe={(e) => {
                dispatch(setSelectedApes([e]))
                navigate('/characters/list')
              }}
              open={isItemOpen}
              setIsItemOpen={setIsItemOpen}
              isEquip={isEquip}
              setIsEquip={setIsEquip}
              setSelectedInventory={dispatchSetSelectedInventory}
            />
          </div>
        ) : (
          <div className='main'>
            <TopNav
              apes={apes}
              selectedApes={selectedApes}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
            />
          </div>
        )
      ) : (
        <>
          <WalletConnectPage callback={setVerified} setMessage={ setMessage } />
          <MessageDialog message={message} setMessage={setMessage} />
        </>
      )}
      <Loading isLoading={loading} fullScreen className='text-primary' />
    </div>
  )
}

export default Home

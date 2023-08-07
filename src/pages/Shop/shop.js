import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'
import ShopContent from './ShopContent/shop-content'
import { tabList } from '../../components/TapButtons/tabButtons'
import { getApes, getPowers, setSelectedApes } from '../../slices/apeSlice'
import { fetchCrownedApe } from '../../utils/fetch-crowned-ape'
import LeftSideBar from './LeftSide/shop-left-side'
import TopNav from '../../components/TopNav'
import TabButtons from '../../components/TapButtons/tabButtons'
import MessageDialog from '../../components/MessageDialog/message-dialog'
import { getLimitBreakResources } from '../../slices/inventorySlice'
import { getAccount,getShopRefreshTimes } from '../../slices/accountSlice'
import { getResources } from '../../slices/resourceSlice'
import { getLevels } from '../../slices/levelSlice'
import getShopToken from '../../utils/shop-get-token'
import getShopItems from '../../utils/fetch-shop'


import '../../styles/components/shop.scss'
import WalletConnectPage from '../../components/WalletConnectPage'

const ShopPage = () => {
  const { publicKey, connected, disconnecting } = useWallet()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const apes = useSelector((state) => state.apes.apes)
  const account = useSelector((state) => state.accounts.account)
  const shopRefreshTimes = useSelector((state) => state.accounts.shopRefreshTimes)
  const selectedApes = useSelector((state) => state.apes.selectedApes)
  const ape = useSelector((state) => state.apes.selectedApes[0])
  const limitBreakRecipes = useSelector((state) => state.inventories.limitBreakRecipes)
  const resources = useSelector((state) => state.resources.resources)
  const levels = useSelector((state) => state.levels.levels)
  const powers = useSelector((state) => state.apes.powers)
  const setApe = (newApe) => dispatch(setSelectedApes([newApe]))

  const [selected, setSelected] = useState(tabList[3])
  const [crownedApeId, setCrownedApeId] = useState(null)
  const [tab, setTab] = useState('COSMIC')
  const [message, setMessage] = useState(null)
  const [shopItems, setShopItems] = useState(null)
  const [verified, setVerified] = useState(!!JSON.parse(localStorage.getItem('verification') || '{}')?.verify)

  useEffect(() => {
    if (selected === tabList[1]) {
      navigate('/region')
    } else if (selected === tabList[0]) {
      navigate('/characters/list')
    }
  }, [selected])

  const getCrownedApe = async (address) => {
    if (!address) return
    const res = await fetchCrownedApe(address)
    if (res?.crownedApe?.id) {
      setCrownedApeId(res.crownedApe.id)

      if (!ape) {
        setApe(apes.find((ape) => ape.id === res.crownedApe.id))
      }
    } else {
      setCrownedApeId(null)
    }
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

      if (!limitBreakRecipes || limitBreakRecipes.length === 0) {
        dispatch(getLimitBreakResources())
      }



      if (!resources || resources.length === 0) {
        dispatch(getResources())
      }

      if (!levels || levels.length === 0) {
        dispatch(getLevels())
      }

      if (!powers || powers.length === 0) {
        dispatch(getPowers())
      }


    }
  }, [publicKey])


  useEffect(() => {
    getShopItems().then(shop => setShopItems(shop))
    dispatch(getShopRefreshTimes())
  }, [])

  return !!publicKey && !!verified ? (
    <div className='main rewards-wrapper'>
      <TopNav
        crownedApeId={crownedApeId}
        account={account}
        apes={apes}
        selectedApes={selectedApes}
        setMessage={setMessage}
      />
      <div className='shop-page-container'>
        <LeftSideBar tab={tab} setTab={setTab} />
        <ShopContent tab={tab} setTab={setTab} shopItems={shopItems} setMessage={setMessage}/>
      </div>
      <MessageDialog message={message} setMessage={setMessage} />
    </div>
  ) : <WalletConnectPage callback={ setVerified } />
}

export default ShopPage

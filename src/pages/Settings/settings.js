import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SettingsContent from './SettingsContent/settings-content'
import { getApes, getPowers, setSelectedApes } from '../../slices/apeSlice'
import { fetchCrownedApe } from '../../utils/fetch-crowned-ape'
import LeftSideBar from './LeftSide/settings-left-side'
import TopNav from '../../components/TopNav'
import BreadCrumb from '../../components/BreadCrumb/breadcrumb'
import MessageDialog from '../../components/MessageDialog/message-dialog'
import { getLimitBreakResources } from '../../slices/inventorySlice'
import { getAccount } from '../../slices/accountSlice'
import { getResources } from '../../slices/resourceSlice'
import { getLevels } from '../../slices/levelSlice'
import '../../styles/components/shop.scss'
import WalletConnectPage from '../../components/WalletConnectPage'

const Settings = ({ tab }) => {
  const { publicKey, connected, disconnecting } = useWallet()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const apes = useSelector((state) => state.apes.apes)
  const account = useSelector((state) => state.accounts.account)
  const selectedApes = useSelector((state) => state.apes.selectedApes)
  const ape = useSelector((state) => state.apes.selectedApes[0])
  const craftRecipes = useSelector((state) => state.inventories.craftRecipes)
  const resources = useSelector((state) => state.resources.resources)
  const levels = useSelector((state) => state.levels.levels)
  const powers = useSelector((state) => state.apes.powers)
  const setApe = (newApe) => dispatch(setSelectedApes([newApe]))

  const [crownedApeId, setCrownedApeId] = useState(null)
  const [message, setMessage] = useState(null)
  const [verified, setVerified] = useState(!!JSON.parse(localStorage.getItem('verification') || '{}')?.verify)

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

      if (!craftRecipes || craftRecipes.length === 0) {
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
    if (!!disconnecting) {
      localStorage.removeItem('verification')
      setVerified(false)
    }
  }, [disconnecting])

  return !!publicKey && !!verified ? (
    <div className='main rewards-wrapper'>
      <TopNav
        crownedApeId={crownedApeId}
        account={account}
        apes={apes}
        selectedApes={selectedApes}
      />
      <div className='settings-page-container d-flex'>
        <LeftSideBar tab={tab} />
        <SettingsContent
          tab={tab}
          crownedApeId={crownedApeId}
          account={publicKey}
          apes={apes}
          selectedApes={selectedApes}
        />
      </div>
      <MessageDialog message={message} setMessage={setMessage} />
    </div>
  ) : (
    <WalletConnectPage callback={setVerified} />
  )
}

export default Settings

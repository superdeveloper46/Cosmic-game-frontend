import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import './index.css'
import '../../../src/styles/components/_navigation.scss'
import Avatar from '../Avatar'
import ApeInfo from '../ApeInfo'
import { useLocation } from 'react-router-dom'
import WalletInfo from '../WalletInfo'
import { crownFrames } from '../../pages/Settings/SettingsContent/Account/account'
import { Button, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import MenuBox from '../MenuBox/menu-box'
import BankDialog from '../BankDialog/bank-dialog'
import GuideModal from '../GuideModal/guide-modal'
import HelpButton from '../HelpButton'

const TopNav = ({ crownedApeId, account, apes, selectedApes, setMessage }) => {
  const menuRef = useRef(null)
  const backSound = useAudio(AUDIOLIST['EXIT_BACK_BUTTON'])
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])
  const [crownedApe, setCrownedApe] = useState(null)
  const [isBankOpen, setIsBankOpen] = useState(false)
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const accountInfo = useSelector((state) => state.accounts.account)
  const [page, setPage] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      if (isMenuOpen) setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false)

    return () => {
      document.removeEventListener('click', handleClickOutside, false)
    }
  })

  useEffect(() => {
    if (crownedApeId) {
      setCrownedApe(apes.filter((ape) => ape.gameData.id === crownedApeId)[0])
    }
  }, [crownedApeId, apes])

  useEffect(() => {
    if (location) {
      const path = location.pathname.split('/')
      setPage(path[path.length - 1])
    }
  }, [location])

  const showGuide = () => {
    setIsGuideOpen(true)
  }

  return (
    <div className="top-nav navbar-small-screen d-flex">
      <div className="d-flex">
        {page === 'list' ? (
          <div className="d-flex align-items-center">
            <Button
              className="btn-back"
              onClick={() => {
                backSound()
                navigate('/')
              }}
            >
              <Image src="/images/move_left.png" alt="back" className="mx-2" />
            </Button>
            <h2 className="mb-0 back-title">Character List</h2>
          </div>
        ) : page === 'ascension' ? (
          <div className="d-flex align-items-center">
            <Button
              className="btn-back"
              onClick={() => {
                backSound()
                navigate('/characters/list')
              }}
            >
              <Image src="/images/move_left.png" alt="back" className="mx-2" />
            </Button>
            <h2 className="mb-0 back-title">Ascension</h2>
          </div>
        ) : page === 'level' ? (
          <div className="d-flex align-items-center">
            <Button
              className="btn-back"
              onClick={() => {
                backSound()
                navigate('/characters/list')
              }}
            >
              <Image src="/images/move_left.png" alt="back" className="mx-2" />
            </Button>
            <h2 className="mb-0 back-title">Level</h2>
          </div>
        ) : page === 'equip' ? (
          <div className="d-flex align-items-center">
            <Button
              className="btn-back"
              onClick={() => {
                backSound()
                navigate('/characters/list')
              }}
            >
              <Image src="/images/move_left.png" alt="back" className="mx-2" />
            </Button>
            <h2 className="mb-0 back-title">Equip</h2>
          </div>
        ) : page === 'repair' ? (
          <div className="d-flex align-items-center">
            <Button
              className="btn-back"
              onClick={() => {
                backSound()
                navigate('/characters/inventory')
              }}
            >
              <Image src="/images/move_left.png" alt="back" className="mx-2" />
            </Button>
            <h2 className="mb-0 back-title">Repair</h2>
          </div>
        ) : page === 'inventory' ? (
          <div className="d-flex align-items-center">
            <Button
              className="btn-back"
              onClick={() => {
                backSound()
                navigate('/')
              }}
            >
              <Image src="/images/move_left.png" alt="back" className="mx-2" />
            </Button>
            <h2 className="mb-0 back-title">Inventory</h2>
          </div>
        ) : page === 'evolution' ? (
          <div className="d-flex align-items-center">
            <Button
              className="btn-back"
              onClick={() => {
                backSound()
                navigate('/characters/list')
              }}
            >
              <Image src="/images/move_left.png" alt="back" className="mx-2" />
            </Button>
            <h2 className="mb-0 back-title">Ascension</h2>
          </div>
        ) : page === 'region' ? (
          <div className="d-flex align-items-center">
            <Button
              className="btn-back"
              onClick={() => {
                backSound()
                navigate('/')
              }}
            >
              <Image src="/images/move_left.png" alt="back" className="mx-2" />
            </Button>
            <h2 className="mb-0 back-title">Select Mission</h2>
          </div>
        ) : page === 'shop' ? (
          <div className="d-flex align-items-center">
            <Button
              className="btn-back"
              onClick={() => {
                backSound()
                navigate('/')
              }}
            >
              <Image src="/images/move_left.png" alt="back" className="mx-2" />
            </Button>
            <h2 className="mb-0 back-title">Shop</h2>
          </div>
        ) : page === 'general' ? (
          <div className="d-flex align-items-center">
            <Button
              className="btn-back"
              onClick={() => {
                backSound()
                navigate('/')
              }}
            >
              <Image src="/images/move_left.png" alt="back" className="mx-2" />
            </Button>
            <h2 className="mb-0 back-title">Settings / General</h2>
          </div>
        ) : page === 'audio' ? (
          <div className="d-flex align-items-center">
            <Button
              className="btn-back"
              onClick={() => {
                backSound()
                navigate('/')
              }}
            >
              <Image src="/images/move_left.png" alt="back" className="mx-2" />
            </Button>
            <h2 className="mb-0 back-title">Settings / Audio</h2>
          </div>
        ) : page === 'account' ? (
          <div className="d-flex align-items-center">
            <Button
              className="btn-back"
              onClick={() => {
                backSound()
                navigate('/')
              }}
            >
              <Image src="/images/move_left.png" alt="back" className="mx-2" />
            </Button>
            <h2 className="mb-0 back-title">Settings / Account</h2>
          </div>
        ) : page === 'key-bindings' ? (
          <div className="d-flex align-items-center">
            <Button
              className="btn-back"
              onClick={() => {
                backSound()
                navigate('/')
              }}
            >
              <Image src="/images/move_left.png" alt="back" className="mx-2" />
            </Button>
            <h2 className="mb-0 back-title">Settings / Key Bindings</h2>
          </div>
        ) : page === 'limitbreak' ? (
          <div className="d-flex align-items-center">
            <Button
              className="btn-back"
              onClick={() => {
                backSound()
                navigate('/characters/inventory')
              }}
            >
              <Image src="/images/move_left.png" alt="back" className="mx-2" />
            </Button>
            <h2 className="mb-0 back-title">Limit Break</h2>
          </div>
        ) : (
          <div className="d-flex">
            <div className="mt-3 ms-3">
              <Avatar
                src={
                  crownedApe ? crownedApe?.info?.image || '' : ''
                  // : selectedApes[0]?.info?.image || apes[0]?.info?.image || ''
                }
                frameSrc={crownFrames[accountInfo?.frame_type]}
                onClick={() => navigate('/settings/account')}
              />
            </div>
            <ApeInfo
              ape={
                crownedApe ? crownedApe || {} : selectedApes[0] || apes[0] || {}
              }
            />
          </div>
        )}

        <div
          className="d-flex align-items-center"
          style={{ marginLeft: '20px' }}
        >
          <HelpButton className="m-2" onClick={showGuide} />
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <WalletInfo
          gold={
            (account?.currencies || []).find(
              (currency) => currency.Currency.name === 'Gold',
            ) || { amount: 0 }
          }
          cosmic={
            (account?.currencies || []).find(
              (currency) => currency.Currency.name === 'Cosmic',
            ) || { amount: 0 }
          }
          ascension={
            (account?.character_currencies || []).find(
              (currency) => currency.currency.name === 'Ascension',
            ) || { amount: 0 }
          }
          stamina={{ amount: account?.stamina || 0 }}
          maxStamina={account?.maxStamina || 0}
        />
        <div className="d-flex p-1">
          <Button
            className="top-nav-button rounded-circle p-0"
            onClick={() => {
              generalSound()
              navigate('/')
            }}
          >
            <Image src="/images/v2/game-ui/Home.png" fluid />
          </Button>

          <Button
            className="top-nav-button rounded-circle p-0"
            onClick={(e) => {
              if (isMenuOpen) {
                backSound()
              } else {
                generalSound()
              }
              e.stopPropagation()
              setIsMenuOpen(!isMenuOpen)
            }}
          >
            {!!isMenuOpen ? (
              <Image src="/images/v2/game-ui/Menu-Close.png" fluid />
            ) : (
              <Image src="/images/v2/game-ui/Menu.png" fluid />
            )}
          </Button>
        </div>
      </div>
      {!!isMenuOpen ? (
        <MenuBox
          setIsBankOpen={setIsBankOpen}
          setIsMenuOpen={setIsMenuOpen}
          forwardedRef={menuRef}
        />
      ) : null}
      <BankDialog
        open={isBankOpen}
        onClose={() => setIsBankOpen(false)}
        setMessage={setMessage}
      />
      <GuideModal open={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  )
}

export default TopNav

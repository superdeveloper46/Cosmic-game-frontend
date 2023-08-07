import { useWallet } from "@solana/wallet-adapter-react";
import React from "react"
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MenuBoxButton from "../MenuBoxButton"
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import "./menu-box.scss"

const MenuBox = ({
  setIsBankOpen,
  setIsMenuOpen,
  forwardedRef
}) => {
  const { disconnect } = useWallet()
  const navigate = useNavigate()
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])

  return (
    <div className="menu-box-container" ref={forwardedRef}>
      <div className="d-flex gap-2 flex-wrap">
        <MenuBoxButton 
          style={{ flex: 1, margin: 5, minWidth: '120px' }}
          icon={ <img src='/images/v2/game-ui/Character-Armour-Version.png' alt='Characters'/> }
          onClick={() => {
            generalSound()
            navigate('/characters/list')
            setIsMenuOpen(false)
          }}
        >
          Characters
        </MenuBoxButton>
        <MenuBoxButton 
          style={{ flex: 1, margin: 5, minWidth: '120px' }}
          icon={ <img src='/images/v2/game-ui/Missions.png' alt='Missions'/> }
          onClick={() => {
            generalSound()
            navigate('/region')
            setIsMenuOpen(false)
          }}
        >
          Dispatch
        </MenuBoxButton>
        <MenuBoxButton 
          style={{ flex: 1, margin: 5, minWidth: '120px' }}
          icon={ <img src='/images/v2/game-ui/Marketplace.png' alt='Marketplace'/> }
          onClick={() => {
            generalSound()
            navigate('/characters/marketplace')
            setIsMenuOpen(false)
          }}
        >
          Marketplace
        </MenuBoxButton>
        <MenuBoxButton 
          style={{ flex: 1, margin: 5, minWidth: '120px' }}
          icon={ <img src='/images/v2/game-ui/Inventory.png' alt='Inventory'/> }
          onClick={() => {
            generalSound()
            navigate('/characters/inventory')
            setIsMenuOpen(false)
          }}
        >
          Inventory
        </MenuBoxButton>
        <MenuBoxButton 
          style={{ flex: 1, margin: 5, minWidth: '120px' }} 
          icon={ <img src='/images/v2/game-ui/Bank.png' alt='Bank'/> }
          onClick={() => {
            generalSound()
            setIsBankOpen(true)
            setIsMenuOpen(false)
          }}
        >
          Bank
        </MenuBoxButton>
        <MenuBoxButton 
          style={{ flex: 1, margin: 5, minWidth: '120px' }}
          icon={ <img src='/images/v2/game-ui/Shop.png' alt='Shop'/> }
          onClick={() => {
            generalSound()
            navigate('/shop')
          }}
        >
          Shop
        </MenuBoxButton>
      </div>
      <div className="d-flex justify-content-between">
        <Button 
          className="settings-button rounded-circle p-0 d-flex align-items-center"
          onClick={() => {
            generalSound()
            navigate('/settings/account')
          }}
        >
          <Image src="/images/v2/game-ui/Settings.png" fluid/>
          <p className="m-1">Settings</p>
        </Button>
        <Button 
          className="settings-button rounded-circle p-0 d-flex align-items-center"
          onClick={() => {
            generalSound()
            disconnect()
          }}
        >
          <Image src="/images/v2/game-ui/Disconnect.png" fluid/>
        </Button>
      </div>
    </div>
  )
}

export default MenuBox
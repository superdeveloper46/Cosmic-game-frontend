import React, { useState } from 'react'
import MenuSidebarGame from '../MenuSidebarGame/menu-sidebar-game'
import MenuSidebarSettings from '../MenuSidebarSettings/menu-sidebar-settings'
import { useWallet } from "@solana/wallet-adapter-react";
import PinButton from '../PinButton/pin-button'
import './menu-sidebar.scss'

export const menuTabList = [
  { type: 'notice', icon: '/images/v2/game-ui/Notices.png' },
  { type: 'mailbox', icon: '/images/v2/game-ui/Mail.png' },
  { type: 'settings', icon: '/images/v2/game-ui/Settings.png' },
]

const MenuSidebar = ({
  items,
  legendaries,
  resources,

  collapsed,
  setCollapsed,
  setIsBankOpen,
  setPreview,
}) => {
  const { disconnect } = useWallet()
  const [page, setPage] = useState('settings')

  return (
    <div className={`menu-sidebar-container ${collapsed ? 'collapsed' : ''}`}>
      <div
        className='d-flex justify-content-center align-items-center mt-0'
        style={{ paddingTop: '0.5rem' }}
      >
        MENU
        <PinButton
          style={{
            position: 'absolute',
            left: '1rem',
            width: '24px',
            height: '24px',
          }}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>
      <div
        className={`menu-tab-btns d-flex align-items-center justify-content-center gap-3 ${collapsed ? '' : 'active'}`}
      >
        {menuTabList.map((tab, index) => (
          <button
            key={`tab-btns-${index}`}
            className={!collapsed && page === tab?.type ? 'active' : ''}
            onClick={() => {
              setPage(tab.type)
              setCollapsed(false)
            }}
          >
            <div>
              <img src={tab.icon} alt='tab' />
            </div>
          </button>
        ))}
        <button onClick={ () => disconnect() }>
          <div>
            <img src='/images/v2/game-ui/Exit.png' alt='tab' className='exit' />
          </div>
        </button>
      </div>
      {/* <div className='d-flex' style={{ margin: '0.5rem' }}>
        <NormalButton
          style={{ flex: 1, margin: '2px' }}
          onClick={() => {
            setPage('game')
            setCollapsed(false)
          }}
          inactive={page !== 'game'}
          key='menu-sidebar-game-button'
        >
          GAME
        </NormalButton>
        <NormalButton
          style={{ flex: 1, margin: '2px' }}
          onClick={() => {
            setPage('social')
            setCollapsed(false)
          }}
          inactive={page !== 'social'}
          key='menu-sidebar-social-button'
        >
          SOCIAL
        </NormalButton>
        <NormalButton
          style={{ flex: 1, margin: '2px' }}
          onClick={() => {
            setPage('settings')
            setCollapsed(false)
          }}
          inactive={page !== 'settings'}
          key='menu-sidebar-settings-button'
        >
          SETTINGS
        </NormalButton>
      </div> */}
      {!collapsed ? (
        <div className='p-3 menu-content'>
          {page === 'settings' ? <MenuSidebarSettings setIsBankOpen={ setIsBankOpen } /> : null}
        </div>
      ) : null}
    </div>
  )
}

export default MenuSidebar

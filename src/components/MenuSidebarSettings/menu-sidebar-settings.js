import React from "react"
import { useNavigate } from "react-router-dom";
import MenuBoxButton from "../MenuBoxButton"

const MenuSidebarSettings = ({
  setIsBankOpen,
}) => {
  const navigate = useNavigate()

  return (
    <div className="menu-sidebar-settings-container" style={{ width: '100%' }}>
      <div className="d-flex gap-2 flex-wrap">
        <MenuBoxButton 
          style={{ flex: 1, margin: 5 }}
          icon={ <img src='/images/v2/game-ui/Character-Armour-Version.png' alt='Characters'/> }
          onClick={() => navigate('/characters/list')}
        >
          Characters
        </MenuBoxButton>
        <MenuBoxButton 
          style={{ flex: 1, margin: 5 }}
          icon={ <img src='/images/v2/game-ui/Missions.png' alt='Missions'/> }
          onClick={() => navigate('/region')}
        >
          Missions
        </MenuBoxButton>
        <MenuBoxButton 
          style={{ flex: 1, margin: 5 }}
          icon={ <img src='/images/v2/game-ui/Shop.png' alt='Shop'/> }
          onClick={() => navigate('/shop')}
        >
          Shop
        </MenuBoxButton>
        <MenuBoxButton 
          style={{ flex: 1, margin: '2px' }} 
          icon={ <img src='/images/v2/game-ui/Shop.png' alt='Bank'/> }
          onClick={() => setIsBankOpen(true)}
        >
          Bank
        </MenuBoxButton>
      </div>
    </div>
  )
}

export default MenuSidebarSettings
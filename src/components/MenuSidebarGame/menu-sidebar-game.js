import React, { useState } from "react"
import AVAILABLE_RESOURCES from "../../consts/available-resources"
import MenuSidebarGameItem from "../MenuSidebarGameItem/menu-sidebar-game-item"
import MenuSidebarGameLegendary from "../MenuSidebarGameLegendary/menu-sidebar-game-legendary"
import MenuSidebarGameResource from "../MenuSidebarGameResource/menu-sidebar-game-resource"

import SimpleButton from "../SimpleButton"

const MenuSidebarGame = ({
  items,
  legendaries,
  resources,

  setPreview,
}) => {
  const [ page, setPage ] = useState('items')

  return (
    <div className="menu-sidebar-game-container" style={{ width: '100%' }}>
      <div className="d-flex justify-content-center align-items-center mt-1 mb-1">
        ITEM LIST
      </div>
      <div className="d-flex">
        <SimpleButton 
          style={{ flex: 1, margin: '2px' }} 
          inactive={ page !== 'items' }
          onClick={ () => setPage('items') }
        >
          Equipment
        </SimpleButton>
        <SimpleButton 
          style={{ flex: 1, margin: '2px' }} 
          inactive={ page !== 'legendaries' }
          onClick={ () => setPage('legendaries') }
        >
          Legendary Equipment
        </SimpleButton>
        <SimpleButton 
          style={{ flex: 1, margin: '2px' }} 
          inactive={ page !== 'resources' }
          onClick={ () => setPage('resources') }
        >
          Resource Materials
        </SimpleButton>
      </div>
      {
        page === 'items'
        ? <MenuSidebarGameItem
          items={ items }

          setPreview={ setPreview }
        />
        : page === 'legendaries'
        ? <MenuSidebarGameLegendary
          legendaries={ legendaries }

          setPreview={ setPreview }
        />
        : page === 'resources'
        ? <MenuSidebarGameResource
          resources={ resources.filter(resource => !!AVAILABLE_RESOURCES.includes(resource.name)) }

          setPreview={ setPreview }
        />
        : 'Unknown'
      }
    </div>
  )
}

export default MenuSidebarGame
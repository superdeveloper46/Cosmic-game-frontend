import React from "react"
import { Image } from "react-bootstrap"
import InventorySlot from "../InventorySlot"

const MenuSidebarGameLegendary = ({
  legendaries,

  setPreview
}) => {
  return (
    <div className="menu-sidebar-game-page-container" style={{ width: '100%' }}>
      {
        legendaries.map(
          legendary => (
            <div className="col-2" key={`game-legendary-wrapper-${legendary.id}`}>
              <InventorySlot
                key={`game-legendary-${legendary.id}`}
                className="m-1"
                onClick={ () => setPreview({ type: 'legendary', payload: legendary }) }
              >
                <Image src={`/legendary/${legendary.icon.replaceAll(' ', '_')}`} style={{ borderRadius: '20px' }} fluid />
              </InventorySlot>
            </div>
          )
        )
      }
      {
        [...Array(48 - legendaries.length)].map(
          (_, id) => (
            <div className="col-2" key={`game-legendary-inactive-wrapper-${id}`}>
              <InventorySlot
                key={`game-legendary-inactive-${id}`}
                className="m-1"
                inactive
              >
              </InventorySlot>
            </div>
          )
        )
      }
    </div>
  )
}

export default MenuSidebarGameLegendary
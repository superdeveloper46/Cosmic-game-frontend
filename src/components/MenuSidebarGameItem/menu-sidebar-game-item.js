import React from "react"
import { Image } from "react-bootstrap"
import InventorySlot from "../InventorySlot"

const MenuSidebarGameItem = ({
  items,

  setPreview,
}) => {
  return (
    <div className="menu-sidebar-game-page-container" style={{ width: '100%' }}>
      {
        items.map(
          item => (
            <div className="col-2" key={`game-item-wrapper-${item.id}`}>
              <InventorySlot
                key={`game-item-${item.id}`}
                className="m-1"
                onClick={ () => setPreview({ type: 'item', payload: item }) }
              >
                <Image src={`/item/${item.icon.replaceAll(' ', '_')}`} style={{ borderRadius: '20px' }} fluid />
              </InventorySlot>
            </div>
          )
        )
      }
      {
        [...Array(48 - items.length)].map(
          (_, id) => (
            <div className="col-2" key={`game-item-inactive-wrapper-${id}`}>
              <InventorySlot
                key={`game-item-inactive-${id}`}
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

export default MenuSidebarGameItem
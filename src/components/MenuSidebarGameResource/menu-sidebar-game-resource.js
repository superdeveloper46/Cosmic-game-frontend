import React from "react"
import { Image } from "react-bootstrap"
import InventorySlot from "../InventorySlot"

const MenuSidebarGameResource = ({
  resources,

  setPreview
}) => {
  return (
    <div className="menu-sidebar-game-page-container" style={{ width: '100%' }}>
      {
        resources.map(
          resource => (
            <div className="col-2" key={`game-resource-wrapper-${resource.id}`}>
              <InventorySlot
                key={`game-resource-${resource.id}`}
                className="m-1"
                onClick={ () => setPreview({ type: 'resource', payload: resource }) }
              >
                <Image src={`/resources/bg/${resource.icon.replaceAll(' ', '_')}`} style={{ borderRadius: '20px' }} fluid />
              </InventorySlot>
            </div>
          )
        )
      }
      {
        [...Array(48 - resources.length)].map(
          (_, id) => (
            <div className="col-2" key={`game-resource-inactive-wrapper-${id}`}>
              <InventorySlot
                key={`game-resource-inactive-${id}`}
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

export default MenuSidebarGameResource
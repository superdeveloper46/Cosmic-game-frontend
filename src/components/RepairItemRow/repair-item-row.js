import classNames from "classnames"
import React from "react"
import { Image } from "react-bootstrap"
import { rarityIcons } from "../ItemDetailsCard/item-details-card"

import './repair-item-row.scss'

const RepairItemRow = ({
  clickable,
  resource,
  inventory,
  selectedCount,
  onClick,
}) => {
  const remainingCount = (inventory?.quantity || 0) - selectedCount


  return (
    <div 
      className={
        classNames(
          "repair-item-row d-flex justify-content-start align-items-center flex-grow m-1", 
          { 'inactive': !inventory?.quantity },
          { 'selected': !!selectedCount }, 
          { 'hover-opacity-8 hover-cursor-pointer': !!clickable && !!remainingCount && !!onClick },
        )
      } 
      onClick={ 
        () => {
          if (!!clickable && !!onClick && remainingCount > 0) {
            onClick()
          }
        } 
      }
    >
      {
        !!resource
        ? <div 
          className="img-wrapper p-3 m-2"
          style={{
            background: `url(${rarityIcons[resource?.rarity || 'Common']})`,
          }}
        >
          <Image
            src={`/images/v2/resources/${(resource?.icon || resource?.icon || '').replaceAll(' ', '_')}`}
          />
        </div>
        : null
      }
      <div className="d-flex flex-column align-items-start justify-content-center m-2 flex-grow-1">
        <p className="h4 resource-name">
          {
            resource?.name || ''
          }
        </p>
        <p className="h4">
          {
            `+${(typeof resource?.effect === 'object' ? resource?.effect : JSON.parse(resource?.effect || '{}'))?.efficiency || 0}%`
          }
        </p>
      </div>
      <div className="d-flex flex-column align-items-start justify-content-center m-2 flex-grow-1">
        <p className="h4 resource-owned-header">
          Owned
        </p>
        <p className={ classNames("h4", { 'resource-selected-count': !!selectedCount }) }>
          {
            !selectedCount
            ? `${inventory?.quantity || 0}`
            : `${remainingCount}(-${selectedCount})`
          }
        </p>
      </div>
    </div>
  )
}

export default RepairItemRow
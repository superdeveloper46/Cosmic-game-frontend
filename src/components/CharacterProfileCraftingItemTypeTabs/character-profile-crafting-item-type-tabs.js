import classNames from "classnames"
import React from "react"

import './character-profile-crafting-item-type-tabs.scss'

const CharacterProfileCraftingItemTypeTabs = ({
  tabs,
  tab,
  setTab,
}) => {
  return (
    <div className="characters-profile-crafting-item-type-tabs w-100 row m-0">
      {
        tabs.map(
          tabName => (
            <div 
              className={ classNames('craft-item-type-tab hover-opacity-8 hover-cursor-pointer p-1 col-3 d-flex align-items-center justify-content-center text-center', { 'active': tabName === tab }) } 
              key={`craft-item-type-tab-${tabName}`}
              onClick={ () => setTab(tabName) }
            >
              { tabName }
            </div>
          )
        )
      }
    </div>
  )
}

export default CharacterProfileCraftingItemTypeTabs
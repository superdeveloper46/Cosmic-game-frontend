import classNames from "classnames"
import React from "react"

import './character-profile-crafting-view-tabs.scss'

const CharacterProfileCraftingViewTabs = ({
  tabs,
  tab,
  setTab,
}) => {
  return (
    <div className="characters-profile-crafting-view-tabs d-flex justify-content-center align-items-center">
      {
        tabs.map(
          tabName => (
            <div 
              className={ classNames('craft-view-tab hover-opacity-8 hover-cursor-pointer p-1 text-center', { 'active': tabName === tab }) } 
              key={`craft-view-tab-${tabName}`}
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

export default CharacterProfileCraftingViewTabs
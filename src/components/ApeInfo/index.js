import React from "react"
import NavEquippedItems from "../NavEquippedItems"
import ApeInfoTexts from "../ApeInfoTexts"

import './index.css'


const ApeInfo = ({
  ape,
}) => {
  return (
    <div className="ape-info-container d-flex align-items-center">
      <ApeInfoTexts
        ape={ ape } />
      
      {/* <NavEquippedItems 
        items={ (ape?.gameData?.default_items || []).filter(defaultItem => defaultItem.type === 'item').map(defaultItem => defaultItem.Item) } 
        utilities={ (ape?.gameData?.default_items || []).filter(defaultItem => defaultItem.type === 'utility').map(defaultItem => defaultItem.Utility) } 
      /> */}
    </div>
  )
}

export default ApeInfo
import React from "react"
import { Image } from "react-bootstrap"
import craft from "../../utils/craft"
import MissionRewardItemRowItem from "../MissionRewardItemRowItem/mission-reward-item-row-item"
import NormalButton from "../NormalButton"

const ApeProfileCraftSelectedItemInfo = ({
  recipe,
  address,
  wallet,
  setSelectedRecipe,
  setMessage,
  reloadApes,
}) => {
  return (
    <div className="mission-reward-item-row-container d-flex align-items-center" style={{ background: '#5B6C991A', padding: '0.25rem', border: '1px solid #00B1FB', flexGrow: 1, minHeight: '202px', maxWidth: '420px', minWidth: '420px' }}>
      {
        !!recipe
        ? <div className="d-flex flex-column" style={{ flexGrow: 1 }}>
          <div className="d-flex align-items-center m-1">
            <Image src={`/item/${recipe.icon.replaceAll(' ', '_')}`} style={{ width: '80px', marginRight: '0.5rem' }} />
            <div className="d-flex justify-content-center flex-column">
              <div className="d-flex align-items-center" style={{ fontSize: '18px' }}>
                { recipe.name.toUpperCase() }
              </div>
              <div className="d-flex align-items-center">
                { recipe.description }
              </div>
            </div>
          </div>
          <div className="d-flex" style={{ flexDirection: 'column', flexGrow: 1, margin: '0.25rem' }}>
            <div className="d-flex align-items-center">
              <MissionRewardItemRowItem
                label="Tier"
                value={`${recipe.tier}`}
                image="/images/level.png"
              />
              <MissionRewardItemRowItem
                label="Durability"
                value={`${recipe.durability}`}
                image="/images/durability.png"
              />
              <MissionRewardItemRowItem
                label="EXP Value"
                value={`${recipe.exp || 0}`}
                image="/images/exp.png"
              />
            </div>
          </div>
        </div>
        : <div className="d-flex justify-content-center align-items-center" style={{ height: '120px', margin: '0.5rem', flexGrow: 1 }}>
          NO ITEM SELECTED
        </div>
      }
    </div>
  )
}

export default ApeProfileCraftSelectedItemInfo
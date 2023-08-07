import React from "react"
import { Image } from "react-bootstrap"
import humanizeMinutes from "../../utils/humanize-minutes"
import ApeProfileCharacterOverview from "../ApeProfileCharacterOverview/ape-profile-character-overview"
import LeftButton from "../LeftButton/left-button"
import RightButton from "../RightButton/right-button"

const CharacterProfile = ({
  ape,
  crownedApeId,
  switchCrown,
  reloadApes,
  selectedInventory,
  setSelectedInventory
}) => {

  return (
      <>
      {!!ape  &&
         <ApeProfileCharacterOverview
          crownedApeId={crownedApeId}
          switchCrown={switchCrown}
          ape={ape}
          reloadApes={reloadApes}
          setSelectedInventory={setSelectedInventory}
          selectedInventory={selectedInventory}
        />
      }
      </>
  )
}

export default CharacterProfile
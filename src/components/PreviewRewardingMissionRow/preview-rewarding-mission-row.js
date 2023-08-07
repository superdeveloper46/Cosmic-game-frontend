import React from "react"
import { Image } from "react-bootstrap"
import NormalButton from "../NormalButton"

const PreviewRewardingMissionRow = ({
  mission,
  goMission,
}) => {
  return (
    <div className="preview-rewarding-mission-row">
      <Image className="preview-rewarding-mission-image m-1" src={`/map_bg/${mission.Map.biome_img.split('.')[0]}.png`} />
      <div className="m-1" style={{ flexGrow: 1 }}>
        <div style={{ whiteSpace: 'nowrap' }}>{ `${mission.Map.name}:` }</div>
        <div style={{ whiteSpace: 'nowrap' }}>{ `${mission.name}` }</div>
      </div>
      <NormalButton 
        className="m-1 text-truncate"
        onClick={ () => goMission(mission) }
        inactive
      >
        GO NOW
      </NormalButton>
    </div>
  )
}

export default PreviewRewardingMissionRow
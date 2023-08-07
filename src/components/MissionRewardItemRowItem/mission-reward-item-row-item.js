import React from "react"
import TextWithImage from "../TextWithImage"

const MissionRewardItemRowItem = ({
  label,
  value,
  image,
}) => {
  return (
    <div className="mission-reward-item-row-item-container d-flex align-items-center" style={{ margin: '0.5rem' }}>
      <div className="d-flex" style={{ flexDirection: 'column' }}>
        <div className="d-flex align-items-center" style={{ fontSize: '12px' }}>
          { label }
        </div>
        <TextWithImage imgSrc={ image } style={{ fontSize: '16px' }}>
          { value }
        </TextWithImage>
      </div>
    </div>
  )
}

export default MissionRewardItemRowItem
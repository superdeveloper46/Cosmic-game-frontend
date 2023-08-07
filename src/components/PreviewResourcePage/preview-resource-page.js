import React, { useEffect, useState } from "react"
import { Image } from "react-bootstrap"
import NormalButton from "../NormalButton"
import PreviewRewardingMissions from "../PreviewRewardingMissions/preview-rewarding-missions"

const PreviewResourcePage = ({
  resource,
  setInventoryMission,
  onClose,
}) => {
  return (
    !!resource
    ? <div className="preview-content">
      <div className="preview-header">
        <div className="d-flex justify-content-center align-items-end text-truncate" style={{ flexDirection: 'column', margin: '1rem' }}>
          <div>
            {`Tier: ${resource.tier}`}
          </div>
        </div>
        <Image src={`/resources/bg/${resource.icon.replaceAll(' ', '_')}`} style={{ width: '120px', height: '120px' }} />
        <div className="d-flex justify-content-center align-items-start text-truncate" style={{ flexDirection: 'column', margin: '1rem' }}>
          <div>
            {`EXP Value: ${resource.exp || 0}`}
          </div>
        </div>
      </div>
      <div className="preview-main-content">
        <div className="text-truncate" style={{ fontSize: '24px' }}>
          {`${resource.name}`}
        </div>
        <div className="text-truncate">
          {`${resource.description}`}
        </div>
        <div>
          <PreviewRewardingMissions
            type="resource"
            id={ resource.name.toLowerCase() }
            goMission={ mission => {
              if (typeof setInventoryMission === 'function') setInventoryMission(mission)
              if (typeof onClose === 'function') onClose()
            } }
          />
        </div>
      </div>
      <div className="preview-footer">
        <NormalButton 
          onClick={ onClose }
          inactive
        >
          CLOSE
        </NormalButton>
      </div>
    </div>
    : null
  )
}

export default PreviewResourcePage
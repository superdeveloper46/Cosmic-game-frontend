import React from "react"

const MissionListMapInfo = ({
  map,
}) => {
  return (
    <div className="d-flex align-items-center" style={{ margin: '0.5rem' }} key='mission-list-map-info'>
      <div 
        className="d-flex align-items-center justify-content-center"
        style={{
          background: !!map?.biome_img ? `url('/map_bg/${map.biome_img.split('.')[0]}.png') center center / 100% no-repeat` : `url('/images/back.png') center center / 100% no-repeat`,
          width: '100%', 
          height: '160px', 
          fontSize: '32px',
          fontFamily: 'ocean-drift', 
        }}
      >
        { map?.name || 'MISSIONS' }
      </div>
    </div>
  )
}

export default MissionListMapInfo
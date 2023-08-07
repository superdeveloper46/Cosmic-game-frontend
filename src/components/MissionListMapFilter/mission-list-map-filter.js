import React from "react"
import SimpleButton from "../SimpleButton"

const MissionListMapFilter = ({
  maps,
  map: selectedMap,
  setMap,
}) => {
  return (
    <div id="mapButtonContainer" className="d-flex flex-wrap" style={{ margin: '0.5rem' }}>

            <SimpleButton
            key={`map-filter-all`}
            style={{flex: 1}}
            inactive={ !!selectedMap }
            onClick={ () => setMap(null) }
          >
            ALL
          </SimpleButton>

      {
        (maps || []).map(
          map => (

                <SimpleButton
                  key={ `map-filter-${map.id}` }
                  style={{ flex: 1 }}
                  inactive={ selectedMap?.id !== map?.id }
                  onClick={ () => setMap(map) }
                  >
                  { map.name }
                </SimpleButton>

          )
        )
      }
    </div>
  )
}

export default MissionListMapFilter
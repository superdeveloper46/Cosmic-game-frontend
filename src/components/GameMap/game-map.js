import React, { useState, useEffect, useRef } from 'react'
import {
  MapContainer,
  ZoomControl,
  ImageOverlay,
  useMapEvents,
} from 'react-leaflet'
import MissionSelectItem from '../MissionSelectItem/mission-select-item'
import ItemDescriptionDialog from '../ItemDescriptionDialog/item-description-dialog'
import './game-map.scss'

const GameMap = ({ missions }) => {
  var w = window.innerWidth
  var h = window.innerHeight
  const bounds = [
    [-44.655 * (h / 668.0), -113.3 * (w / 1288.0)],
    [44.655 * (h / 668.0), 113.3 * (w / 1288.0)],
  ]
  const maxBounds = [
    [-44.655 * (h / 668.0), -113.3 * (w / 1288.0)],
    [44.655 * (h / 668.0), 113.3 * (w / 1288.0)],
  ]
  const itemPositions = [
    [-11.824341483849048, 52.86621093750001],
    [-24.006326198751115, -1.3623046875000002],
    [36.1733569352216, -55.19531250000001],
    [-17.09879223767869, -51.32812500000001],
    [18.06231230454674, 46.77978515625001],
    [35.889050079360935, 5.625],
    [0.7909904981540058, 10.810546875000002],
    [26.43122806450644, 65.21484375000001],
    [-6.227933930268672, -24.916992187500004],
    [15.411319377981005, -16.918945312500004],
  ]
  const [missionCollections, setMissionCollections] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [detailImage, setDetailImage] = useState(null)
  const [closed, setClosed] = useState(false)

  const separateMissions = () => {
    let tempCollection = []

    if (!!missions && missions.length > 0) {
      const missionsByMap = missions.reduce((group, mission) => {
        group[mission.Map.id] = group[mission.Map.id] ?? []
        group[mission.Map.id].push(mission)
        return group
      }, {})

      for (let key of Object.keys(missionsByMap)) {
        tempCollection.push(missionsByMap[key])
      }
    }
    setMissionCollections(tempCollection)
  }

  useEffect(() => {
    separateMissions()
  }, [])

  useEffect(() => {
    separateMissions()
  }, [missions])

  function EventLayer() {
    const minLevel = 3

    const map = useMapEvents({
      zoomend() {
        if (map.getZoom() > minLevel) {
          map.dragging.enable()
        } else {
          map.dragging.disable()
          map.flyTo([0, 0], map.getZoom())
          // map.setView([0, 0]);
        }
      },
      drag() {},
      dragend() {},
      dragstart() {},
      popupopen(e) {
        const { lat, lng } = e.popup._latlng
        if (
          lat + ((840 * minLevel) / (h * map.getZoom())) * maxBounds[1][0] >
            maxBounds[1][0] &&
          map.getZoom() < minLevel + 2
        ) {
          e.popup.setLatLng([
            lat - ((840 * minLevel) / (h * map.getZoom())) * maxBounds[1][0],
            lng,
          ])
        }
      },
    })

    return <></>
  }

  return (
    <>
      <MapContainer
        center={[0, 0]}
        zoom={3.5}
        minZoom={3}
        maxZoom={6}
        zoomSnap={0.5}
        zoomDelta={0.5}
        bounds={bounds}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        zoomControl={false}
        dragging={true}
        bounceAtZoomLimits={true}
        maxBoundsViscosity={1}
        maxBounds={maxBounds}
      >
        <EventLayer></EventLayer>
        <ImageOverlay
          url='/images/v2/backgrounds/Cosmic_Ape_Crusader_Map.jpg'
          bounds={bounds}
          className='island-map'
        />
        <ZoomControl position='bottomright' />
        {missionCollections.map((mission, index) => (
          <MissionSelectItem
            mission={mission}
            position={itemPositions[index]}
            key={`mission-region-item${index}`}
          />
        ))}
      </MapContainer>
      <ItemDescriptionDialog setClosed={setClosed} />
    </>
  )
}

export default GameMap

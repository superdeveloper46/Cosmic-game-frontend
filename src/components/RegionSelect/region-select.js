import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './region-select.scss'

const RegionSelect = ({ selectedRegion, setSelectedRegion }) => {
  const maps = useSelector((state) => state.maps.maps)

  return (
    <div className='d-flex align-items-start flex-column region'>
      <h2
        className={`tab-title mb-2 ${selectedRegion === null ? 'active' : ''}`}
      >
        SELECT REGION
      </h2>
      <div className='region-wrapper custom-scroll'>
        {maps.map((item, index) => (
          <div
            className={selectedRegion?.id === item?.id ? 'active' : ''}
            key={`map-${index}`}
            onClick={() => setSelectedRegion(item)}
          >
            <img
              src={
                !!item?.biome_img
                  ? `/map_bg/${item.biome_img.split('.')[0]}.png`
                  : '/images/back.png'
              }
              alt=''
            />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RegionSelect

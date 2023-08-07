import React from 'react'
import './tab-btns.scss'

export const tabList = [
  { type: 'character', icon: '/images/characterIcon.png' },
  { type: 'missions', icon: '/images/missionsIcon.png' },
  { type: 'shop', icon: '/images/shopIcon.png' },
]

const TabButtons = ({ selected, setSelected }) => {
  return (
    <div className='tab-btns d-flex align-items-center'>
      {tabList.map((tab, index) => (
        <button
          key={`tab-btns-${index}`}
          className={selected?.type === tab?.type ? 'active' : ''}
          onClick={() => setSelected(tab)}
        >
          <div>
            <img src={tab.icon} alt='tab' />
          </div>
        </button>
      ))}
    </div>
  )
}

export default TabButtons

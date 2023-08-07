import React from 'react'
import './shop-left-side.scss'

const sideBarList = [
  { image: '/images/v2/currencies/Cosmic.png', title: 'COSMIC' },
  { image: '/images/v2/currencies/Gold.png', title: 'GOLD' },
  { image: '/images/v2/Salvage.png', title: 'SALVAGE' },
]

function LeftSideBar({ tab, setTab }) {
  return (
    <div className='shop-page-left-sidebar'>
      <h3>SHOP MENUS</h3>
      {sideBarList.map((item, index) => (
        <div
          key={`shop-left-side-${index}`}
          onClick={() => setTab(item.title)}
          className={tab === item.title ? 'active' : ''}
        >
          <img src={item.image} alt='icon' />
          <h4>{item.title} SHOP</h4>
        </div>
      ))}
    </div>
  )
}

export default LeftSideBar

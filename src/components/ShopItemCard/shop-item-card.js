import React, { useState } from 'react'
import './shop-item-card.scss'

function ShopItemCard({
  background,
  image,
  name,
  value,
  percentage,
    limitInfo,
  amount,
  type,
  active,
  onClick,
}) {
  return (
    <div className='shop-card-container' onClick={onClick && onClick}>
      <img
        src={active ? '/images/shop_card_active.png' : '/images/shop_card.png'}
        alt='shop'
        className='shop-card-bg'
      />
      <img
        src='/images/shop-top-header.png'
        alt='header'
        className='shop-card-header'
      />
      <h5 className='shop-card-name'>{name}</h5>
      <div className='shop-card-content'>
        <div
          className='shop-card-item'
          style={{
            backgroundImage: background
              ? `url(${background})`
              : 'linear-gradient(0deg, #143972 0%, #07254D 100%)',
          }}
        >
          <img src={image} alt={name} />
          <div>
            <p>x{amount}</p>
          </div>
        </div>
          {!!limitInfo && limitInfo?.limit_type !== "NO_Limit" &&
            <h6>{limitInfo?.maximum_allowed-limitInfo?.total_limit_used}/{limitInfo?.maximum_allowed}</h6>
          }

      </div>
      <div className='shop-card-bottom'>
        <img src={`/images/v2/currencies/${type}.png`} alt='' />
        <p>{value}</p>
      </div>
    </div>
  )
}

export default ShopItemCard

import React from 'react'
import ApplyButton from '../ApplyButton'
import equip from '../../utils/equip'
import './inventory-selected-item-info.scss'

const InventorySelectedItemInfo = ({ item }) => {
  return (
    <div>
      <div className='custom-border-bottom mb-3' />
      <div className='d-flex align-items-center inventory-selected-item-container'>
        {!!item ? (
          <>
            <div style={{ margin: '0.5rem' }} className='item-image'>
              <img src={`/item/${item.icon.replaceAll(' ', '_')}`} alt="main"/>
              <img src={`/images/v2/Tier${item.tier}.png`} alt="Tier" />
              <div className='small-items'>
                <div>
                  <img src='/images/equip-score.png' alt='score' />
                  {item.score}
                </div>
                <div>
                  <img src='/images/durability.png' alt='durability' />
                  {item.durability}
                </div>
              </div>
            </div>
            <div
              className='d-flex'
              style={{ flexDirection: 'column', flexGrow: 1, margin: '0.5rem' }}
            >
              <div
                className='d-flex align-items-center'
                style={{ fontSize: '18px' }}
              >
                {item.name.toUpperCase()}
              </div>
              <div className='d-flex align-items-center'>
                {item.description}
              </div>
              <div className='d-flex align-items-center'>
                <div className='d-flex flex-column justify-content-center exp align-items-center'>
                  {item.exp || 0}
                  <img src="/images/exp.png" alt="exp" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div
            className='d-flex justify-content-center align-items-center'
            style={{ height: '120px', margin: '0.5rem', flexGrow: 1 }}
          >
            NO ITEM SELECTED
          </div>
        )}
      </div>
      <div className='custom-border-bottom mt-3 mb-4' />
    </div>
  )
}

export default InventorySelectedItemInfo

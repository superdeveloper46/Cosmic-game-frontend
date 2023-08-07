import React from 'react'
import ApplyButton from '../ApplyButton'
import './sell-button.scss'

function SellButton({ value, onClick }) {
  return (
    <div className='d-flex align-items-center sell-btn'>
      <img
        src='/images/gold.png'
        alt='sell'
        className='sell-btn-icon'
      />
      <div className='sell-btn-value'>{value ?? 0}</div>
      <ApplyButton onClick={onClick} className='unequip-btn'>
        Sell
      </ApplyButton>
    </div>
  )
}

export default SellButton

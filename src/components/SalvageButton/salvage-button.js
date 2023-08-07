import React from 'react'
import ApplyButton from '../ApplyButton'
import './salvage-button.scss'

function SalvageButton({ value, onClick }) {
  return (
    <div className='d-flex align-items-center salvage-btn'>
      <ApplyButton onClick={onClick}>Salvage</ApplyButton>
      <div className='salvage-btn-value'>{value ?? 0}</div>
      <img
        src='/images/salvage.png'
        alt='salvage'
        className='salvage-btn-icon'
      />
    </div>
  )
}

export default SalvageButton

import React from 'react'
import './go-button.scss'

const GoButton = ({ onClick }) => (
  <button onClick={onClick} className='go-btn' >
    <img src='/images/move_right.png' alt='Go' />
    Go Now
  </button>
)

export default GoButton
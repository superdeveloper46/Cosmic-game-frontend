import React from 'react'
import './scroll-down-button.scss'

function ScrollDownButton({ onClick, className }) {
  return (
    <button className={`scroll-down-btn ${className}`} onClick={onClick}>
      <img src='/images/scroll_down_btn.png' alt='scroll' />
    </button>
  )
}

export default ScrollDownButton

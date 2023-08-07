import React, { useEffect, useState, useRef } from 'react'
import './index.scss'

const Dropdown = ({ selected, lists, handleSelect, className='' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      if (isOpen) setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false)
    return () => {
      document.removeEventListener('click', handleClickOutside, false)
    }
  })

  return (
    <div className={`dropdown-container ${className}`} ref={dropdownRef}>      <button
        type='button'
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <div className='selected-item'>{selected}</div>
        <div className={`arrow-down ${isOpen ? 'toggle-up' : 'toggle-down'}`}>
          <img src='/images/arrow_down_p.png' alt='arrow' />
        </div>
      </button>
      {isOpen ? (
        <div className='dropdown-list'>
          {lists.map((item, index) => (
            <div
              key={`dropdown-${index}`}
              onClick={() => {
                handleSelect(item)
                setIsOpen(false)
              }}
            >
              {item}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Dropdown

import React, { useState, useEffect, useRef } from 'react'
import CloseButton from '../CloseButton'
import NormalButton from '../NormalButton'
import ApplyButton from '../ApplyButton'

const OrganiseModal = ({
  open,
  order,
  ascending,
  setOrder,
  setAscending,
  onClose,
}) => {
  const [ascendingTemp, setAscendingTemp] = useState(ascending)
  const [orderTemp, setOrderTemp] = useState(order)
  const handleApply = () => {
    try {
      setOrder(orderTemp)
      setAscending(ascendingTemp)
      onClose()
    } catch (error) {
      onClose()
    }
  }

  const handleClose = () => {
    try {
      setOrderTemp(order)
      setAscendingTemp(ascending)
      onClose()
    } catch (error) {
      onClose()
    }
  }

  useEffect(() => {
    setOrderTemp(order)
    setAscendingTemp(ascending)
  }, [order, ascending])

  return open ? (
    <div className='organize-modal-container'>
      <div className='d-flex justify-content-center align-items-center mb-3'>
        ORGANISE
        <CloseButton onClick={handleClose} />
      </div>
      <div className='d-flex align-items-center justify-content-around mb-3'>
        <img
          src='/images/TitleLinePause_Left.png'
          alt='line'
          className='w-30'
        />
        Display Order
        <img
          src='/images/TitleLinePause_right.png'
          alt='line'
          className='w-30'
        />
      </div>
      <div className='d-flex flex-wrap justify-content-between'>
        <NormalButton
          style={{ marginBottom: '20px', width: '48%' }}
          onClick={() => setOrderTemp('favourite')}
          inactive={orderTemp !== 'favourite'}
        >
          Favourites
        </NormalButton>
        <NormalButton
          style={{ marginBottom: '20px', width: '48%' }}
          onClick={() => setOrderTemp('level')}
          inactive={orderTemp !== 'level'}
        >
          Level
        </NormalButton>
        <NormalButton
          style={{ marginBottom: '20px', width: '48%' }}
          onClick={() => setOrderTemp('rarity')}
          inactive={orderTemp !== 'rarity'}
        >
          Rarity
        </NormalButton>
      </div>
      <div>
        <img
          src='/images/PartingLine_Equipment.png'
          alt=''
          className='w-100 mb-4'
        />
      </div>
      <div className='d-flex justify-content-between'>
        <NormalButton
          style={{ width: '48%', marginBottom: '20px' }}
          onClick={() => setAscendingTemp(false)}
          inactive={ascendingTemp}
        >
          Descending
        </NormalButton>
        <NormalButton
          style={{ width: '48%', marginBottom: '20px' }}
          onClick={() => setAscendingTemp(true)}
          inactive={!ascendingTemp}
        >
          Ascending
        </NormalButton>
      </div>
      <div>
        <img
          src='/images/PartingLine_Equipment.png'
          alt=''
          className='w-100 mb-3'
        />
      </div>
      <ApplyButton
        className='organise-apply mx-auto px-5'
        onClick={() => handleApply()}
      >
        Apply
      </ApplyButton>
    </div>
  ) : (
    <></>
  )
}

export default OrganiseModal

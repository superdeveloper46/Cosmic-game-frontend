import React, { useEffect, useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import Tooltip from '../Tooltip/tooltip'
import DetailedTooltip from '../DetailedTooltip/detailed-tooltip'
import { getTimeLeft } from '../../utils/get-time-left-utc7'

import './index.css'

const WalletInfo = ({ gold, cosmic, ascension, stamina, maxStamina }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='wallet-info-container d-flex justify-content-center align-items-center'>
      <Tooltip
        childrenClassName='wallet-info-item ongoing-ape-count d-flex align-items-center'
        tooltipElement={
          <DetailedTooltip
            image='/images/v2/currencies/Stamina.png'
            title='Energy'
            content='Energy is needed for missions. Recharges everyday at 7am UTC'
            bottomBar={
              <div>
                Recharge Time: {timeLeft.hours}h {timeLeft.minutes}m
              </div>
            }
          />
        }
      >
        <Image
          src='/images/v2/currencies/Stamina.png'
          style={{ width: '50px', height: '50px', marginRight: '10px' }}
        />
        <div className='d-flex flex-grow-1 pl-2'>
          {Math.floor(stamina.amount || 0)} / {Math.floor(maxStamina)}
        </div>
      </Tooltip>
      <Tooltip
        childrenClassName='wallet-info-item ongoing-ape-count d-flex align-items-center'
        tooltipElement={
          <DetailedTooltip
            image='/images/v2/currencies/Ascension.png'
            title='Ascension Points'
            content='A crystal infused with ascended energy that has power beyond the mortal world'
            bottomBar={<div>Owned: {Math.floor(ascension.amount || 0)}</div>}
          />
        }
      >
        <Image
          src='/images/v2/currencies/Ascension.png'
          style={{ width: '50px', height: '50px', marginRight: '10px' }}
        />
        <div className='d-flex flex-grow-1 pl-2'>
          {Math.floor(ascension.amount || 0)}
        </div>
      </Tooltip>
      <Tooltip
        childrenClassName='wallet-info-item ongoing-ape-count d-flex align-items-center'
        tooltipElement={
          <DetailedTooltip
            image='/images/v2/currencies/Gold.png'
            title='Gold'
            content='A currency accepted around the universe'
            bottomBar={<div>Owned: {Math.floor(gold.amount || 0)}</div>}
          />
        }
      >
        <Image
          src='/images/v2/currencies/Gold.png'
          style={{ width: '50px', height: '50px', marginRight: '10px' }}
        />
        <div className='d-flex flex-grow-1 pl-2'>
          {Math.floor(gold.amount || 0)}
        </div>
      </Tooltip>
      <Tooltip
        childrenClassName='wallet-info-item ongoing-ape-count d-flex align-items-center'
        tooltipElement={
          <DetailedTooltip
            image='/images/v2/currencies/Cosmic.png'
            title='Cosmic'
            content='An extremely rare and powerful currency made from pure Cosmic'
            bottomBar={
              <div>Owned: {!!cosmic.amount ? cosmic.amount.toFixed(1) : 0}</div>
            }
          />
        }
      >
        <Image
          src='/images/v2/currencies/Cosmic.png'
          style={{ width: '50px', height: '50px', marginRight: '10px' }}
        />
        <div className='d-flex flex-grow-1 pl-2'>
          {!!cosmic.amount ? cosmic.amount.toFixed(1) : 0}
        </div>
      </Tooltip>
    </div>
  )
}

export default WalletInfo

import classNames from 'classnames'
import React from 'react'
import { Image } from 'react-bootstrap'

import './new-layout-currency-item.scss'

const NewLayoutCurrencyItem = ({
  style,
  currency,
}) => {
  return (
    <div
      className={classNames("new-layout-currency-item d-flex justify-content-start align-items-center flex-column")}
      style={style}
    >
      {!!currency ? (
        <div className='currency-icon'>
          <Image
            src={`/images/v2/currencies/${(currency.name || '').replaceAll(' ', '_')}.png`}
            style={{ borderRadius: '5px' }}
            fluid
          />
        </div>
      ) : null}
      <div className='currency-number'>
        {currency?.amount || 0}
      </div>
    </div>
  )
}

export default NewLayoutCurrencyItem

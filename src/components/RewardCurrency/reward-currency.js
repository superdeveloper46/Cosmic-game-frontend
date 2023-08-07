import React from "react"
import { Image } from "react-bootstrap"

const RewardCurrency = ({
  currency,
  amount = 0,
  className,
  style,
}) => {
  return (
    <div className={ className } style={ style }>
      <div className="d-flex align-items-center m-1">
        <Image src={`/images/v2/currencies/${currency.name}.png`} style={{ width: '40px', height: '40px', marginRight: '10px' }}/>
        { amount }
      </div>
    </div>
  )
}

export default RewardCurrency
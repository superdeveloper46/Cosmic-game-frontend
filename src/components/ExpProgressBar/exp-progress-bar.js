import React, { useEffect, useState } from 'react'
import './exp-progress-bar.scss'

const ExpProgressBar = ({
  total,
  firstValue,
  secondValue,
  className,
  centerText = true,
  maxCheck = false,
}) => {
  const [firstPercent, setFirstPercent] = useState(0)
  const [secondPercent, setSecondPercent] = useState(0)

  useEffect(() => {
    const totalValue = total || firstValue || secondValue

    if (firstValue === 0 && totalValue === 0 && secondValue === 0) {
      setFirstPercent(100)
    } else {
      setFirstPercent((firstValue / totalValue) * 100)
      setSecondPercent(
        (100 - (firstValue / totalValue) * 100) < (secondValue / totalValue) * 100
        ? (100 - (firstValue / totalValue) * 100)
        : (secondValue / totalValue) * 100
      )
    }
  }, [firstValue, secondValue, total])

  return (
    <div className={`progress-bar-container ${className}`}>
      <div
        className='progress-bar-step-1'
        style={{ width: `${firstPercent}%` }}
      />
      {!!secondValue ? (
        <div
          className='progress-bar-step-2'
          style={{ width: `${secondPercent}%` }}
        />
      ) : null}
      {centerText && (
        <p>
          {
            !!maxCheck && ((firstValue || 0) + (secondValue || 0)) >= total
            ? 'MAX'
            : `${(firstValue || 0) + (secondValue || 0)}/${total}`
          }
        </p>
      )}
    </div>
  )
}

export default ExpProgressBar

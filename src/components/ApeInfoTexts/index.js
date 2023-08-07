import React, { useEffect, useState } from 'react'
import humanizeMinutes from '../../utils/humanize-minutes'
import { useDispatch, useSelector } from 'react-redux'
import ExpProgressBar from '../ExpProgressBar/exp-progress-bar'
import TextWithImage from '../TextWithImage'

import './index.css'

const ApeInfoTexts = ({ ape }) => {
  const account = useSelector((state) => state.accounts.account)
  const levels = useSelector((state) => state.accounts.levels)
  const [level, setLevel] = useState(1)
  const [exp, setExp] = useState(0)
  const [maxExp, setMaxExp] = useState(14)

  useEffect(() => {
    if (account) {
      const levelsInfo = levels?.account_levels.filter(
        (acc) =>
          (acc.experience_low < account.experience ||
            acc.experience_low === account.experience) &&
          (acc.experience_high > account.experience ||
            acc.experience_high === account.experience),
      )[0]

      if(!!levelsInfo) {
        setLevel(levelsInfo.level)
        setExp(levelsInfo.experience_low)
        setMaxExp(levelsInfo.experience_high)
      }
    }
  }, [account])

  return (
    <div className='ape-info-texts-container d-flex justify-content-center'>
      <div className='d-flex flex-column justify-content-center align-items-start p-2'>
        <div>{ape?.gameData?.name || ''}</div>
        <div className='text-warning'>Account Rank: {level}</div>
        <ExpProgressBar total={maxExp} firstValue={exp} className='mx-auto' />
      </div>
      {/* <div className='character-item-detail'>
        <div className="stamina-image">
          {(ape?.gameData?.currencies || []).find(currency => currency.Currency.name === 'Stamina')?.amount || 0}/{ape?.gameData?.Level?.stamina || 0}
        </div>
      </div> */}
    </div>
  )
}

export default ApeInfoTexts

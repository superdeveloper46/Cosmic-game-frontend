import React, { useState } from 'react'
import BankWithdrawPanel from '../BankWithdrawPanel/bank-withdraw-panel'
import BankDepositPanel from '../BankDepositPanel/bank-deposit-panel'
import CloseButton from '../CloseButton'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'

const bankTypes = ['DEPOSIT', 'WITHDRAW']

const BankDialog = ({ open, onClose, setMessage }) => {
  const [selectedType, setSelectedType] = useState(bankTypes[0])
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])
  const backSound = useAudio(AUDIOLIST['EXIT_BACK_BUTTON'])

  return !!open ? (
    <div className='vw-100 vh-100 position-fixed'>
      <div
        className='mission-list-rewards-dialog-container'
        style={{ width: '600px', zIndex: 50 }}
      >
        <div className='d-flex justify-content-center align-items-center mt-3'>
          COSMIC BANK
          <CloseButton
            onClick={() => {
              backSound()
              onClose()
            }}
          />
        </div>
        <div className=' flex flex-column align-items-center p-2'>
          <div className='d-flex justify-content-between character-forge-tab-btns'>
            {bankTypes.map((bankType) => (
              <button
                key={`inventory-list-item-${bankType}`}
                className={`h-100 ${bankType === selectedType ? 'active' : ''}`}
                onClick={() => {
                  generalSound()
                  setSelectedType(bankType)
                }}
              >
                {bankType}
              </button>
            ))}
          </div>
          <div
            className='custom-border-bottom type-2 m-5'
            style={{ height: '1px' }}
          />
          {selectedType === bankTypes[0] ? (
            <BankDepositPanel setMessage={setMessage} />
          ) : (
            <BankWithdrawPanel setMessage={setMessage} />
          )}
        </div>
      </div>
    </div>
  ) : null
}

export default BankDialog

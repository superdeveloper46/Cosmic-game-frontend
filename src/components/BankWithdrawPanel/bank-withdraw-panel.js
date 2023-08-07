import { useWallet } from '@solana/wallet-adapter-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAccount } from '../../slices/accountSlice'
import withdrawCosmic from '../../utils/withdraw'
import ApplyButton from '../ApplyButton'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'

const BankWithdrawPanel = ({ setMessage }) => {
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])
  const { publicKey } = useWallet()
  const dispatch = useDispatch()

  const account = useSelector((state) => state.accounts.account)
  const cosmic = (account?.currencies || []).find(
    (currency) => currency.Currency.name === 'Cosmic',
  )
  const [withdraw, setWithdraw] = useState(0)
  const reloadAccount = (publicKey) => dispatch(getAccount(publicKey))

  const handleWithdraw = () => {
    generalSound()
    if (!Number(withdraw) || Number(withdraw) > Number(cosmic?.amount || 0)) {
      setMessage({
        type: 'error',
        text: 'Please input correct number to withdraw',
      })
    } else {
      setMessage({
        type: 'confirm',
        text: `Are you sure to withdraw ${withdraw} $COSMIC?`,
        callback: (confirm) => {
          if (confirm === 'yes') {
            withdrawCosmic({
              amount: withdraw,
              wallet: publicKey,
              callback: (response) => {
                if (!!response?.signature) {
                  setMessage({
                    type: 'info',
                    text: (
                      <div className='d-flex flex-column text-break'>
                        <p className='mb-1'>
                          {response.amount} $COSMIC is successfully withdrawn to
                          your wallet
                        </p>
                        <p className='mb-1'>
                          Check the transaction status with the link bellow
                        </p>

                        <a
                          href={
                            process.env.REACT_APP_NETWORK === 'devnet'
                              ? `https://solscan.io/tx/${response.signature}?cluster=devnet`
                              : `https://solscan.io/tx/${response.signature}`
                          }
                          target='_blank'
                          rel='noreferrer'
                        >
                          {process.env.REACT_APP_NETWORK === 'devnet'
                            ? `https://solscan.io/tx/${response.signature}?cluster=devnet`
                            : `https://solscan.io/tx/${response.signature}`}
                        </a>
                      </div>
                    ),
                  })
                }
                reloadAccount(publicKey)
              },
              setMessage,
            })
          }
        },
      })
    }
  }

  return (
    <div className='d-flex flex-column m-1 mx-5 align-items-center'>
      <div className='text-white h5 flex-grow text-center mt-2'>
        Balance: {(cosmic?.amount || 0).toFixed(1)} $COSMIC
      </div>
      <div className='d-flex align-items-center w-100'>
        <div className='flex-grow-1' />
        <div
          className='text-warning h6 p-1 hover-opacity-8 hover-cursor-pointer'
          onClick={() => {
            generalSound()
            setWithdraw(((cosmic?.amount || 0) / 2).toFixed(1))
          }}
        >
          {' '}
          HALF{' '}
        </div>
        <div
          className='text-warning h6 p-1 hover-opacity-8 hover-cursor-pointer'
          onClick={() => {
            generalSound()
            setWithdraw((cosmic?.amount || 0).toFixed(1))
          }}
        >
          {' '}
          MAX{' '}
        </div>
      </div>
      <div className={`d-flex align-items-center character-search`}>
        <button className='p-1'>
          <img src='/images/COSMIC_COIN_1024 3.png' alt='search' />
        </button>
        <input
          type='text'
          value={withdraw}
          onChange={(e) => setWithdraw(e.target.value)}
        />
      </div>
      <ApplyButton className='my-3 px-4 danger' onClick={handleWithdraw}>
        WITHDRAW
      </ApplyButton>
    </div>
  )
}

export default BankWithdrawPanel

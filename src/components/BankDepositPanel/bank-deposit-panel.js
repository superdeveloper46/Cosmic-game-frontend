import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
} from '@solana/web3.js'
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
} from '@solana/spl-token'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTransferInstruction } from '../../libs/transaction/createTransferInstructions'
import { getOrCreateAssociatedTokenAccount } from '../../libs/transaction/getOrCreateAssociatedTokenAccount'
import depositStart from '../../utils/deposit-start'
import ApplyButton from '../ApplyButton'
import depositComplete from '../../utils/deposit-complete'
import { getAccount } from '../../slices/accountSlice'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'

const BankDepositPanel = ({ setMessage }) => {
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])
  const depositSound = useAudio(AUDIOLIST['DEPOSIT_SFX'])

  const { connection } = useConnection()
  const { publicKey, signTransaction } = useWallet()
  const dispatch = useDispatch()

  const account = useSelector((state) => state.accounts.account)
  const [cosmic, setCosmic] = useState(-1)
  const [deposit, setDeposit] = useState(0)
  const reloadAccount = (publicKey) => dispatch(getAccount(publicKey))

  useEffect(() => {
    if (cosmic < 0) {
      reloadCosmic()
    }
  }, [])

  const reloadCosmic = async () => {
    const associatedToken = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      new PublicKey(process.env.REACT_APP_COSMIC_MINT_ADDRESS),
      publicKey,
    )

    try {
      const info = await connection.getTokenAccountBalance(associatedToken)

      setCosmic(info.value.uiAmount)
    } catch (err) {
      setCosmic(0)
    }
  }

  const executeTransaction = async (bankLedger) => {
    if (!bankLedger) {
      setMessage({
        type: 'error',
        text: 'Something went wrong',
      })
    } else {
      const { toPubKey, amount, unique_ref } = bankLedger

      const cosmicMintAddress = process.env.REACT_APP_COSMIC_MINT_ADDRESS

      if (!toPubKey || !amount || !unique_ref || !cosmicMintAddress) {
        setMessage({
          type: 'error',
          text: 'Something went wrong',
        })

        return
      }

      try {
        if (!publicKey || !signTransaction) throw new WalletNotConnectedError()
        const toPublicKey = new PublicKey(toPubKey)
        const mint = new PublicKey(cosmicMintAddress)

        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          publicKey,
          mint,
          publicKey,
          signTransaction,
        )

        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          publicKey,
          mint,
          toPublicKey,
          signTransaction,
        )

        const transaction = new Transaction().add(
          createTransferInstruction(
            fromTokenAccount.address, // source
            toTokenAccount.address, // dest
            publicKey,
            amount * Math.pow(10, process.env.REACT_APP_COSMIC_DECIMAL || 6),
            [],
            TOKEN_PROGRAM_ID,
          ),
        )

        const blockHash = await connection.getRecentBlockhash()
        transaction.feePayer = publicKey
        transaction.recentBlockhash = blockHash.blockhash
        const signed = await signTransaction(transaction)

        const signature = await connection.sendRawTransaction(
          signed.serialize(),
        )

        await connection.confirmTransaction(signature)

        depositComplete({
          signature,
          unique_ref,
          wallet: publicKey,
          callback: () => {
            setMessage({
              type: 'info',
              text: (
                <div className='d-flex flex-column text-break'>
                  <p className='mb-1'>
                    {amount} $COSMIC is successfully deposited to the account
                  </p>
                  <p className='mb-1'>
                    Check the transaction status with the link bellow
                  </p>

                  <a
                    href={
                      process.env.REACT_APP_NETWORK === 'devnet'
                        ? `https://solscan.io/tx/${signature}?cluster=devnet`
                        : `https://solscan.io/tx/${signature}`
                    }
                    target='_blank'
                    rel='noreferrer'
                  >
                    {process.env.REACT_APP_NETWORK === 'devnet'
                      ? `https://solscan.io/tx/${signature}?cluster=devnet`
                      : `https://solscan.io/tx/${signature}`}
                  </a>
                </div>
              ),
            })

            reloadAccount(publicKey)
            reloadCosmic()
          },
          setMessage,
        })
      } catch (error) {
        setMessage({
          type: 'error',
          text: `Failed to deposit $COSMIC - ${error}`,
        })
      }
    }
  }

  const handleDeposit = () => {
    depositSound()
    if (!Number(deposit)) {
      setMessage({
        type: 'error',
        text: 'Please input correct number to deposit',
      })
    } else {
      setMessage({
        type: 'confirm',
        text: `Are you sure to deposit ${deposit} $COSMIC?`,
        callback: (confirm) => {
          if (confirm === 'yes') {
            depositStart({
              amount: deposit,
              callback: executeTransaction,
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
        Balance:{' '}
        {cosmic === -1 ? 'Fetching ...' : `${cosmic.toFixed(1)} $COSMIC`}
      </div>
      <div className='d-flex align-items-center w-100'>
        <div className='flex-grow-1' />
        <div
          className='text-warning h6 p-1 hover-opacity-8 hover-cursor-pointer'
          onClick={() => {
            generalSound()
            setDeposit((cosmic / 2).toFixed(1))
          }}
        >
          {' '}
          HALF{' '}
        </div>
        <div
          className='text-warning h6 p-1 hover-opacity-8 hover-cursor-pointer'
          onClick={() => {
            generalSound()
            setDeposit(cosmic.toFixed(1))
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
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
        />
      </div>
      <ApplyButton className='my-3 px-4' onClick={handleDeposit}>
        DEPOSIT
      </ApplyButton>
    </div>
  )
}

export default BankDepositPanel

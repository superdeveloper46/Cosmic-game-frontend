import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateAccountInfo } from '../../../../slices/accountSlice'
import Avatar from '../../../../components/Avatar'
import ApplyButton from '../../../../components/ApplyButton'
import './account.scss'
import axios from 'axios'
import { useCallback } from 'react'

export const crownFrames = [
  '/images/v2/game-ui/Character-Circle-Frame1.png',
  '/images/v2/game-ui/Character-Circle-Frame2.png',
  '/images/v2/game-ui/Character-Circle-Frame3.png',
  '/images/v2/game-ui/Character-Circle-Frame4.png',
  '/images/v2/game-ui/Character-Circle-Frame5.png',
  '/images/v2/game-ui/Character-Circle-Frame6.png',
  '/images/v2/game-ui/Character-Circle-Frame7.png',
  '/images/v2/game-ui/Character-Circle-Frame8.png',
  '/images/v2/game-ui/Character-Circle-Frame9.png',
]

export const shortenAddress = (address) =>
  `${address.toString().slice(0, 4)}...${address.toString().slice(-4)}`

function Account({ crownedApeId, account, apes, selectedApes }) {
  const dispatch = useDispatch()
  const accountInfo = useSelector((state) => state.accounts.account)
  const [crownedApe, setCrownedApe] = useState(null)
  const [isEditable, setIsEditable] = useState(false)
  const [selectedFrame, setSelectedFrame] = useState(0)
  const [username, setUserName] = useState(account)
  const [discord, setDiscord] = useState(null)
  const [twitter, setTwitter] = useState(null)

  useEffect(() => {
    if (crownedApeId) {
      setCrownedApe(apes.filter((ape) => ape.gameData.id === crownedApeId)[0])
    }
  }, [crownedApeId, apes])

  const setAccountInfo = () => {
    setUserName(accountInfo?.username)
    setDiscord(accountInfo?.discord)
    setTwitter(accountInfo?.twitter)
    setSelectedFrame(accountInfo?.frame_type)
  }

  const REDIRECT_URI = `http://localhost:3000/settings/account`
  const TWITTER_CLIENT_ID = 'ald2VlJLUnJETzJtQjRiWnpONFk6MTpjaQ'

  const updateTwitter = useCallback((data) => {
    dispatch(updateAccountInfo(account, { twitter: data }))
  }, [])

  const getTwitterUser = useCallback(
    (code) => {
      axios
        .get(
          `${process.env.REACT_APP_API_HOST}auth/twitter?state=state&code=${code}`,
        )
        .then((res) => {
          updateTwitter(res.data.user.username)
        })
        .catch((err) => console.log(err))
    },
    [updateTwitter],
  )

  const handlePostMessage = useCallback(
    async ({ type, code, provider }) => {
      if (type === 'code' && provider === 'twitter' && code) {
        getTwitterUser(code)
      }
    },
    [getTwitterUser],
  )

  const onChangeLocalStorage = useCallback(() => {
    window.removeEventListener('storage', onChangeLocalStorage, false)
    const code = localStorage.getItem('twitter')
    if (code) {
      handlePostMessage({ provider: 'twitter', type: 'code', code })
      localStorage.removeItem('twitter')
    }
  }, [handlePostMessage])

  const onLogin = useCallback(async () => {
    window.addEventListener('storage', onChangeLocalStorage, false)
    const width = 450
    const height = 730
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2

    const rootUrl = 'https://twitter.com/i/oauth2/authorize'
    const options = {
      redirect_uri: REDIRECT_URI,
      client_id: TWITTER_CLIENT_ID,
      state: 'state',
      response_type: 'code',
      code_challenge: 'challenge',
      code_challenge_method: 'plain',
      scope: ['users.read', 'tweet.read'].join(' '), // add/remove scopes as needed
    }

    const qs = new URLSearchParams(options).toString()
    window.open(
      `${rootUrl}?${qs}`,
      'twitter',
      'menubar=no, resizable=no, scrollbars=no, width=' +
        width +
        ', height=' +
        height +
        ', top=' +
        top +
        ', left=' +
        left,
    )
  }, [onChangeLocalStorage])

  useEffect(() => {
    const popupWindowURL = new URL(window.location.href)
    const code = popupWindowURL.searchParams.get('code')
    const state = popupWindowURL.searchParams.get('state')
    if (state && code) {
      localStorage.setItem('twitter', `${code}`)
      window.close()
    }
  }, [])

  useEffect(() => {
    if (account) {
      setAccountInfo()
    }
  }, [])

  useEffect(() => {
    setAccountInfo()
  }, [accountInfo])

  const updateUsername = async () => {
    await dispatch(updateAccountInfo(account, { username }))
    setIsEditable(false)
  }

  const updateSelectedFrame = (index) => {
    dispatch(updateAccountInfo(account, { frame_type: index }))
    setSelectedFrame(index)
  }

  const updateDiscord = () => {
    dispatch(updateAccountInfo(account, { discord }))
  }

  const deleteDiscord = () => {
    dispatch(updateAccountInfo(account, { discord: null }))
    setDiscord('')
  }

  const deleteTwitter = () => {
    dispatch(updateAccountInfo(account, { twitter: null }))
  }

  return account ? (
    <div className='account-container'>
      <h2 className='custom-border-bottom type-long mb-3'>User Info</h2>
      <div className='d-flex account-detail mb-4 py-3'>
        <Avatar
          src={crownedApe ? crownedApe?.info?.image || '' : ''}
          frameSrc={crownFrames[accountInfo?.frame_type]}
        />
        <div className='account-detail-user ms-3 mt-2'>
          <div className='d-flex align-items-center mb-2'>
            <h3>USERNAME:</h3>
            {isEditable ? (
              <>
                <input
                  type='text'
                  placeholder='Type name'
                  className='me-5 username'
                  value={username || ''}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <ApplyButton onClick={() => updateUsername()}>
                  Confirm
                </ApplyButton>
              </>
            ) : (
              <>
                <h3 className='me-5 username px-2'>{accountInfo?.username}</h3>
                <ApplyButton
                  className='gradient'
                  onClick={() => setIsEditable(true)}
                >
                  Change
                </ApplyButton>
              </>
            )}
          </div>
          <div className='account-address'>
            <img src='/images/solana.png' alt='solana' />
            <h3>{shortenAddress(account)}</h3>
          </div>
        </div>
      </div>
      <h2 className='custom-border-bottom type-long mb-3'>Social Links</h2>
      <div className='account-social px-3 py-3'>
        <img src='/images/telegram.png' alt='telegram' />
        {accountInfo?.twitter ? (
          <>
            <a
              href={`https://twitter.com/${accountInfo?.twitter}`}
              target='_blank'
              rel='noreferrer'
              className='text-decoration-none'
            >
              <ApplyButton className='me-3'>Linked</ApplyButton>
            </a>
            <ApplyButton
              className='danger px-4'
              onClick={() => deleteTwitter()}
            >
              Unlink
            </ApplyButton>
          </>
        ) : (
          <ApplyButton className='gradient px-4' onClick={onLogin}>
            Link
          </ApplyButton>
        )}
      </div>
      <div className='account-social px-3 pb-4'>
        <img src='/images/discord.png' alt='discord' />
        {!accountInfo?.discord ? (
          <>
            <input
              type='text'
              placeholder='Discord profile'
              className='me-5 username'
              value={discord || ''}
              onChange={(e) => setDiscord(e.target.value)}
            />
            <ApplyButton
              className='gradient px-4'
              onClick={() => updateDiscord()}
            >
              Link
            </ApplyButton>
          </>
        ) : (
          <>
            <a
              href={discord}
              target='_blank'
              rel='noreferrer'
              className='text-decoration-none'
            >
              <ApplyButton className='me-3'>Linked</ApplyButton>
            </a>
            <ApplyButton
              className='danger px-4'
              onClick={() => deleteDiscord()}
            >
              Unlink
            </ApplyButton>
          </>
        )}
      </div>
      <h2 className='custom-border-bottom type-long mb-3'>Frames</h2>
      <div className='account-frames d-flex align-items-center py-4'>
        {crownFrames.map((frame, index) => (
          <div
            key={`crown-frame-${index}`}
            className={`account-frames-item mx-2 ${
              selectedFrame === index ? 'active' : ''
            }`}
            onClick={() => updateSelectedFrame(index)}
          >
            <img src={frame} alt='frame' />
          </div>
        ))}
      </div>
    </div>
  ) : null
}

export default Account

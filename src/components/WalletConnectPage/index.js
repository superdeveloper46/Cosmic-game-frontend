import React, { useEffect } from "react"

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import "./index.css";
import { useWallet } from "@solana/wallet-adapter-react";
import getMFA from "../../utils/get-mfa";
import verifyWallet from "../../utils/verify-wallet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const WalletConnectPage = ({
  setMessage,
  callback,
}) => {
  const { connected, connecting, publicKey, signMessage, disconnect, disconnecting } = useWallet();
  const navigate = useNavigate()
  const [ verifying, setVerifying ] = useState(false)

  useEffect(() => {
    const checkMFA = async () => {
      if (!!publicKey && !!connected) {
        let verification = JSON.parse(localStorage.getItem('verification') || '{}')
  
        if (verification?.publicKey !== publicKey.toBase58() || !verification?.verify) {
          localStorage.removeItem('verification')
          verification = false
        }

        if (!verification) {
          try {
            setVerifying(true)

            const mfa = await getMFA(publicKey)

            const signedMFA = await signMessage(new TextEncoder().encode(mfa))
    
            const verifyResult = await verifyWallet({
              mfa,
              signedMFA,
              publicKey
            })

            // if (!!verifyResult && verifyResult?.publicKey === publicKey.toBase58() && !verifyResult?.whitelisted) {
            //   setMessage({
            //     type: 'error',
            //     text: 'This wallet address does not have access to the Test Environment.'
            //   })
            //   disconnect()
            // } else if (!!verifyResult && !!verifyResult?.verify && verifyResult?.publicKey === publicKey.toBase58()) {
            //   localStorage.setItem('verification', JSON.stringify(verifyResult))
            //   navigate('/')
              
            //   if (typeof callback === 'function') callback(true)
            // } else {
            //   disconnect()
    
            //   if (typeof callback === 'function') callback(false)
            // }
            // setVerifying(false)

            localStorage.setItem('verification', JSON.stringify(verifyResult))
              navigate('/')
              
              if (typeof callback === 'function') callback(true)
          } catch (err) {
            console.log(err)

            disconnect()
            if (typeof callback === 'function') callback(false)
            setVerifying(false)
          }
        }
      }
    }

    checkMFA()
  }, [ publicKey ])

  useEffect(() => {
    if (!!disconnecting) {
      localStorage.removeItem('verification')
      if (typeof callback === 'function') callback(false)
    }
  }, [ disconnecting ])

  return (
    <div className="login-background">
      <div className="login-logo" />
      <WalletMultiButton className="connect-wallet-button">{ !!connecting ? 'Connecting Wallet ...' : !!verifying ? 'Verifying Wallet ...' : 'Connect Wallet' }</WalletMultiButton>
    </div>
  )
}

export default WalletConnectPage
import API from "../actions/api"

const verifyWallet = async ({
  mfa,
  signedMFA,
  publicKey,
}) => {
  const verifyResult = await API.post('/verify-wallet', {
    mfa,
    signedMFA,
    publicKey,
  })

  return verifyResult.data
}

export default verifyWallet
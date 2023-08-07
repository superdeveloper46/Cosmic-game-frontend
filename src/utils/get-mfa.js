import API from "../actions/api"

const getMFA = async publicKey => {
  const mfaResponse = await API.get(`/get-mfa?address=${publicKey}`)

  return mfaResponse.data
}

export default getMFA
import API from "../actions/api"

const claimAllMissions = async ({
  addresses = [],
  wallet,
  setMessage,
  setLoading,
  cb,
}) => {
  setLoading(true)
  if (!wallet) return 'Wallet Address is required'

  API.post('/missions/claim-all-rewards', {
    addresses,
    wallet,
  })
  .then(res => {
    if (!!res.data.msg) {
      setMessage({
        type: 'error',
        text: res.data.msg
      })
    } else if (res.data.length === 0) {
      setMessage({
        type: 'error',
        text: 'No ape can be claimed'
      })
    } else {
      if (typeof cb === 'function') cb(res.data)
    }
    setLoading(false)
  })
  .catch(err => {
    console.log('error', err)
    if (typeof err?.response?.data?.msg === 'string') {
      setMessage({
        type: 'error',
        text: err.response.data.msg
      })
    } else {
      setMessage({
        type: 'error',
      })
    }
    setLoading(false)
  })
}

export default claimAllMissions
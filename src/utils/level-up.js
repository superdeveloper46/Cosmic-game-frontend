import API from "../actions/api"

const levelUp = async ({
  address,
  wallet,
  setMessage,
  callback,
}) => {
  API.post('/apes/levelup', {
    address,
    wallet,
  })
  .then(res => {
    if (!!res.data.msg) {
      setMessage({
        type: 'error',
        text: res.data.msg
      })
    } else {
      if (typeof callback === 'function') callback(res.data)
    }
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
  })
}

export default levelUp
import API from "../actions/api"

const craft = async ({
  wallet,
  inventory,
  setMessage,
  callback,
}) => {
  API.post(`/limit-break`, {
    wallet:wallet,
    limitBreak_id: inventory.inv_id
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

export default craft
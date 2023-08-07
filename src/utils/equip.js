import API from "../actions/api"

const equip = async ({
  address,
  wallet,
  inventoryId,
  action,
  setMessage,
  setLoading,
  callback,
}) => {
  setLoading(true)
  API.post(`/equip/default/${action}`, {
    address,  
    wallet,
    inventory_id: inventoryId,
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

export default equip
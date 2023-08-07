import API from "../actions/api"

const repairInventory = async ({
  address,
  wallet,
  inventory,
  materials,
  efficiency,
  setMessage,
  callback,
}) => {
  API.post('/items/repair', {
    wallet,
    inventoryId: inventory?.inv_id,
    efficiency,
    materials: (materials || []).map(
      material => ({ 
        id: material.id, 
        count: material.count,
      })
    )
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

export default repairInventory
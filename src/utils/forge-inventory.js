import API from "../actions/api"

const forgeInventory = async ({
  address,
  wallet,
  inventory,
  materials,
  setMessage,
  callback,
}) => {
  API.post('/items/forge', {
    address,
    wallet,
    inventoryId: inventory?.id,
    materials: (materials || []).map(
      material => ({ 
        id: material.id, 
        type: !!material.Item 
              ? 'item' 
              : !!material.Resource
              ? 'resource'
              : !!material.Utility
              ? 'utility'
              : 'item'
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

export default forgeInventory
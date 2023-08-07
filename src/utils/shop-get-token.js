import API from '../actions/api'

const getShopToken = async (address) => {
  let result

  try {
    result = (
      await API.post('/shop/generateToken', {
        address,
      })
    ).data
  } catch (err) {
    console.log(err)
  }

  return result
}

export default getShopToken

import API from '../actions/api'

const fetchShopAccountLimits = async (publicKey) => {
  let response;
  try {
    response = await API.get(`/account-limits/shop?wallet=${publicKey}`)
    return response.data
  } catch (err) {
    console.log(err)
  }

  return response
}

export default fetchShopAccountLimits

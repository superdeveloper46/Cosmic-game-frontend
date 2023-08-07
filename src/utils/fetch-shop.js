import API from '../actions/api'

const getShopItems = async () => {
  let response;

  try {
    response = await API.get('/products')
    // response = await API.get('/shop/getAll')
    return response.data
  } catch (err) {
    console.log(err)
  }

  return response
}

export default getShopItems

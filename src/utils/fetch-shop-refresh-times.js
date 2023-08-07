import API from '../actions/api'

const fetchShopRefreshTimes = async () => {
  let response;
  try {
    response = await API.get(`/account-limits/refresh`)
    return response.data
  } catch (err) {
    console.log(err)
  }
}

export default fetchShopRefreshTimes

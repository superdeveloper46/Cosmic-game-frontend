import API from "../actions/api"

const fetchCurrencies = async () => {
  const currencies = await API.get('/currencies')

  return currencies.data
}

export default fetchCurrencies
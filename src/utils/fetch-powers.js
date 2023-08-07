import API from "../actions/api"

const fetchPowers = async () => {
  const items = await API.get('/apes/powers')

  return items.data
}

export default fetchPowers
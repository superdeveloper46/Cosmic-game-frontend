import API from "../actions/api"

const fetchItems = async () => {
  const items = await API.get('/items')

  return items.data
}

export default fetchItems
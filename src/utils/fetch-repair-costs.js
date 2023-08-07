import API from "../actions/api"

const fetchRepairCosts = async () => {
  const items = await API.get('/info/repair-costs')

  return items.data
}

export default fetchRepairCosts
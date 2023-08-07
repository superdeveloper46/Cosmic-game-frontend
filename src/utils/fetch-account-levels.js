import API from "../actions/api"

const fetchAccountLevels = async () => {
  const levels = await API.get(`/account_levels `)

  return levels.data
}

export default fetchAccountLevels
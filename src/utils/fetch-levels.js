import API from "../actions/api"

const fetchLevels = async () => {
  const levels = await API.get('/levels')

  return levels.data
}

export default fetchLevels
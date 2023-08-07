import API from "../actions/api"

const fetchMissions = async () => {
  const missions = await API.get('/missions')

  return missions.data
}

export default fetchMissions
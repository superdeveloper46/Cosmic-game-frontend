import API from "../actions/api"

const fetchMaps = async () => {
  const maps = await API.get('/maps')

  return maps.data
}

export default fetchMaps
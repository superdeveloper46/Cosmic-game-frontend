import API from "../actions/api"

const fetchResources = async () => {
  const resources = await API.get('/resources')

  return resources.data
}

export default fetchResources
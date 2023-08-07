import API from "../actions/api"

const fetchPowerEffects = async () => {
  const items = await API.get('/info/power-effects')

  return items.data
}

export default fetchPowerEffects
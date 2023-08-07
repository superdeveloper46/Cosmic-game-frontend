import API from "../actions/api"

const fetchEvolutionCosts = async () => {
  const items = await API.get('/info/evolution-costs')

  return items.data
}

export default fetchEvolutionCosts
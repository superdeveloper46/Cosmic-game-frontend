import API from "../actions/api"

const fetchLimitBreakRecipes = async () => {
  const items = await API.get('/limit-break-recipes')

  return items.data
}

export default fetchLimitBreakRecipes
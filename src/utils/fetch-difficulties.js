import API from "../actions/api"

const fetchDifficulties = async () => {
  const difficulties = await API.get(`/mission-complexity`)

  return difficulties.data
}

export default fetchDifficulties
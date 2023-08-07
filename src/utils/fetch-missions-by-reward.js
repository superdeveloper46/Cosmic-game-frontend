import API from "../actions/api"

const fetchMissionsByReward = async ({
  type,
  id,
}) => {
  const missions = await API.get(`/missions/by-reward-${type}`, {
    params: {
      id,
    }
  })

  return missions.data
}

export default fetchMissionsByReward
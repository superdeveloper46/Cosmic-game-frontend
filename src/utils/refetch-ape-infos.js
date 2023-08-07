import API from "../actions/api"

const refetchApeInfos = async addresses => {
  if (addresses.length <= 0) return

  const apes = (await API.post('/apes', {
    addresses,
  })).data

  return apes
}

export default refetchApeInfos
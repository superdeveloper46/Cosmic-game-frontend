import API from "../actions/api"

const fetchAccountResources = async (publicKey) => {
  const accountResources = await API.get(`/account-resource-summary?wallet=${publicKey}`)

  return accountResources.data
}

export default fetchAccountResources
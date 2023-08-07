import API from "../actions/api"

const fetchAccount = async (publicKey) => {
  const account = await API.get(`/account?address=${publicKey}`)

  return account.data
}

export default fetchAccount
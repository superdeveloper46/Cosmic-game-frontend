import API from '../actions/api'

const updateAccount = async (publicKey, data) => {
  const account = await API.put(`/account?address=${publicKey}`, data)

  return account.data
}

export default updateAccount

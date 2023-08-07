import API from "../actions/api"

const fetchInventories = async ({
  address,
  type, 
  subType, 
  after,
  count,
  resourceId
}) => {
  const inventories = await API.get(`/items/account?address=${address}&type=${type}&subType=${subType}&after=${after}&count=${count}${!!resourceId ? `&resourceId=${resourceId}` : ''}`)

  return inventories.data
}

export default fetchInventories
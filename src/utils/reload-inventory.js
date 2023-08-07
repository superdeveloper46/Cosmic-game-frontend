import API from "../actions/api"

const reloadInventory = async ({
  inventoryId
}) => {
  const inventory = await API.get(`/items/account/inventory?inventoryId=${inventoryId}`)

  return inventory.data
}

export default reloadInventory
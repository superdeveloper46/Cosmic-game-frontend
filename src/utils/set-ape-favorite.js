import API from "../actions/api"

const setApeFavorite = async ({
  address,
  wallet,
  favorite,
  rollback,
  callback,
}) => {
  let result

  try {
    result = (await API.post(favorite ? '/ape/favorite' : '/ape/unfavorite', {
      address,
      wallet,
    })).data
    
    if (typeof callback === 'function') callback()
  } catch (err) {
    console.log(err)
    if (typeof rollback === 'function') rollback()
  }

  return result
}

export default setApeFavorite
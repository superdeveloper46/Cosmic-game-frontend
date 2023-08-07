import API from '../actions/api'

const fetchCrownedApe = async (address) => {
  const crownedApe = await API.post('ape/crowned', { wallet: address })

  return crownedApe.data
}

const crownApe = async (address, apeId) => {
  const crownedApe = await API.post('ape/crown', { wallet: address, apeId })

  return crownedApe.data
}

const unCrownApe = async (address, apeId) => {
  const crownedApe = await API.post('ape/uncrown', { wallet: address, apeId })
  return crownedApe.data
}

export { fetchCrownedApe, crownApe, unCrownApe }

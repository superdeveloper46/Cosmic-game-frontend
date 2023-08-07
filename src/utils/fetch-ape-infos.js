import API from "../actions/api"

const fetchApeInfos = async nfts => {
  const apes = (await API.post('/apes', {
    addresses: nfts.map(nft => nft.mint),
  })).data

  return nfts.map(nft => ({
    ...nft,
    gameData: apes.find(ape => ape.address === nft.mint) || {}
  }))
}

export default fetchApeInfos
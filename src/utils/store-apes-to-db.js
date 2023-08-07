import API from "../actions/api"

const storeApesToDB = async (nfts, publicKey) => {
  const fetchedNfts = await Promise.all(
    nfts.map(async nft => {
      const nftInfo = await fetch(nft.data.uri).then(res => res.json())
      return {
        ...nft,
        info: nftInfo,
        power: (nftInfo?.attributes || []).find(attr => attr?.trait_type === 'Power Class')?.value || null
      }
    })
  )
  const apes = (await API.post(
    '/apes/store/bulk',
    fetchedNfts.map(nft => ({
      name: nft.info.name || nft.data.name,
      address: nft.mint,
      image: nft.info.image,
      owner: publicKey,
      symbol: nft.info.symbol || nft.data.symbol,
      power: nft.power
    }))
  )).data
  
  return fetchedNfts.map(nft => ({
    ...nft,
    gameData: apes.find(ape => ape.address === nft.mint) || {}
  }))
}

export default storeApesToDB
import {
  getParsedNftAccountsByOwner,
	isValidSolanaAddress
} from "@nfteyez/sol-rayz"

import cosmicMintData from '../consts/cosmic-mint-data'
import createConnection from "./create-connection"

const fetchNftsByWalletAddress = async publicAddress => {
  const env = process.env.NODE_ENV

  const connect = createConnection()
  const result = isValidSolanaAddress(publicAddress)

  if (!result) return []

  const nfts = await getParsedNftAccountsByOwner({
    publicAddress,
    connection: connect,
    serialization: true,
  })
  const cosmicMintAddresses = cosmicMintData.map(info => info.address)

  const cosmicNfts = (nfts || []).filter(nft => (env === 'development' || cosmicMintAddresses.includes(nft.mint)))

  return cosmicNfts
}

export default fetchNftsByWalletAddress
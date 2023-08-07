import { clusterApiUrl, Connection } from "@solana/web3.js"

const createConnection = () => {
  const solanaNetwork = process.env.REACT_APP_NETWORK
  const env = process.env.NODE_ENV

  return (env === 'test' || env === 'production') ? new Connection(solanaNetwork) : new Connection(clusterApiUrl(solanaNetwork))
}

export default createConnection
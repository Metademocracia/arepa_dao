// Cross-domain proxy prefix
// const API_PROXY_PREFIX='/api'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX


export function configNear(keyStores, walletUrl=undefined) {
  const network = process.env.NETWORK
  const enviroment = false
  const NETWORK = (enviroment) ? network : network;
  switch (NETWORK) {
    case "mainnet":
      return {
        networkId: "mainnet",
        keyStore: keyStores,
        // nodeUrl: "https://rpc.mainnet.near.org",
        nodeUrl: "https://free.rpc.fastnear.com",
        // walletUrl: "https://app.mynearwallet.com/",
        walletUrl: walletUrl || "https://mi.arepa.digital",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://nearblocks.io",
      };
    case "testnet":
      return {
        networkId: "testnet",
        keyStore: keyStores,
        nodeUrl: "https://rpc.testnet.near.org",
        // walletUrl: "https://testnet.mynearwallet.com/",
        walletUrl: walletUrl || "http://localhost:8000/wallet-p2p",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://testnet.nearblocks.io",
      };
    default:
      throw new Error(`Unconfigured environment '${NETWORK}'`);
  }
}

/* module.exports = {
  CONFIG,
}; */

require("dotenv").config({ path: "../.env" });
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = require("./secret.json").mnemonic;

// Nodes connection:
const API_KEY_ETH = process.env.REACT_APP_MORALIS_SPEEDY_NODES_KEY_ETH;
const API_KEY_BSC = process.env.REACT_APP_MORALIS_SPEEDY_NODES_KEY_BSC;
const API_KEY_POLYGON = process.env.REACT_APP_MORALIS_SPEEDY_NODES_KEY_POLYGON;

// Explorer API to verify contract
const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY;
const BSCSCAN_API_KEY = process.env.REACT_APP_BSCSCAN_API_KEY;
const POLYGONSCAN_API_KEY = process.env.REACT_APP_POLYGONSCAN_API_KEY;

module.exports = {
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    etherscan: ETHERSCAN_API_KEY,
    polygonscan: POLYGONSCAN_API_KEY,
    bscscan: BSCSCAN_API_KEY
  },
  networks: {
    ethereum_mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `${API_KEY_ETH}`),
      network_id: 1,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc_mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `${API_KEY_BSC}`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    polygon_mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `${API_KEY_POLYGON}`),
      network_id: 137,
      confirmations: 5,
      timeoutBlocks: 200,
      skipDryRun: true,
      maxFeePerGas: 80000000000,
      maxPriorityFeePerGas: 79000000000
    }
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        }
        // evmVersion: "byzantium"
      }
    }
  }
};

const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
require("dotenv").config();
const mnemonic = fs.readFileSync(".secret").toString().trim();
const API_KEY = process.env.MORALIS_SPEEDY_NODES_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY;

module.exports = {
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    etherscan: ETHERSCAN_API_KEY,
    polygonscan: POLYGONSCAN_API_KEY,
    bscscan: BSCSCAN_API_KEY
  },
  networks: {
    // development: {
    //   host: "127.0.0.1",
    //   port: 7545,
    //   chainId: 1337,
    //   network_id: 1337,
    // },
    polygon_mumbai: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://speedy-nodes-nyc.moralis.io/${API_KEY}/polygon/mumbai/archive`
          // `https://speedy-nodes-nyc.moralis.io/10779dfa6be84b2347366672/polygon/mumbai/archive`
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
    // polygon_mainnet: {
    //   provider: () =>
    //     new HDWalletProvider(
    //       mnemonic,
    //       `https://speedy-nodes-nyc.moralis.io/${API_KEY}/polygon/mainnet/archive`
    //     ),
    //   network_id: 137,
    //   confirmations: 3,
    //   timeoutBlocks: 200,
    //   skipDryRun: true
    // },
    // bsctestnet: {
    //   provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
    //   network_id: 97
    //   // confirmations: 2
    // },
    // bsclive: {
    //   provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
    //   network_id: 56,
    //   confirmations: 2,
    //   timeoutBlocks: 200,
    //   skipDryRun: true
    // }
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
          runs: 150
        }
        // evmVersion: "byzantium"
      }
    }
  }
};

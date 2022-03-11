const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require("fs");
require('dotenv').config()
const mnemonic = fs.readFileSync(".secret").toString().trim();
const API_KEY = process.env.MORALIS_SPEEDY_NODES_KEY;


module.exports = {
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
    polygonscan: process.env.POLYGONSCAN_API_KEY,
    bscscan: process.env.BSCSCAN_API_KEY,
    ftmscan: process.env.FTMSCAN_API_KEY,
    snowtrace: process.env.SNOWTRACE_API_KEY,
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
          `https://speedy-nodes-nyc.moralis.io/10779dfa6be84b2347366672/polygon/mumbai/archive`
          //`https://speedy-nodes-nyc.moralis.io/${API_KEY}/polygon/mumbai/archive`
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    // polygon_mainnet: {
    //   provider: () =>
    //     new HDWalletProvider(
    //       mnemonic,
    //       `https://speedy-nodes-nyc.moralis.io/${
    //         process.env.MORALIS_SPEEDY_NODES_KEY
    //       }/polygon/mainnet${process.env.ARCHIVE === true ? "/archive" : ""}`
    //     ),
    //   network_id: 137,
    //   confirmations: 3,
    //   timeoutBlocks: 200,
    //   skipDryRun: true,
    // }
  },


  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 150
       },
       // evmVersion: "byzantium"
      }
    }
  },


  //
  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  //   enabled: true,
  //   host: "127.0.0.1",
  //   adapter: {
  //     name: "sqlite",
  //     settings: {
  //       directory: ".db",
  //     },
  //   },
  // },
};

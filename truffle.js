require('babel-register');
require('babel-polyfill');

var provider;
var HDWalletProvider = require('truffle-hdwallet-provider');
var mnemonic = '[REDACTED]';

if (!process.env.SOLIDITY_COVERAGE){
  provider = new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/')
}


module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      gas: 0xfffffffffff
    },
    ropsten: {
      provider: provider,
      network_id: 3 // official id of the ropsten network
    },
    coverage: {
      host: "localhost",
      network_id: "*",
      port: 8545,
      gas: 0xfffffffffff,
      gasPrice: 0x0
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  // mocha: {
  //     reporter: 'eth-gas-reporter',
  //     reporterOptions: {
  //         currency: 'USD',
  //         gasPrice: 21
  //     }
  // }
};

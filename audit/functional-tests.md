# Functional tests
Tests are conducted on the Kovan test network.

## [`EthealWhitelist`](https://kovan.etherscan.io/address/0x58220d67ae60e6ca4096ea2afa93ef4ee3826668)

## Accounts

* Owner: [0x435411c7e7d2bd1910f6c484a259ac13203ee89d](https://kovan.etherscan.io/address/0x435411c7e7d2bd1910f6c484a259ac13203ee89d)

## Expected behaviour tests

  - [x] Cannot set signer if called by non-owner. [`0x8c141d`](https://kovan.etherscan.io/tx/0x8c141d6c99234e919181165da60aef72f164774d8d181a82f50a9785f47fba3c)
  - [x] Cannot set whitelist if called by non-owner. [`0xb3be96`](https://kovan.etherscan.io/tx/0xb3be960de0a4e41309b7f36cb2b8e8c609c95a2f4b79a4a83e914525af699ecc)
  - [x] Cannot set many whitelist if called by non-owner. [`0x9cd153`](https://kovan.etherscan.io/tx/0x9cd15373e1fc92572b58e8400385a79d3a2f0be88d93d834d17b2adf1ae52ac0)
  - [x] Cannot transfer ownership if called by non-owner. [`0xf9ab61`](https://kovan.etherscan.io/tx/0xf9ab61c4c965d55f275dd9d55d5c3d16849cd5e9c943fd1b4b7a80333a6356cd)
  - [x] Owner can successfully set signer. [`0xb7fca5`](https://kovan.etherscan.io/tx/0xb7fca5173bd57b19c36ac0430773fbc15623849ecedcd54db0e6a3280e1db801)
  - [x] Owner can successfully whitelist addresses. [`0x64d4c6`](https://kovan.etherscan.io/tx/0x64d4c6571248591e8ecb317c7cc99bb9d51b02b315c64c65b9f5a580079d89a3)
  - [x] Owner can successfully whitelist many addresses. [`0xdb1ddb`](https://kovan.etherscan.io/tx/0xdb1ddbf90d38d2153b9e027a9ecd3bf166c3d80e360d752a73e776d470ef92a9)

## [`EthealNormalSale`](https://kovan.etherscan.io/address/0xE98801774128ff685EB7f124521a8807B36CDA0b)

## Accounts

* Owner: [0x435411c7e7d2bd1910f6c484a259ac13203ee89d](https://kovan.etherscan.io/address/0x435411c7e7d2bd1910f6c484a259ac13203ee89d)

## Expected behaviour tests

  - [x] Owner can successfully set promo token controller. [`0x163b0e`](https://kovan.etherscan.io/tx/0x163b0e683f1fa4bf24f13da89ac7efbfea60e4341b4990e3a82bc558420862b7)
  - [x] Owner can successfully whitelist addresses with changes to threshold. [`0x6414e9`](https://kovan.etherscan.io/tx/0x6414e9f262babfb930f961d84e373bcda336d965ee6abfc4a15a57d33649703f)
  - [x] Owner can successfully set deposit address. [`0x8583ed`](https://kovan.etherscan.io/tx/0x8583ed6ff5f41d538fddd4c223ec4ddfe42d25efc03f9c4aec0172d4422201ae)
  - [x] Cannot set promo token controller if called by non-owner. [`0x5d2792`](https://kovan.etherscan.io/tx/0x5d27920feee6d70b85ccee4d88bba34fff1e3be4a4d5803ce0f5b1134a6b6af1)    
  - [x] Cannot set set times if called by non-owner. [`0x506c33`](https://kovan.etherscan.io/tx/0x506c33a7aa4bae248896d8bdce685fbe454f26d3de06f83c2c749abdc4ed059e)
  - [x] Cannot set caps if called by non-owner. [`0xbc5882`](https://kovan.etherscan.io/tx/0xbc588221a121a4cf0f29ddf001b1d62ed46cffc573b12b69fd9e81fd5e799c33)
  - [x] Cannot set rate if called by non-owner. [`0xaa1de4`](https://kovan.etherscan.io/tx/0xaa1de4abe80d8c1f870fa42c830c10ff565a31ebdeded1d7b99ac8d2cf1541d1)
  - [x] Cannot set minimum contribution if called by non-owner. [`0xc49b4f`](https://kovan.etherscan.io/tx/0xc49b4f30a3077bb511c4712f1c1ea2264db2d1e3f99f2331ab1092977490d97a)
  - [x] Cannot set whitelist and change threshold if called by non-owner. [`0x52d573`](https://kovan.etherscan.io/tx/0x52d573cba9a8ad3ce960abe53ccfd6ad56b9713b6f7987ac1a7becac9fde03d7)
  - [x] Cannot transfer ownership if called by non-owner. [`0xf408c6`](https://kovan.etherscan.io/tx/0xf408c6fe86ee48b9c4b992fe7e701ef783ee63f4c75aa01baae8645df28cea7f)
  - [x] Cannot buy tokens from a non-whitelisted account exceeding whitelist threshold [`0x68cb2d`](https://kovan.etherscan.io/tx/0x68cb2d7d57acd86b25875faba972abe582077fed3a18c705c3e27862db66e09e)
  - [x] Successfully purchase tokens from a whitelisted account exceeding whitelist threshold [`0x1554dc`](https://kovan.etherscan.io/tx/0x1554dcac0b1cd7c962b20996164751c5635e2f5af7ca1720f753af921a729396)
  - [x] Successfully finalize sale from owner.
  [`0x492267`](https://kovan.etherscan.io/tx/0x49226752e4a509cfb85f0fbc3f8d45bb07c5c7c0b7536f2be5216d7263257188)
  - [x] Successfully claim tokens from HEAL token purchaser.
  [`0x6c6dff`](https://kovan.etherscan.io/tx/0x6c6dff94a3d0e006127066cfb770d77e77801a79e0eb9a7ebca0ff91877914ad)

## [`EthealDeposit`](https://kovan.etherscan.io/address/0x786371022DFd95306a76e00D50Dc5F03BbFeF2AA)

## Accounts

* Owner: [0x435411c7e7d2bd1910f6c484a259ac13203ee89d](https://kovan.etherscan.io/address/0x435411c7e7d2bd1910f6c484a259ac13203ee89d)

- [x] Successfully forward funds from offchain whitelisted account when sent amount is between minContribution and whitelistThreshold [`0x1c2235`](https://kovan.etherscan.io/tx/0x1c22352b871daf255011cdfd3e0e4761da22db1ad58bd42f04484776160d7824)
- [x] Successfully forward funds from offchain whitelisted account providing valid signature when sent amount is above whitelistThreshold [`0xedfd86`](https://kovan.etherscan.io/tx/0xedfd869b08a5c120089d8360b22c122b4109920a389e6a5150ab23e63205d7d4)
- [x] Reverts forwardTransaction when using invalid whitelistSign hash and when contribution from non-whitelisted address is greater than whitelistThreshold  [`0xae389f`](https://kovan.etherscan.io/tx/0xae389faa01d47fbc7b445c426ca5a19a0bbd71f9d79873b28e1bb2129ba006d7)
- [x] Successfully forward funds when sent amount is over whitelistThreshold from whitelisted account. [`0x8429d1`](https://kovan.etherscan.io/tx/0x8429d1fa90b69c5606d31b66491b13f43f82a26afe104414d237c9800bbc5285)
- [x] Reverts if contribution amount is less than minContribution when calling forwardTransaction [`0x856815`](https://kovan.etherscan.io/tx/0x85681509e33fd6097d8dbcd29b0c008171b0192f78c17d4ec6ffcf30809acfe8)
- [x] Reverts when calling forwardTransaction ID that has already been cleared [`0x894694`](https://kovan.etherscan.io/tx/0x8946947cfc78259620a741b7143b1116022331fb04bae46cb9a62d91155a8bb3)
- [x] Contract gracefully handles invalid data with 33 bytes instead of 32 bytes.
[`0x44a91d`](https://kovan.etherscan.io/tx/0x44a91d72e3452eb8aec9c065746844e411dc003d4c95eea7f692eec99e0ba46d)
- [x] Successfully refund difference sent in value exceeding hardcap.
[`0xe97358`](https://kovan.etherscan.io/tx/0xe97358f5bf1cd56cb7618c19d226fe872505636095abf6ad9d9ff15cd41292ac)
- [x] Successfully refund investors uncleared contribution after sale has ended.
[`0x61b36c`](https://kovan.etherscan.io/tx/0x61b36c942797774cddfe6d48e1bf4052a29702624c957d14ce009398e5c58895)

`AUDIT-NOTE!` There is no contract source verification for `EthealNormalSale` and `EthealDeposit`. When attempting to verify these contracts using truffle migration deployment the following error message was output.

> ERROR | The Contract solidity compilation has exceeded the maximum timeout/memory limit that we can safely process. Automated source code verification is unavailable for this source code.

The error message was produced as a result of cloning the master branch from the following repository [BlockchainLabsNZ/etheal-contracts](https://github.com/BlockchainLabsNZ/etheal-contracts). Truffle v4.1.3 (core: 4.1.3) Solidity v0.4.19 (solc-js) were used.

Upon successful deployment from the [2_deploy_contract.js](https://github.com/BlockchainLabsNZ/etheal-contracts/blob/migration_testing/migrations/2_deploy_contracts.js) file using `truffle migrate` contracts were then flattened using [alcuadrado/truffle-flattener](https://github.com/alcuadrado/truffle-flattener). 

The resulting source was then provided to both [(v1)](https://kovan.etherscan.io/verifyContract) and [(v2)](https://kovan.etherscan.io/verifyContract2?a=) of the Etherscan contract verification tool.

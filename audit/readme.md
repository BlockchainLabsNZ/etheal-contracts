# Etheal Smart Contracts Audit Report

## Preamble
This audit report was undertaken by **BlockchainLabs.nz** for the purpose of providing feedback to **Etheal**.

It has subsequently been shared publicly without any express or implied warranty.

Solidity contracts were sourced from the public Github repo [thesved/etheal-sale](https://github.com/thesved/etheal-sale) at this commit [1eb8d114a0e1794f27d3577ef9a109c500d31643](https://github.com/thesved/etheal-sale/commit/1eb8d114a0e1794f27d3577ef9a109c500d31643) - we would encourage all community members and token holders to make their own assessment of the contracts.

## Scope
The following contracts were subject for static, dynamic and functional analyses:

- [EthealDeposit.sol](https://github.com/thesved/etheal-sale/blob/1eb8d114a0e1794f27d3577ef9a109c500d31643/contracts/EthealDeposit.sol)
- [EthealNormalSale.sol](https://github.com/thesved/etheal-sale/blob/1eb8d114a0e1794f27d3577ef9a109c500d31643/contracts/EthealNormalSale.sol)
- [EthealWhitelist.sol](https://github.com/thesved/etheal-sale/blob/1eb8d114a0e1794f27d3577ef9a109c500d31643/contracts/EthealWhitelist.sol)
- [EthealPromoToken.sol](https://github.com/thesved/etheal-sale/blob/1eb8d114a0e1794f27d3577ef9a109c500d31643/contracts/EthealPromoToken.sol)

## Focus areas
The audit report is focused on the following key areas - though this is not an exhaustive list.

### Correctness
- No correctness defects uncovered during static analysis?
- No implemented contract violations uncovered during execution?
- No other generic incorrect behaviour detected during execution?
- Adherence to adopted standards such as ERC20?

### Testability
- Test coverage across all functions and events?
- Test cases for both expected behaviour and failure modes?
- Settings for easy testing of a range of parameters?
- No reliance on nested callback functions or console logs?
- Avoidance of test scenarios calling other test scenarios?

### Security
- No presence of known security weaknesses?
- No funds at risk of malicious attempts to withdraw/transfer?
- No funds at risk of control fraud?
- Prevention of Integer Overflow or Underflow?

### Best Practice
- Explicit labeling for the visibility of functions and state variables?
- Proper management of gas limits and nested execution?
- Latest version of the Solidity compiler?

## Analysis Reports

- [Sale process overview](sales-process.md)
- [Dynamic Analysis](dynamic-analysis.md)
- [Gas Consumption](gas-consumption-report.md)
- [Functional Analysis](functional-tests.md)
- [Test Coverage](test-coverage.md)

## Issues

### Severity Description
<table>
<tr>
  <td>Minor</td>
  <td>A defect that does not have a material impact on the contract execution and is likely to be subjective.</td>
</tr>
<tr>
  <td>Moderate</td>
  <td>A defect that could impact the desired outcome of the contract execution in a specific scenario.</td>
</tr>
<tr>
  <td>Major</td>
  <td> A defect that impacts the desired outcome of the contract execution or introduces a weakness that may be exploited.</td>
</tr>
<tr>
  <td>Critical</td>
  <td>A defect that presents a significant security vulnerability or failure of the contract across a range of scenarios.</td>
</tr>
</table>

### Minor

- **Differentiate functions and events by names** - `Best practice`
<br>Favor capitalization and a prefix in front of events (we suggest Log), to prevent the risk of confusion between functions and events ... [View on GitHub](https://github.com/BlockchainLabsNZ/etheal-contracts/issues/20)

- **Variable type declarations should be consistent** - `Best practice`
<br>It is recommended to explicitly define your variable types, this confirms your intent and safeguards against a future when the default type changes. It is better to keep them consistent in the same contract ... [View on GitHub](https://github.com/BlockchainLabsNZ/etheal-contracts/issues/16)

- **Small gas optimisation (massNotify)** - `Best practice`
<br>Assigning `_owner.length` to a local variable costs more than directly using the array length.<br>Test result: It costs around 10 gas more on calling this function each time ... [View on GitHub](https://github.com/BlockchainLabsNZ/etheal-contracts/issues/15)

### Moderate

- **Log transaction ID on adding deposit** - `Best practice`
<br>Now only investor address and current transaction amount is logged. Suggest logging the transaction ID also. This ID can be used later to forward transaction ... [View on GitHub](https://github.com/BlockchainLabsNZ/etheal-contracts/issues/18)

### Major

- None found

### Critical

- None found

## Observations

- The `AbstractVirtualToken` contract uses some complex logic which is only really understandable by an experienced developer. The average investor who might inspect the contracts would not be able to understand what is happening with the bitwise operations and the "MASK"s being used. We recommend further documentation for the "MASK" concept in this contract.

## Conclusion

Developers of the contracts display a strong understanding of Solidity and smart contract development best practices.

We took part in carefully reviewing all source code provided, including both static and dynamic testing methodology.

Overall we consider the resulting contracts following the audit feedback period adequate and have not identified any potential vulnerabilities. This contract has a low level risk of ETH, HEAL or HEALP being hacked or stolen from the inspected contracts.

___

### Disclaimer

Our team uses our current understanding of the best practises for Solidity and Smart Contracts. Development in Solidity and for Blockchain is an emerging area of software engineering which still has a lot of room to grow, hence our current understanding of best practices may not find all of the issues in this code and design.

We have not analysed any of the assembly code generated by the Solidity compiler. We have not verified the deployment process and configurations of the contracts. We have only analysed the code outlined in the scope. We have not verified any of the claims made by any of the organisations behind this code.

Security audits do not warrant bug-free code. We encourage all users interacting with smart contract code to continue to analyse and inform themselves of any risks before interacting with any smart contracts.


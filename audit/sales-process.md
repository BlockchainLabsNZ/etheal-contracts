# Sales

There are three contracts directly related to the sale process:

- EthealDeposit.sol
- EthealNormalSale.sol
- EthealPromoTokens.sol (and its base class AbstactVirtualToken.sol)

The PreSale period is already over, and customers can buy HEAL tokens during Sale period only. 
<br>There is a limit for token distribution (hard cap): $10M or 14300* HEAL tokens.

\* - **Disclaimer**
	
	All numbers in this document are valid for the moment of audit. 
	We cannot guarantee the same numbers after contracts are deployed because they can be changed by authors. 
	Please read the source code of deployed contracts to be sure.


There are 3 categories of investors:

- Non-whitelisted investors - can contribute up to 1 ETH
- Whitelisted investors - no upper limits (up to the hard cap)
- Whitelisted (off-chain) investors - no upper limits (up to the hard cap)


The lowest amount to contribute for all categories of investors is 0.1 ETH.

To buy tokens, they have a few options:

- call `deposit()` function of deposit contract
- send Ethers to deposit contract itself (through payable fallback function)
- call `buyTokens()` function of the normal sales contract.

The last one can be done only by whitelisted customers OR within whitelist threshold limit, otherwise it will be reverted. 
<br>Therefore it is worth considering buying HEAL tokens through deposit contract interface. 

#### Proccess flow

From the high-level perspective the sale process consists of next steps:

- Deposit (by sending to deposit contract itself or by calling `deposit()` function) any amount of Ethers. 
<br>_The deposit will be recorded, no tokens in return (yet)._
- Contact Etheal and ask for whitelist signature
- Call the `forwardTransaction()` function and use that signature to continue buying tokens process.
<br>_Investor's token balance will be increased, but no actual token transfer is possible untill Sale ends._

If the request for authorisation signature was declined, the investor can call `refundTransaction()` and get his money back, **after** the sale period is over.


<!-- ------------------------------------------------------------------- --> <br>
## Depositing

Contract: [EthealDeposit.sol](https://github.com/BlockchainLabsNZ/etheal-contracts/blob/master/contracts/EthealDeposit.sol)

Prerequisites:

- address of sale contract
- address of whitelist contract

### Important Functions

  - **Fallback function** <br>is an alias for the `deposit()` function.

  - **Deposit**
<br>It records all transactions and allows investors to buy tokens only to whitelisted (or authorised) contributors by forwarding transaction through `forwardTransactionInternal()`. All unforwarded transactions can be refunded AFTER sale period is over by calling `refundTransaction()` function.

  - **forwardTransactionInternal**
<br>It forwards approved transactions to the `depositETH()` function of the contract saved in the `sale` (see below).  

  - **refundTransaction**
<br>Anyone can call this function after the Sale is over. The investor of a transaction with given ID will get his/her contribution back. 



<!-- ------------------------------------------------------------------- --> <br>
## Bonuses
Contracts: [EthealPromoTokens.sol](https://github.com/BlockchainLabsNZ/etheal-contracts/blob/master/contracts/EthealPromoToken.sol), [AbstractVirtualToken.sol](https://github.com/BlockchainLabsNZ/etheal-contracts/blob/master/contracts/AbstractVirtualToken.sol)

One can get bonuses by:

- early involvement
- holding tokens
- high contribution amount
- finding the easter egg 



<!-- ------------------------------------------------------------------- --> <br>
## Normal sales
Contract: [EthealNormalSales.sol](https://github.com/BlockchainLabsNZ/etheal-contracts/blob/master/contracts/EthealNormalSale.sol)

The contract regulates the Sale period and allows users to buy tokens.
There is a limitation: customers can buy tokens only if the amount of ETH to contribute doesn't exceed the allowed threshold (depending on whether you are whitelisted or not), otherwise the transaction will be reverted. 

### Important Functions

  - **depositETH**
<br>This function is called automatically from deposit contract when a whitelisted investor makes a new contribution. It calls the `handleContribution()` function.

  - **buyTokens**
<br>Can be called by anyone, but only whitelisted investors can contribute more than threshold amount (1 Ether). It forwards the call to the `handlePayment()` function.

  - **handlePayment**
<br>It forwards the call to the `handleContribution ()` function (which will check if the contribution doesn't reach the soft cap and exchange it for HEAL tokens) and refunds the exceeded ETH amount back to the investor.

  - **handleContribution**
<br>The functions checks if:
	  - the requested amount to contribute is less than the available supply,
	  - the hard cap is not reached (if so - no contribution is possible),
	  - the soft cap is not reached (is so - it starts the timer before the Sale is over).

	If the contribution is possible, it calls the `transferToken()` function, otherwise it fires event (soft or hard cap is reached).<br>
	
	Finally, it returns the amount of Weis that were exchanged to HEAL tokens.

  - **transferToken**
<br>It checks if requested amount is valid (Sale is not over, non-zero amount, amount is greater or equal to a minimum contribution amount), record this contribution (investor address and contributed amount), checks if the accumulated contribution amount of that investor is allowed (if the address of contributor is not whitelisted).

	After that, it calculates all bonuses (by calling the `getBonus()` function), increases the token balance of contributor accordingly and fire event `TokenPurchase()`;
	
	No token transfer allowed though, untill Sale period ends. 
	
		The name of the function may confuse one. 
		The function itself doesn't transfer any tokens.
		It is worth considering adjusting the name, e.g. addTokenToBalance().
		

  - **getBonus**
<br>It calculates bonus multiplier for the number of tokens to transfer. It considers the day of Sale period and ETH contributed amount (for more than 10ETH and more than 100ETH).

	It also adds extra promo bonuses calculated IF contributors transferred their promo tokens (HEALP) back to the promo contract, to the sale contract, or to the address `0x1`. 


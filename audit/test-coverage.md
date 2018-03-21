# Test Coverage
performed by Blockchain Labs, March 20, 2018


File                       |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
---------------------------|----------|----------|----------|----------|----------------|
  EthealDeposit.sol        |      100 |    97.37 |      100 |      100 |                |
  EthealNormalSale.sol     |    99.37 |    97.12 |     97.3 |    99.22 |            169 |
  EthealPromoToken.sol     |      100 |      100 |      100 |      100 |                |
  EthealWhitelist.sol      |      100 |      100 |      100 |      100 |                |

Full coverage report of related contracts [is here](coverage/contracts/index.html).

<br>

## Functions that are not covered, legend:

`[I]` – IF path not taken<br>
`[E]` – Else path not taken <br>
`[X]` – Function was not tested at all

<br>

### EthealDeposit.sol

```
    function refundTransactionInternal(uint256 _id) internal returns (bool) {
[E]     require(_id < transactionCount);
 
        // if already cleared then return false
        if (transactions[_id].cleared) {
            return false;
        }
 
        // sending back funds
        transactions[_id].cleared = true;
        transactions[_id].beneficiary.transfer(transactions[_id].amount);
 
        pendingCount = pendingCount.sub(1);
        Refunded(transactions[_id].beneficiary, transactions[_id].amount, _id);
 
        return true;
    }
```
The index array is always set to start at 0. The transaction count will begin at 1 as it is a counter variable. 


<br>

### EthealNormalSale.sol


```
[x] function buyTokens(address _beneficiary, bytes _whitelistSign) public payable whenNotPaused {
        handlePayment(_beneficiary, msg.value, now, _whitelistSign);
    }
```

The function overloads another `buyTokens()` function with extra argument `_whitelistSign`.
<br>Nothing to test.


<br>
 
```
    function transferToken(address _beneficiary, uint256 _weiAmount, uint256 _time, bytes memory _whitelistSign) internal {
[E]     require(_beneficiary != address(0));
        require(validPurchase(_weiAmount));
 
        // increase wei Raised
        weiRaised = weiRaised.add(_weiAmount);
 
        // require whitelist above threshold
        contributions[_beneficiary] = contributions[_beneficiary].add(_weiAmount);
        require(contributions[_beneficiary] <= whitelistThreshold 
                || whitelist.isWhitelisted(_beneficiary)
                || whitelist.isOffchainWhitelisted(_beneficiary, _whitelistSign)
        );
 
        // calculate tokens, so we can refund excess tokens to EthealController after token sale
        uint256 _bonus = getBonus(_beneficiary, _weiAmount, _time);
        uint256 tokens = _weiAmount.mul(rate).mul(_bonus).div(100);
        tokenBalance = tokenBalance.add(tokens);
 
        if (stakes[_beneficiary] == 0) {
            contributorsKeys.push(_beneficiary);
        }
        stakes[_beneficiary] = stakes[_beneficiary].add(tokens);
 
        TokenPurchase(msg.sender, _beneficiary, _weiAmount, tokens, contributorsKeys.length, weiRaised);
    }

```

Requires that beneficiary account is exist.
<br>Nothing to test.


<br>

```
    function finalization() internal {
        uint256 _balance = getHealBalance();
 
        // saving token balance for future reference
        tokenSold = tokenBalance; 
 
        // send back the excess token to ethealController
[E]     if (_balance > tokenBalance) {
            ethealController.ethealToken().transfer(ethealController.SALE(), _balance.sub(tokenBalance));
        }
 
        // hodler stake counting starts 14 days after closing normal sale
        ethealController.setHodlerTime(now + 14 days);
 
        super.finalization();
    }    
```

Else path is tested here: [tx hash]()


<br>

```
    function claimTokenFor(address _beneficiary) public afterSale whenNotPaused {
        uint256 tokens = stakes[_beneficiary];
        require(tokens > 0);
 
        // set the stake 0 for beneficiary
        stakes[_beneficiary] = 0;
 
        // decrease tokenBalance, to make it possible to withdraw excess HEAL funds
        tokenBalance = tokenBalance.sub(tokens);
 
        // distribute hodlr stake
        ethealController.addHodlerStake(_beneficiary, tokens);
 
        // distribute token
[E]     require(ethealController.ethealToken().transfer(_beneficiary, tokens));
        TokenClaimed(msg.sender, _beneficiary, tokens);
    }
 
    /// @notice claimToken() for multiple addresses
    /// @dev Anyone can call this function and distribute tokens after successful token sale
    /// @param _beneficiaries Array of addresses for which we want to claim tokens
    function claimManyTokenFor(address[] _beneficiaries) external afterSale {
        for (uint256 i = 0; i < _beneficiaries.length; i++) {
            claimTokenFor(_beneficiaries[i]);
        }
    }
  
```

Else path is tested here: [tx hash]()




<br>

### AbstractVirtualToken.sol

```
[x] function balanceOf (address _owner) view returns (uint256 balance) {
        return accounts[_owner];
    }
```
ERC20 standard function.
<br>Nothing to test. 


<br>

```
    function transfer (address _to, uint256 _value) returns (bool success) {
        uint256 fromBalance = accounts[msg.sender];
[I]     if (fromBalance < _value) return false;
        if (_value > 0 && msg.sender != _to) {
            accounts[msg.sender] = fromBalance.sub(_value);
            accounts[_to] = accounts[_to].add(_value);
            Transfer(msg.sender, _to, _value);
        }
        return true;
    }
```
IF path is tested here: [tx hash]()

<br>

```
    function transferFrom (address _from, address _to, uint256 _value) returns (bool success) {
        uint256 spenderAllowance = allowances[_from][msg.sender];
[I]     if (spenderAllowance < _value) return false;
        uint256 fromBalance = accounts[_from];
[I]     if (fromBalance < _value) return false;
 
        allowances[_from][msg.sender] = spenderAllowance.sub(_value);
 
        if (_value > 0 && _from != _to) {
            accounts[_from] = fromBalance.sub(_value);
            accounts[_to] = accounts[_to].add(_value);
            Transfer(_from, _to, _value);
        }
        return true;
    }
```
IF path (spenderAllowance < _value) is tested here: [tx hash]()
<br>
IF path (fromBalance < _value) is tested here: [tx hash]()


<br>

```
[X] function totalSupply () view returns (uint256 supply) {
        return tokensCount;
    }   
```
View modifier. Return variable. Nothing to test. 


<br>

```
function transferFrom (address _from, address _to, uint256 _value) returns (bool success) {
        if (_value > allowance(_from, msg.sender)) return false;
[I]        if (_value > balanceOf(_from)) return false;
        else {
            materializeBalanceIfNeeded(_from, _value);
            return AbstractToken.transferFrom(_from, _to, _value);
        }
    }
```    
IF path is tested here: [tx hash]()

<br>

```
    function getVirtualBalance (address _owner) private view returns (uint256 _virtualBalance) {
        if (accounts [_owner] & MATERIALIZED_FLAG_MASK != 0) return 0;
        else {
            _virtualBalance = virtualBalanceOf(_owner);
            uint256 maxVirtualBalance = MAXIMUM_TOKENS_COUNT.sub(tokensCount);
[I]         if (_virtualBalance > maxVirtualBalance)
                _virtualBalance = maxVirtualBalance;
        }
    }     

```
IF path is tested here: [tx hash]()

<br>

```
    function materializeBalanceIfNeeded (address _owner, uint256 _value) private {
        uint256 storedBalance = accounts[_owner];
        if (storedBalance & MATERIALIZED_FLAG_MASK == 0) {
            // Virtual balance is not materialized yet
            if (_value > storedBalance) {
                // Real balance is not enough
                uint256 virtualBalance = getVirtualBalance(_owner);
[E]             require (_value.sub(storedBalance) <= virtualBalance);
                accounts[_owner] = MATERIALIZED_FLAG_MASK | storedBalance.add(virtualBalance);
                tokensCount = tokensCount.add(virtualBalance);
            }
        }
    }
    
```
ELSE path is tested here: [tx hash]()

<br>



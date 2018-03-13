pragma solidity ^0.4.17;


import './ERC20.sol';
import "./Controlled.sol";

/**
 * @title MiniMe interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
contract ERC20MiniMe is ERC20, Controlled {event __CoverageERC20MiniMe(string fileName, uint256 lineNumber);
event __FunctionCoverageERC20MiniMe(string fileName, uint256 fnId);
event __StatementCoverageERC20MiniMe(string fileName, uint256 statementId);
event __BranchCoverageERC20MiniMe(string fileName, uint256 branchId, uint256 locationIdx);
event __AssertPreCoverageERC20MiniMe(string fileName, uint256 branchId);
event __AssertPostCoverageERC20MiniMe(string fileName, uint256 branchId);

    function approveAndCall(address _spender, uint256 _amount, bytes _extraData) public returns (bool);
    function totalSupply() public  returns (uint);
    function balanceOfAt(address _owner, uint _blockNumber) public  returns (uint);
    function totalSupplyAt(uint _blockNumber) public  returns(uint);
    function createCloneToken(string _cloneTokenName, uint8 _cloneDecimalUnits, string _cloneTokenSymbol, uint _snapshotBlock, bool _transfersEnabled) public returns(address);
    function generateTokens(address _owner, uint _amount) public returns (bool);
    function destroyTokens(address _owner, uint _amount)  public returns (bool);
    function enableTransfers(bool _transfersEnabled) public;
    function isContract(address _addr)  internal returns(bool);
    function claimTokens(address _token) public;
    event ClaimedTokens(address indexed _token, address indexed _controller, uint _amount);
    event NewCloneToken(address indexed _cloneToken, uint _snapshotBlock);
}
var MiniMeTokenFactory = artifacts.require("MiniMeTokenFactory");
var EthealToken = artifacts.require("EthealToken");
var Wallet = "0xf22B2Fb8E3199a36E806eD0bD7d55B908175ada9";
var PreSale = artifacts.require("EthealPreSale");
var NormalSale = artifacts.require("EthealNormalSale");
var SafeMath = artifacts.require("SafeMath");
var EthealController = artifacts.require("EthealController");
var RefundVault = artifacts.require("RefundVault");
var Hodler = artifacts.require("Hodler");
var TokenVesting = artifacts.require("TokenVesting");
var EthealDeposit = artifacts.require("EthealDeposit");
var EthealWhitelist = artifacts.require("EthealWhitelist");
var EthealPromoToken = artifacts.require("EthealPromoToken");
var ECRecovery = artifacts.require("ECRecovery");
var ED,EN,EW;

var dateStart = Math.floor(new Date().getTime()/1000)+30*60; // starts in 30 minutes
var dateEnd = dateStart + 10*24*60*60; // lasts 10 days

module.exports = function(deployer) {
    return deployer.then(function(){
        // deploy SafeMath first
        return deployer.deploy(SafeMath);
    }).then(function(){

        // link SafeMath
        return deployer.link(SafeMath, [PreSale, NormalSale, RefundVault, EthealController, Hodler, TokenVesting, EthealDeposit, EthealWhitelist, EthealPromoToken, MiniMeTokenFactory]);
    }).then(function(){

        // deploy SafeMath first
        return deployer.deploy(ECRecovery);
    }).then(function(){

        // link SafeMath
        return deployer.link(ECRecovery, [EthealWhitelist]);
    }).then(function(){

        // then Factory
        return deployer.deploy(MiniMeTokenFactory);
    }).then(function(){

        // then Controller
        return deployer.deploy(EthealController,Wallet);
    }).then(function(){

        // then EthealToken
        return deployer.deploy(EthealToken,EthealController.address,MiniMeTokenFactory.address);
    }).then(function(){

        // set Token for Crowdsale
        return (EthealController.at(EthealController.address)).setEthealToken(EthealToken.address,0);
    }).then(function(){

        // then Normal Sale
        return deployer.deploy(NormalSale,EthealController.address,dateStart,dateEnd,web3.toWei(0.1, "ether"),1000,web3.toWei(2, "ether"),120*60*60,web3.toWei(4, "ether"),Wallet);
    }).then(function(){

        // promo token
        return deployer.deploy(EthealPromoToken,NormalSale.address);
    }).then(function(){

        // whitelist
        return deployer.deploy(EthealWhitelist,web3.eth.accounts[4]);
    }).then(function(){

        // set crowdsale
        return (EthealController.at(EthealController.address)).setCrowdsaleTransfer(NormalSale.address,web3.toBigNumber(web3.toWei(5,"ether")).mul(1000));
    }).then(function(){

        // set promo token
        return (NormalSale.at(NormalSale.address)).setPromoTokenController(EthealPromoToken.address);
    }).then(function(){

        // set whitelist
        return (NormalSale.at(NormalSale.address)).setWhitelist(EthealWhitelist.address, web3.toWei(1, "ether"));
    }).then(function(){

        // etheal deposit
        return deployer.deploy(EthealDeposit,NormalSale.address,EthealWhitelist.address);
    }).then(function(){

        // set deposit
        return (NormalSale.at(NormalSale.address)).setDeposit(EthealDeposit.address);
    })/*.then(function(){
        // contribute
        return EthealDeposit.at(EthealDeposit.address).deposit(web3.eth.accounts[1],"0xa36ceb1eb4acda877cbedf5ffa18d791944739d4a4e8d38bdbe9956af9bbca81693cef62d2f5aee6153bda31e2ad3b2d5061a8f26177042fca55bc917ba29b9400",{value:web3.toWei(0.1,"ether")});
    })*/;
};


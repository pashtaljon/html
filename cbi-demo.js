const Web3 = require('web3');
const contractAddress = '0xb3C4F3BaBD5511792009e948c3Bdc0c282D5b8a2'; //deployed contract address

let web3js = {};
let connected = false;
let token = {};
let account = '';

$(document).ready(function() {
    setInterval(connect, 1000);
});

function connect() {
    if (typeof web3 !== 'undefined') {
        web3js = new Web3(web3.currentProvider);
        account = web3js.eth.coinbase;
        if (!account) {
            $('#message').text('Please, unlock metamask');
            connected = false;
        }
        initContract();
        return true;
    } else {
        $('#message').text('Soory, we can\'t connect to your web3 provider');
        connected = false;
        return false;
    }
}

function initContract() {
    const _token = web3js.eth.contract(abi);
    token = _token.at(contractAddress);
}

/**
 * GETTERS
 **/
function getBalanceOf(address, callback) {
    token.balanceOf(address, { from: account }, callback);
}

function getSellPrice(callback) {
    token.sellPrice({ from: account }, callback);
}

function getBuyPrice(callback) {
    token.buyPrice({ from: account }, callback);
}

function getFrozenTokens(callback) {
    token.frozenTokens({ from: account }, callback);
}

function getFrozenEth(callback) {
    token.frozenEth({ from: account }, callback);
}

function getTokenName(callback) {
    token.name({ from: account }, callback);
}

function getTokenOwner(callback) {
    token.owner({ from: account }, callback);
}

function getTokenSymbol(callback) {
    token.symbol({ from: account }, callback);
}

function getAllowance(addresFrom, addressTo, callback) {
    token.allowance(addresFrom, addressTo, { from: account }, callback);
}

function getTotalsupply(callback) {
    token.symbol({ from: account }, callback);
}

/**
 * SETTERS
 **/


function addToWhiteList(adddress, callback) { //only owner can do this
    token.addToWhiteList(adddress, { from: account, gas: 3000000 }, callback);
}

function deleteFromWhiteList(adddress, callback) { //only owner can do this
    token.deleteFromWhiteList(adddress, { from: account, gas: 3000000 }, callback);
}

function rejectClaim(claimId, callback) { //only owner can do this
    token.rejectClaim(claimId, { from: account, gas: 3000000 }, callback);
}

function approveClaim(claimId, callback) { //only owner can do this
    token.approveClaim(claimId, { from: account, gas: 3000000 }, callback);
}

function approve(spender, value, callback) { //only owner can do this
    token.approve(spender, value, { from: account, gas: 3000000 }, callback);
}

function buyTokenClaim(value, callback) { //value in wei
    token.buyTokenClaim(tokenId, { from: account, gas: 3000000, value }, callback);
}

function sellTokenClaim(value, callback) {
    token.buyTokenClaim(value, { from: account, gas: 3000000 }, callback);
}

function setPrices(sellPrice, buyPrice, callback) { //only owner can do this
    token.approve(sellPrice, buyPrice, { from: account, gas: 3000000 }, callback);
}

function transfer(to, value, callback) {
    token.approve(to, value, { from: account, gas: 3000000 }, callback);
}

function transferFrom(from, to, value, callback) {
    token.approve(from, to, value, { from: account, gas: 3000000 }, callback);
}

function transferOwnership(address, callback) { //only owner can do this
    token.approve(address, { from: account, gas: 3000000 }, callback);
}

function withdraw(amount, callback) { //only owner can do this
    token.approve(amount, { from: account, gas: 3000000 }, callback);
}

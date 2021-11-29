const Web3 = require('web3')
var BigNumber = require('big-number');
var Tx = require('ethereumjs-tx').Transaction
fs = require("fs")
var array = fs.readFileSync('accounts.txt', 'utf8').split(' ');
console.log("array")
console.log(array)
var numberOfAddresses = 2;



const web3 = new Web3('https://ropsten.infura.io/v3/593f35f6ea2844a3bd3d9d21f0a37eea')



const account1 = '0x01478a9CD91EB924964458A1451c94086d7A255C'
const privateKey1 = Buffer.from('b09f75bdb4a4bacc77c76a65a55a77b7cfef8a638a5226e597f5bc3edaae912d', 'hex')



const contractAddress = '0xa72a2cd02e63308f25053fb4d173cda6cafc214e'



const contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]



const contract = new web3.eth.Contract(contractABI, contractAddress)




const getTransactionCount = async(account) => {
    return await web3.eth.getTransactionCount(account)
}



const sendTransaction = async(raw) => {
    return await web3.eth.sendSignedTransaction(raw)
}



const transferFunds = async(account1, account2, amount) => {



    let txCount = await getTransactionCount(account1)



    console.log("txCount returned: " + txCount)



    const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(100000), // uses about 36,000 gas so add some buffer
        gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
        to: contractAddress,
        data: contract.methods.transfer(account2, amount).encodeABI()
    }



    const tx = new Tx(txObject, {chain:'ropsten', hardfork: 'petersburg'})



    tx.sign(privateKey1)



    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')



    console.log("raw hex transaction: " + raw)



    console.log("about to send transaction")



    let minedTransaction = await sendTransaction(raw)
    console.log("transaction hash returned: " + minedTransaction.transactionHash)



    return `txHash is: ${minedTransaction.transactionHash}`
}



// async methods
const getBalanceOf = async(account) => {
    let balanceOf = await contract.methods.balanceOf(account).call()
    return `balance of account ${account} is ${balanceOf}`
}



const go = async() => {
    var remainingBalance = await contract.methods.balanceOf(account1).call()
    var bal = new BigNumber(remainingBalance)
    console.log("Balance : ",remainingBalance)
    var token_division = bal.div(20).div(numberOfAddresses)
    for (let i= 0; i < array.length; i++) {
        await transferFunds(account1,array[i],token_division)
    }
}



module.exports = { transferFunds, getBalanceOf }

go()
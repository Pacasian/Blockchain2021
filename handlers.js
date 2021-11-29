let contract = require('./contract.js')
let method = require('./method.js')

const express = require('express')
const { METHODS } = require('http')
const app = express()
app.use(express.json())

app.get('/totalsupply', async (req,res) => {
    res.send(await contract.totalSupply())
})

app.post('/transfer', async (req, res) => {
    var account_from = req.body.account_from;
    var account_to = req.body.account_to;
    var amount = req.body.amount;

    res.send(await method.transferFunds(account_from, account_to, amount));
})

app.get('/balance/:id', async (req, res) => {
    var account = req.params.id
    res.send( await method.getBalanceOf(account))
})

const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
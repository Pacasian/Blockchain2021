// create a web server

// add a URL to the web server to do a transfer

// let's use this web server to distribute our tokens

// if there's time, let's add a docker container

let contract = require("./contract.js");
let method = require("./method.js");
let distribute = require('./distribute.js');

const express = require("express");

const app = express();

app.use(express.json());

const port = 8080;

app.get('/symbol', async(req,res) => {
    res.send(await contract.getSymbol())
})

app.post('/transfer', async(req, res) => {
    let account_to = req.body.account_to;
    let amount = req.body.amount;

    res.send(await method.transferToken(account_to, amount));
})

app.get('/distribute', async(req, res) => {
    res.send(await distribute.distribute());
})
app.listen(port, () => console.log(`listening on port ${port}...`));
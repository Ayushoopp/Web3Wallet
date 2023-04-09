require("dotenv").config();

const Web3 = require("web3");
const apiKey = process.env.API_KEY;
const network = "goerli";

const node = `https://eth.getblock.io/${apiKey}/${network}/`

const web3 = new Web3(node);

const generateAccount = web3.eth.accounts.create();

const privateKey = process.env.PRIVATE_KEY;

const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKey);

const createSignTx = async(rawTx) =>{
    rawTx.gas = await web3.eth.estimateGas(rawTx);
    return await accountFrom.signTransaction(rawTx);
}

const sendSignedTx = async(signedTx) =>{
    web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(console.log)
}

const amoutToTransfer = "0.01";
const rawTx ={
    to:generateAccount.address,
    value:web3.utils.toWei(amoutToTransfer, "ether")
}

createSignTx(rawTx).then(sendSignedTx);

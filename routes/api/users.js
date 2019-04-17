const express = require('express');
const Tx = require('ethereumjs-tx');
let Web3 = require('web3');
const router = express.Router();

// Contract related information
const abiArray = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "buyToken",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseApproval",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseApproval",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "sellToken",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Mint",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "previousOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipRenounced",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "remaining",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "allowed",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "balances",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "INITIAL_SUPPLY",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply_",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
const contractAddress = "0xa0015a57d82515941542cdafc532f6b80683c080";
const fromAddress = "0xa629D3Dc0a71fb2F5bB24Bfc943b9BD34263503B";
let privateKey = new Buffer("f4d3a1c4a5bf0bddff6a27e7c6258746240192a95c3961a9c4204798073a5766",'hex');

//Web3 initiated
web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/a35316b636684a8f81f5e14848315d24"));

const precision = 1000000000000000000;

// @route   POST api/users/getEtherBalance
// @desc    Tests users route
// @access  Private
router.post(
    '/transferToken',
    (req, response) => {
        let value = req.body.value;
        let toAddress = req.body.toAddress;
        let isBuy = req.body.isBuy; // 0 - sell request , 1 - Buy request

        const contractInstance = new web3.eth.Contract(abiArray, contractAddress);
        let res = contractInstance.methods.balanceOf(fromAddress).call().then(function (data) {
            let bald = data;
            let pres = contractInstance.methods.decimals().call().then(function (data) {
                let finalbal = bald / Math.pow(10, data);
                console.log("Balance ===> " + finalbal)
                if (finalbal > value) {
                    let count;
                    // get transaction count, later will used as nonce
                    web3.eth.getTransactionCount(fromAddress).then(function (v) {
                        console.log("Count: " + v);
                        count = v;
                        let amount = web3.utils.toWei(value.toString(), 'ether')
                        console.log(amount)
                        //creating raw tranaction
                        let rawTransaction
                        if (isBuy) {
                            rawTransaction = {
                                "from": fromAddress,
                                "gasPrice": web3.utils.toHex(10 * 1e9),
                                "gasLimit": web3.utils.toHex(95000),
                                "to": contractAddress,
                                "value": "0x0",
                                "data": contractInstance.methods.buyToken(toAddress, amount).encodeABI(),
                                "nonce": web3.utils.toHex(count)
                            }
                        } else {
                            rawTransaction = {
                                "from": fromAddress,
                                "gasPrice": web3.utils.toHex(10 * 1e9),
                                "gasLimit": web3.utils.toHex(95000),
                                "to": contractAddress,
                                "value": "0x0",
                                "data": contractInstance.methods.sellToken(toAddress, amount).encodeABI(),
                                "nonce": web3.utils.toHex(count)
                            }
                        }

                        console.log(rawTransaction)
                        //creating tranaction via ethereumjs-tx
                        let transaction = new Tx(rawTransaction);
                        //signing transaction with private key
                        transaction.sign(privateKey);
                        //sending transacton via web3js module
                        return web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
                            .on('receipt', (receipt) => {
                                console.log(`Transaction Receipt: ${receipt.transactionHash}`);
                                let txData = {
                                    address: toAddress,
                                    txnHash: receipt.transactionHash,
                                    value: value
                                }
                                return response.status(200).json({result: txData});
                            });
                    })
                } else {
                    return response.status(400).json({error: 'Insufficient balance'});
                }
            });

        })

    })

// @route   POST api/users/getEtherBalance
// @desc    Tests users route
// @access  Private
router.post(
    '/getEtherBalance',
    (req, response) => {
        const address = req.body.address;
        let balance = web3.eth.getBalance(address).then(function (result) {
            response.json({"balance": result / precision});
        });
    })

// @route   POST api/users/getTokenBalance
// @desc    Tests users route
// @access  Private
router.post(
    '/getTokenBalance',
    (req, response) => {
        let abi = JSON.parse(abiArray);
        const account = req.body.address;
        const contractInstance = new web3.eth.Contract(abi, contractAddress);
        let res = contractInstance.methods.balanceOf(account).call().then(function (data) {

            let bald = data;
            let pres = contractInstance.methods.decimals().call().then(function (data) {
                let finalbal = bald / Math.pow(10, data);
                return response.json({"balance": finalbal})
            });

        });
    })

module.exports = router;

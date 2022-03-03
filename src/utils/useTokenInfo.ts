/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
import Web3 from "web3";
import Presale from "contract/Presale.json";
import ERC20ABI from "contract/ERC20ABI.json";
import axios from 'axios';
import MerkelTree from "merkletreejs"
import keccak256 from 'keccak256';
import _ from 'lodash'

declare let window: any;

export const getTotalbalance = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
    }
    const contract = await new window.web3.eth.Contract(Presale, process.env.REACT_APP_CONTRACT_ADDR);
    return await contract.methods.getBalanceOfSubZeroToken().call()
}

export const getRound = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
    }
    const contract = await new window.web3.eth.Contract(Presale, process.env.REACT_APP_CONTRACT_ADDR);
    console.log("asdfasdf",await contract.methods.getRound().call())
    return await contract.methods.getRound().call()
}

export const initialBalance = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
    }
    const contract = await new window.web3.eth.Contract(Presale, process.env.REACT_APP_CONTRACT_ADDR);
    return await contract.methods.initialZeroTokenAmount().call()
}

const sell = async (stableAmount: number, zeroAmount: number, account: string, coin: string) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}whiteList`)
    console.log("aaaaaaa", res);
    const leafNodes = _.map(res.data, addr => keccak256(addr.address))
    const merkleTree = new MerkelTree(leafNodes, keccak256, { sortPairs: true })
    let hexProof = merkleTree.getHexProof(keccak256(account))
    console.log(res.data, hexProof, account)

    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
    }

    let stableCoinAddress;
    switch (coin) {
        case 'USDCE':
            stableCoinAddress = `${process.env.REACT_APP_CONTRACT_USDCE}`;
            break;
        case 'USDC':
            stableCoinAddress = `${process.env.REACT_APP_CONTRACT_USDC}`;
            break;
        case 'USDT':
            stableCoinAddress = `${process.env.REACT_APP_CONTRACT_USDT}`;
            break;
    }
    stableCoinAddress=process.env.REACT_APP_CONTRACT_USDCE
    console.log(stableCoinAddress, coin)
    const contract = await new window.web3.eth.Contract(Presale, process.env.REACT_APP_CONTRACT_ADDR);
    const tokencontract = await new window.web3.eth.Contract(ERC20ABI, stableCoinAddress);
    await tokencontract.methods.approve(process.env.REACT_APP_CONTRACT_ADDR, '0x' + (stableAmount * Math.pow(10, 9)).toString(16)).send({ from: account });
    const result = await contract.methods.buy(
        '0x' + (stableAmount * Math.pow(10, 9)).toString(16),
        '0x' + (zeroAmount).toString(16),
        stableCoinAddress,
        hexProof
    ).send({ from: account });
    console.log("asdasdf", result.events.Sold.returnValues.amount)
    return result.events.Sold.returnValues.amount;
}

export default sell

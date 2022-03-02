/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
import Web3 from "web3";
import Presale from "contract/Presale.json";
import ERC20ABI from "contract/ERC20ABI.json";

declare let window: any;

export const getTotalbalance = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
    }
    const contract = await new window.web3.eth.Contract(Presale, process.env.REACT_APP_CONTRACT_ADDR);
    return await contract.methods.getBalanceOfSubZeroToken().call() / Math.pow(10, 18)
}

const sell = async (stableAmount: number, zeroAmount: number, account: string) => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
    }
    const contract = await new window.web3.eth.Contract(Presale, process.env.REACT_APP_CONTRACT_ADDR);
    const tokencontract = await new window.web3.eth.Contract(ERC20ABI, process.env.REACT_APP_CONTRACT_USDT);
    await tokencontract.methods.approve(process.env.REACT_APP_CONTRACT_ADDR, '0x' + (stableAmount * Math.pow(10, 9)).toString(16)).send({ from: account });
    await contract.methods.sell('0x' + (stableAmount * Math.pow(10, 9)).toString(16), '0x' + (zeroAmount * Math.pow(10, 18)).toString(16), process.env.REACT_APP_CONTRACT_USDT)
        .send({ from: account });
        console.log("asdasdf",contract.events.Sold())
    const events = await contract.events.Sold({fromBlock: 0,toBlock: 'latest'});
    console.log("=event====",events);
}

export default sell

import * as ethers from "ethers";
import {getContract} from "@/apis";

// 合约部署
export function deploy(contractName: string, args: any[]): Promise<any> {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    return getContract(contractName)
        .then(contract => {
            const factory = new ethers.ContractFactory(JSON.stringify(contract.abi), contract.bytecode, provider.getSigner())
            return factory.deploy(...args,{}).then((contract) => {return contract.deployTransaction.wait() })
        })
}

// 合约调用
export function call(contractName: string,address: string, method: string, args: any[]): Promise<string> {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log(`${contractName} ${address} ${method} ${args}`)
    return getContract(contractName)
        .then(contractEntity => {
            const callMethod = contractEntity.abi.find(t => t.type==="function" && t.name === method)
            if(callMethod === undefined){
                return Promise.reject(`method ${method} not found from abi`)
            }
            const contract = new ethers.Contract(address,JSON.stringify(contractEntity.abi),provider.getSigner())
            const callPromise:Promise<any> = contract[method](...args)
            if(callMethod.stateMutability === "view"){
                return callPromise
            }else if(callMethod.stateMutability === "nonpayable" || callMethod.stateMutability === "payable"){
                return callPromise.then(result => { return result.wait()}).then(result => {return result.transactionHash})
            }
        })
}

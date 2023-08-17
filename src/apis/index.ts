import {EthereumContract} from "./ethereum_model.ts"
import axios from 'axios';

// 合约列表
export function getContracts(): Promise<EthereumContract[]> {
   return Promise.all([
       getContract("erc20"),
       getContract("erc721"),
       getContract("erc1155"),
    ])
}

export function getContract(name: string): Promise<EthereumContract> {
    return new Promise<EthereumContract>((resolve,reject) => {
        Promise.all([
            axios.get(`/contracts/${name}/source.sol`),
            axios.get(`/contracts/${name}/abi.json`),
            axios.get(`/contracts/${name}/bytecode`)
        ]).then(resp => {
            resolve({
                name: name.toUpperCase(),
                sourceCode: resp[0].data,
                abi: resp[1].data,
                bytecode: resp[2].data
            })
        }).catch(err => {
            reject(err)
        })
    })
}

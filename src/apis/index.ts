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

// 获取单个合约详情
function getContract(name: string): Promise<EthereumContract> {
    return new Promise<EthereumContract>((resolve,reject) => {
        Promise.all([
            axios.get(`/contracts/${name}/source.sol`),
            axios.get(`/contracts/${name}/abi.json`),
            axios.get(`/contracts/${name}/bytecode`)
        ]).then(resp => {
            resolve(
                new EthereumContract(name.toUpperCase(),resp[0].data,resp[1].data,resp[2].data.trimEnd())
            )
        }).catch(err => {
            reject(err)
        })
    })
}


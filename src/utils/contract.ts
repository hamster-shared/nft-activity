import * as ethers from "ethers";
import {provider} from "./wallet.ts"
import {getContract} from "@/apis";

export function deploy(contractName: string, args: any[]): Promise<any> {
    return getContract(contractName)
        .then(contract => {
            const factory = new ethers.ContractFactory(JSON.stringify(contract.abi), contract.bytecode, provider.getSigner())
            return factory.deploy(...args)
        })
}

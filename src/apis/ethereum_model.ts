export interface InputParam {
    name: string
    type: string
}

export interface ContractInterface {
    name: string,
    sourceCode: string;
    abi: object; // 此处可以根据实
    bytecode: string;

    getConstructorParams(): InputParam[]
}

export interface method {
    type: string
    name: string
    stateMutability: string
    inputs: {
        internalType: string
        name: string
        type: string
    }[]
}

export class EthereumContract implements ContractInterface{
    name: string;
    sourceCode: string;
    abi: method[];
    bytecode: string;

    constructor(name: string, souceCode: string, abi: object, bytecode: string ) {
        this.name = name
        this.sourceCode = souceCode
        this.abi = abi as method[]
        this.bytecode = bytecode
    }

    getConstructorParams(): InputParam[] {
        const method = this.abi.find(t => t.type === "constructor")
        if(method == undefined){
            return []
        }
        return method.inputs
    }

}



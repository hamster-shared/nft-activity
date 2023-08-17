export interface EthereumContract {
    name: string,
    sourceCode: string;
    abi: object; // 此处可以根据实
    bytecode: string;
}

import * as ethers from "ethers";
// @ts-ignore
const ethereum = window.ethereum;

export const provider = new ethers.providers.Web3Provider(ethereum)

const networks = [{
    id: "0x8274f",
    name: "Scroll Sepolia Testnet",
    rpc: "https://sepolia-rpc.scroll.io"
},{
    id: "0x82751",
    name: "Scroll Alpha Testnet",
    rpc: "https://alpha-rpc.scroll.io/l2",
}]

export const activeNetwork = networks[0]

// 连接钱包
export function connectWallet():Promise<any> {
    return provider.send("eth_requestAccounts", []);
}

// 获取当前网络
export function getCurrentNetworkId(): Promise<string> {
    // @ts-ignore
    if(! ethereum) {
        throw new Error("please install Metamask!")
    }
    return ethereum.request({
        method: 'eth_chainId',
    });
}

// 切换到 "Scroll Sepolia Testnet"
export function switchToScrollSepolia(): Promise<any> {
    if(! ethereum) {
        throw new Error("please install Metamask!")
    }
    return ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: activeNetwork.id }],
    })
}

// 新加 "Scroll Sepolia Testnet" 网络
export function addScrollSepoliaChain(): Promise<any>{
    if(! ethereum) {
        throw new Error("please install Metamask!")
    }
    return ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
            {
                chainId: activeNetwork.id,
                chainName: activeNetwork.name,
                rpcUrls: [activeNetwork.rpc],
                nativeCurrency: {
                    name: 'ETH',
                    symbol: 'ETH',
                    decimals: 18,
                },
            },
        ],
    })
}


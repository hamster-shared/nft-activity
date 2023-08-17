import * as ethers from "ethers";
// @ts-ignore
const ethereum = window.ethereum;

const provider = new ethers.providers.Web3Provider(ethereum)
export const scroll_sepolia_networkID = "0x8274f"

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
        params: [{ chainId: scroll_sepolia_networkID }],
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
                chainId: scroll_sepolia_networkID,
                chainName: "Scroll Sepolia Testnet",
                rpcUrls: ["https://sepolia-rpc.scroll.io"],
                nativeCurrency: {
                    name: 'ETH',
                    symbol: 'ETH',
                    decimals: 18,
                },
            },
        ],
    })
}


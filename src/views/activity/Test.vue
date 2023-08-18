<template>
  <h1>test</h1>
</template>

<script setup lang="ts">

import {onMounted} from "vue";
import {getContracts} from "@/apis";
import {
    activeNetwork,
    addScrollSepoliaChain,
    connectWallet,
    getCurrentNetworkId,
    switchToScrollSepolia
} from "@/utils/wallet.ts";

import  * as contract from "@/utils/contract.ts"

onMounted(async () => {
    console.log('Test.vue onMounted')
    const contracts = await getContracts()

    // 连接metamask 钱包
    await connectWallet()
    // 获取当前链id
    const chainId = await getCurrentNetworkId()
    console.log(chainId)
    //判断当前链id 是否scroll_sepolia网络
    if(chainId !== activeNetwork.id) {
        //尝试切换到scroll_sepolia网络
        switchToScrollSepolia().then(() => {
            console.log("switch scroll_sepolia success")
        }).catch(err => {
            // 切换失败，加入scroll_sepolia网络
            addScrollSepoliaChain().then(()=> {
                // 再次尝试切换换到scroll_sepolia网络
                switchToScrollSepolia().then().catch(()=>{
                    console.error("unknow err")
                })
            })
        })
    }

    // contract.deploy("erc20",["MyToken","MTK"]).then(result => {
    //     // 合约地址
    //     console.log("contract_address:", result.address)
    //     // 交易hash
    //     console.log("transaction_tx:",result.deployTransaction.hash)
    // })
    contract.call(
        "erc20",
        "0x198794028eabae5adf5b64fb09ef962cd4a99434 ",
        "name",
        [])
        .then(result => {
            console.log(result)
        })

    // contract.call(
    //     "erc20",
    //     "0x0942A785AD7eE6400028c4cC35B68FF8147CBED8",
    //     "increaseAllowance",
    //     ["0xB362Eba0f3f42Ad32394f84ecb9c8d42bF1f2839","100"]
    // ).then(result => {
    //     console.log(result)
    //     console.log(typeof result)
    // })
})

</script>


<style scoped lang="less">

</style>

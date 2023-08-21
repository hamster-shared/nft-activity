<template>
  <h1>test</h1>
</template>

<script setup lang="ts">

import {onMounted} from "vue";
import {getContract, getContracts} from "@/apis";
import {
    activeNetwork,
    addScrollSepoliaChain,
    connectWallet,
    getCurrentNetworkId,
    switchToScrollSepolia
} from "@/utils/wallet.ts";

import  * as contract from "@/utils/contract.ts"
import * as ethers from "ethers";

onMounted(async () => {
    console.log('Test.vue onMounted')
    const contract1 = await getContract("erc20")

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

    const name1 = await contract.call("erc20","0x8aD33c8C4E3BfA47e82429B451D7054787F8b666","name",[])
    console.log(name1)
})

</script>


<style scoped lang="less">

</style>

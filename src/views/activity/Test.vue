<template>
  <h1>test</h1>
</template>

<script setup lang="ts">

import {onMounted} from "vue";
import {getContracts} from "@/apis";
import {
    addScrollSepoliaChain,
    connectWallet,
    getCurrentNetworkId,
    scroll_sepolia_networkID,
    switchToScrollSepolia
} from "@/utils/wallet.ts";

onMounted(async () => {
    console.log('Test.vue onMounted')
    const contracts = await getContracts()

    // 连接metamask 钱包
    await connectWallet()
    // 获取当前链id
    const chainId = await getCurrentNetworkId()
    console.log(chainId)
    //判断当前链id 是否scroll_sepolia网络
    if(chainId !== scroll_sepolia_networkID) {
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

})

</script>


<style scoped lang="less">

</style>

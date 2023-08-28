<template>
  <div class="px-[14px] py-[24px]">
    <div class="flex justify-center">
      <img src="@/assets/images/tips.svg" class="h-[46px] w-[46px]"  />
    </div>
    <div class="flex justify-center text-center font-family-Bold mt-[10px]">
      <div class="text-[#F6662B] text-[18px] font-bold w-[500px]">Insufficient funds for gas, please follow the procedure below to collect test coins and try again</div>
    </div>
    <div class="mt-[40px] font-bold text-[#000000] font-family-Bold">
      <div class="text-[21px]">scroll sepolia testnet faucet collection tutorial</div>
      <div class="text-[18px] mt-[20px]">Reference process</div>
    </div>
    <div class="mt-[10px] font-family-Regular text-[16px]">
      <div class="leading-[40px]">
        <div>1. Open <label class="text-link" @click="skipNewUrl('sepoliaFaucet')">sepolia faucet</label> to receive Sepolia Token.</div>
        <div>2. Transfer Sepolia ETH from sepolia to scroll sepolia testnet via <label class="text-link" @click="skipNewUrl('scrollBridge')">scroll bridge</label></div>
        <div>3. Wait for the scroll transaction to complete</div>
      </div>
      <div class="mt-[10px] leading-[30px]">
        Obtaining test coins takes some time, and each faucet has its own rules and requirements. You can click on <label class="text-link" @click="skipNewUrl('scrollSepoliaFaucet')">Scroll Sepolia Faucet</label> to find a faucet suitable for yourself.
      </div>
    </div>
    <div class="mt-[40px] text-center">
      <a-button type="primary" ghost @click="handleOk">OK</a-button>
    </div>
  </div>
</template>
<script setup lang="ts">

const emit = defineEmits(['cancelModal'])

const handleOk = () => {
  emit('cancelModal')
}

const skipNewUrl = (val: any) => {
  if (val == 'sepoliaFaucet') {
    window.open('https://sepoliafaucet.com')
  } else if (val == 'scrollBridge') {
    window.open('https://scroll.io/bridge')
  } else if (val == 'scrollSepoliaFaucet') {
    window.open('https://docs.scroll.io/en/user-guide/faucet/')
  }
}
</script>
<style scoped lang="less">
.font-family-Bold{
  font-family: Montserrat-Bold, Montserrat;
}
.font-family-Regular{
  font-family: Montserrat-Regular, Montserrat;
}
</style>
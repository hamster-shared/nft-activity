<template>
  <div class="text-center pt-[50px] pb-[60px]">
    <div class="flex justify-center">
      <img src="@/assets/images/congratulations.png" class="h-[120px]" />
    </div>
    <div class="text-[36px] leading-[44px] font-extrabold mt-[16px]">Congratulations！</div>
    <div class="flex justify-center mt-[20px]">
      <div class="text-[18px] font-light w-[600px]">Congratulations! You have completed your project on Scroll<br>
        Sepolia Testnet just now and your wallet address has been noted.<br>
        Stay tuned and follow us on <span class="text-[#5C64FF] font-bold cursor-pointer underline" @click="goAway">twitter</span> for further announcements.</div>
    </div>
    <a-button type="primary" class="mt-[30px] mb-[40px]" @click="gotoView">View</a-button>
    <div class="flex justify-center items-center cursor-pointer" @click="gotoAline">
      <div class="activity-text-color">Explore More In Hamster</div>
      <img src="@/assets/images/right.svg" class="w-[23px] ml-[10px]" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from "vue-router";

const props = defineProps({
  contractName:{
    type:String,
    defalut:''
  }
})

const router = useRouter();

const alineLink = ref('https://hamsternet.io/')
const gotoAline = () => {
  window.open(alineLink.value);
}
const gotoView = () => {
  router.push(`/view`);
}
const goAway = ()=>{
  window.open('https://twitter.com/Hamsternetio')
}
</script>
<style scoped lang="less">
.activity-text-color{
  height: 33px;
  font-size: 21px;
  font-family: Montserrat-Bold, Montserrat;
  font-weight: bold;
  color: #5B7ED1;
  background: linear-gradient(221deg, #40ECE1 0%, #5C64FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
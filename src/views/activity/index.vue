<template>
  <div class="bg-[#000000]">
    <div class="activity-bg md:pt-[80px] text-center">
      <div class="container mx-auto px-[100px]">
        <div class="flex justify-center">
          <img src="@/assets/images/activity-logos.png" class="h-[68px]"/>
        </div>
        <div class="mt-[50px] flex justify-center">
          <div class="activity-title-text">Joint Scroll & Hamster Airdrop</div>
        </div>
        <div class="flex justify-center mt-[20px]">
          <div class="text-[18px] leading-[30px] w-[854px]">
            Welcome all Hamsters to the Hamster & Scroll Testnet Campaign. Use the Hamster product and start a new web3 journey on Scroll. Please follow our instructions and complete the tasks. Join the native zkEVM.
          </div>
        </div>
        <a-button type="primary" class="btn-css mt-[60px]" @click="getStarted" :disabled="status==3">{{activityStatus[status]}}</a-button>
        <div class="flex justify-center">
          <img src="@/assets/images/activity-bg2.png" class="h-[700px]"/>
        </div>
      </div>
    </div>
    <div class="activity-bg3">
      <div class="container mx-auto px-[100px] text-center">
        <div class="text-[40px] font-semibold leading-[74px] pt-[78px] mb-[40px]">Time</div>
        <div class="activity-card py-[30px] leading-[30px] text-[18px]">
          <div>Start: 22.Aug.2023 00:00 GMT+8</div>
          <div class="mt-[30px]">End: 31.Aug.2023 23:59 GMT+8</div>
        </div>
        <!-- <a-button type="primary" class="btn-css mt-[60px]" @click="getStarted">Get Started</a-button> -->
      </div>
    </div>
    <div class="container mx-auto px-[100px] py-[120px]">
      <div class="pb-[60px] text-[40px] font-extrabold leading-[74px] text-center activity-text-ExtraBold">Requirement</div>
      <div v-for="(item,key) in questionList" :key="key" class="py-[40px]" :class="{ 'activity-border-b' : key === questionList.length - 1, 'activity-border-t': key === 0}">
        <div class="flex justify-between leading-[30px]">
          <div class="flex">
            <div class="w-[50px] text-[24px] font-semibold activity-text-SemiBold">0{{ key+1 }}</div>
            <div>
              <div class="text-[24px] font-semibold activity-text-SemiBold">{{ item.title }}</div>
            </div>
          </div>
          <!-- <div class="pt-[2px]">
            <img :id="`add-${key+1}`" src="@/assets/images/activity-add.png" :class="{ 'hidden' : showContent === key+1}" class="w-[26px] h-[26px]"/>
            <img :id="`minus-${key+1}`" src="@/assets/images/activity-minus.png" :class="{ 'hidden' : showContent !== key+1}" class="w-[26px] h-[26px]"/>
          </div> -->
        </div>
        <!-- <div :id="`content-${key+1}`" :class="{ 'hidden' : showContent !== key+1}" class="mt-[30px] ml-[50px] text-[18px] font-light activity-text-Light w-[880px]">{{ item.content }}</div> -->
      </div>
      <div class="text-center">
        <!-- <a-button type="primary" class="btn-css mt-[60px]" @click="getStarted">Get Started</a-button> -->
      </div>
    </div>
    <Test/>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { activityStatus } from '@/enums/index'
import { apiActivityStatus } from '@/apis/nft'
import Test from "./Test.vue"
const router = useRouter();

const showContent = ref(1);
const status = ref()
const questionList = ref([
  { title: 'Click the “Start Now” below', content: ''},
  { title: 'Follow the instructions step by step (about 2-3 mins)', content: ''},
  { title: 'Done！', content: ''},
  { title: 'Wait for the NFT to be airdropped to your wallet', content: ''}
]);
const handleContent = (num: string) => {
  let classArr = (document.getElementById('content-' + num) as HTMLElement).classList;
  let tempVal = '';
  classArr.forEach((item) => {
    if (item === 'hidden') {
      tempVal = item;
    }
  })
  if (tempVal === '') {
    // showContent.value = 0;
    (document.getElementById('add-' + num) as HTMLElement).classList.remove("hidden");
    (document.getElementById('minus-' + num) as HTMLElement).classList.add("hidden");
    (document.getElementById('content-'+num) as HTMLElement).classList.add("hidden");
  } else {
    // showContent.value = num;  //若只能展开一个，则需要赋值
    (document.getElementById('content-' + num) as HTMLElement).classList.remove("hidden");
    (document.getElementById('minus-' + num) as HTMLElement).classList.remove("hidden");
    (document.getElementById('add-'+num) as HTMLElement).classList.add("hidden");
  }
}
const getStarted = () => {
  router.push("/start");
}

// 判断活动是否结束
const getActivityStatus = async()=>{
  const res = await apiActivityStatus('1')
  status.value = res.data
  console.log('判断活动是否结束',res)
}

onMounted(()=>{
  getActivityStatus()
})
</script>
<style scoped lang="less">
.activity-bg3{
  background: url("@/assets/images/activity-bg3.png") no-repeat center ;
  background-size: 100% 100%;
}
.activity-text-ExtraBold{
  font-family: Montserrat-ExtraBold, Montserrat;
}
.activity-text-Light{
  font-family: Montserrat-Light, Montserrat;
}
.activity-text-SemiBold{
  font-family: Montserrat-SemiBold, Montserrat;
}
.activity-border-t{
  border-top: 1px solid #979797;
}
.activity-border-b{
  border-bottom: 1px solid #979797;
}
</style>
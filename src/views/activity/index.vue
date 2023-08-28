<template>
  <div class="bg-[#000000]">
    <div class="activity-bg md:pt-[80px] text-center">
      <div class="container mx-auto px-[100px]">
        <div class="flex justify-center">
          <img src="@/assets/images/activity-logos.png" class="h-[46px]"/>
        </div>
        <div class="mt-[100px] flex justify-center">
          <div class="activity-title-text">Joint Scroll & Hamster Airdrop</div>
        </div>
        <div class="flex justify-center mt-[40px]">
          <div class="text-[18px] leading-[30px] w-[730px]">
            Welcome all Hamsters to the Hamster & Scroll Testnet NFT Airdrop Campaign. Use the Hamster product and start a new web3 journey on Scroll. Please follow our instructions and complete the tasks. Join the native zkEVM.
          </div>
        </div>
        <!-- <a-button type="primary" class="btn-css mt-[60px]" @click="getStarted" :disabled="status==3">{{activityStatus[status]}}</a-button> -->
        <div class="flex justify-center mt-[60px]">
          <img src="@/assets/images/activity-bg2.png" class="w-[500px]"/>
        </div>
      </div>
      <div class="activity-bg3">
        <div class="container mx-auto text-center">
          <div class="px-[100px]">
            <div class="activity-card mt-[50px] px-[88px] py-[40px]">
              <div class="card-title mb-[40px]">scroll sepolia testnet faucet collection tutorial</div>
              <div class="card-border-t text-left text-[18px]">
                <div class="font-bold mt-[20px]">Reference process</div>
                <div class=" leading-[40px]">
                  <div class="mt-[20px]">1. Open <label class="text-link" @click="skipNewUrl('sepoliaFaucet')">sepolia faucet</label> to receive Sepolia Token.</div>
                  <div>2. Transfer Sepolia ETH from sepolia to scroll sepolia testnet via <label class="text-link" @click="skipNewUrl('scrollBridge')">scroll bridge</label></div>
                  <div>3. Wait for the scroll transaction to complete</div>
                </div>
                <div class="mt-[20px] font-light">
                  Obtaining test coins takes some time, and each faucet has its own rules and requirements. You can click on <br>
                  <label class="text-link" @click="skipNewUrl('scrollSepoliaFaucet')">Scroll Sepolia Faucet</label>  to find a faucet suitable for yourself.
                </div>
              </div>
            </div>
          </div>
          <div class="px-[100px]">
            <div class="text-[40px] font-semibold leading-[74px] pt-[120px] mb-[30px]">Time</div>
            <div class="activity-card py-[30px] leading-[30px] text-[24px]">
              <div>Start: {{startTime}}</div>
              <div class="mt-[30px]">End: {{endTime}}</div>
            </div>
          </div>
          <!-- <a-button type="primary" class="btn-css mt-[60px]" @click="getStarted">Get Started</a-button> -->
        </div>
      </div>
    </div>

    <div class="container mx-auto px-[100px] pt-[120px]">
      <div class="pb-[60px] text-[40px] font-extrabold leading-[74px] text-center activity-text-ExtraBold">Requirement</div>
      <div class="py-[40px] activity-border-b activity-border-t text-[24px] ">
        <div class="font-extrabold activity-text-ExtraBold">Pre-requirement：Your scroll sepolia testnet faucet is claimed and well received.</div>
        <div v-for="(item,key) in questionList" :key="key" class="pt-[40px] activity-text-SemiBold font-semibold">
          <div class="flex justify-between leading-[30px]">
            <div class="flex">
              <div class="w-[120px]">Step 0{{ key+1 }}:</div>
              <div>
                <div>{{ item.title }}</div>
              </div>
            </div>
          <!-- <div class="pt-[2px]">
            <img :id="`add-${key+1}`" src="@/assets/images/activity-add.png" :class="{ 'hidden' : showContent === key+1}" class="w-[26px] h-[26px]"/>
            <img :id="`minus-${key+1}`" src="@/assets/images/activity-minus.png" :class="{ 'hidden' : showContent !== key+1}" class="w-[26px] h-[26px]"/>
          </div> -->
          </div>
          <!-- <div :id="`content-${key+1}`" :class="{ 'hidden' : showContent !== key+1}" class="mt-[30px] ml-[50px] text-[18px] font-light activity-text-Light w-[880px]">{{ item.content }}</div> -->
        </div>
      </div>
      <div class="text-center">
        <!-- <a-button type="primary" class="btn-css mt-[60px]" @click="getStarted">Get Started</a-button> -->
      </div>
      <div class="pt-[60px] text-[20px] font-medium text-[#5C64FF] flex justify-center text-center">
        <div>
          Please ensure your wallet balance is sufficient to cover GAS fees, <br>
          In case of any questions or problems, join the <label class="text-link" @click="skipNewUrl('Telegram')">Telegram</label> group below. 
        </div>
      </div>
      <div class="text-center mb-[120px]">
        <a-button type="primary" class="btn-css mt-[50px]" @click="getStarted" :disabled="status==3">{{activityStatus[status]}}</a-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { activityStatus } from '@/enums/index'
import { apiActivityStatus } from '@/apis/nft'
const router = useRouter();

const showContent = ref(1);
const status = ref()
const startTime = ref()
const endTime = ref() 
const questionList = ref([
  { title: 'Click the “Start Now” above', content: ''},
  { title: 'Follow the instructions step by step', content: ''},
  { title: 'Bingo！', content: ''},
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
  if(status.value==1 || status.value==0){
    return
  }
  router.push("/start");
}

// 判断活动是否结束
const getActivityStatus = async()=>{
  const res = await apiActivityStatus('1')
  status.value = res.data.activityStatus
  startTime.value = res.data.startTime
  endTime.value = res.data.endTime
  console.log('判断活动是否结束',res)
}

const skipNewUrl = (val: any) => {
  if (val == 'Telegram') {
    window.open('https://t.me/hamsternetio')
  } else if (val == 'sepoliaFaucet') {
    window.open('https://sepoliafaucet.com')
  } else if (val == 'scrollBridge') {
    window.open('https://scroll.io/bridge')
  } else if (val == 'scrollSepoliaFaucet') {
    window.open('https://docs.scroll.io/en/user-guide/faucet/')
  }
}

onMounted(()=>{
  getActivityStatus()
})
</script>
<style scoped lang="less">
.text-link{
  color: #017AFF;
  font-weight: bold;
  cursor: pointer;
  text-decoration-line: underline;
}
.text-link:hover{
  color: #858fff;
}
.card-title{
  font-size: 24px;
  font-family: Montserrat-Bold, Montserrat;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 30px;
  background: linear-gradient(270deg, #5C64FF 0%, #00E5D7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.card-border-t{
  border-top: 1px solid #3C3655;
}
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

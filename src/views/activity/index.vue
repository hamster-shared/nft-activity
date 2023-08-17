<template>
  <div class="bg-[#000000]">
    <div class="activity-bg md:pt-[80px] text-center">
      <div class="container mx-auto px-5">
        <div class="flex justify-center">
          <img src="@/assets/images/activity-logos.png" class="h-[68px]"/>
        </div>
        <div class="mt-[50px] flex justify-center">
          <div class="activity-title-text">Hamster&Scroll joint NFT airdrop</div>
        </div>
        <div class="flex justify-center mt-[20px]">
          <div class="text-[18px] leading-[30px] w-[900px]">
            Hamgel is a web3 project support platform initiated by Hamster together with various ecosystems.Through funding, donations, bounty tasks, project roadshows and other means, Hamgel gathers project parties, developers, users, communities and investors to create the best development environment for web3 projects.
          </div>
        </div>
        <a-button type="primary" class="btn-css mt-[60px]" @click="getStarted">Get Started</a-button>
        <div class="flex justify-center">
          <img src="@/assets/images/activity-bg2.png" class="h-[700px]"/>
        </div>
      </div>
    </div>
    <div class="activity-bg3">
      <div class="container mx-auto px-5 text-center">
        <div class="text-[40px] font-semibold leading-[74px] pt-[78px] mb-[40px]">活动时间</div>
        <div class="activity-card py-[30px] leading-[30px] text-[18px]">
          <div>开始时间：2023-08-22 00：00:00</div>
          <div class="mt-[30px]">结束时间：2023-08-22 00：00:00</div>
        </div>
        <a-button type="primary" class="btn-css mt-[60px]" @click="getStarted">Get Started</a-button>
      </div>
    </div>
    <div class="container mx-auto px-5 py-[120px]">
      <div class="pb-[60px] text-[40px] font-extrabold leading-[74px] text-center activity-text-ExtraBold">FREQUENTLY ASKED QUESTIONS</div>
      <div v-for="(item,key) in questionList" :key="key" class="activity-border-t py-[40px]" :class="{ 'activity-border-b' : key === questionList.length - 1}">
        <div class="flex justify-between leading-[30px] cursor-pointer" @click="handleContent(key+1)">
          <div class="flex">
            <div class="w-[50px] text-[24px] font-semibold activity-text-SemiBold">0{{ key+1 }}</div>
            <div>
              <div class="text-[24px] font-semibold activity-text-SemiBold">{{ item.title }}</div>
            </div>
          </div>
          <div class="pt-[2px]">
            <img :id="`add-${key+1}`" src="@/assets/images/activity-add.png" :class="{ 'hidden' : showContent === key+1}" class="w-[26px] h-[26px]"/>
            <img :id="`minus-${key+1}`" src="@/assets/images/activity-minus.png" :class="{ 'hidden' : showContent !== key+1}" class="w-[26px] h-[26px]"/>
          </div>
        </div>
        <div :id="`content-${key+1}`" :class="{ 'hidden' : showContent !== key+1}" class="mt-[30px] ml-[50px] text-[18px] font-light activity-text-Light w-[880px]">{{ item.content }}</div>
      </div>
      <div class="text-center">
        <a-button type="primary" class="btn-css mt-[60px]" @click="getStarted">Get Started</a-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const showContent = ref(1);
const questionList = ref([
  { title: 'Activity Requirements', content: 'All of the NFT works will be minted by TORA team so what you need to do is just holding one regardless of rarity. Our Opensea account is: '},
  { title: '联名NFT说明', content: '联名NFT说明'},
  { title: '空投说明', content: '空投说明'},
  { title: '查看说明', content: '查看说明'},
  { title: '其他', content: '其他'},
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
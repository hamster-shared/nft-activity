<template>
  <div class="bg-[#000000]">
    <div class="activity-bg md:pt-[80px] text-center">
      <div class="container mx-auto px-[100px]">
        <div class="flex justify-center">
          <img src="@/assets/images/activity-logos.png" class="h-[68px]"/>
        </div>
        <div class="mt-[50px] flex justify-center">
          <div class="activity-title-text">Hamster&Scroll joint NFT airdrop</div>
        </div>
        <div class="container mx-auto px-[100px] mt-[80px]">
          <div class="activity-card">
            <StepActivity @finishDeploy="finishDeploy" v-if="!isSuc"></StepActivity>
            <SucActivity v-if="isSuc" :contractName="contractName"></SucActivity>
          </div>
        </div>
      </div>
    </div>
    <img src="@/assets/images/activity-bg3.png" class="w-full"/>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import StepActivity from "./components/StepActivity.vue";
import SucActivity from "./components/SucActivity.vue";

const isSuc = ref(false);
const contractName = ref()

const finishDeploy = (name:string)=>{
  isSuc.value = true
  contractName.value = name
}

</script>
<style scoped lang="less">

</style>
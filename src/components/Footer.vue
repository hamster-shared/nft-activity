<template>
  <div class="bg-[#000000]  text-white">

    <div class="container mx-auto md:py-20 py-14 px-5">
      <div class="grid grid-cols-1 lg:grid-cols-2 mb-[60px]">
        <div>
          <img class="h-[20px] md:h-[32px]" src="@/assets/images/header.png">
          <span class="inline-block mt-4 mb-8 text-sm md:text-lg md:mt-7 md:mb-10 text-[#999999] font-family-medium font-medium md:leading-[22px] leading-[16px] md:w-[380px]"><!--md:mr-20-->
            One-stop Development Automation Experience with Process Safety and Privacy
          </span>
          <div class="flex items-center">
            <img :src="getImageURL('aptos-grant.png')" class="lg:w-[12.5%] w-[20%] lg:mr-[5%] mr-[6.3%]"/>
            <img :src="getImageURL('web3_foundation.png')" class="lg:w-[12.5%] w-[20%] lg:mr-[5%] mr-[6.3%]" />
            <img :src="getImageURL('algorand.png')" class="lg:w-[12.5%] w-[20%] lg:mr-[5%] mr-[6.3%]"/>
            <img :src="getImageURL('starknet.png')" class="lg:w-[16.5%] w-[20%]" />
            <img :src="getImageURL('DFINITY.png')" class="w-[11%] ml-[5%] hidden lg:inline-block" />
            <img :src="getImageURL('GrantSUi.png')" class="w-[10%] ml-[5%] hidden lg:inline-block" />
          </div>
          <img :src="getImageURL('DFINITY.png')" class="w-[18%] mr-[6.3%] mt-4 inline-block lg:hidden" />
          <img :src="getImageURL('GrantSUi.png')" class="w-[18%] mr-[6.3%] mt-4 inline-block lg:hidden" />
        </div>

        <div class="flex lg:justify-end lg:items-end mt-8 lg:mt-0 font-family-medium font-medium">
          <div class="flex flex-col text-base md:mr-16">
            <span class="inline-block mb-5 cursor-pointer md:hover:text-[#5C64FF]" @click="skipNewUrl('about')">About</span>
            <!-- <span class="md:hover:text-[#27FFB8] cursor-pointer">Grant</span> -->
            <span class="inline-block mb-5 md:hover:text-[#5C64FF] cursor-pointer" @click="skipNewUrl('Careers')">Careers</span>
            <a href="/roadmap" class="text-[#FFFFFF] md:hover:text-[#5C64FF] cursor-pointer mb-5">Roadmap</a>
            <a href="/community" class="text-[#FFFFFF] md:hover:text-[#5C64FF] cursor-pointer">Community</a>
          </div>
          <div class="flex flex-col text-base ml-[40px] md:ml-0">
            <div class="inline-block mb-5 cursor-pointer md:hover:text-[#5C64FF]" @click="skipNewUrl('docs')">
              Docs
              <!-- <img class="w-[18px] inline-block" :src="getImageURL('transmit.svg')" /> -->
            </div>
            <div class="inline-block mb-5 cursor-pointer md:hover:text-[#5C64FF]" @click="skipNewUrl('github')">
              Github
              <!-- <img class="w-[18px] inline-block" :src="getImageURL('transmit.svg')" /> -->
            </div>
            <div class="cursor-pointer md:hover:text-[#5C64FF] md:mb-[43px]" @click="skipNewUrl('news')">
              News
              <!-- <img class="w-[18px] inline-block" :src="getImageURL('transmit.svg')" /> -->
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap lg:flex-nowrap lg:justify-between pt-[30px] text-[#999999] border-line">
        <div class="lg:flex text-center lg:text-left  w-full lg:w-auto">
          <div class="inline-block text-base font-family-medium font-medium mt-[60px] lg:mt-0">Hamster Ltd.</div>
          <div class="text-sm lg:mx-[40px] lg:text-base lg:w-[300px] font-light my-[20px] lg:my-0 font-family-light">
            Harbour Plaza, 103 South Church Street Grand Cayman, Cayman Islands
          </div>
          <div class="font-light font-family-light">
            <div class="inline-block text-sm mlgd:text-base">+49 17647 082974</div>
            <div class="text-sm lg:text-base">Email: hamster@hamsternet.io</div>
          </div>
        </div>
        <div class="flex mt-5 justify-around w-full lg:w-auto order-first lg:order-none">
          <img src="@/assets/images/footer-twitter.png" @click="skipNewUrl('twitter')" class="h-[50px] md:h-6 cursor-pointer" />
          <img src="@/assets/images/footer-discord.png" @click="skipNewUrl('discord')" class="h-[50px] md:h-6 mx-[60px] cursor-pointer" />
          <img src="@/assets/images/footer-telegram.png" @click="skipNewUrl('telegram')" class="h-[50px] md:h-6 cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAssets from "@/stores/useAssets";
const { getImageURL } = useAssets();

const skipNewUrl = (val: string) => {
  if (val === 'github') {
    window.open('https://github.com/hamster-shared')
  } else if (val === 'about') {
    window.location.href = '/about';
  } else if (val === 'news') {
    window.open('https://hamsternet.medium.com/')
  }else if (val === 'twitter') {
    window.open('http://twitter.com/Hamsternetio')
  }else if (val === 'discord') {
    window.open('https://discord.gg/qMWUvs7jkV')
  }else if (val === 'telegram') {
    window.open('https://t.me/hamsternetio')
  }else if (val === 'Careers') {
    window.open('https://hamsternet.notion.site/Careers-2c82841516474af285635df8900d4353')
  } else {
    window.open('https://hamsternet.io/docs/')
  }
}

</script>

<style scoped>
  .font-site-links{
    font-family: 'Open Sans' !important;
    font-weight: 700;
  }
  .font-family-style {
    font-family: 'Open Sans' !important;
    font-weight: 400;
  }
  .footer-sub {
    @apply text-[#807D7C] leading-8;
  }
  .border-line{
    border-top: 1px solid #363636;
  }
</style>
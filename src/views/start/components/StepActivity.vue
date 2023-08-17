<template>
  <div class="px-[100px] pt-[80px] pb-[50px] leading-[30px] text-[18px]">
    <a-steps :current="currStep">
      <a-step title="Connect Wallet" />
      <a-step title="Choose Contract" />
      <a-step title="Deploy" />
    </a-steps>
    <div class="mt-[80px]" v-if="currStep === 0">
      <div class="flex justify-center">
        <a-select v-model:value="networkValue" class="w-[387px] text-left" disabled>
          <a-select-option value="Scroll / Sepolia">Scroll / Sepolia</a-select-option>
        </a-select>
        <a-button v-if="!isConnectedWallet" type="primary" ghost class="ml-[20px] !bg-[#FFFFFF]" @click="connectWallet">Connect Wallet</a-button>
        <div v-if="isConnectedWallet" class="ml-[20px] h-[47px] px-[20px] border border-solid border-[#5C64FF] bg-[#FFFFFF] rounded-[8px] flex items-center">
          <img src="@/assets/images/metamask-icon.svg" class="h-[20px] mr-2" />
          <div class="text-[#000000]">
            {{ walletAccount.substring(0,5)+ "..." +walletAccount.substring(walletAccount.length-4) }}
          </div>
          <a-tooltip placement="right" color="white">
            <template #title>
              <span class="text-[#606266] text-[14px] p-[10px] cursor-pointer" @click="disconnectWallet">Disconnect</span>
            </template>
            <img src="@/assets/images/disconnect.svg" class="h-[20px] ml-2 cursor-pointer" @click="disconnectWallet" />
          </a-tooltip>
        </div>
      </div>
      <a-button type="primary" :disabled="!isConnectedWallet" class="mt-[169px]" @click="nextStep">Next</a-button>
    </div>
    <div class="mt-[80px]" v-else-if="currStep === 1">
      <a-radio-group v-model:value="contract">
        <a-radio-button value="ERC20">ERC20</a-radio-button>
        <a-radio-button value="ERC721">ERC721</a-radio-button>
        <a-radio-button value="ERC1155">ERC1155</a-radio-button>
      </a-radio-group>
      <div class="text-[#5C64FF] text-[16px] flex justify-center mt-[10px]">
        <div class="w-[187px] mx-[10px] cursor-pointer" @click="showContract('ERC20')">View</div>
        <div class="w-[187px] mx-[10px] cursor-pointer" @click="showContract('ERC721')">View</div>
        <div class="w-[187px] mx-[10px] cursor-pointer" @click="showContract('ERC1155')">View</div>
      </div>
      <div class="mt-[137px]">
        <a-button type="primary" class="mr-[20px]" @click="backStep">Back</a-button>
        <a-button type="primary" @click="nextStep">Next</a-button>
      </div>
    </div>
    <div v-else-if="currStep === 2" class="text-left px-[100px] mt-[50px]">
      <div class="text-[21px] font-medium mb-[20px]">constructor</div>
      <a-form :model="formData" layout="vertical">
        <a-form-item label="Symbol" name="symbol" >
          <a-input v-model:value="formData.symbol" autocomplete="off" placeholder="" allowClear></a-input>
        </a-form-item>
        <a-form-item label="Name" name="name" >
          <a-input v-model:value="formData.name" autocomplete="off" placeholder="" allowClear></a-input>
        </a-form-item>
      </a-form>
      <div class="mt-[50px] text-center">
        <a-button type="primary" class="mr-[20px]" @click="backStep">Back</a-button>
        <a-button type="primary" :disabled="!isEmpty" @click="nextStep">Deploy</a-button>
      </div>
    </div>
  </div>

  <a-modal :title="visibleTitle"  v-model:visible="visible" :footer="null" width="540px">
    <div style="height: 360px">
      <CodeEditor :readOnly="true" :value="contractValue"></CodeEditor>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import CodeEditor from '@/components/CodeEditor.vue'
import { getContract } from '@/apis/index'

const visible = ref(false);
const visibleTitle = ref('');
const currStep = ref(0);
const isEmpty = ref(false);
const isConnectedWallet = ref(false);
const walletAccount = ref('');
const networkValue = ref('Scroll / Sepolia');
const contract = ref('ERC20');
const contractValue = ref("");
const formData = ref({
  symbol: '',
  name: '',
});

const nextStep = () => {
  currStep.value++;
}
const backStep = () => {
  currStep.value--;
}
const showContract = async(name: string) => {
  console.log("name:::", name);
  visible.value = true;
  visibleTitle.value = name;
  const res = await getContract(name?.toLowerCase())
  contractValue.value = res.sourceCode
}

const connectWallet = async()=>{
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const address = accounts[0];
    if(address){
      isConnectedWallet.value = true
      walletAccount.value = address
      localStorage.setItem('nftAddress',address)
    }
    console.log(`Metamask wallet address: ${address}`,accounts);
  } else {
    message.error('Please install MetaMask!')
  }
}

const disconnectWallet = ()=>{
  localStorage.removeItem('nftAddress')
  isConnectedWallet.value = false
  walletAccount.value = ''
}
</script>
<style scoped lang="less">

</style>
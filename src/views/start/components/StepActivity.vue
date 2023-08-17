<template>
  <div class="px-[100px] pt-[80px] pb-[50px] leading-[30px] text-[18px]">
    <a-steps :current="currStep">
      <a-step title="Connect Wallet" />
      <a-step title="Choose Contract" />
      <a-step title="Deploy" />
    </a-steps>
    <div class="mt-[80px]" v-if="currStep === 0">
      <div class="flex justify-center">
        <a-select v-model:value="networkValue" class="w-[387px] text-left">
          <a-select-option value="Scroll / Sepolia">Scroll / Sepolia</a-select-option>
        </a-select>
        <a-button v-if="!isConnectedWallet" type="primary" ghost class="ml-[20px] !bg-[#FFFFFF]">Connect Wallet</a-button>
        <div v-if="isConnectedWallet" class="ml-[20px] h-[47px] px-[20px] border border-solid border-[#5C64FF] bg-[#FFFFFF] rounded-[8px] flex items-center">
          <img src="@/assets/images/metamask-icon.svg" class="h-[20px] mr-2" />
          <div class="text-[#000000]">
            {{ walletAccount.substring(0,5)+ "..." +walletAccount.substring(walletAccount.length-4) }}
          </div>
          <a-tooltip placement="right" color="white">
            <template #title>
              <span class="text-[#606266] text-[14px] p-[10px] cursor-pointer" @click="">Disconnect</span>
            </template>
            <img src="@/assets/images/disconnect.svg" class="h-[20px] ml-2 cursor-pointer" />
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

const visible = ref(false);
const visibleTitle = ref('');
const currStep = ref(1);
const isEmpty = ref(false);
const isConnectedWallet = ref(true);
const walletAccount = ref('0x3c955a0109eb0860fe1e28b7f50d1e48d3f4aa12');
const networkValue = ref('Scroll / Sepolia');
const contract = ref('ERC20');
const contractValue = ref("function 12312312\n\nn\n123312\n\nn\n123312\n\nn\n123312\n\nn\n123312\n\nn\n123312\n\nn\n123312\n\nn\n123312\n\nn\n123312\n\nn\n123312\n\nn\n123");
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
const showContract = (name: string) => {
  console.log("name:::", name);
  visible.value = true;
  visibleTitle.value = name;
}
</script>
<style scoped lang="less">

</style>
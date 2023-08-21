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
          <a-select-option :value="activeNetwork.name">{{activeNetwork.name}}</a-select-option>
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
      <a-radio-group v-model:value="contract" @change="changeERC">
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
        <div v-if="paramsArr?.length" v-for="(item,index) in paramsArr">
          <a-form-item :label="item.name || `param${index+1}`" class="" :name="item.name" :rules="[{ required: true, message: `Please input your ${item.name}` }]">
            <a-input class="text-white" @change="checkEmpty"
              :placeholder= "'Enter a value for ' + (item.type || item.internalType)" allowClear autocomplete="off"
              v-model:value="formData[item.name || `param${index+1}`]"></a-input>
          </a-form-item>
        </div>
      </a-form>
      <div class="mt-[50px] text-center">
        <a-button type="primary" class="mr-[20px]" @click="backStep">Back</a-button>
        <a-button type="primary" :disabled="isEmpty" @click="DeployClick" :loading="loading">Deploy</a-button>
      </div>
    </div>
  </div>

  <a-modal :title="visibleTitle"  v-model:visible="visible" :footer="null" width="740px">
    <div style="height: 360px">
      <CodeEditor :readOnly="true" :value="contractValue"></CodeEditor>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import CodeEditor from '@/components/CodeEditor.vue'
import { getContract } from '@/apis/index'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { addToChain } from '@/utils/changeNetwork'
import  * as contractDeploy from "@/utils/contract.ts"
import { apiActivityDeploy, apiSaveDeployInfo } from '@/apis/nft'
import { activeNetwork, addScrollSepoliaChain } from '@/utils/wallet'

const emit = defineEmits(['finishDeploy'])

const router = useRouter()
const loading = ref(false)
const visible = ref(false);
const visibleTitle = ref('');
const currStep = ref(0);
const isEmpty = ref(true);
const isConnectedWallet = ref(false);
const walletAccount = ref('');
const networkValue = ref('Scroll Alpha Testnet');
const contract = ref('ERC20');
const contractValue = ref("");
const formData = reactive<any>({});
const paramsArr = ref<any>([])

const nextStep = async() => {
  if(currStep.value==0){
    // 要先判断用户是否已经部署成功，如果部署成功直接跳转
    const res = await apiActivityDeploy(walletAccount.value,activeNetwork.name)
    if(res.data){
      emit('finishDeploy')
      return
    }
  }
  currStep.value++;
}

const backStep = () => {
  currStep.value--;
}

const changeERC = async(val:any)=>{
  console.log('changeERC:',val)
  const name = val.target.value
  const res = await getContract(name?.toLowerCase())
  paramsArr.value = await res.getConstructorParams()
  contractValue.value = res.sourceCode
}

const DeployClick = async () => {
  try {
    loading.value = true
    // 第一个参数是合约名称
    // [] 是页面参数表单的数据，按照页面参数的从上到下收集的
    let newData: any = [];
    if (paramsArr?.value.length > 0) {
      paramsArr?.value.forEach((item: any) => {
        newData[item.name] = formData[item.name];
      })
    }
    await contractDeploy.deploy(contract.value.toLowerCase(), Object.values(newData)).then(result => {
      // 合约地址
      console.log("contract_address:", result.address)
      // 交易hash
      console.log("transaction_tx:", result.deployTransaction.hash)
      const params = {
        fkActivityId: 1,
        walletAddress: walletAccount.value,
        deployNetwork: activeNetwork.name,
        contractName: contract.value,
        contractAddress: result.address,
      }
      const res = apiSaveDeployInfo(params)
      loading.value = false
      emit('finishDeploy',contract.value.toLowerCase())
    }).catch(error => {
      message.error('Failed ', error)
      console.log('DeployClick1:',error)
      loading.value = false
    })
  } catch (err: any) {
    message.error(err)
    loading.value = false
    console.log('DeployClick2:',err)
  }
}
  
const checkEmpty = () => {
  const emptyInputs = paramsArr?.value.filter((item: { name: string | number; }) => !formData[item.name]);
  if (emptyInputs.length === 0) {
    isEmpty.value = false;
  } else {
    isEmpty.value = true;
  }
}

const showContract = async(name: string) => {
  console.log("name:::", name);
  visible.value = true;
  visibleTitle.value = name;
  const res = await getContract(name?.toLowerCase())
  // paramsArr.value = await res.getConstructorParams()
  contractValue.value = res.sourceCode
}

const connectWallet = async()=>{
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const address = accounts[0];
    if(address){
      try {
        // {name : "Scroll Alpha Testnet",  id: "82751", url: "https://alpha-rpc.scroll.io/l2", networkName: "Scroll Alpha Testnet"},
        // await addToChain('0x82751','Scroll Alpha Testnet','https://alpha-rpc.scroll.io/l2','ETH',18)
        await addScrollSepoliaChain()
        isConnectedWallet.value = true
        walletAccount.value = address
        localStorage.setItem('nftAddress',address)
      } catch (err:any) {
        message.error('Failed ',err)
      }
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

// 本地缓存
const getAddress = ()=>{
  const address = localStorage.getItem('nftAddress')
  if(address){
    isConnectedWallet.value = true
    walletAccount.value = address
  }
}

onMounted(()=>{
  getAddress()
  // 默认拿erc20的数据信息
  changeERC({target:{value:'erc20'}})
})
</script>
<style scoped lang="less">

</style>
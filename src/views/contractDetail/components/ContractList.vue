<template>
  <div
    class="contractList text-white grid grid-cols-3 gap-4 border border-solid border-[#434343] rounded-[12px]">
    <div class="contractList-left p-[32px]">
      <div class="mb-[64px]" v-if="sendAbis.length > 0">
        <div class="mb-[16px]">
          <img src="@/assets/images/send-white.svg" class="mr-[8px] inline-block" />
          <span class="font-bold align-middle">Send</span>
        </div>
        <div>
          <div
            class="contractList-title text-[#E0DBD2] h-[51px] leading-[51px] rounded-[12px] pl-[30px] cursor-pointer"
            :class="(checkValue === val.name && checkValueIndex === index) ? 'checked' : ''"
            v-for="(val, index) in sendAbis" :key="val.name" @click="checkContract(val.name, val, 'Transact', index)">
            {{ ellipsisFunction(val.name) }}</div>
        </div>
      </div>
      <div v-if="callAbis.length > 0">
        <div class="mb-[16px]">
          <img src="@/assets/images/send-white.svg" class="mr-[8px] inline-block" />
          <span class="font-bold align-middle">Call</span>
        </div>
        <div>
          <div
            class="contractList-title text-[#E0DBD2] h-[51px] leading-[51px] rounded-[12px] pl-[30px] cursor-pointer"
            :class="(checkValue === val.name && checkValueIndex === index) ? 'checked' : ''"
            v-for="(val, index) in callAbis" :key="val.name" @click="checkContract(val.name, val, 'Call', index)">
            {{ ellipsisFunction(val.name) }}</div>
        </div>
      </div>

    </div>
    <div class="col-span-2 p-[32px]">
      <div>
        <ContractForm :checkValue="checkValue" :contractAddress="contractAddress" :inputs="inputs" :outputs="outputs" :abiInfo="abiInfo" :contractName="contractName"
          :frameType="frameType" :buttonInfo="buttonInfo" :payable="payable" ref="contractForm" :aptosName="aptosName" :aptosAddress="aptosAddress">
        </ContractForm>
      </div>
      <!-- <div v-if="!checkValue">noData</div> -->
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive, toRefs,onMounted } from "vue";
import YAML from "yaml";
import ContractForm from "./ContractForm.vue";

const props = defineProps({
  contractAddress: {
    type:String,
    default:''
  },
  abiInfo: String,
  frameType: {
    type:Number,
    default:1
  },
  contractName:String
});

const { contractAddress, abiInfo, frameType, contractName } = toRefs(props);

const sendAbis = reactive<any>([])
const callAbis = reactive<any>([])
const buttonInfo = ref('');
const checkValue = ref('');
const checkValueIndex = ref(0);
const inputs = ref([]);
const outputs = ref([]);
const contractForm = ref();
const abiInfoData = reactive([]);
const aptosName = ref('')
const aptosAddress = ref('')
const payable = ref(false)

const data = YAML.parse(abiInfo.value);
if (data.abi) {
  Object.assign(abiInfoData, data.abi)
} else {
  Object.assign(abiInfoData, data)
}
const commonFirst = ()=>{
  if (sendAbis.length > 0) {
    checkValue.value = sendAbis[0]?.name;
    inputs.value = sendAbis[0]?.inputs;
    outputs.value = sendAbis[0]?.outputs
    payable.value = sendAbis[0]?.stateMutability === 'payable'
    buttonInfo.value = 'Transact'
  } else if (sendAbis.length <= 0 && callAbis.length > 0) {
    checkValue.value = callAbis[0]?.name;
    inputs.value = callAbis[0]?.inputs;
    outputs.value = callAbis[0]?.outputs;
    payable.value = callAbis[0]?.stateMutability === 'payable'
    buttonInfo.value = 'Call'
  } else {
    checkValue.value = ''
  }
}

const emit = defineEmits(["checkContract"])

const ellipsisFunction = (column: string ) => {
    if(!column){
        return ""
    }
    if(column.length > 26){
      return column.slice(0,23)+'...'
    }
    return column
}

const checkContract = (name: string, val: any, text: string, index: number) => {
  inputs.value = []
  outputs.value = []
  console.log('checkContract',val)
  checkValueIndex.value = index;
  // console.log(buttonInfo, 'buttonInfo')
  checkValue.value = name
  inputs.value = val.inputs
  outputs.value = val.outputs
  payable.value = val.stateMutability === 'payable'
  buttonInfo.value = text
  console.log("payable: ", payable.value)

  emit("checkContract", inputs, name);
  emit("checkContract", outputs, name);
}

onMounted(()=>{
  abiInfoData.map((item: any) => {
    if (item.type === "function") {
      if (!item.stateMutability || item.stateMutability === 'nonpayable' || item.stateMutability === 'payable') {
        sendAbis.push(item)
      } else if (item.stateMutability === 'view' || item.stateMutability === 'constant') {
        callAbis.push(item)
      }
    }
    commonFirst()
  })
})

</script>
<style lang='less' scoped>
@baseColor: #E2B578;

.contractList {
  font-size: 14px;
}

.btn {
  width: 131px;
  height: 43px;
}

.checked {
  background-color: #36322D;
}

.contractList-left {
  border-right: 1px solid #434343;
}
</style>

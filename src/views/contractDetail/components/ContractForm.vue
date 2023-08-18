<template>
  <a-form class="text-white col-span-3" ref="formRef" name="basic" :label-col="{ span: 0 }"
    :model="formData" :wrapper-col="{ span: 24 }" autocomplete="off" noStyle @submit="submit">
    <a-form-item>
      <div class="mb-[32px]">
        <div class="text-white text-[16px] font-blod leading-[43px]">{{ checkValue }}</div>
        <div class="text-white text-[12px] leading-[43px]">{{ subTitle }}</div>
      </div>
    </a-form-item>
    <div v-if="inputs?.length" v-for="(item,index) in inputs">
      <a-form-item class="" :name="item.name" :rules="[{ required: true, message: `Please input your ${item.name}` }]">
        <div class="mb-[12px]">
          <span class="text-[#FFFFFF] text-[16px] font-bold">{{ item.name || `param${index+1}` }}</span>
        </div>
        <a-input class="text-white"
          :placeholder= "'Enter a value for ' + (frameType === 4 ? item.type : item.internalType)" allowClear
          v-model:value="formData[item.name || `param${index+1}`]"></a-input>
      </a-form-item>
    </div>

      <div v-if="payable">
          <div class="mb-[12px]">
              <a-form-item class="" name="value" :rules="[{ required: false, message: `Please input your value` }]">
                <span class="text-[#FFFFFF] text-[16px] font-bold"> value </span>
                <div class="flex justify-between w-[100%]">
                  <a-input class="text-white !w-[60%]"
                         :placeholder= "'value to send '" allowClear v-model:value="payableValue"></a-input>
                  <a-select v-model:value="payUnit" class="!w-[20%]">
                      <a-select-option value="ether">ether</a-select-option>
                      <a-select-option value="finney">finney</a-select-option>
                      <a-select-option value="szabo">szabo</a-select-option>
                      <a-select-option value="gwei">gwei</a-select-option>
                      <a-select-option value="mwei">mwei</a-select-option>
                      <a-select-option value="kwei">kwei</a-select-option>
                      <a-select-option value="wei">wei</a-select-option>
                  </a-select>
                </div>
              </a-form-item>
          </div>
      </div>

    <a-button class="btn" :disabled="isSend" type="primary" html-type="submit" :loading="isSend">{{
        isSend ? buttonInfo + 'ing' : buttonInfo
      }}</a-button>
    <div class="mb-[24px] mt-[24px]">
      <div class="flex justify-between  mb-[12px]">
        <span class="text-[#FFFFFF] text-[16px] font-bold">outputs</span>
        <span class="open-link-css text-[16px] cursor-pointer flex" @click="copy">
          <img src="@/assets/images/copy.svg" class="mr-1" />copy
        </span>
      </div>
      <a-textarea class="text-white" placeholder="" disabled :rows="4" v-model:value="hashValue"
        ref="textareaRef" />
    </div>
  </a-form>
</template>
<script lang='ts' setup>
import { reactive, toRefs, watch, ref } from 'vue';
import * as ethers from "ethers";
import YAML from "yaml";
import { message } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import  * as contractDeploy from "@/utils/contract.ts"

const props = defineProps({
  contractAddress: String,
  checkValue: String,
  abiInfo: String,
  buttonInfo: String,
  frameType: {
    type: Number,
    required: true
  },
  payable: Boolean,
  inputs: { type: Array as any, default: () => { return [] } },
  outputs: { type: Array as any, default: () => { return [] } },
  aptosName: String,
  aptosAddress: String,
  subTitle:{
    type:String,
    default:''
  }
})
const route:any = useRoute()
const address:any = localStorage.getItem('nftAddress')
const isSend = ref(false);
const hashValue = ref('')
const formRef = ref();
const textareaRef = ref();
const formState = reactive({
  contractAddress: '',
  checkValue: '',
  abiInfo: '',
  frameType: Number,
});

const payableValue = ref(0)
const payUnit = ref("ether")


const formData = reactive<any>({});
const { checkValue, contractAddress, abiInfo, inputs,outputs, buttonInfo,frameType, aptosName, aptosAddress, subTitle } = toRefs(props)
Object.assign(formState, { contractAddress: contractAddress?.value, checkValue: checkValue?.value, abiInfo: abiInfo?.value, frameType: frameType?.value })


const submit = async () => {
  const emptyInputs = inputs?.value.filter( (item: { name: string | number; }) => !formData[item.name]);
  if (emptyInputs.length > 0) {
    message.warning('Please enter the necessary parameters')
    return
  }
  evmDeployFunction();
}
// evm合约方法调用
const evmDeployFunction = async() => {
  isSend.value = true
  try {
    let newData:any = {};
    if (inputs?.value.length > 0) {
      inputs?.value.forEach((item: any) => {
        newData[item.name] = formData[item.name];
      })
    }
    console.log('evm合约方法调用参数：',route.query.name,address,formState.checkValue,Object.values(newData))
    const res = await contractDeploy.call(route.query.name,address,formState.checkValue,Object.values(newData))
    console.log('合约调用结果: ',res)
    hashValue.value = res
    isSend.value = false
  } catch (errorInfo: any) {
    console.log('errorInfo:' + errorInfo)
    isSend.value = false;
    message.error('Failed ',errorInfo)
  }
}

const copy = () => {
  let inp = document.createElement("input");
  document.body.appendChild(inp);
  inp.value = hashValue.value;
  inp.select();
  document.execCommand("copy", false);
  inp.remove();
  message.success('copy success')
}
watch(
  () => props,
  (oldV, newV) => {
    if (newV) {
      let name = [...(Object.keys(formData))]
      let value = [...(Object.values(formData))]
      if (!isSend.value) {
        // formRef.value.resetFields();
        // formRef.value.resetFields();
        name.forEach((it: any) => {
          delete formData[it];
        })
        hashValue.value = ''
      }
      Object.assign(formState, { contractAddress: contractAddress?.value, checkValue: checkValue?.value, abiInfo: abiInfo?.value })
    }
  }, { deep: true }
);
</script>
<style lang='less' scoped>
.btn { 
  height: 43px;
  background: #E2B578;
  border-color: #E2B578;
}
</style>

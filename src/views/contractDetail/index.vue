<template>
  <div class="bg-[#000000]">
    <div class="container mx-auto px-5">
      <div class="pt-[50px] pb-[60px]">
        <a-table :dataSource="tableData" :columns="columns" class="mb-[32px]" :pagination="false">
          <template #bodyCell="{ record, column }">
            <template v-if="column.key === 'action'">
              <a v-if="frameType === 5" @click.stop="copyInfo(record.address, 'value')">Copy Address</a>
              <a v-else @click.stop="deploy(record)">Deploy</a>
            </template>
          </template>
        </a-table>
        <div class="text-[24px] font-bold mb-[32px]">Contract List</div>
        <ContractList v-if="abiInfo" :abiInfo="abiInfo" :contractAddress="contractAddress" :frameType="frameType"
          @checkContract="checkContract">
        </ContractList>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ContractList from './components/ContractList.vue';
import { useRoute } from 'vue-router';
import { getContract } from '@/apis/index'

const route:any = useRoute()

const abiInfo = ref()
const contractAddress = ref('0x2FCd541b2e5f595Bbd669DBe535536D2Dcd9Df7F');
const frameType = ref(1);
const columns = [
  {
    title: 'Network',
    dataIndex: 'network',
    align: "center",
    key: 'network',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    align: "center",
    customRender: ({ text }) => {
      if (!text) {
        return '-'
      }
    },
    key: 'address',
  }
];
const tableData = ref([{ network: 'Scroll Alpha Testnet', address: localStorage.getItem('nftAddress')}])

const checkContract = ()=>{}

// 获取abi
const getAbiInfo = async()=>{
  const res = await getContract(route.query.name)
  abiInfo.value = JSON.stringify(res.abi)
}

onMounted(()=>{
  getAbiInfo()
})
</script>
<style scoped lang="less">

</style>
<template>
  <h1>test</h1>
</template>

<script setup lang="ts">

import {onMounted} from "vue";
import {getContracts} from "@/apis";

onMounted(() => {
    console.log('Test.vue onMounted')
    getContracts().then(data => {
        console.log(data)
    })
})

</script>


<style scoped lang="less">

</style>

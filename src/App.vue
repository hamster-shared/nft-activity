
<template>
  <div class="">
    <!-- Default Layout -->
    <a-layout class="layout-default" id="layout-default" :class="layoutClass">
      <!-- Layout Header's Conditionally Fixed Wrapper -->
      <!-- <Header msg="Vite + Vue" /> -->
      <!-- / Layout Header's Conditionally Fixed Wrapper -->

      <!-- Layout Content -->
      <a-layout class="layout-default-page !bg-[#000000]">
        <!-- Page Content -->
        <a-layout-content>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive" />
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive" />
        </a-layout-content>
        <!-- / Page Content -->
        <Footer />
      </a-layout>
      <!-- / Layout Content -->
    </a-layout>
    <!-- / Dashboard Layout -->
  </div>
</template>
<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import Footer from '@/components/Footer.vue'
import { computed } from "vue";
import { ConfigProvider } from 'ant-design-vue';

ConfigProvider.config({
  theme: {
    primaryColor: '#5C64FF',
  },
});
const routes = useRoute();

const layoutClass = computed(() => {
  return routes.meta.layoutClass;
});
</script>

<style scoped>

.ant-layout {
  background: #000000;
  color: #FFFFFF;
}

.layout-default-page {
  min-height: 100vh;
}
.border-b{
  border-bottom: 1px solid #FFFFFF;
}
.border-t{
  border-top: 1px solid #FFFFFF;
}
</style>

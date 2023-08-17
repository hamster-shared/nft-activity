import { createRouter, createWebHistory } from "vue-router";
let router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "activity",
      component: () => import('@/views/activity/index.vue'),
    },
    {
      path: "/start",
      name: "start",
      component: () => import('@/views/start/index.vue'),
    }
  ],
  // 每次切换路由页面滚动到顶部
  scrollBehavior() {
    return { top: 0 }
  }
});

export default router;

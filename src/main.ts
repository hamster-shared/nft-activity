import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import Antd from "ant-design-vue";
import router from "./router";
import "./design/main.css";
import 'ant-design-vue/dist/antd.variable.min.css';
import "./design/app.less";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Antd);
app.mount("#app");

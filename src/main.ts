import { createApp } from 'vue'
import "./design/main.css";
import App from './App.vue'
import Antd from "ant-design-vue";
import 'ant-design-vue/dist/antd.variable.min.css';

const app = createApp(App);

app.use(Antd);
app.mount("#app");

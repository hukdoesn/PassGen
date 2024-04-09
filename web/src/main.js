import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

const app = createApp(App);

// 使用环境变量设置axios的基础URL
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
app.config.globalProperties.$axios = axios;

app.use(router);
app.mount("#app");
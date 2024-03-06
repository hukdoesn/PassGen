// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { create, NButton } from 'naive-ui';
import axios from 'axios';

const app = createApp(App);

// 设置axios的基础URL
axios.defaults.baseURL = 'http://127.0.0.1:8000/';
app.config.globalProperties.$axios = axios;

const naive = create({
  components: [NButton]
});

app.use(router);
app.use(naive);
app.mount('#app');

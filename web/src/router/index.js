// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import home from '../components/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: home
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import BlogPage from '../components/BlogPage.vue'; 

const routes = [
  {
    path: '/',
    component: HomePage,
    children: [
      {
        path: 'blog',
        component: BlogPage, // 子路由对应的组件
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
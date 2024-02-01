import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  {

    path: '/',
    name: 'home',
    component: () => import('../components/nav-pages/HomeView.vue')
  },
  {

    path: '/about',
    name: 'about',
    component: () => import('../components/nav-pages/AboutView.vue')
  },
  {

    path: '/login',
    name: 'login',
    component: () => import('../components/nav-pages/LoginView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../components/nav-pages/ContactView.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('../components/nav-pages/FaqView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../components/nav-pages/UserView.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../components/nav-pages/SigninView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../components/layout/Cart.vue'),
  }
];

const router = createRouter({
  history: createWebHistory('/Garderie/'),
  routes
});

export default router;

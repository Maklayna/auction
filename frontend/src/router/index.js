import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home';
import registration from '../components/registration';
import login from '../components/login';
import secret from '../components/gallery';
import userPage from '@/components/userPage';
import auctionPage from '@/components/auctionPage'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'auctionPage',
      component: auctionPage,
    },
    {
      path: '/reg',
      name: 'registration',
      component: registration,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: secret,
    },
    {
      path: '/userPage',
      name: 'userPage',
      component: userPage,
    },
  ],
  mode: 'hash',
});

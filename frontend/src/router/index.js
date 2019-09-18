import Vue from 'vue';
import Router from 'vue-router';
import registration from '../components/registration';
import login from '../components/login';
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
      path: '/userPage',
      name: 'userPage',
      component: userPage,
    },
  ],
  mode: 'hash',
});

import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    curentUser: '',
    userProducts: [],
    allProducts: [],
  },

  getters: {
    // Here we will create a getter
  },

  mutations: {
    set_user: (state, data) => {
      state.curentUser = data;
    },
    set_userProducts: (state, data) => {
      state.userProducts = data;
    },
    set_allProducts: (state, data) => {
      state.allProducts = data;
    },
  },

  actions: {
    async logout(context) {
      await axios.post('/api/logout/', {}, { withCredentials: true });
      context.commit('set_user', '');
      context.commit('set_userProducts', []);
      context.commit('set_allProducts', []);
    },
    async getUserProducts(context) {
      const products = await axios.get('/api/products/my', {}, { withCredentials: true });
      context.commit('set_userProducts', products.data);
    },
    async getAllProducts(context) {
      const products = await axios.get('/api/products/', {}, { withCredentials: true });
      context.commit('set_allProducts', products.data);
    },
  },
});

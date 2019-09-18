<template>
  <div class="d-flex flex-column justify-content-start align-items-start w-75">
    <h3 class="mb-5">Личный кабинет:</h3>
    <h4>Мои аукционы</h4>
    <div class="d-flex justify-content-between w-100 flex-wrap">
      <productCard :key="index" v-for="(product,index) in products" :product="product" />
      </div>
    <button class="btn btn-success" @click="needToAdd=!needToAdd">Добавить аукцион</button>
    <addAuctionModal @closeModal="needToAdd=!needToAdd" v-if="needToAdd" :visible="needToAdd"/>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
import addAuction from '@/components/addAuction';
import addAuctionModal from '@/components/addAucMod';
import productCard from '@/components/productCard';
export default {
  name: 'userPage',
  data() {
    return { needToAdd: false };
  },
  components: { addAuction, productCard, addAuctionModal },
  computed: {
    products: function() {
      return this.$store.state.userProducts;
    },
  },
  methods: {},
};
</script>

,<style scoped>
</style>
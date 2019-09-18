<template>
  <div class="d-flex flex-column justify-content-start align-items-start w-75">
    <h4 class="text-center w-100 mb-5 mt-5">{{$store.state.сurentUser?'Текущие аукционы':'Вам необходимо авторизоваться'}}</h4>
    <div class="d-flex justify-content-between w-100 flex-wrap">
      <productCard
        @editProduct="needToUpdate=!needToUpdate"
        :key="index"
        v-for="(product,index) in products"
        :product="product"
      />
      
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import addAuction from '@/components/addAuction';
import addAuctionModal from '@/components/addAucMod';
import productCard from '@/components/productCard';
export default {
  name: 'auctionPage',
  data() {
    return { needToAdd: false, needToUpdate: false };
  },
  components: { addAuction, productCard, addAuctionModal },
  computed: {
    products: function() {
      return this.$store.state.allProducts;
    },
  },
  methods: {},
};
</script>

,<style scoped>
</style>
<template>
  <div class="d-flex flex-column justify-content-start align-items-start w-75">
    <h4 class="text-center w-100 mb-5 mt-5">{{msg}}</h4>
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
import addAuctionModal from '@/components/addAucMod';
import productCard from '@/components/productCard';
export default {
  name: 'auctionPage',
  data() {
    return { needToAdd: false, needToUpdate: false };
  },
  components: {  productCard, addAuctionModal },
  computed: {
    products: function() {
      return this.$store.state.allProducts;
    },
    msg: function () {
      return this.$store.curentUser!==''?'Текущие аукционы':'Вам необходимо зарегистрироваться'
    }
  },
  methods: {},
};
</script>

,<style scoped>
</style>
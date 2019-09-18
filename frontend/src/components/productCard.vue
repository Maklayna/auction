<template>
  <div class="card bg-light mb-4" style="max-width: 20rem;">
    <div class="card-header bg-primary text-white">{{product.tag}}</div>
    <div class="d-flex flex-column align-items-center p-2">
      <img :src="product.tmb_src" :alt="product.description" />
      <div class="d-flex flex-column align-items-center">
        <p class="font-weight-bold">Описание</p>
        <span>{{product.description}}</span>
      </div>
      <div class="d-flex flex-column align-items-center">
        <p class="font-weight-bold">Дата начала - Дата окончания</p>
        <span>{{product.startDate.slice(0,10)}} - {{product.endDate.slice(0,10)}}</span>
      </div>
      <div class="d-flex flex-column align-items-center">
        <p class="font-weight-bold">Начальная цена</p>
        <span>{{product.startPrice}}$</span>
      </div>
      <div class="d-flex flex-column align-items-center">
        <p class="font-weight-bold">Последняя ставка:</p>
        <span>{{lastStake.user}} : {{lastStake.stake}}$</span>
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <button v-if="my" @click="deleteProduct" class="align-self-stretch d-block btn btn-danger">␡</button>
      <button v-if="my" @click="editMode=!editMode" class="align-self-stretch d-block btn btn-primary">⌥</button>
      <button @click="setStake" class="align-self-stretch d-block btn btn-success">⌘</button>
    </div>
    <addAuctionModal
      @closeModal="editMode=!editMode"
      v-if="editMode"
      :visible="editMode"
      :product="product"
      :update="true"
    />
  </div>
</template>

<script>
import axios from 'axios';
import addAuctionModal from '@/components/addAucMod';

export default {
  name: 'imageCard',
  props: ['product'],
  data() {
    return {
      editMode: false,
    };
  },
  computed: {
    lastStake: function() {
      let last = this.product.stakeHistory.length - 1;
      return this.product.stakeHistory[last];
    },
    my: function() {
      return this.product.user===this.$store.state.curentUser._id
    }
  },
  components: { addAuctionModal },
  methods: {
    async deleteProduct() {
      axios.delete(`/api/products/?id=${this.product._id}`).then(res => {
        this.$store.dispatch('getUserProducts');
      });
    },
    async editProduct() {
      this.editMode = !this.editMode;
    },
    async setStake() {
      await axios.put('/api/stake', { _id: this.product._id, stake: this.lastStake.stake + 50 });
      this.$store.dispatch('getUserProducts');
      this.$store.dispatch('getAllProducts');
    },
  },
  mounted() {},
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
p {
  margin-bottom: 0px;
}
img {
  max-height: 100px;
}
</style>

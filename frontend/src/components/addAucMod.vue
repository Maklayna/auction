<template>
  <div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{update?'Редактировать лот':'Добавить новый аукцион'}}</h5>
          <button
            @click="$emit('closeModal')"
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form
            v-if="!uploadComplit"
            @submit.prevent="needAction"
            style="display:flex; justify-content:center; width: 400px;"
            key="upload"
          >
            <fieldset>
              <div class="form-group">
                <label for="exampleTextarea">Заголовок</label>
                <input v-model="tag" type="text" class="form-control" rows="3" required />
              </div>
              <div class="form-group">
                <label for="exampleTextarea">Описание</label>
                <textarea
                  v-model="description"
                  ref="discription"
                  class="form-control"
                  id="exampleTextarea"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div class="form-group">
                <label for="exampleTextarea">Дата начала</label>
                <input
                  v-model="startDate"
                  type="date"
                  class="form-control"
                  :min="minStartDate"
                  id="exampleDate"
                  rows="3"
                  required
                  :disabled="update"
                />
              </div>
              <div class="form-group">
                <label for="exampleTextarea">Дата окончания</label>
                <input
                  v-model="endDate"
                  type="date"
                  class="form-control"
                  :min="minEndDate"
                  id="exampleDate"
                  rows="3"
                  required
                />
              </div>
              <div class="form-group">
                <label for="exampleTextarea">Начальная цена</label>
                <input
                  v-model="price"
                  type="number"
                  class="form-control"
                  id="exampleDate"
                  rows="3"
                  required
                  :disabled="update"
                />
              </div>
              <div class="form-group" v-if="!update">
                <label for="exampleInputFile">Загрузите фото</label>
                <input
                  ref="file"
                  type="file"
                  class="form-control-file"
                  id="exampleInputFile"
                  aria-describedby="fileHelp"
                  required
                />
                <small id="fileHelp" class="form-text text-muted">Выберите файл и описание к нему</small>
              </div>

              <button type="submit" class="btn btn-primary">{{update?'Редактировать лот':'Добавить новый аукцион'}}</button>
            </fieldset>
          </form>
          <form @submit.prevent="uploadComplit=false" v-if="uploadComplit" key="uploadComplit">
            <p>Товар успешно добавлен</p>
            <button type="submit" class="btn btn-primary">Добавить еще</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'addAuction',
  data() {
    return {
      uploadComplit: false,
      startDate: '',
      endDate: '',
      description: '',
      price: '',
      tag: '',
    };
  },
  props: ['product', 'update'],
  computed: {
    minStartDate: function() {
      const day = new Date();
      day.setDate(day.getDate() + 1);
      return day.toISOString().slice(0, 10);
    },
    minEndDate: function() {
      const day = new Date();
      day.setDate(day.getDate() + 2);
      return day.toISOString().slice(0, 10);
    },
    needAction: function() {
      if (this.update) {
        return this.updateProduct
      } else {
        return this.addProduct
      }
    }
  },
  methods: {
    async addProduct() {
      console.log(this.$refs.file.files);
      const file = this.$refs.file.files[0];
      const fileName = this.$refs.file.files[0].name;

      const req = new FormData();
      const data = JSON.stringify({
        fileName: fileName,
        description: this.description,
        startDate: this.startDate,
        endDate: this.endDate,
        price: this.price,
        tag: this.tag,
      });
      req.append(fileName, file);
      req.append('data', data);
      await axios.post('/api/products/', req, { withCredentials: true });
      this.$store.dispatch('getUserProducts');
      this.$store.dispatch('getAllProducts');
      this.uploadComplit = true;
    },
    async updateProduct() {
      const data = {
        description: this.description,
        endDate: this.endDate,
        tag: this.tag,
        _id: this.product._id
      };

      await axios.put('/api/products/', data, { withCredentials: true });
      this.$store.dispatch('getUserProducts');
      this.$store.dispatch('getAllProducts');
      this.$emit('closeModal')
    },
  },
  mounted() {
    if (this.update && this.product._id) {
      this.description = this.product.description;
      this.startDate = this.product.startDate.slice(0, 10);
      this.endDate = this.product.endDate.slice(0, 10);
      this.price = this.product.startPrice;
      this.tag = this.product.tag;
    }
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
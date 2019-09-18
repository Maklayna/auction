
<template>
  <div class="d-flex flex-column align-items-center">
    <transition mode="out-in" name="fade">
      <form
        v-if="!uploadComplit"
        @submit.prevent="addProduct"
        style="display:flex; justify-content:center; width: 400px;"
        key="upload"
      >
        <fieldset>
          <div class="form-group">
            <label for="exampleTextarea">Заголовок</label>
            <input
              v-model="tag"
              type="text"
              class="form-control"
              rows="3"
              required
            />
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
            />
          </div>
          <div class="form-group">
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

          <button type="submit" class="btn btn-primary">Добавить аукцион</button>
        </fieldset>
      </form>
      <form @submit.prevent="uploadComplit=false" v-if="uploadComplit" key="uploadComplit">
        <p>Товар успешно добавлен</p>
        <button type="submit" class="btn btn-primary">Добавить еще</button>
      </form>
    </transition>
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
      tag:'',
    };
  },
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
      this.$store.dispatch('getUserProducts')
      this.uploadComplit = true;
    },
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
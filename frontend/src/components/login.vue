<template>
  <form
    class="d-flex flex-row justify-content-center align-items-center w-50"
    @submit.prevent="login"
  >
    <fieldset>
      <legend>Войти</legend>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          v-model="username"
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <p v-if="error" class="mt-2 text-danger">Логин или пароль не верен</p>
    </fieldset>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      password: '',
      error: false,
    };
  },
  methods: {
    login() {
      axios
        .post(
          '/api/login/',
          {
            username: this.username,
            password: this.password,
          },
          { withCredentials: true },
        )
        .then(res => {
          this.$store.commit('set_user', res.data);
          this.$store.dispatch('getUserProducts')
          this.$store.dispatch('getAllProducts')
          this.$router.replace('/');
        })
        .catch(err => {
          this.error = true;
        });
    },
  },
};
</script>

<style >
</style>
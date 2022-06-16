<template>
  <div>
    <div><input v-model="email" placeholder="email" type="email" /></div>
    <div>
      <input v-model="password" placeholder="password" type="password" />
    </div>
    <div><button @click="login">Login</button></div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      console.log({ email: this.email, password: this.password });
      await this.$store.dispatch("auth/login", {
        data: {
          username: this.email,
          password: this.password,
        },
      });
      await this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>

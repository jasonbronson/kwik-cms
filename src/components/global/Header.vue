<template>
  <div class="header-wrapper">
    <header class="user-info">
      <span class="username"> {{ displayUserName }} </span>

      <button
        @click="logout"
        class="rounded px-4 py-2 bg-primary-400 text-gray-100 hover:bg-primary-500 duration-300 text-sm"
      >
        Logout
      </button>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    displayUserName() {
      return localStorage.getItem("email") || "";
    },
  },
  methods: {
    logout(event) {
      event.preventDefault();
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.header-wrapper {
  position: sticky;
  top: 0;
  background: #fff;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: 100;
  height: 50px;
  border-bottom: 1px dotted rgba(200, 200, 200, 1);
}
.user-info {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  .username {
    margin: 0 25px;
  }
}
</style>

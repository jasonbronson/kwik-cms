<template>
  <div class="header-wrapper">
    <div v-if="this.$route.path === '/posts'">
      <header class="post flex items-center h-full">
        <div class="text-sm">29 days left in trial</div>
        <div class="px-4">
          <button
            class="rounded px-4 py-2 bg-gray-600 text-gray-100 hover:bg-gray-700 duration-300 text-sm"
          >
            Subscibe
          </button>
        </div>
        <div class="">
          <button
            class="rounded px-4 py-2 bg-gray-600 text-gray-100 hover:bg-gray-700 duration-300 text-sm"
          >
            Production
          </button>
        </div>
      </header>
    </div>

    <header class="user-info">
      <span class="username"> {{ displayUserName }}</span>

      <button
        @click="logout"
        class="rounded px-4 py-2 bg-gray-600 text-gray-100 hover:bg-gray-700 duration-300 text-sm"
      >
        Logout
      </button>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
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

<template>
  <div class="error-page">
    <div class="error">
      <div class="title">Item Not Found</div>
      <p class="description">
        <router-link class="error-link" to="/">Home</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
};
</script>

<style scoped>
.error-page .error {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.error-page .title {
  margin-top: 15px;
  margin-bottom: 8px;
  font-size: 1.5rem;
  color: #47494e;
}
.error-page .description {
  margin-bottom: 10px;
  line-height: 21px;
  color: #7f828b;
}
.error-page a {
  color: #7f828b !important;
  text-decoration: none;
}
.error-page .logo {
  position: fixed;
  bottom: 12px;
  left: 12px;
}
</style>

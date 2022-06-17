<template>
  <keep-alive>
    <component v-bind:is="layout" class="tab">
      <router-view />
    </component>
  </keep-alive>
</template>
<script>
import DefaultLayout from "./layouts/default.vue";
import NoLoginLayout from "./layouts/nologin.vue";

require("./plugins");

export default {
  name: "App",
  components: {
    DefaultLayout,
    NoLoginLayout,
  },
  computed: {
    layout() {
      return this.$route.meta.layout || "default-layout";
    },
  },
};
</script>
<style></style>

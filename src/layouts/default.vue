<template>
  <div>
    <div class="main-wrapper">
      <Sidebar />
      <div class="content-wrapper" style="width: 100%">
        <Header />
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/global/Sidebar";
import Header from "@/components/global/Header";
export default {
  name: "default",
  components: {
    Sidebar,
    Header,
  },
};
</script>

<style scoped>
.main-wrapper {
  display: flex;
  width: 100%;
}
.content-wrapper {
  width: 100%;
}
</style>

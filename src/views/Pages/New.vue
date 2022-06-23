<template>
  <PageEdit @publish="addPage" />
</template>

<script>
import PageEdit from "@/components/Pages/PageEdit";

export default {
  name: "New",
  components: { PageEdit },
  data() {
    return {};
  },
  methods: {
    async addPage(page) {
      try {
        await this.$store.dispatch("pages/addPage", { page });
        await this.$router.push("/pages");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped></style>

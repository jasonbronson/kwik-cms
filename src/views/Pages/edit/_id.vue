<template>
  <PageEdit @publish="updatePage" :page="currentPage" />
</template>

<script>
import PageEdit from "@/components/Pages/PageEdit";
import { mapState } from "vuex";

export default {
  name: "EditPage",
  components: { PageEdit },
  async mounted() {
    await this.$store.dispatch("pages/fetchPageById", {
      id: this.$route.params.id,
    });
  },
  computed: {
    ...mapState({
      currentPage: (state) => state.pages.currentPage,
    }),
  },
  methods: {
    async updatePage(page) {
      await this.$store.dispatch("pages/updatePage", { page });
      await this.$router.push("/pages");
    },
  },
};
</script>

<style scoped></style>

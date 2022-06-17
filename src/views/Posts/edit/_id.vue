<template>
  <PostEdit @publish="updatePost" :post="currentPost" />
</template>

<script>
import PostEdit from "@/components/Posts/PostEdit";
import { mapState } from "vuex";

export default {
  name: "EditPost",
  components: { PostEdit },
  async mounted() {
    await this.$store.dispatch("posts/fetchPostById", {
      id: this.$route.params.id,
    });
  },
  computed: {
    ...mapState({
      currentPost: (state) => state.posts.currentPost,
    }),
  },
  methods: {
    async updatePost(post) {
      await this.$store.dispatch("posts/updatePost", { post });
      await this.$router.push("/posts");
    },
  },
};
</script>

<style scoped></style>

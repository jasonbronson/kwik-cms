<template>
  <PostEdit @publish="addPost" />
</template>

<script>
import PostEdit from "@/components/Posts/PostEdit";

export default {
  name: "New",
  components: { PostEdit },
  data() {
    return {};
  },
  methods: {
    async addPost(post) {
      try {
        await this.$store.dispatch("posts/addPost", { post });
        await this.$router.push("/posts");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped></style>

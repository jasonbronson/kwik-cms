<template>
  <div class="font-sans text-black min-h-screen bg-primary-600 py-10 px-32">
    <div class="flex items-center justify-between gap-3">
      <router-link to="/posts">
        <i class="fas fa-angle-left cursor-pointer"></i>
      </router-link>
      <input
        placeholder="Title"
        class="bg-transparent flex-grow outline-none font-bold text-xl ml-3"
        v-model="editData.title"
      />

      <button
        class="shadow rounded px-4 py-2 bg-primary-400 text-gray-100 hover:bg-primary-500 hover:text-action-500 font-bold duration-300 text-sm"
        @click="publishPost"
      >
        Publish
      </button>
      <button
        class="shadow rounded px-4 py-2 bg-white text-primary-500 font-bold duration-300 text-sm hover:border-primary-500 border"
        @click="saveDraft"
      >
        Save Draft
      </button>
    </div>
    <div class="mt-10">
      <div>
        <Metadata :post="post" @handleMetaDataChange="handleChildDataChange" />
      </div>
    </div>
  </div>
</template>

<script>
import Metadata from "@/components/Posts/Metadata";

export default {
  name: "PostEdit",
  components: { Metadata },
  data() {
    return {
      editData: { title: "", content: "" },
    };
  },
  props: {
    post: {
      default: () => {},
    },
  },
  methods: {
    async publishPost() {
      try {
        await this.$emit("publish", { ...this.editData, status: "publish" });
      } catch (e) {
        console.log(e);
      }
    },
    async saveDraft() {
      try {
        await this.$emit("publish", { ...this.editData, status: "draft" });
      } catch (e) {
        console.log(e);
      }
    },
    handleChildDataChange(value) {
      this.editData = { ...this.editData, ...value };
    },
  },
  watch: {
    post(value) {
      this.editData = value;
    },
  },
};
</script>

<style scoped></style>

<template>
  <div class="font-sans text-black min-h-screen bg-primary-600 p-10">
    <div class="flex items-center gap-3">
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
      <editor
        ref="tm"
        v-model="editData.content"
        :api-key="$editorApiKey"
        :init="$editorSettings"
      />
    </div>
    <div class="bg-white rounded mt-10 shadow">
      <div class="flex">
        <div class="w-1/2 text-center py-3">
          <i class="fas fa-file mr-2"></i>
          <span>Metadata</span>
        </div>
        <div class="w-1/2 text-center py-3 bg-primary-100">
          <i class="fas fa-search mr-2"></i>
          <span>SEO</span>
        </div>
      </div>
      <div>
        <Metadata :post="post" @handleMetaDataChange="handleChildDataChange" />
      </div>
    </div>
  </div>
</template>

<script>
import Metadata from "@/components/Posts/Metadata";
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "PostEdit",
  components: { Metadata, Editor },
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
        await this.$emit("publish", {...this.editData, status: "publish"});
      } catch (e) {
        console.log(e);
      }
    },
    async saveDraft() {
      try {
        await this.$emit("publish", {...this.editData, status: "draft"});
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

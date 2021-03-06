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
        @click="savePost('publish')"
      >
        Publish
      </button>
      <button
        class="shadow rounded px-4 py-2 bg-white text-primary-500 font-bold duration-300 text-sm hover:border-primary-500 border"
        @click="savePost('draft')"
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
import { mapState } from "vuex";

export default {
  name: "PostEdit",
  components: { Metadata },
  data() {
    return {
      editData: { title: "", content: "" },
      valueCates: [],
      valueTags: []
    };
  },
  props: {
    post: {
      default: () => {},
    },
  },
  computed: {
    ...mapState({
      listCategories: (state) => state.categories.categoriesList,
      listTags: (state) => state.tags.tagsList,
    }),
  },
  async mounted() {
    await this.$store.dispatch("tags/fetchAndSetTags");
    await this.$store.dispatch("categories/fetchAndSetCategories");
  },
  methods: {
    async savePost(status) {
      // add new categories on submit
      await Promise.all(this.valueCates.map(async(item) => {
        item = item.trim()
        const checkValue = obj => obj.name === item;
        if (!this.listCategories.some(checkValue)) {
          await this.$store.dispatch("categories/createCategory", {
            name: item,
          });
        }
        return item
      })).then(value => this.valueCates = value)
      await this.$store.dispatch("categories/fetchAndSetCategories");
      this.editData.Categories = this.listCategories
        .filter((i) => this.valueCates.includes(i.name))
        .map((j) => ({ id: j.id }));

      // add new tags on submit
      await Promise.all(this.valueTags.map(async(item) => {
        item = item.trim()
        const checkValue = obj => obj.name === item;
        if (!this.listTags.some(checkValue)) {
          await this.$store.dispatch("tags/createTag", {
            name: item,
          });
        }
        return item
      })).then(value => this.valueTags = value)
      await this.$store.dispatch("tags/fetchAndSetTags");
      this.editData.Tags = this.listTags
        .filter((i) => this.valueTags.includes(i.name))
        .map((j) => ({ id: j.id }));

      // update post
      await this.$emit("publish", { ...this.editData, status: status });
    },
    handleChildDataChange(value) {
      if (value.type == "cate") {
        this.valueCates = value.data
      } else if (value.type == "tag") {
        this.valueTags = value.data
      } else {
        this.editData = { ...this.editData, ...value };
      }
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

<template>
  <div>
    <div class="border rounded overflow-hidden flex">
      <input
        type="text"
        class="px-4 py-2"
        :placeholder="placeholder"
        v-model="searchString"
        @change="handleChange"
        v-on:keyup.enter="handleSeachString"
      />
      <button
        class="flex items-center justify-center px-4 border-l bg-primary-400"
        @click="handleSeachString"
      >
        <svg
          class="h-4 w-4 text-white"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
          />
        </svg>
      </button>
    </div>
    <!--  -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchString: "",
    };
  },
  computed: {},
  props: {
    placeholder: {
      type: String,
      default: "Search for dynamic groups",
    },
    value: {
      type: String,
      default: "",
    },
  },
  watch: {
    value(initString) {
      this.searchString = initString;
    },
  },
  methods: {
    handleChange() {
      this.$emit("input", this.searchString);
    },
    handleSeachString() {
      this.$emit("search", this.searchString);
    },
  },
};
</script>
<style scoped></style>

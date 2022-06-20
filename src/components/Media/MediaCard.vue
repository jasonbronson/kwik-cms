<template>
  <div class="px-4">
    <div class="w-full flex bg-white items-center justify-between py-4 px-4">
      <div class="flex justify-start items-center">
        <div class="w-32 mr-6">
          <img
            class="rounded shadow-md"
            :src="url"
            alt=""
          />
        </div>
        <div class="w-12 text-lg text-blue-300">
          <span>{{ name }}</span>
        </div>
      </div>
      <div class="flex text-primary-200 items-center">
        <div class="flex flex-col items-center justify-center px-4">
          <i class="fa-solid fa-link"></i>
          <span>Copy URL</span>
        </div>
        <div class="px-4 flex items-center border-l">
          <span>Created on {{ createdAt | moment("MMM DD, YYYY") }}</span>
        </div>
        <div class="flex flex-col items-center justify-center px-4 border-l">
          <i class="fa-solid fa-file-image text-4xl"></i>
          <span>IMAGE</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MediaCard",
  props: {
    url: {
      type: String,
      default: "",
    },
    createdAt: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped></style>

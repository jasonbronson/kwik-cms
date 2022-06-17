<template>
  <div class="px-4 mb-2">
    <div class="w-full flex bg-white items-center justify-between py-4 px-4">
      <div class="flex justify-start items-center">
        <input
          class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-6 cursor-pointer"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <div class="w-32 mr-6">
          <img
            class="rounded shadow-md"
            src="https://source.unsplash.com/random/1280x720"
            alt=""
          />
        </div>
        <div class="w-12">
          <div
            class="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-gray-500 text-xl text-white"
          >
            <img
              src="http://source.unsplash.com/100x100/?girl"
              class="rounded-full"
            />
          </div>
        </div>
        <router-link :to="`/posts/edit/${id}`" class="text-sm ml-6">{{
          title
        }}</router-link>
      </div>
      <div class="flex justify-end">
        <button
          type="button"
          class="text-emerald-400 bg-green-100 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {{ createdAt | moment("MMM DD, YYYY") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListSinglePost",
  props: {
    title: {
      type: String,
      default: "",
    },
    createdAt: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped></style>

<template>
  <div class="font-sans text-black min-h-screen bg-primary-600 px-10">
    <div class="flex justify-between py-8 items-center">
      <div class="flex items-center">
        <div class="text-primary-400 mr-4">Custom Fields</div>
        <div class="border rounded overflow-hidden flex">
          <input type="text" class="px-4 py-2" placeholder="Search..." />
          <button
            class="flex items-center justify-center px-4 border-l bg-primary-400"
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
      </div>
      <router-link to="/custom-fields/new">
        <button
          class="rounded px-4 py-2 bg-primary-400 text-gray-100 hover:bg-primary-500 duration-300 text-sm"
        >
          Add New
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
};
</script>

<style scoped></style>

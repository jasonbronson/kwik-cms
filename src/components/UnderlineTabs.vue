<template>
  <div class="items-center justify-between flex text-sm px-4">
    <div class="flex items-center">
      <div class="bg-white px-4 border-solid border-2 rounded mr-2">
        <ul
          class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400"
        >
          <li
            class="mr-2"
            v-for="(tabData, index) in data"
            :key="index"
            @click="changeTab(tabData)"
          >
            <div
              href="#"
              class="cursor-pointer inline-flex items-center gap-2 p-4 rounded-t-lg border-b-2 border-transparent group"
              :class="[
                {
                  'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500 group':
                    isCurrentTab(tabData),
                },
                {
                  'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                    !isCurrentTab(tabData),
                },
              ]"
            >
              <span class="text-base"><i :class="tabData.icon"></i></span>
              <span>{{ tabData.title }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="mr-2">
        <div class="dropdown inline-block relative">
          <button
            class="bg-white text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
          >
            <span class="mr-1">Author</span>
            <svg
              class="fill-current h-4 w-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </button>
          <ul class="dropdown-menu absolute hidden text-gray-700 pt-2">
            <li class="">
              <a
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                href="#"
                >One</a
              >
            </li>
            <li class="">
              <a
                class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                href="#"
                >Two</a
              >
            </li>
            <li class="">
              <a
                class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                href="#"
                >Three is the magic number</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div class="dropdown inline-block relative">
          <button
            class="bg-white text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
          >
            <span class="mr-1">Categories</span>
            <svg
              class="fill-current h-4 w-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </button>
          <ul class="dropdown-menu absolute hidden text-gray-700 pt-2">
            <li class="">
              <a
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                href="#"
                >One</a
              >
            </li>
            <li class="">
              <a
                class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                href="#"
                >Two</a
              >
            </li>
            <li class="">
              <a
                class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                href="#"
                >Three is the magic number</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="w-1/6 flex justify-end tex-primary-500">Export All Posts</div>
  </div>
</template>

<script>
export default {
  name: "UnderlineTab",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    if (
      this.data.length > 0 &&
      !this.data.find((tab) => tab.title == this.value.title)
    ) {
      this.changeTab(this.data[0]);
    }
  },
  methods: {
    isCurrentTab(tabData) {
      return tabData.title == this.value.title;
    },
    changeTab(tabData) {
      this.$emit("input", tabData);
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>

<template>
  <div class="mr-2">
    <div class="dropdown inline-block relative">
      <button
        class="shadow bg-white text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
      >
        <span class="mr-1">{{ title }}</span>
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
      <ul class="hidden dropdown-menu absolute text-gray-700">
        <div class="shadow rounded bg-white w-40">
          <li class="p-1" v-for="(option, index) in options" :key="index">
            <div
              class="cursor-pointer rounded hover:bg-primary-300 py-1 px-4"
              href="#"
            >
              <div class="flex gap-2">
                <img
                  v-if="option.img"
                  :src="option.img"
                  alt="profile pic"
                  class="w-5 h-5 rounded-full object-cover"
                />
                <span>{{ option.name }}</span>
              </div>
            </div>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropDown",
  props: {
    title: {
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}
.dropdown-menu {
  padding-top: 15px;
}
.dropdown-menu::after {
  content: "";
  position: absolute;
  top: 0px;
  left: 30px;
  margin-left: -8px;
  border-width: 8px;
  border-style: solid;
  border-color: white transparent transparent transparent;
  transform: rotate(180deg);
}
</style>

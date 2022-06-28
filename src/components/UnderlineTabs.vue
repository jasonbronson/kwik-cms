<template>
  <div class="items-center justify-between flex text-sm">
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
              class="cursor-pointer inline-flex items-center gap-2 p-2 rounded-t-lg border-b-2 border-transparent group"
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
    </div>
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

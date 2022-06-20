<template>
  <ul
    class="text-xs sm:text-sm text-primary-200 flex justify-start w-full h-full items-center"
  >
    <li
      class="border-l border-r border-primary-100 cursor-pointer px-4 py-2 w-full h-full flex items-center"
      v-for="(tabData, i) in data"
      :key="i"
      :class="{
        'bg-primary-700 text-white border-0': isCurrentTab(tabData),
      }"
      @click="changeTab(tabData)"
    >
      {{ tabData.title }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "vue-tabz",
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

<style></style>

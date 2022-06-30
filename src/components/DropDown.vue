<template>
  <div>
    <select
      class="w-full border-solid border-2 rounded h-10 px-4 bg-white p-2"
      v-model="selectedValue"
    >
      <option v-for="(option, i) in options" :key="i" :value="option.id">
        {{ option.label }}
      </option>
    </select>
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
  data() {
    return {
      selectedValue: "",
    };
  },
  watch: {
    selectedValue(value) {
      this.$emit("selectDropdown", value);
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

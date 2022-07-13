<template>
  <div>
    <div class="mr-20">
      <div class="flex items-center gap-3 text-sm">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="shadow bg-white px-4 py-2 rounded cursor-pointer"
          :class="item.style"
          @click="handleAction(item.id)"
        >
          <i class="mr-2" :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnderlineTab",
  components: {},
  data() {
    return {
      deleteUserConfirm: false,
      deleteUserConfirmPage: false,
      publishConfirm: false,
      publishConfirmPage: false,
      isShowSchedule: false,
      isShowSchedulePage: false,
    };
  },
  displayUserName() {
    return localStorage.getItem("email") || "";
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      default: () => {},
    },
    isDeletePost: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (
      this.data.length > 0 &&
      !this.data.find((tab) => tab.title == this.value.title)
    ) {
      this.handleDelete(this.data[0]);
    }
  },
  methods: {
    isCurrentTab(tabData) {
      return tabData.title == this.value.title;
    },
    handleAction(value) {
      this.$emit("clickAction", value)
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

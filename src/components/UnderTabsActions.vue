<template>
  <div>
    <div class="mr-20">
      <div class="flex items-center gap-3 text-sm">
        <div
          class="shadow bg-white px-4 py-2 rounded cursor-pointer text-green-600"
          @click="handlePublish"
        >
          <i class="fas fa-check mr-2"></i>
          <span>Publish</span>
        </div>
        <div
          class="shadow bg-white px-4 py-2 rounded cursor-pointer text-gray-600"
          @click="handleSchedule"
        >
          <i class="fas fa-clock mr-2"></i>
          <span>Schedule</span>
        </div>
        <div
          class="shadow bg-white px-4 py-2 rounded cursor-pointer text-red-600"
          @click="handleDelete"
        >
          <i class="fal fa-trash-alt mr-2"></i>
          <span>Delete</span>
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
    postSelected: {
      type: Object,
      default: () => {},
    },
    pageSelected: {
      type: Object,
      default: () => {},
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
    // showPopup(item) {

    // },
    isCurrentTab(tabData) {
      return tabData.title == this.value.title;
    },
    handleDelete() {
      if (this.postSelected) {
        this.$emit("clickDeletePost", true);
        this.deleteUserConfirm = true;
      } else if (this.pageSelected) {
        this.$emit("clickDeletePage", true);
        this.deleteUserConfirmPage = true;
      } else {
        this.deleteUserConfirmPage = false;
      }
    },
    handlePublish() {
      if (this.postSelected) {
        this.$emit("clickPublishConfirm", true);
        this.publishConfirm = true;
      } else if (this.pageSelected) {
        this.$emit("clickPublishConfirmPage", true);
        this.publishConfirmPage = true;
      } else {
        this.publishConfirmPage = true;
      }
    },
    handleSchedule() {
      if (this.postSelected) {
        this.$emit("clickSchedulePost", true);
        this.isShowSchedule = true;
      } else if (this.pageSelected) {
        this.$emit("clickSchedulePage", true);
        this.isShowSchedulePage = true;
      } else {
        this.isShowSchedulePage = false;
      }
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

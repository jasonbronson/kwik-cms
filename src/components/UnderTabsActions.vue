<template>
  <div>
    <are-you-sure
      v-if="deleteUserConfirm"
      @yes="deleteUser"
      @no="deleteUserConfirm = false"
      text="Do you want to delete the item?"
    ></are-you-sure>
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
import AreYouSure from "../components/global/AreYouSure.vue";
export default {
  name: "UnderlineTab",
  components: {
    AreYouSure,
  },
  data() {
    return {
      deleteUserConfirm: false,
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
      this.deleteUserConfirm = true;
    },
    async deleteUser() {
      try {
        this.loading = true;
        await this.$store.dispatch("posts/deletePost", this.postSelected.id);
        this.deleteUserConfirm = false;
        // this.$router.push("/users");
      } catch (error) {
        console.log(error);
      }
    },
    async handlePublish() {
      console.log("handlePublish");

      await this.$store.dispatch("posts/updatePublish", {
        postId: this.postSelected.id,
        publish_date: this.postSelected.publish_date,
      });
    },
    handleSchedule() {
      console.log("handleSchedule", this.postSelected);
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

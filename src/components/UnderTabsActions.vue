<template>
  <div>
    <are-you-sure
      v-if="deleteUserConfirm"
      @yes="deleteUser"
      @no="deleteUserConfirm = false"
      text="Do you want to delete the item?"
    ></are-you-sure>
    <are-you-sure
      v-if="deleteUserConfirmPage"
      @yes="deletePage"
      @no="deleteUserConfirmPage = false"
      text="Do you want to delete the item?"
    ></are-you-sure>
    <div v-if="this.postSelected">
      <are-you-sure
        v-if="publishConfirm"
        @yes="publishPost"
        @no="publishConfirm = false"
        text="Do you want to publish this item?"
      ></are-you-sure>
    </div>
    <div v-if="this.pageSelected">
      <are-you-sure
        v-if="publishConfirmPage"
        @yes="publishPage"
        @no="publishConfirmPage = false"
        text="Do you want to publish this item?"
      ></are-you-sure>
    </div>
    <div v-if="this.postSelected">
      <popup-schedule
        v-if="isShowSchedule"
        @yes="isShowSchedule = false"
        text="Schedule of item"
        :info="this.postSelected.publish_date"
      ></popup-schedule>
    </div>
    <div v-if="this.pageSelected">
      <popup-schedule
        v-if="isShowSchedulePage"
        @yes="isShowSchedulePage = false"
        text="Schedule of item"
        :info="this.pageSelected.publish_date"
      ></popup-schedule>
    </div>
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
import PopupSchedule from "../components/global/PopupSchedule.vue";
export default {
  name: "UnderlineTab",
  components: {
    AreYouSure,
    PopupSchedule,
  },
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
        this.deleteUserConfirm = true;
      } else if (this.pageSelected) {
        this.deleteUserConfirmPage = true;
      } else {
        this.deleteUserConfirmPage = false;
      }
    },

    async deletePage() {
      try {
        this.loading = true;
        console.log("========", this.pageSelected.id);
        await this.$store.dispatch("pages/deletePage", this.pageSelected.id);
        this.deleteUserConfirmPage = false;
        // this.$router.push("/users");
        this.$store.dispatch("pages/fetchAllPages");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser() {
      try {
        this.loading = true;
        await this.$store.dispatch("posts/deletePost", this.postSelected.id);
        this.deleteUserConfirm = false;
        // this.$router.push("/users");
        this.$store.dispatch("posts/fetchAllPosts");
      } catch (error) {
        console.log(error);
      }
    },
    handlePublish() {
      console.log("handlePublish");

      if (this.postSelected) {
        this.publishConfirm = true;
      } else if (this.pageSelected) {
        this.publishConfirmPage = true;
      } else {
        this.publishConfirmPage = true;
      }
    },
    async publishPost() {
      await this.$store.dispatch("posts/updatePost", {
        post: {
          id: this.postSelected.id,
          publish_date: new Date(),
          status: "publish",
        },
      });
      this.publishConfirm = false;
    },
    async publishPage() {
      await this.$store.dispatch("pages/updatePage", {
        page: {
          id: this.pageSelected.id,
          publish_date: new Date(),
          status: "publish",
        },
      });
      this.publishConfirmPage = false;
    },
    handleSchedule() {
      this.isShowSchedule = true;
      console.log("handleSchedule", this.postSelected);

      if (this.postSelected) {
        this.isShowSchedule = true;
      } else if (this.pageSelected) {
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

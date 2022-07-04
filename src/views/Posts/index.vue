<template>
  <div class="">
    <div class="">
      <div class="font-sans text-black min-h-screen bg-primary-600 px-10">
        <div class="flex justify-between py-8 items-center">
          <div class="flex items-center">
            <div class="text-primary-400 mr-4">Blog Posts</div>
            <KwikSearchInput
              @search="handlePostsSearch"
              placeholder="Search posts..."
            />
          </div>
          <router-link to="/posts/new">
            <button
              class="rounded px-4 py-2 bg-primary-400 text-gray-100 hover:bg-primary-500 duration-300 text-sm"
            >
              New Post
            </button>
          </router-link>
        </div>
        <!--  -->
        <div class="flex items-center">
          <UnderlineTabs
            v-if="!isDeletePost"
            :data="BlogTabs"
            v-model="currentBlogTab"
            @input="handleTabChange"
          />
          <UnderTabsActions
            v-else
            @clickDeleteItem="handleDeletePost"
            @clickPublishItem="handlePublishConfirm"
            @clickScheduleItem="handleSchedulePost"
            :isDeletePost="isDeletePost"
            :data="ActionPostTabs"
            v-model="currentActionTab"
            @input="handleTabActionChange"
            :itemSelected="postSelected"
          />
          <DropDown
            :options="authorsOptions"
            @selectDropdown="filterAuthor"
            class="mr-2"
          />
          <DropDown
            :options="categoriesOption"
            @selectDropdown="filterCategory"
          />
          <div class="flex-grow text-right flex justify-end tex-primary-500">
            Export All Posts
          </div>
        </div>

        <div class="mt-5">
          <ListItem
            @click="goToEvent"
            v-for="(post, index) in posts"
            :key="index"
            :title="post.title"
            :publishDate="post.publish_date"
            :id="post.id"
            :item="post"
            :title-to="`/posts/edit/${post.id}`"
            :checked="postSelected.id == post.id"
            postImg="https://source.unsplash.com/random/1280x720"
          />
        </div>
        <!--  -->
      </div>
    </div>
    <are-you-sure
      v-if="deleteUserConfirm"
      @yes="deleteUser"
      @no="deleteUserConfirm = false"
      text="Do you want to delete the item?"
    ></are-you-sure>
    <are-you-sure
      v-if="publishConfirm"
      @yes="publishPost"
      @no="publishConfirm = false"
      text="Do you want to Publish the item?"
    ></are-you-sure>
    <popup-schedule
      v-if="isShowSchedule"
      @no="isShowSchedule = false"
      @setSchedule="setSchedule"
    ></popup-schedule>
  </div>
</template>
<script>
import UnderlineTabs from "@/components/UnderlineTabs";
import UnderTabsActions from "@/components/UnderTabsActions";
import KwikSearchInput from "../../components/global/KwikSearchInput.vue";
import ListItem from "@/components/ListItem";
import { mapState } from "vuex";
import DropDown from "@/components/DropDown";
import AreYouSure from "../../components/global/AreYouSure.vue";
import PopupSchedule from "../../components/global/PopupSchedule.vue";
var qs = require("qs");
export default {
  components: {
    DropDown,
    ListItem,
    UnderlineTabs,
    UnderTabsActions,
    KwikSearchInput,
    AreYouSure,
    PopupSchedule,
  },
  data() {
    return {
      BlogTabs: [
        {
          title: "All",
          id: "all",
          icon: "fas fa-user-circle",
        },
        {
          title: "Draft",
          id: "draft",
          icon: "fa-solid fa-pen",
        },
        {
          title: "Published",
          id: "published",
          icon: "fa-solid fa-check",
        },
        {
          title: "Scheduled",
          id: "scheduled",
          icon: "fa-solid fa-clock",
        },
      ],
      ActionPostTabs: [
        {
          title: "Publish",
          id: "publish",
          icon: "fa-solid fa-check",
        },
        {
          title: "Schedule",
          id: "schedule",
          icon: "fa-solid fa-clock",
        },
        {
          title: "Delete",
          id: "delete",
          icon: "fa-solid fa-trash",
        },
      ],
      deleteUserConfirm: false,
      publishConfirm: false,
      isDeletePost: false,
      isShowSchedule: false,
      currentBlogTab: {},
      postSelected: {},
      currentActionTab: {
        title: "Delete",
        id: "delete",
        icon: "fa-solid fa-trash",
      },
      password: "",
      filters: [],
    };
  },

  computed: {
    ...mapState({
      posts: (state) => state.posts.posts,
      loading: (state) => state.posts.loading,
      usersList: (state) => state.users.usersList,
      categories: (state) => state.categories.categoriesList,
    }),
    authorsOptions() {
      if (this.usersList.length > 0) {
        var list = this.usersList.map((el) => {
          return {
            label: `${el.first_name} ${el.last_name}`,
            img: "https://source.unsplash.com/random/1280x720",
            id: el.id,
          };
        });
        list.unshift({
          label: "All Authors",
          id: "",
          img: "",
        });
        return list;
      }
      return [
        {
          label: "Empty",
          id: "",
          img: "",
        },
      ];
    },
    categoriesOption() {
      if (this.usersList.length > 0) {
        var list = this.categories.map((el) => {
          return {
            label: el.name,
            id: el.id,
          };
        });
        list.unshift({
          label: "All Categories",
          id: "",
        });
        return list;
      }
      return [
        {
          label: "Empty",
          id: "",
        },
      ];
    },
  },
  methods: {
    async deleteUser() {
      try {
        this.loading = true;
        await this.$store.dispatch("posts/deletePost", this.postSelected.id);
        this.deleteUserConfirm = false;
        this.isDeletePost = false;
        this.postSelected = {};
        // this.$router.push("/users");
        this.$store.dispatch("posts/fetchAllPosts");
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    handleDeletePost(value) {
      this.deleteUserConfirm = value;
    },
    handleTabChange(selectedValue) {
      this.currentBlogTab = selectedValue;
      this.addFilter({ status: selectedValue.id });
    },
    handleTabActionChange(selectedValue) {
      this.currentActionTab = selectedValue;
    },
    goToEvent(value) {
      if (value) {
        this.isDeletePost = true;
        this.postSelected = value;
      } else {
        this.isDeletePost = false;
      }
    },
    handlePostsSearch(newString) {
      console.log("ok posts");
      if (newString && newString.length < 3) {
        return;
      }
      this.addFilter({ title: newString });
    },
    getQuery() {
      var obj = this.filters.reduce((r, c) => Object.assign(r, c), {});
      return qs.stringify(obj, { delimiter: "&" });
    },
    addFilter(object) {
      const index = this.filters.findIndex((o) => {
        return Object.keys(o)[0] === Object.keys(object)[0];
      });
      if (!Object.values(object)[0] && index != -1) {
        this.filters.splice(index, 1);
      } else if (index == -1) {
        this.filters.push(object);
      } else {
        this.filters[index] = object;
      }
      this.fetchData();
    },
    fetchData() {
      this.$store.dispatch("posts/fetchAllPosts", this.getQuery());
    },
    filterAuthor(value) {
      this.addFilter({ author: value });
    },
    filterCategory(value) {
      this.addFilter({ category: value });
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
      this.isDeletePost = false;
      this.postSelected = {};
      this.$store.dispatch("posts/fetchAllPosts");
    },
    async setSchedule(date) {
      await this.$store.dispatch("posts/updatePost", {
        post: {
          id: this.postSelected.id,
          publish_date: date,
        },
      });
      this.isShowSchedule = false;
      this.isDeletePost = false;
      this.postSelected = {};
      this.$store.dispatch("posts/fetchAllPosts");
    },
    handlePublishConfirm(value) {
      this.publishConfirm = value;
    },
    handleSchedulePost(value) {
      this.isShowSchedule = value;
    },
  },
  mounted() {
    this.$store.dispatch("users/fetchAndSetUsers");
    this.$store.dispatch("posts/fetchAllPosts");
    this.$store.dispatch("categories/fetchAndSetCategories");
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300&display=swap");

/* Styles */
body {
  background: "#efefed";
  font-family: "Roboto", sans-serif;
  letter-spacing: 1px;
}
</style>

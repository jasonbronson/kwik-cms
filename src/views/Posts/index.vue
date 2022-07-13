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
            @clickAction="handleAction"
            :isDeletePost="isDeletePost"
            :data="ActionPostTabs"
            v-model="currentActionTab"
            @input="handleTabActionChange"
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
          <div class="flex-grow text-right flex justify-end text-primary-500">
            Export All Posts
          </div>
        </div>

        <div class="mt-5" :key="key">
          <ListItem
            @click="clickItem"
            v-for="(post, index) in posts"
            :key="index"
            :title="post.title"
            :publishDate="post.publish_date"
            :id="post.id"
            :item="post"
            :title-to="`/posts/edit/${post.id}`"
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
          style: "text-green-600",
        },
        {
          title: "Schedule",
          id: "schedule",
          icon: "fa-solid fa-clock",
          style: "text-gray-600",
        },
        {
          title: "Delete",
          id: "delete",
          icon: "fa-solid fa-trash",
          style: "text-red-600",
        },
      ],
      deleteUserConfirm: false,
      publishConfirm: false,
      isDeletePost: false,
      isShowSchedule: false,
      currentBlogTab: {},
      postSelected: [],
      currentActionTab: {
        title: "Delete",
        id: "delete",
        icon: "fa-solid fa-trash",
      },
      password: "",
      filters: [],
      key: 0
    };
  },

  computed: {
    ...mapState({
      posts: (state) => {
        var temp =  state.posts.posts.map(item => {
          item.check = false
          return item
        })
        return temp
      },
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
        for (var p of this.postSelected) {
          await this.$store.dispatch("posts/deletePost", p.id);
        }
        this.reset()
      } catch (error) {
        console.log(error);
      }
    },
    handleTabChange(selectedValue) {
      this.currentBlogTab = selectedValue;
      this.addFilter({ status: selectedValue.id });
    },
    handleTabActionChange(selectedValue) {
      this.currentActionTab = selectedValue;
    },
    clickItem(value) {
      if (value.check) {
        this.postSelected.push(value)
      } else {
        this.postSelected = this.postSelected.filter(item => item.id != value.id)
      }
      this.isDeletePost = this.postSelected.length > 0
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
      for (var p of this.postSelected) {
        await this.$store.dispatch("posts/updatePost", {
          post: {
            id: p.id,
            publish_date: new Date(),
            status: "publish",
          },
        });
      }
      this.reset()
    },
    async setSchedule(date) {
      for (var p of this.postSelected) {
        await this.$store.dispatch("posts/updatePost", {
          post: {
            id: p.id,
            publish_date: date,
          },
        });
      }
      this.reset()
    },
    handleAction(value) {
      console.log("value", value)
      switch(value) {
        case "publish":
          this.publishConfirm = true;
          break;
        case "schedule":
          this.isShowSchedule = true;
          break;
        case "delete":
          this.deleteUserConfirm = true;
          break;
      }
    },
    reset() {
      this.isShowSchedule = false;
      this.publishConfirm = false;
      this.deleteUserConfirm = false;
      this.isDeletePost = false;
      this.postSelected = [];
      this.$store.dispatch("posts/fetchAllPosts");
      this.key++
    }
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

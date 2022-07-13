<template>
  <div class="">
    <div class="">
      <div class="font-sans text-black min-h-screen bg-primary-600 px-10">
        <div class="flex justify-between py-8 items-center">
          <div class="flex items-center">
            <div class="text-primary-400 mr-4">Page</div>
            <KwikSearchInput
              @search="handlePagesSearch"
              placeholder="Search pages..."
            />
          </div>
          <router-link to="/pages/new">
            <button
              class="rounded px-4 py-2 bg-primary-400 text-gray-100 hover:bg-primary-500 duration-300 text-sm"
            >
              New Page
            </button>
          </router-link>
        </div>
        <!--  -->
        <div class="flex items-center">
          <UnderlineTabs
            v-if="!isDeletePage"
            :data="PageTabs"
            v-model="currentPageTab"
            @input="handleTabChange"
          />
          <UnderTabsActions
            v-else
            @clickAction="handleAction"
            :isDeletePage="isDeletePage"
            :data="ActionPageTabs"
            v-model="currentActionTab"
            @input="handleTabActionChange"
            :itemSelected="pageSelected"
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
            Export All Pages
          </div>
        </div>

        <div class="mt-5" :key="key">
          <ListItem
            @click="clickItem"
            v-for="(page, index) in pages"
            :key="index"
            :title="page.title"
            :publishDate="page.publish_date"
            :id="page.id"
            :item="page"
            :title-to="`/pages/edit/${page.id}`"
            :checked="pageSelected.id == page.id"
            pageImg="https://source.unsplash.com/random/1280x720"
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
      @yes="publishPage"
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
      PageTabs: [
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
      ActionPageTabs: [
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
      isDeletePage: false,
      isShowSchedule: false,
      currentPageTab: {},
      pageSelected: [],
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
      pages: (state) => {
        var temp =  state.pages.pages.map(item => {
          item.check = false
          return item
        })
        return temp
      },
      loading: (state) => state.pages.loading,
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
        for (var p of this.pageSelected) {
          await this.$store.dispatch("pages/deletePage", p.id);
        }
        this.reset()
      } catch (error) {
        console.log(error);
      }
    },
    handleTabChange(selectedValue) {
      this.currentPageTab = selectedValue;
      this.addFilter({ status: selectedValue.id });
    },
    handleTabActionChange(selectedValue) {
      this.currentActionTab = selectedValue;
    },
    clickItem(value) {
      if (value.check) {
        this.pageSelected.push(value)
      } else {
        this.pageSelected = this.pageSelected.filter(item => item.id != value.id)
      }
      this.isDeletePage = this.pageSelected.length > 0
    },
    handlePagesSearch(newString) {
      console.log("ok pages", newString);
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
      this.$store.dispatch("pages/fetchAllPages", this.getQuery());
    },
    filterAuthor(value) {
      this.addFilter({ author: value });
    },
    filterCategory(value) {
      this.addFilter({ category: value });
    },
    async publishPage() {
      for (var p of this.pageSelected) {
        await this.$store.dispatch("pages/updatePage", {
          page: {
            id: p.id,
            publish_date: new Date(),
            status: "publish",
          },
        });
      }
      this.reset()
    },
    async setSchedule(date) {
      for (var p of this.pageSelected) {
        await this.$store.dispatch("pages/updatePage", {
          page: {
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
      this.isDeletePage = false;
      this.pageSelected = [];
      this.$store.dispatch("pages/fetchAllPages");
      this.key++
    }
  },
  mounted() {
    this.$store.dispatch("users/fetchAndSetUsers");
    this.$store.dispatch("pages/fetchAllPages");
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

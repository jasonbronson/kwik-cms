<template>
  <div class="font-sans text-black min-h-screen bg-primary-600 px-10">
    <div class="flex justify-between py-8 items-center">
      <div class="flex items-center">
        <div class="text-primary-400 mr-4">Pages</div>
        <div class="border rounded overflow-hidden flex">
          <input type="text" class="px-4 py-2" placeholder="Search..." />
          <button
            class="flex items-center justify-center px-4 border-l bg-primary-400"
          >
            <svg
              class="h-4 w-4 text-white"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
              />
            </svg>
          </button>
        </div>
      </div>
      <router-link to="/pages/new">
        <button
          class="rounded px-4 py-2 bg-primary-400 text-gray-100 hover:bg-primary-500 duration-300 text-sm"
        >
          New Page
        </button>
      </router-link>
    </div>
    <div class="flex items-center">
      <UnderlineTabs
        :data="PagesTabs"
        v-model="currentPagesTab"
        @input="handleTabChange"
      />
      <DropDown title="Page types" :options="pageTypes" />
      <DropDown title="Editor" :options="editors" />
      <div class="flex-grow text-right flex justify-end tex-primary-500">
        2 results of 2 total pages
      </div>
    </div>

    <div class="mt-5">
      <ListItem
        title="page.title"
        createdAt="page.created_at"
        id="123"
        :item="[]"
      />
    </div>
  </div>
</template>

<script>
import UnderlineTabs from "@/components/UnderlineTabs";
import ListItem from "@/components/ListItem";
import DropDown from "@/components/DropDown";
import { mapState } from "vuex";
export default {
  name: "index",
  components: { DropDown, UnderlineTabs, ListItem },
  data() {
    return {
      pageTypes: [{ name: "All" }, { name: "Landing page" }],
      PagesTabs: [
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
      currentPagesTab: {},
    };
  },
  methods: {
    handleTabChange(selectedValue) {
      this.currentBlogTab = selectedValue;
    },
  },
  computed: {
    ...mapState({
      usersList: (state) => state.users.usersList,
    }),
    editors() {
      if (this.usersList.length > 0) {
        return this.usersList.map((el) => {
          return {
            name: `${el.first_name} ${el.last_name}`,
            img: "https://source.unsplash.com/random/1280x720",
          };
        });
      }
      return [{ name: "Empty" }];
    },
  },
};
</script>

<style scoped></style>

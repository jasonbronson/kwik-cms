<template>
  <div>
    <are-you-sure
      v-if="deleteUserConfirm"
      @yes="deleteUser"
      @no="deleteUserConfirm = false"
      text="Do you want to delete this user?"
    ></are-you-sure>
    <div class="items-center justify-between flex text-sm px-4">
      <div class="flex items-center">
        <div class="bg-white px-4 border-solid border-2 rounded mr-2">
          <ul
            class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400"
          >
            <li
              class="mr-2"
              v-for="(tabData, index) in data"
              :key="index"
              @click="changeTab"
            >
              <div
                href="#"
                class="cursor-pointer inline-flex items-center gap-2 p-4 rounded-t-lg border-b-2 border-transparent group"
                :class="[
                  {
                    'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500 group':
                      isCurrentTab(tabData),
                  },
                  {
                    'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                      !isCurrentTab(tabData),
                  },
                ]"
              >
                <span class="text-base"><i :class="tabData.icon"></i></span>
                <span>{{ tabData.title }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="mr-2">
          <div class="dropdown inline-block relative">
            <button
              class="shadow bg-white text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
            >
              <span class="mr-1">Author</span>
              <svg
                class="fill-current h-4 w-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </button>
            <ul class="hidden dropdown-menu absolute text-gray-700">
              <div class="shadow rounded bg-white w-40">
                <li class="p-1">
                  <div
                    class="cursor-pointer rounded hover:bg-primary-300 py-1 px-4 block whitespace-no-wrap"
                    href="#"
                  >
                    All
                  </div>
                </li>
                <li class="p-1">
                  <div
                    class="cursor-pointer rounded hover:bg-primary-300 py-1 px-4"
                    href="#"
                  >
                    <div class="flex gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                        alt="profile pic"
                        class="w-5 h-5 rounded-full object-cover"
                      />
                      <span>{{ displayUserName }}</span>
                    </div>
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>

        <div class="mr-2">
          <div class="dropdown inline-block relative">
            <button
              class="shadow bg-white text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
            >
              <span class="mr-1">Categories</span>
              <svg
                class="fill-current h-4 w-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </button>
            <ul class="hidden dropdown-menu absolute text-gray-700">
              <div class="shadow rounded bg-white w-40">
                <li class="p-1">
                  <div
                    class="cursor-pointer rounded hover:bg-primary-300 py-1 px-4 block whitespace-no-wrap"
                    href="#"
                  >
                    All
                  </div>
                </li>
                <li class="p-1">
                  <div
                    class="cursor-pointer rounded hover:bg-primary-300 py-1 px-4 block whitespace-no-wrap"
                    href="#"
                  >
                    Example category
                  </div>
                </li>
              </div>
            </ul>
          </div>
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
      this.changeTab(this.data[0]);
    }
  },
  methods: {
    // showPopup(item) {

    // },
    isCurrentTab(tabData) {
      return tabData.title == this.value.title;
    },
    changeTab() {
      console.log("ok", this.postSelected.id);
      this.deleteUserConfirm = true;
      //   this.selectedUser = item;
      //   this.$emit("input", tabData);
      //   try {
      //     this.loading = true
      //     await this.$store.dispatch("users/deleteUser", this.selectedUser);
      //     this.deleteUserConfirm = false
      //     this.$router.push('/users')
      //   } catch (error) {
      //     console.log(error)
      //   }
    },
    async deleteUser() {
      try {
        this.loading = true;
        await this.$store.dispatch("posts/deletePost", this.postSelected.id);
        this.deleteUserConfirm = false;
        console.log("vao day");
        // this.$router.push("/users");
      } catch (error) {
        console.log(error);
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

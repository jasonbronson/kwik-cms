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
          @click="changeTab"
        >
          <i class="fas fa-check mr-2"></i>
          <span>Publish</span>
        </div>
        <div
          class="shadow bg-white px-4 py-2 rounded cursor-pointer text-gray-600"
          @click="changeTab"
        >
          <i class="fas fa-clock mr-2"></i>
          <span>Schedule</span>
        </div>
        <div
          class="shadow bg-white px-4 py-2 rounded cursor-pointer text-red-600"
          @click="changeTab"
        >
          <i class="fal fa-trash-alt mr-2"></i>
          <span>Delete</span>
        </div>
        <!--          <ul
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
          </ul>-->
        <!--        </div>-->
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

<template>
  <div class="bg-primary-600 min-h-screen">
    <are-you-sure
      v-if="deleteUserConfirm"
      text="Do you want to delete this user?"
      @yes="deleteUser"
      @no="deleteUserConfirm = false"
    ></are-you-sure>
    <div class="wrapper">
      <div class="flex justify-between p-10">
        <span class="text-primary-400">Manage User</span>
        <button class="button button-dark" @click="addUser">Add User</button>
      </div>
      <div class="">
        <div class="flex justify-between text-white px-4 p-1 bg-primary-400">
          <div class="p-2">User</div>
          <div class="p-2">Role</div>
          <div class="p-2">Email</div>
          <div class="p-2">Actions</div>
        </div>
          <div
            class="flex justify-between items-center px-4 p-1 text-primary-400 even:bg-amber-100 odd:bg-blue-100"
            v-for="(item, idx) in listData"
            :key="idx"
          >
            <div class="p-2">{{ item.first_name + " " + item.last_name }}</div>
            <div class="p-2">{{ item.role.name }}</div>
            <div class="p-2">{{ item.email }}</div>
            <div class="p-2">
              <button class="button button-dark mr-5" @click="editUser(item)">
                Edit
              </button>
              <button class="button button-dark" @click="showPopup(item)">
                Delete
              </button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AreYouSure from "@/components/global/AreYouSure.vue";
export default {
  name: "Users",
  data() {
    return {
      deleteUserConfirm: false,
      selectedUser: {},
    };
  },
  components: {
    AreYouSure,
  },
  computed: {
    ...mapState({
      listData: (state) => state.users.usersList,
    }),
  },
  async mounted() {
    await this.$store.dispatch("users/fetchAndSetUsers");
  },
  methods: {
    addUser() {
      this.$router.push("/users/new");
    },
    editUser(item) {
      this.$router.push(`/users/edit/${item.id}`);
    },
    showPopup(item) {
      this.deleteUserConfirm = true;
      this.selectedUser = item;
    },
    async deleteUser() {
      try {
        this.loading = true;
        await this.$store.dispatch("users/deleteUser", this.selectedUser);
        this.deleteUserConfirm = false;
        await this.$store.dispatch("users/fetchAndSetUsers");
        this.$router.push("/users");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
div {
  box-sizing: border-box;
}
.table {
  display: flex;
}
.flex-table {
  display: flex;
  flex-flow: row wrap;
}
.wrapper {
  padding: 0 20px;
}
.button {
  padding: 5px 10px;
  border-radius: 4px !important;
  box-shadow: 0 2px 4px 0 rgb(98 97 175 / 29%);
}
.button-dark {
  background: #384062;
  color: #ffffff;
}
.button-light {
  background: #ffffff;
  color: black;
  border: 1px solid black;
  margin-right: 10px;
}

</style>

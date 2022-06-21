<template>
  <div class="bg-primary-600 min-h-screen">
    <are-you-sure v-if="deleteUserConfirm" text="Do you want to delete this user?" @yes="deleteUser" @no="deleteUserConfirm = false"></are-you-sure>
    <div class="wrapper bg-white">
      <div class="title">
        <span>Manage User</span>
        <button class="button button-dark" @click="addUser">Add User</button>
      </div>
      <div class="table-wrapper">
        <table class="table table-auto border-collapse border border-slate-300">
          <thead>
            <tr class="table-header bg-indigo-400 text-white">
              <td class="p-2">User</td>
              <td class="p-2">Role</td>
              <td class="p-2">Email</td>
              <td class="p-2">Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr class="even:bg-amber-100 odd:bg-blue-100" v-for="(item, idx) in listData" :key="idx">
              <td class="p-2">{{ item.first_name + " " + item.last_name }}</td>
              <td class="p-2">{{ item.role.name }}</td>
              <td class="p-2">{{ item.email }}</td>
              <td class="p-2">
                <button class="button button-light" @click="editUser(item)">Edit</button>
                <button class="button button-light" @click="showPopup(item)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import AreYouSure from '@/components/global/AreYouSure.vue'
export default {
  name: "Users",
  data() {
    return {
      deleteUserConfirm: false,
      selectedUser: {}
    }
  },
  components: {
    AreYouSure
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
      this.$router.push("/users/new")
    },
    editUser(item) {
      this.$router.push(`/users/edit/${item.id}`)
    },
    showPopup(item) {
      this.deleteUserConfirm = true;
      this.selectedUser = item
    },
    async deleteUser() {
      try {
        this.loading = true
        await this.$store.dispatch("users/deleteUser", this.selectedUser);
        this.deleteUserConfirm = false
        await this.$store.dispatch("users/fetchAndSetUsers");
        this.$router.push('/users')
      } catch (error) {
        console.log(error)
      }
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper{
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
.title {
  display: flex;
  justify-content: space-between;
  padding: 20px 0px;
  span {
    font-size: 16px;
    font-weight: 700;
    color: #44456f;
  }
}
.table-wrapper {
  width: 100%;
  .table {
    width: 100%;
    tr:nth-child(even) {
      background-color: #5a6386;
      color: white;
    }
  }
}
.table-header {
  background-color: #121a3e;
}
</style>

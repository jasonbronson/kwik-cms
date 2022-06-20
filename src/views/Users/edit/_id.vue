<template>
  <user-edit @save="updateUser" :editMode="true" :user="currentUser"></user-edit>
</template>

<script>
import { mapState } from 'vuex'
import UserEdit from "@/components/User/UserEdit.vue"
export default {
  name: "Users",
  components: {
    UserEdit
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.users.currentUser
    }),
  },
  async mounted() {
    await this.$store.dispatch("users/fetchUserById", {id: this.$route.params.id})
  },
  methods: {
    async updateUser(payload) {
      if (payload.password == "") {
        delete payload.password
      }
      try {
        this.loading = true
        await this.$store.dispatch("users/updateUser", payload);
        this.$router.push('/users')
      } catch (error) {
        console.log(error)
      }
    },
    goBack() {
      this.$router.push('/users')
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper{
  padding: 0 20px;
}
.button {
  padding: 10px;
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
  margin-left: 10px;
}
.title {
  display: flex;
  justify-content: space-between;
  padding: 20px 0px;
  i {
    padding-right: 10px;
    cursor: pointer;
  }
  span {
    font-size: 16px;
    font-weight: 700;
    color: #44456f;
  }
}
.form-field {
  margin: 10px 0px;
  label {
    width: 100px;
    display:inline-block;
  }
  input {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    width: 100%;
  }
}
.form-author {
  display: flex;
  justify-content: space-between;
  form {
    width: 50%;
    .form-field {
      width: 80%;
    }
  }
}
.role-group {
  display: flex;
  .role-item {
    margin-right: 20px;
  }
}
</style>

<template>
  <div class="wrapper">
    <div class="title">
      <span v-if="!editMode"><i @click="goBack" class="fa-solid fa-angle-left"></i>Add a New User</span>
      <span v-else><i @click="goBack" class="fa-solid fa-angle-left"></i>Edit User</span>
      <button v-if="!editMode" class="button button-dark" @click="save">Create User</button>
      <button v-else class="button button-dark" @click="save">Update User</button>
    </div>
    <ValidationObserver ref="observer">
      <div class="form-user">
        <form method="get">
          <div class="form-field">
            <label for="emailInput">Email: </label>
            <ValidationProvider
              tag="div"
              class="error"
              rules="required"
              name="email"
              required
              v-slot="{ errors }"
            >
              <input
                id="emailInput"
                v-model="editData.email"
                name="email"
                type="email"
                placeholder="Email..."
                required
              />
              <span class="text-red-500 text-xs pl-2">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-field">
            <label for="emailInput">Password: </label>
            <input
              id="emailInput"
              v-model="editData.password"
              name="email"
              type="password"
              placeholder="••••••••"
              required
            />
            <span class="text-red-500 text-xs pl-2">{{ errorPassword }}</span>
          </div>
        </form>
        <div class="title">
          <span>Role*</span>
        </div>
        <div class="role-group">
          <div class="role-item" v-for="(item, idx) in listRoles" :key="idx">
            <label>
              <ValidationProvider
                tag="div"
                class="error"
                rules="required"
                name="role"
                required
                v-slot="{ errors }"
              >
                <input type="radio" name="age" :value="item.id" v-model="selectedRole">
                {{ item.name }}
                <span class="text-red-500 text-xs pl-2">{{ errors[0] }}</span>
              </ValidationProvider>
            </label>
          </div>
        </div>
      </div>
      <div class="form-author">
        <form>
          <div class="title">
            <span>User Profile</span>
          </div>
          <div class="form-field">
            <label for="emailInput">First Name: </label>
            <ValidationProvider
              tag="div"
              class="error"
              rules="required"
              name="first_name"
              required
              v-slot="{ errors }"
            >
              <input
                id="emailInput"
                v-model="editData.first_name"
                name="email"
                type="text"
                autocomplete="username"
                required
              />
              <span class="text-red-500 text-xs pl-2">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-field">
            <label for="emailInput">Last Name: </label>
            <ValidationProvider
              tag="div"
              class="error"
              rules="required"
              name="last_name"
              required
              v-slot="{ errors }"
            >
              <input
                id="emailInput"
                v-model="editData.last_name"
                name="email"
                type="text"
                autocomplete="username"
                required
              />
              <span class="text-red-500 text-xs pl-2">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-field">
            <label for="emailInput">Title: </label>
            <input
              id="emailInput"
              v-model="editData.title"
              name="email"
              type="text"
              autocomplete="username"
              required
            />
          </div>
          <div class="form-field">
            <label for="emailInput">Content: </label>
            <input
              id="emailInput"
              v-model="editData.content"
              name="email"
              type="text"
              autocomplete="username"
              required
            />
          </div>
        </form>
        <form>
          <div class="title">
            <span>Social Media</span>
          </div>
          <div class="form-field">
            <label for="emailInput">Facebook: </label>
            <input
              id="emailInput"
              v-model="editData.facebook"
              name="email"
              type="text"
              autocomplete="username"
              required
            />
          </div>
          <div class="form-field">
            <label for="emailInput">Instagram: </label>
            <input
              id="emailInput"
              v-model="editData.instagram"
              name="email"
              type="text"
              autocomplete="username"
              required
            />
          </div>
          <div class="form-field">
            <label for="emailInput">Twitter: </label>
            <input
              id="emailInput"
              v-model="editData.twitter"
              name="email"
              type="text"
              autocomplete="username"
              required
            />
          </div>
          <div class="form-field">
            <label for="emailInput">Youtube: </label>
            <input
              id="emailInput"
              v-model="editData.youtube"
              name="email"
              type="text"
              autocomplete="username"
              required
            />
          </div>
        </form>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "Users",
  data() {
    return {
      selectedRole: "",
      errorPassword: "",
      editData: {}
    }
  },
  props: {
    user: {
      default: () => {},
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      listData: (state) => state.users.usersList,
      listRoles: (state) => state.users.rolesList
    }),
  },
  async mounted() {
    await this.$store.dispatch("users/fetchAndSetRoles")
    if (this.editData) {
      this.selectedRole = this.editData.role_id
    }
  },
  watch: {
    user(value) {
      this.editData = value;
      if (this.editData) {
        this.selectedRole = this.editData.role_id
      }
    },
  },
  methods: {
    async save() {
      let valid = await this.$refs.observer.validate();
      if (!this.editMode) {
        if (this.editData.password.trim() == "") {
          this.errorPassword = "This password field is required"
          valid = false
        }
      }
      if (valid) {
        this.errorPassword = ""
        console.log("user payload", {...this.editData, role_id: this.selectedRole })
        this.$emit("save", {...this.editData, role_id: this.selectedRole })
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

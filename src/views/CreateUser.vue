<template>
  <div class="wrapper">
    <div class="title">
      <span>Add a New User</span>
      <button class="button button-dark" @click="createUser">Create User</button>
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
                v-model="email"
                name="email"
                type="email"
                autocomplete="username"
                placeholder="Email..."
                required
              />
              <span class="text-red-500 text-xs pl-2">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-field">
            <label for="emailInput">Password: </label>
            <ValidationProvider
              tag="div"
              class="error"
              rules="required"
              name="password"
              required
              v-slot="{ errors }"
            >
              <input
                id="emailInput"
                v-model="password"
                name="email"
                type="password"
                autocomplete="username"
                required
              />
              <span class="text-red-500 text-xs pl-2">{{ errors[0] }}</span>
            </ValidationProvider>
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
      <div class="title">
        <span>User Profile</span>
      </div>
      <div class="form-author">
        <form>
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
                v-model="first_name"
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
                v-model="last_name"
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
              v-model="title"
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
              v-model="content"
              name="email"
              type="text"
              autocomplete="username"
              required
            />
          </div>
        </form>
        <form>
          <div class="form-field">
            <label for="emailInput">Facebook: </label>
            <input
              id="emailInput"
              v-model="facebook"
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
              v-model="instagram"
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
              v-model="twitter"
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
              v-model="youtube"
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
      email: "",
      password: "",
      selectedRole: "",
      first_name: "",
      last_name: "",
      title: "",
      content: "",
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: ""
    }
  },
  computed: {
    ...mapState({
      listData: (state) => state.users.usersList,
      listRoles: (state) => state.users.rolesList
    }),
  },
  async mounted() {
    await this.$store.dispatch("users/fetchAndSetRoles");
  },
  methods: {
    async createUser() {
      const valid = await this.$refs.observer.validate();
      if (valid) {
        var payload = {
          email: this.email,
          password: this.password,
          role_id : this.selectedRole,
          first_name: this.first_name,
          last_name: this.last_name,
          title: this.title,
          content: this.content,
          facebook: this.facebook,
          instagram: this.instagram,
          twitter: this.twitter,
          youtube: this.youtube
        }
        console.log("user payload", payload)
        try {
          this.loading = true
          await this.$store.dispatch("users/createUser", payload);
          this.$router.push('/users')
          this.$notify({
            group: 'messages',
            title: 'success',
            message: 'successfully saved',
            type: 'info',
          })
        } catch (error) {
          this.$notify({
            title: 'Error',
            message: this.$store.state.error,
            type: 'error',
            duration: 5000,
          })
        }
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
    width: 45%;
  }
}
.role-group {
  display: flex;
  .role-item {
    margin-right: 20px;
  }
}
</style>

<template>
  <ValidationObserver ref="observer">
    <div class="bg-primary-500 h-screen flex justify-center items-center">
      <div class="flex w-3/4 h-3/4">
        <div class="w-1/2 h-full rounded-l-lg overflow-hidden">
          <img
            class="object-cover w-full h-full"
            src="https://images-platform.99static.com//PkTaYd2uVTNfwFdN8PeZUplscE8=/107x89:1092x1074/fit-in/500x500/99designs-contests-attachments/81/81514/attachment_81514499"
            alt="logo"
          />
        </div>

        <div
          class="bg-white rounded-r-lg flex flex-col gap-4 w-1/2 h-full justify-center px-10"
        >
          <div class="text-2xl text-center mb-3">
            <span>Kiwikcms Login</span>
          </div>
          <div>
            <ValidationProvider
              tag="div"
              class="error"
              rules="required"
              name="email"
              required
              v-slot="{ errors }"
            >
              <input
                class="w-full border-solid border-2 rounded h-10 px-4 focus:outline-none focus:border-primary-100"
                v-model="email"
                placeholder="Enter Email Address..."
                type="email"
              />
              <span class="text-red-500 text-xs pl-2">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div>
            <ValidationProvider
              tag="div"
              class="error"
              rules="required"
              name="password"
              required
              v-slot="{ errors }"
            >
              <input
                class="w-full border-solid border-2 rounded h-10 px-4 focus:outline-none focus:border-primary-100"
                v-model="password"
                placeholder="Password"
                type="password"
              />
              <span class="text-red-500 text-xs pl-2">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div>
            <button
              :disabled="loading"
              class="w-full bg-primary-300 hover:bg-primary-500 rounded text-white p-2 transition duration-200 ease-in"
              @click="handleSubmit"
            >
              <span v-if="!loading">Login</span>
              <span v-else>...</span>
            </button>
            <span v-if="loginError" class="text-red-500 text-xs pl-2">
              {{ loginError }}
            </span>
          </div>

          <hr class="my-1" />
          <div
            class="flex flex-col text-center gap-1 text-primary-300 text-sm cursor-pointer"
          >
            <router-link to="/forgot-password">Forgot password?</router-link>
            <router-link to="/sign-up">Create an Account!</router-link>
          </div>
        </div>
      </div>
    </div>
  </ValidationObserver>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      const valid = await this.$refs.observer.validate();
      if (valid) {
        await this.$store.dispatch("auth/login", {
          data: {
            username: this.email,
            password: this.password,
          },
        });
        await this.$router.push("/");
      }
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.auth.loading,
      loginError: (state) => state.auth.loginError,
    }),
  },
};
</script>

<style scoped></style>

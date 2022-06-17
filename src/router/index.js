import Vue from "vue";
import VueRouter from "vue-router";
import Posts from "../views/Posts";
import NewBlog from "../views/Posts/New.vue";
import EditBlog from "../views/Posts/edit/_id.vue";
import Users from "../views/Users.vue";
import CreateUser from "../views/CreateUser";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import store from "../store";
import ErrorPage from "../views/Error.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    redirect: () => {
      return { path: "/home" };
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/posts/new",
    name: "NewPost",
    component: NewBlog,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/posts/edit/:id",
    name: "EditPost",
    component: EditBlog,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/users/new",
    name: "CreateUser",
    component: CreateUser,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: Login,
    meta: {
      layout: "noLoginLayout",
      requiresAuth: false,
    },
  },
  {
    path: "/sign-up",
    name: "RegisterPage",
    component: Register,
    meta: {
      layout: "noLoginLayout",
      requiresAuth: false,
    },
  },
  {
    path: "*",
    component: ErrorPage,
    name: "Error",
    meta: {
      layout: "noLoginLayout",
      requiresAuth: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(function (to, from, next) {
  store.dispatch("auth/localAuthenticate");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.auth.isAuthenticated) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else if (to.name === "Logout") {
    store.dispatch("auth/logout");
    next({
      path: "/login",
    });
  } else {
    next();
  }
});
export default router;

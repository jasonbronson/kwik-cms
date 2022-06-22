import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import users from "./users";
import posts from "./posts";
import media from "./media";
import tags from "./tags";
import categories from "./categories";
import customFields from "./customFields";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, users, posts, media, tags, categories, customFields },
});

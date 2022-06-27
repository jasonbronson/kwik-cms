//import router from "../../router/index";
import axios from "@/services/axios";

export default {
  async fetchAllPosts({ commit }) {
    commit("setLoading", true);
    try {
      const { data } = await axios.get("/posts");
      commit("setPosts", data.data);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
  async fetchPostById({ commit }, payload) {
    commit("setLoading", true);
    try {
      const { data } = await axios.get(`/posts/${payload.id}`);
      commit("setCurrentPost", data.data);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
  async addPost({ commit }, payload) {
    commit("setLoading", true);
    try {
      await axios.post("/posts", payload.post);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
  async updatePost({ commit }, payload) {
    commit("setLoading", true);
    try {
      await axios.put(`/posts/${payload.post.id}`, payload.post);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
  async deletePost({ commit }, payload) {
    commit("setLoading", true);
    try {
      await axios.delete(`/posts/${payload}`);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
  async getPostsByText({ commit }, payload) {
    commit("setLoading", true);
    try {
      const { data } = await axios.get(
        `/posts?${payload.searchBy}=${payload.query}`
      );
      commit("setPosts", data.data);

      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },

};

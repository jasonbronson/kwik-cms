//import router from "../../router/index";
import axios from "@/services/axios";

export default {
  async fetchAllMedia({ commit }) {
    commit("setLoading", true);
    try {
      const { data } = await axios.get("/media");
      commit("setMedia", data.data);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
  async fetchMediaById({ commit }, payload) {
    commit("setLoading", true);
    try {
      const { data } = await axios.get(`/media/${payload.id}`);
      commit("setCurrentMedia", data.data);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
  async addMedia({ commit }, payload) {
    commit("setLoading", true);
    try {
      await axios.media("/media", payload.media);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
  async updateMedia({ commit }, payload) {
    commit("setLoading", true);
    try {
      await axios.put(`/media/${payload.media.id}`, payload.media);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
};

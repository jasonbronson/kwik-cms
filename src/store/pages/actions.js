//import router from "../../router/index";
import axios from "@/services/axios";

export default {
  async fetchAllPages({ commit }, query) {
    commit("setLoading", true);
    try {
      const { data } = await axios.get(`/pages?${query}`);
      commit("setPages", data.data);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
  async fetchPageById({ commit }, payload) {
    commit("setLoading", true);
    try {
      const { data } = await axios.get(`/pages/${payload.id}`);
      commit("setCurrentPage", data.data);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
  async addPage({ commit }, payload) {
    commit("setLoading", true);
    try {
      await axios.post("/pages", payload.page);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
  async updatePage({ commit }, payload) {
    commit("setLoading", true);
    try {
      await axios.put(`/pages/${payload.page.id}`, payload.page);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
  async deletePage({ commit }, payload) {
    commit("setLoading", true);
    try {
      await axios.delete(`/pages/${payload}`);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
  async getPagesByText({ commit }, payload) {
    commit("setLoading", true);
    try {
      const { data } = await axios.get(
        `/pages?${payload.searchBy}=${payload.query}`
      );
      commit("setPages", data.data);

      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
};

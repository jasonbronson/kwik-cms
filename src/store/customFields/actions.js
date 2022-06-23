import axios from "@/services/axios";

export default {
  async addCustomFields({ commit }, payload) {
    commit("setLoading", true);
    try {
      await axios.post("/dynamicgroups", payload);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
  async fetchAllFields({ commit }) {
    commit("setLoading", true);
    try {
      const { data } = await axios.get("/dynamicgroups");
      commit("setCustomFields", data.data);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
  async fetchFieldsById({ commit }, payload) {
    commit("setLoading", true);
    try {
      const { data } = await axios.get(`/dynamicgroups/${payload.id}`);
      commit("setCurrentField", data.data);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
  async updateCustomFields({ commit }, payload) {
    commit("setLoading", true);
    try {
      await axios.put(`/dynamicgroups/${payload.id}`, payload);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
  async deleteCustomFields({ commit }, payload) {
    commit("setLoading", true);
    try {
      await axios.delete(`/dynamicgroups/${payload}`);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
};

import axios from "@/services/axios";

export default {
  async addCustomFields({ commit }, payload) {
    commit("setLoading", true);
    try {
      await axios.post("/dynamicfields", payload);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
  async fetchAllFields({ commit }) {
    commit("setLoading", true);
    try {
      const { data } = await axios.get("/dynamicfields");
      commit("setCustomFields", data.data);
      commit("setLoading", false);
    } catch (e) {
      commit("setLoading", false);
      throw e;
    }
  },
};

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
  // async updateCustomFields({ commit }, payload) {
  //   commit("setLoading", true);
  //   try {
  //     await axios.put(
  //       `/dynamicgroups/${payload.customFields.id}`,
  //       payload.customFields
  //     );
  //     commit("setLoading", false);
  //   } catch (e) {
  //     commit("setLoading", false);
  //     throw e;
  //   }
  // },
  async deleteCustomFields({ commit }, payload) {
    console.log("payload-----------ctusm", payload);
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

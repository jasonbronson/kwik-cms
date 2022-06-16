//import router from "../../router/index";
import axios from "@/services/axios";
import jwtDecode from "jwt-decode";

export default {
  async login({ commit }, payload) {
    commit("setLoading", true);
    commit("setLoginError", "");
    try {
      const { data } = payload;
      const headers = {
        Authorization:
          "Basic " +
          Buffer.from(data.username + ":" + data.password).toString("base64"),
      };
      const res = await axios.post("/sign-in", null, { headers });
      const token = res.data;

      localStorage.setItem("access_token", token);
      localStorage.setItem("email", data.username);
      commit("setIsAuthenticated", true);
    } catch (e) {
      commit("setLoginError", e?.response?.data?.Message || "Unknown Error");
    }
    commit("setLoading", false);
  },
  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("email");
  },
  localAuthenticate({ commit }) {
    try {
      const tokenInfo = jwtDecode(localStorage.getItem("access_token"));
      localStorage.setItem("email", tokenInfo.email);
      commit("setIsAuthenticated", true);
    } catch (error) {
      commit("setIsAuthenticated", false);
    }
  },
};

import { authentication } from "@/api/authentication";
import jwtDecode from "jwt-decode";
import router from "../../router/index";
import { ElNotification } from "element-plus";

export default {
  async adminLogin({ state, commit }, values) {
    commit("setLoading", true);
    try {
      const { data } = await authentication.adminLogin(values);
      localStorage.setItem("access_token", data?.token);
      router.push("/meta-data");
    } catch (e) {
      ElNotification({
        title: "Error",
        message: e?.response?.data?.message || "Login was unsuccessfully",
        duration: 5000,
        type: "error",
      });
      console.log(e);
    }
    commit("setLoading", false);
  },
  async logOut({ commit, state }) {
    commit("setIsAuthenticated", false);
    localStorage.clear();
    router.push("/");
  },
  localAuthenticate({ commit }) {
    try {
      jwtDecode(localStorage.getItem("access_token"));
      commit("setIsAuthenticated", true);
    } catch (e) {
      commit("setIsAuthenticated", false);
    }
  },
  async fetchMe({ commit }) {
    try {
      const { data } = await authentication.fetchMe();
      commit("setUser", data);
    } catch (e) {
      console.log(e);
    }
  },
};

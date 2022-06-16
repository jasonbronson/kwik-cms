export default {
  setIsAuthenticated: (state, payload) => {
    state.isAuthenticated = payload;
  },
  setUser: (state, payload) => {
    state.user = payload;
  },
  setLoading: (state, payload) => {
    state.loading = payload;
  },
  setLoginError: (state, payload) => {
    state.loginError = payload;
  },
};

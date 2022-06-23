export default {
  setLoading: (state, payload) => {
    state.loading = payload;
  },
  setPages: (state, payload) => {
    state.pages = payload;
  },
  setCurrentPage: (state, payload) => {
    state.currentPage = payload;
  },
};

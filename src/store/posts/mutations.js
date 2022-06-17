export default {
  setLoading: (state, payload) => {
    state.loading = payload;
  },
  setPosts: (state, payload) => {
    state.posts = payload;
  },
  setCurrentPost: (state, payload) => {
    state.currentPost = payload;
  },
};

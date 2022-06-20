export default {
  setLoading: (state, payload) => {
    state.loading = payload;
  },
  setMedia: (state, payload) => {
    state.media = payload;
  },
  setCurrentMedia: (state, payload) => {
    state.currentMedia = payload;
  },
};

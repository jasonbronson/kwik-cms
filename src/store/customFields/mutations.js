export default {
  setLoading: (state, payload) => {
    state.loading = payload;
  },
  setCustomFields: (state, payload) => {
    state.customFields = payload;
  },
  setCurrentField: (state, payload) => {
    state.currentField = payload;
  },
};

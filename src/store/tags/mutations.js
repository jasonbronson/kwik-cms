export default {
  setLoading(state, payload) {
    state.loading = payload
  },
  setTagsList(state, payload) {
    state.tagsList = payload
  },
  setCurrentTag(state, payload) {
    state.currentTag = payload
  },
  setTagMeta(state, payload) {
    state.tagMeta = payload
  }
}

export default {
  setLoading(state, payload) {
    state.loading = payload
  },
  setCategoriesList(state, payload) {
    state.categoriesList = payload
  },
  setCurrentCategory(state, payload) {
    state.currentCategory = payload
  },
  setCategoryMeta(state, payload) {
    state.categoryMeta = payload
  }
}

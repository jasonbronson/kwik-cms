import axios from '../../services/axios'

export default {
  async fetchAndSetCategories({ commit }) {
    commit('setLoading', true)
    try {
      const { data } = await axios.get(`/categories`)
      // const categoriesList = (data.data || []).map((category) => {
      //   return {
      //     id: category.id,
      //     first_name: category.first_name,
      //     last_name: category.last_name,
      //     role: category.role,
      //     email: category.email,
      //   };
      // });
      commit('setCategoriesList', data.data)
      commit('setCategoryMeta', data.meta)
      commit('setLoading', false)
    } catch (e) {
      commit('setLoading', false)
      console.log('fetchAndSetPage Error: ', e)
      commit('setError', e.response.data.Message, { root: true })
      throw e
    }
  },
  async fetchCategoryById({ commit }, payload) {
    try {
      const { data } = await axios.get(`/categories/${payload.id}`)
      commit('setCurrentCategory', data.data)
    } catch (e) {
      console.log('fetchCategoryById Error: ', e)
      commit('setError', e.response.data.Message, { root: true })
      throw e
    }
  },
  createCategory: async (
    { commit },
    payload
  ) => {
    try {
      await axios.post('/categories', payload)
    } catch (e) {
      console.log('createcategory Error: ', e)
      commit('setError', e.response.data.Message, { root: true })
      throw e
    }
  },
  updateCategory: async (
    { commit },
    payload
  ) => {
    try {
      await axios.put('/categories/' + payload.id, payload)
    } catch (e) {
      console.log('updateCategory Error: ', e)
      commit('setError', e.response.data.Message, { root: true })
      throw e
    }
  },
  deleteCategory: async (
    { commit },
    payload
  ) => {
    try {
      await axios.delete('/categories/' + payload.id)
    } catch (e) {
      console.log('deleteCategory Error: ', e)
      commit('setError', e.response.data.Message, { root: true })
      throw e
    }
  },
}
import axios from '../../services/axios'

export default {
  async fetchAndSetTags({ commit }) {
    commit('setLoading', true)
    try {
      const { data } = await axios.get(`/tags`)
      // const tagsList = (data.data || []).map((tag) => {
      //   return {
      //     id: tag.id,
      //     first_name: tag.first_name,
      //     last_name: tag.last_name,
      //     role: tag.role,
      //     email: tag.email,
      //   };
      // });
      commit('setTagsList', data.data)
      commit('setTagMeta', data.meta)
      commit('setLoading', false)
    } catch (e) {
      commit('setLoading', false)
      console.log('fetchAndSetPage Error: ', e)
      commit('setError', e.response.data.Message, { root: true })
      throw e
    }
  },
  async fetchTagById({ commit }, payload) {
    try {
      const { data } = await axios.get(`/tags/${payload.id}`)
      commit('setCurrentTag', data.data)
    } catch (e) {
      console.log('fetchTagById Error: ', e)
      commit('setError', e.response.data.Message, { root: true })
      throw e
    }
  },
  createTag: async (
    { commit },
    payload
  ) => {
    try {
      await axios.post('/tags', payload)
    } catch (e) {
      console.log('createtag Error: ', e)
      commit('setError', e.response.data.Message, { root: true })
      throw e
    }
  },
  updateTag: async (
    { commit },
    payload
  ) => {
    try {
      await axios.put('/tags/' + payload.id, payload)
    } catch (e) {
      console.log('updateTag Error: ', e)
      commit('setError', e.response.data.Message, { root: true })
      throw e
    }
  },
  deleteTag: async (
    { commit },
    payload
  ) => {
    try {
      await axios.delete('/tags/' + payload.id)
    } catch (e) {
      console.log('deleteTag Error: ', e)
      commit('setError', e.response.data.Message, { root: true })
      throw e
    }
  },
}
import axios from '../../services/axios'

export default {
  async fetchAndSetUsers({ commit }) {
    commit('setLoading', true)
    try {
      const { data } = await axios.get(`/users`)
      const usersList = (data.data || []).map((user) => {
        return {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          email: user.email,
        };
      });
      commit('setUsersList', usersList)
      commit('setUserMeta', data.meta)
      commit('setLoading', false)
    } catch (e) {
      commit('setLoading', false)
      console.log('fetchAndSetPage Error: ', e)
      commit('setError', e.response.data.Message, { root: true })
      throw e
    }
  },
  async fetchAndSetRoles({ commit }) {
    commit('setLoading', true)
    try {
      const { data } = await axios.get(`/roles`)
      const rolesList = (data.data || []).map((role) => {
        return {
          id: role.id,
          name: role.name
        };
      });
      commit('setRolesList', rolesList)
      commit('setLoading', false)
    } catch (e) {
      commit('setLoading', false)
      console.log('fetchAndSetPage Error: ', e)
      commit('setError', e.response.data.Message, { root: true })
      throw e
    }
  },
  async fetchUserById({ commit }, payload) {
    try {
      const { data } = await axios.get(`/users/${payload.id}`)
      commit('setCurrentUser', data.data)
    } catch (e) {
      console.log('fetchUserById Error: ', e)
      commit('setError', e.response.data.Message, { root: true })
      throw e
    }
  },
  createUser: async (
    { commit },
    payload
  ) => {
    try {
      await axios.post('/users', payload)
    } catch (e) {
      console.log('createuser Error: ', e)
      commit('setError', e.response.data.Message, { root: true })
      throw e
    }
  },
  updateUser: async (
    { commit },
    payload
  ) => {
    try {
      await axios.put('/users/' + payload.user.id, payload.user)
    } catch (e) {
      console.log('updateUser Error: ', e)
      commit('setError', e.response.data.Message, { root: true })
      throw e
    }
  },
  deleteUser: async (
    { commit },
    payload
  ) => {
    try {
      await axios.delete('/users/' + payload.user.id)
    } catch (e) {
      console.log('deleteUser Error: ', e)
      commit('setError', e.response.data.Message, { root: true })
      throw e
    }
  },
}
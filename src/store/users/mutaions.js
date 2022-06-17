export default {
  setLoading(state, payload) {
    state.loading = payload
  },
  setUsersList(state, payload) {
    state.usersList = payload
  },
  setCurrentUser(state, payload) {
    state.currentUser = payload
  },
  setUserMeta(state, payload) {
    state.userMeta = payload
  },
  setRolesList(state, payload) {
    state.rolesList = payload
  }
}

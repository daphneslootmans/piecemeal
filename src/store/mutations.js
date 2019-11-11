const mutations = {
  setAuthUser(state, user) {
    state.authUser = user
  },
  setError(state, error) {
    state.error = error
  }
}

export default mutations;

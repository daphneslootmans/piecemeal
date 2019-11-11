const mutations = {
  setAuthUser(state, user) {
    state.authUser = user
  },
  setError(state, error) {
    state.error = error
  },
  addRecipe (state, value) {
    state.recipes.push(value)
  }
}

export default mutations;

const mutations = {
  setAuthUser(state, user) {
    state.authUser = user
  },
  setCurrentUser(state, user) {
    state.currentUser = user
  },
  setError(state, error) {
    state.error = error
  },
  addRecipe (state, recipe) {
    let data = recipe.data()
    data.id = recipe.id
    state.recipes.push(data)
  },
  clearRecipes (state) {
    state.recipes = []
  }
}

export default mutations;

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
  updateRecipe (state, recipe) {
    let data = recipe.data()
    data.id = recipe.id
    let index = state.recipes.indexOf(rec => rec.id === data.id)
    state.recipes.splice(index, 1, data)
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

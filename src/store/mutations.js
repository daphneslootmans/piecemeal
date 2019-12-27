const mutations = {
  setCurrentUser (state, user) {
    state.currentUser = user
  },
  clearUserData (state) {
    state.currentUser = {}
    state.recipes = []
    state.currentRecipe = {}
  },
  setError (state, error) {
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
  removeRecipe (state, recipe) {
    console.log('remove id: ', recipe.id)
    let index = state.recipes.findIndex(rec => rec.id === recipe.id)
    console.log('index: ', index)
    state.recipes.splice(index, 1)
  },
  clearRecipes (state) {
    state.recipes = []
  },
  setCurrentRecipe (state, recipe) {
    console.log(typeof recipe)
    state.currentRecipe = JSON.parse(JSON.stringify(recipe))
  }
}

export default mutations

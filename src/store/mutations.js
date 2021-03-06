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
    let index = state.recipes.findIndex(rec => rec.id === data.id)
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
    state.currentRecipe = JSON.parse(JSON.stringify(recipe))
    state.currentRecipe.createdAt = recipe.createdAt.toDate()
  },
  clearCurrentRecipe (state) {
    state.currentRecipe = {
      title: '',
      category: '',
      description: '',
      rating: 0,
      imageUrl: '',
      tags: [],
      prepTime: null,
      ingredientsRaw: '',
      ingredients: [],
      materials: [],
      comment: '',
      directionsRaw: '',
      directions: [],
      dropFiles: [],
      portions: null,
    }
  },
  setEditing (state, payload) {
    state.editing = payload.editing
  },
  updateTitle (state, payload) {
    state.currentRecipe.title = payload
  },
  updateCategory (state, payload) {
    state.currentRecipe.category = payload
  },
  updateDescription (state, payload) {
    state.currentRecipe.description = payload
  },
  updateRating (state, payload) {
    state.currentRecipe.rating = payload
  },
  updateImageUrl (state, payload) {
    state.currentRecipe.imageUrl = payload
  },
  updateTags (state, payload) {
    state.currentRecipe.tags = payload
  },
  updatePrepTime (state, payload) {
    state.currentRecipe.prepTime = payload
  },
  updateIngredients (state, payload) {
    state.currentRecipe.ingredients = payload
  },
  updateIngredientsRaw (state, payload) {
    state.currentRecipe.ingredientsRaw = payload
  },
  updateMaterials (state, payload) {
    state.currentRecipe.materials = payload
  },
  updateComment (state, payload) {
    state.currentRecipe.comment = payload
  },
  updateDirections (state, payload) {
    state.currentRecipe.directions = payload
  },
  updateDirectionsRaw (state, payload) {
    state.currentRecipe.directionsRaw = payload
  },
  updateDropFiles (state, payload) {
    state.currentRecipe.dropFiles = payload
  },
  updatePortions (state, payload) {
    state.currentRecipe.portions = payload
  },
  setMobile (state, width) {
    state.isMobile = width <= 768
  },
  setNavbarActive (state, payload) {
    state.navbarActive = payload.navbarActive
  }
}

export default mutations

import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {},
    error: null,
    recipes: [],
    currentRecipe: {
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
    },
    editing: false,
    isMobile: false
  },
  getters,
  mutations,
  actions
})

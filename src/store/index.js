import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    version: '0.0.2',
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
      portions: null
    },
    editing: false,
    isMobile: false,
    navbarActive: false
  },
  getters,
  mutations,
  actions
})

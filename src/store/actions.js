import { db, auth, timestamp, recipeCollection } from '../firebaseConfig'
import router from '@/router/'

const actions = {
  signOut ({ state, commit }) {
    auth.signOut()
      .then(() => {
        commit('clearUserData')
        router.push('/login')
      })
      .catch(error => { state.error = error })
  },
  registerEmail ({ state, commit, dispatch }, payload) {
    auth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('new user uid:', response.user.uid)
        router.push('/dashboard')
        dispatch('setUser', response.user.uid)
      })
      .catch(error => { state.error = error })
  },
  getUser ({ commit }) {
    let users = db.collection('users')
    users.doc(auth.currentUser.uid).get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No user data!')
        } else {
          console.log('User data:', doc.data())
          commit('setCurrentUser', doc.data())
        }
      })
  },
  setUser ({ state }, uid) {
    let users = db.collection('users')
    users.doc('categories').get().then(doc => {
      if (!doc.exists) {
        console.log('No such document!')
      } else {
        console.log('Document data:', doc.data())
        let setDoc = users.doc(uid).set({
          categories: doc.data().standard,
          settings: {
            mode: 'light',
            linkedUsers: []
          }
        })
      }
    })
  },
  getRecipes ({ commit, state }) {
    let uid = auth.currentUser.uid
    commit('clearRecipes')
    if (uid) {
      console.log(auth.currentUser.email)
      let recipeQuery = db.collection('recipes')
        .where('users', 'array-contains', uid)
        .where('isDeleted', '==', false)
      recipeQuery.onSnapshot(snapshot => {
        console.log(snapshot)
        if (snapshot.empty) {
          console.log('No matching documents.')
          return
        }
        snapshot.docChanges().forEach(change => {
          if (!snapshot.metadata.hasPendingWrites) {
            console.log('no pending writes')
            if (change.type === 'added') {
              console.log('Added recipe: ', change.doc)
              commit('addRecipe', change.doc)
            } else if (change.type === 'modified') {
              console.log('Modified recipe: ', change.doc)
                commit('updateRecipe', change.doc)
            } else if (change.type === 'removed') {
              console.log('Removed recipe: ', change.doc)
              commit('removeRecipe', change.doc)
            }
          }
        })
      })
    } else {
      commit('clearRecipes')
    }
  },
  parseRecipe ({state, commit}) {
    let ingredientsList = []
    let directionsList = []
    console.log(state.currentRecipe)
    let ingredients = state.currentRecipe.ingredientsRaw.replace(/\r\n/g, '\n').split('\n')
    let directions = state.currentRecipe.directionsRaw.replace(/\r\n/g, '\n').split('\n')
    commit('updateIngredients', ingredients)
    commit('updateDirections', directions)
    ingredients.forEach(item => {
      if (item !== '') {
        ingredientsList.push(item)
      }
    })
    directions.forEach(item => {
      if (item !== '') {
        directionsList.push(item)
      }
    })
    commit('updateIngredients', ingredientsList)
    commit('updateDirections', directionsList)
  },
  deleteRecipe ({ state }, id) {
    let recipe = recipeCollection.doc(id)
    return recipe.update({
      isDeleted: true,
      deletedTimestamp: timestamp
    }).then(() => commit('clearCurrentRecipe'))
  }
}

export default actions

import { db, auth, timestamp, recipeCollection, userCollection, categoriesCollection } from '../firebaseConfig'
import router from '@/router/'

const actions = {
  // USER
  signOut ({ state, commit }) {
    auth.signOut()
      .then(() => {
        commit('clearUserData')
        commit('clearCurrentRecipe')
        router.push('/login')
      })
      .catch(error => { state.error = error })
  },

  registerEmail ({ state, commit, dispatch }, payload) {
    auth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('new user uid:', response.user.uid)
        router.push('/recipes')
        dispatch('setUser', { uid: response.user.uid, email: payload.email })
      })
      .catch(error => { state.error = error })
  },

  getUser ({ commit }) {
    let users = db.collection('users')
    users.doc(auth.currentUser.uid).onSnapshot(snapshot => {
      console.log('User data:', snapshot.data())
      commit('setCurrentUser', snapshot.data())
    })
  },

  setUser ({ state }, payload) {
    let users = db.collection('users')
    users.doc('categories').get().then(doc => {
      if (!doc.exists) {
        console.log('No such document!')
      } else {
        console.log('Document data:', doc.data())
        let setDoc = users.doc(payload.uid).set({
          categories: doc.data().standard,
          settings: {
            mode: 'light',
            linkedUsers: []
          },
          email: payload.email,
          friends: []
        })
      }
    })
  },

  // RECIPES
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
          if (snapshot.metadata) {
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

  parseRecipe ({ state, commit }) {
    let ingredientsList = []
    let directionsList = []
    console.log(state.currentRecipe)
    let ingredientsRaw = state.currentRecipe.ingredientsRaw
    let directionsRaw = state.currentRecipe.directionsRaw
    if (ingredientsRaw) {
      let ingredients = ingredientsRaw.replace(/\r\n/g, '\n').split('\n')
      ingredients.forEach(item => {
        if (item !== '') {
          ingredientsList.push(item)
        }
      })
    }
    if (directionsRaw) {
      let directions = directionsRaw.replace(/\r\n/g, '\n').split('\n')
      directions.forEach(item => {
        if (item !== '') {
          directionsList.push(item)
        }
      })
    }
    commit('updateIngredients', ingredientsList)
    commit('updateDirections', directionsList)
  },

  deleteRecipe ({ state, commit }, id) {
    let recipe = recipeCollection.doc(id)
    return recipe.update({
      isDeleted: true,
      deletedTimestamp: timestamp
    }).then(() => {
      router.push('/recipes')
      commit('clearCurrentRecipe')
    })
  },

  // FRIENDS
  getFriends ({commit, state, dispatch}) {
    userCollection.doc(auth.currentUser.uid).collection('friends').onSnapshot( (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let payload = {
          doc: change.doc.data(),
          id: change.doc.data().id
        }
        if (change.type === "added") {
          commit('addFriend', payload)
          if (change.doc.data().status === 'active') {
            state.friendRecipes[change.doc.data().id] = []
            dispatch('getFriendRecipes', change.doc.data().id)
            dispatch('getFriendCategories', change.doc.data().id)
          }
        }
        if (change.type === "modified") {
          commit('updateFriend', payload)
        }
        if (change.type === "removed") {
          commit('removeFriend', payload)
        }
      })
    })
  },

  getFriendRecipes ({commit, state, dispatch}, id) {
    let uid = auth.currentUser.uid
    console.log('getting friend recipes from id: ', id)
    commit('clearFriendRecipes', id)
    if (uid) {
      let recipeQuery = db.collection('recipes')
        .where('users', 'array-contains', id)
        .where('isDeleted', '==', false)
      recipeQuery.onSnapshot(snapshot => {
        if (snapshot.empty) {
          console.log('no matching documents')
          return
        }
        snapshot.docChanges().forEach(change => {
          let payload = {
            doc: change.doc,
            id: id
          }
          if (snapshot.metadata) {
            if (change.type === 'added') {
              commit('addFriendRecipe', payload)
            } else if (change.type === 'modified') {
              commit('updateFriendRecipe', payload)
            } else if (change.type === 'removed') {
              commit('removeFriendRecipe', payload)
            }
          }
        })
      })
    } else {
      commit('clearFriendRecipes', id)
    }
  },

  getFriendCategories({commit, state}, id) {
    let uid = auth.currentUser.uid
    console.log('getting friend categories from id: ', id)
    if (uid) {
      categoriesCollection.where('users', 'array-contains', id).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          let payload = {
            doc: change.doc.data(),
            id: change.doc.id,
            friendId: id
          }
          if (snapshot.metadata) {
            if (change.type === 'added') {
              commit('addFriendCategory', payload)
            } else if (change.type === 'modified') {
              commit('updateFriendCategory', payload)
            } else if (change.type === 'removed') {
              commit('removeFriendCategory', payload)
            }
          }
        })
      })
    }
  },

  // SYSTEM
  getNotifications ({ commit, state }) {
    let uid = auth.currentUser.uid
    commit('clearNotifications')
    if (uid) {
      let notificationsQuery = db.collection('notifications')
        .where('user', '==', auth.currentUser.uid)
      notificationsQuery.onSnapshot(snapshot => {
        snapshot.forEach((doc) => {
          if (snapshot.empty) {
            console.log('No matching documents.')
            return
          }
          snapshot.docChanges().forEach(change => {
            if (snapshot.metadata) {
              console.log('no pending writes')
              if (change.type === 'added') {
                commit('addNotification', change.doc)
              } else if (change.type === 'modified') {
                commit('updateNotification', change.doc)
              } else if (change.type === 'removed') {
                console.log('Removed recipe: ', change.doc)
                commit('removeNotification', change.doc)
              }
            }
          })
        })
      })
    } else {
      commit('clearNotifications')
    }
  }
}

export default actions

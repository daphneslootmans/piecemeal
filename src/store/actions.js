import { db, auth } from '../firebaseConfig'
import router from '@/router/'

const actions = {
  signOut ({ state, commit }) {
    auth.signOut()
      .then( () => {
        router.push('/login')
      })
      .catch(error => { state.error = error })
  },
  registerEmail ({ state, commit, dispatch }, payload) {
    auth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then( response => {
        console.log('new user uid:', response.user.uid)
        router.push('/dashboard')
        dispatch('setUser', response.user.uid)
      })
      .catch(error => { state.error = error })
  },
  getUser ({ state, commit, dispatch }) {
    let users = db.collection('users')
    let getCurrent = users.doc(auth.currentUser.uid).get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No user data!');
        } else {
          console.log('User data:', doc.data());
          commit('setCurrentUser', doc.data())
        }
      })
  },
  setUser ({ state }, uid) {
    let users = db.collection('users')
    let cats = users.doc('categories').get().then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
        let setDoc = users.doc(uid).set({categories: doc.data().standard})
      }
    })
  },
  getRecipes ({ commit }) {
    let uid = auth.currentUser.uid
    if (uid) {
      console.log(auth.currentUser.email)
      let recipeQuery = db.collection('recipes').where('users', 'array-contains', uid)
      let recipeObserver = recipeQuery.onSnapshot(snapshot => {
        console.log(snapshot)
        if (snapshot.empty) {
          console.log('No matching documents.')
          return
        }
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            commit('addRecipe', change.doc)
          }
          if (change.type === 'modified') {
            console.log('Modified recipe: ', change.doc.data())
          }
          if (change.type === 'removed') {
            console.log('Removed recipe: ', change.doc.data())
          }
        })
      })
    } else {
      commit('clearRecipes')
    }
  }
}

export default actions

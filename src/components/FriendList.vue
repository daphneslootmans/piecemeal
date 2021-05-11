<template>
  <div class=" friend-list">
    <div class="columns">
      <div class="column content">
        <h1>Friends</h1>
        <p>Friends can view and copy your recipes, and you can view and copy theirs. Enter an email address below to send a friend request. Once your friend request is accepted, you can see your friend's recipes in the sidebar.</p>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <form @submit.prevent="sendFriendRequest">
          <div class="columns">
            <div class="column is-6-desktop">
              <b-field>
                <b-input type="email" v-model="email" placeholder="Email"></b-input>
              </b-field>
            </div>
            <div class="column is-narrow">
              <b-button :loading="addFriendLoading"
                        @click="sendFriendRequest"
                        type="is-primary"
              >Send Request</b-button>
            </div>
          </div>
          <b-notification
            :active.sync="showError"
            aria-close-label="Close notification"
            role="alert"
            type="is-danger"
          >
            {{ error }}
          </b-notification>
        </form>
      </div>
    </div>
    <template v-if="friends.length">
      <friend-row v-for="friend in friends" :data="friend"></friend-row>
    </template>
  </div>
</template>

<script>
  import FriendRow from './FriendRow'
  import { mapState, mapActions } from 'vuex'
  import { auth, currentUser, userCollection } from '../firebaseConfig'
  import firebase from 'firebase'

  export default {
    name: 'FriendList',
    components: { FriendRow },
    props: {},
    data () {
      return {
        email: '',
        showError: false,
        error: '',
        addFriendLoading: false,
        friends: []
      }
    },
    computed: {
      ...mapState({
        user: 'currentUser'
      }),
      authUser () {
        return auth.currentUser
      }
    },
    methods: {
      ...mapActions({
        getFriendRecipes: 'getFriendRecipes'
      }),
      sendFriendRequest () {
        console.log('adding friend')
        this.addFriendLoading = true

        userCollection.where('email', '==', this.email)
          .get()
          .then((querySnapshot) => {
            console.log('snapshot:', querySnapshot)
            if (querySnapshot.empty) {
              this.error = 'User not found'
              this.showError = true
            } else {
              this.error = ''
              this.showError = false
              querySnapshot.forEach((document) => {
                console.log(document.id, ' => ', document.data())
                userCollection.doc(document.id).collection('friends').doc(this.authUser.uid).set({
                    id: this.authUser.uid,
                    username: this.user.username,
                    email: this.user.email,
                    status: 'pending',
                    validationRequired: true
                })
                let friend = document.data()
                userCollection.doc(this.authUser.uid).collection('friends').doc(document.id).set({
                  id: document.id,
                  username: friend.username,
                  email: friend.email,
                  status: 'pending'
                })
              })
            }
          })
          .catch(function (error) {
            console.log('Error getting documents: ', error)
          })
          .finally(() => {
            this.addFriendLoading = false
          })
      },
      getRecipes () {
        this.friends.forEach(friend => {
          this.getFriendRecipes(friend.id)
        })
      }
    },
    watch: {},
    created () {
      userCollection.doc(this.authUser.uid).collection('friends').onSnapshot( (snapshot) => {
        let friends = []
          snapshot.forEach((friend) => {
            friends.push(friend.data())
          })
        this.friends = friends
        if (friends.length) this.getRecipes()
      })
    }
  }
</script>

<style scoped lang="scss">

</style>

<template>
  <div class="friend-row">
    <p>{{ data.username }} - {{ data.email }}</p>
    <div class="button-group">
      <b-tooltip label="Request is pending"
                 position="is-bottom"
                 v-if="data.status === 'pending'"
      >
        <b-button icon-left="hourglass-half"
                  class="icon-only"
        ></b-button>
      </b-tooltip>
      <b-button @click="acceptFriend"
                type="is-primary"
                icon-left="check"
                :loading="verifying > 0"
                v-if="data.validationRequired"
      ></b-button>
      <b-button @click="removePrompt"
                type="is-primary"
                icon-left="trash"
                :loading="removeFriendLoading > 0"
      ></b-button>
    </div>
  </div>
</template>

<script>
import { auth, notificationCollection, timestamp, userCollection } from '@/firebaseConfig'
  import { mapState } from 'vuex'

  export default {
    name: 'FriendRow',
    props: {
      data: {
        type: Object
      }
    },
    data () {
      return {
        removeFriendLoading: 0,
        verifying: 0
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
      removePrompt () {
        // remove friend based on ID -- also remove current user from friends friend list
        this.$buefy.dialog.confirm({
          title: `Removing friend`,
          message: `Are you sure you want to <b>remove</b> "${this.data.username}"? You will no longer be able to view their recipes, and they won't be able to view yours.`,
          confirmText: 'Remove friend',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.removeFriend()
        })
      },
      removeFriend () {
        console.log('removing friend')
        this.removeFriendLoading = 2

        userCollection.doc(this.data.id).collection('friends').doc(this.authUser.uid).delete().then(() => {
          this.removeFriendLoading--
        })
          .catch(error => console.log(error))

        userCollection.doc(this.authUser.uid).collection('friends').doc(this.data.id).delete().then(() => {
          this.removeFriendLoading--
        })
          .catch(error => console.log(error))

          notificationCollection.add({
            message: this.data.status === 'active' ? `${this.user.username} has removed you as a friend. You will no longer be able to view their recipes.` : `${this.user.username} has revoked the friend request.`,
            unread: true,
            user: this.data.id,
            timestamp: timestamp
          })

        if (this.removeFriendLoading === 0) {
          this.$buefy.toast.open({
            message: `Friend removed`,
            type: 'is-success',
            position: this.isMobile ? 'is-bottom' : 'is-top-right',
            duration: 3000
          })
        }
      },
      acceptFriend () {
        console.log('Accepting friend')
        this.verifying = 2

        userCollection.doc(this.data.id).collection('friends').doc(this.authUser.uid).update({
          'status': 'active'
        }).then(() => {
          this.verifying--
        })
          .catch(error => console.log(error))

        userCollection.doc(this.authUser.uid).collection('friends').doc(this.data.id).update({
          'validationRequired': false,
          'status': 'active'
        }).then(() => {
          this.verifying--
        })
          .catch(error => console.log(error))

        notificationCollection.add({
          message: `${this.user.username} has accepted your friend request`,
          unread: true,
          user: this.data.id,
          timestamp: timestamp
        })

        if (this.verifying === 0) {
          this.$buefy.toast.open({
            message: `Friend request accepted`,
            type: 'is-success',
            position: this.isMobile ? 'is-bottom' : 'is-top-right',
            duration: 3000
          })
        }
      }
    },
    watch: {}
  }
</script>

<style scoped lang="scss">
  .friend-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;

    p {
      span {
        margin-left: 1em;
        color: $grey-medium;
        font-style: italic;
      }
    }
  }

  .icon-only {
    cursor: initial;
    margin-right: 1em;
  }
</style>

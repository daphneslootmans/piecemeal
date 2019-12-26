<template>
  <b-navbar type="is-primary" spaced>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <vue-fontawesome icon="drumstick-bite" size="lg"></vue-fontawesome>
        <span>piecemeal</span>
      </b-navbar-item>
    </template>

    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ name: 'recipes' }">
        Recipes
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'register' }">
        Register
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'settings' }">
        Settings
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div v-if="user">{{ user.email }}</div>
        <div class="buttons">
          <b-button icon-right="sign-out-alt" type="is-primary" @click="signOut">
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
  import { auth } from '../firebaseConfig'
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'NavbarTop',
    props: {},
    data () {
      return {}
    },
    computed: {
      ...mapState({
        currentUser: 'currentUser',
      }),
      user () {
        return auth.currentUser
      }
    },
    methods: {
      ...mapActions({
        signOut: 'signOut'
      }),
    },
    watch: {}
  }
</script>

<style scoped lang="scss">

</style>

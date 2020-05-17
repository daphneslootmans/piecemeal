<template>
  <b-navbar type="is-primary" spaced>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <vue-fontawesome icon="drumstick-bite" size="lg"></vue-fontawesome>
        <span>piecemeal</span><span class="version">v-{{ version }}</span>
      </b-navbar-item>
    </template>

    <template slot="start">
      <sidebar v-if="isMobile"></sidebar>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div v-if="user" class="user-name">{{ user.email }}</div>
        <div class="buttons">
          <b-button tag="router-link"
                    to="/settings"
                    type="is-primary"
                    icon-left="cog"
          ></b-button>
          <b-button icon-right="sign-out-alt"
                    type="is-primary"
                    @click="signOut"
          ></b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
  import { auth } from '../firebaseConfig'
  import { mapActions, mapState } from 'vuex'
  import Sidebar from './Sidebar'

  export default {
    name: 'NavbarTop',
    props: {},
    components: {
      Sidebar
    },
    data () {
      return {}
    },
    computed: {
      ...mapState({
        currentUser: 'currentUser',
        isMobile: 'isMobile',
        version: 'version'
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
  .user-name {
    padding-right: 1em;
  }
  .version {
    font-size: 0.8rem;
    margin-left: 1em;
    padding-top: 6px;
  }
</style>

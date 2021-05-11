<template>
  <b-navbar type="is-primary" :is-active.sync="navbarActive" class="navbar-top">
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
        <div v-if="currentUser.username" class="user-name">{{ currentUser.username }}</div>
        <div v-else class="user-name">{{ currentUser.email }}</div>
        <div class="buttons">
          <b-button icon-left="bell"
                    type="is-primary"
                    :class="[{'new-notifications': newNotifications}]"
                    @click="toggleNotifications"
          ></b-button>
          <b-button tag="router-link"
                    to="/friends"
                    type="is-primary"
                    icon-left="people-arrows"
          ></b-button>
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
  import { mapActions, mapState, mapMutations } from 'vuex'
  import Sidebar from './Sidebar'

  export default {
    name: 'NavbarTop',
    props: {},
    components: {
      Sidebar
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapState({
        currentUser: 'currentUser',
        isMobile: 'isMobile',
        version: 'version',
        navbarActiveStore: 'navbarActive',
        notifications: 'notifications',
        notificationsOpen: 'notificationsOpen'
      }),
      navbarActive: {
        get () {
          return this.navbarActiveStore
        },
        set (value) {
          this.$store.commit('setNavbarActive', {navbarActive: value})
        }
      },
      newNotifications () {
        if (this.notifications) {
          return this.notifications.some(note => note.unread)
        }
      }
    },
    methods: {
      ...mapMutations({
        setNavbarActive: 'setNavbarActive',
        toggleNotifications: 'toggleNotifications'
      }),
      ...mapActions({
        signOut: 'signOut'
      })
    },
    watch: {}
  }
</script>

<style lang="scss">
  .navbar-top {
    z-index: 50;
    &.navbar {
      padding-bottom: 0;

      .user-name {
        padding-right: 1em;
      }

      .version {
        font-size: 0.8rem;
        margin-left: 1em;
        padding-top: 6px;
      }

      .navbar-burger {
        @media screen and (max-width: 768px) {
          margin-right: 3px;
        }
      }

      .navbar-brand {
        padding-left: 0.5em;
      }

      .button {
        z-index: 300;
        &.new-notifications {
          &::before {
            content: '';
            position: absolute;
            right: 7px;
            top: 6px;
            width: 7px;
            height: 7px;
            border-radius: 10px;
            background-color: $red-alert;
          }
        }
      }

      .buttons {
        position: relative;
        z-index: 50;
      }
    }
  }
</style>

<template>
  <v-app>

  <v-app-bar
    app
    color="blue-grey"
    dark
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer">
      <font-awesome-icon :icon="['fas', 'bars']"></font-awesome-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title>piecemeal</v-toolbar-title>
    <v-spacer/>

    <v-btn icon>
      <font-awesome-icon :icon="['fas', 'sign-out-alt']" size="lg" @click.stop="signOut"></font-awesome-icon>
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    app
  >
    <v-list dense>
      <v-list-item @click.stop="signOut">
        <v-list-item-action>
          <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Sign out</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-content>
    <v-container
      class="fill-height"
      fluid
    >
      <v-row>
        <v-col>
          <h1>Main content</h1>
        </v-col>
      </v-row>
    </v-container>
  </v-content>

  <v-footer
    app
    color="blue-grey"
    class="white--text"
  >
    <span>Vuetify</span>
    <v-spacer/>
    <span>&copy; 2019</span>
  </v-footer>
  </v-app>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: false,
      left: null
    }),
    computed: {
      ...mapState({
        user: 'authUser'
      })
    },
    methods: {
      ...mapActions({
        signOut: 'signOut'
      })
    }
  }
</script>

<style scoped lang="scss">

</style>

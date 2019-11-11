<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <font-awesome-icon :icon="['fas', 'bars']"></font-awesome-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>piecemeal</v-toolbar-title>
      <v-spacer/>
      <div v-if="user">{{ user.email }}</div>
      <v-btn icon>
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" size="lg" @click.stop="signOut"></font-awesome-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item @click.stop="addRecipe">
          <v-list-item-action>
            <font-awesome-icon icon="file-alt"></font-awesome-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Add a recipe</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
      <component :is="currentComponent"></component>
    </v-content>

    <v-footer
      app
      color="primary"
      class="white--text"
    >
<!--      <span>Daphne Slootmans</span>-->
      <v-spacer/>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import AddRecipe from '@/components/AddRecipe'

  export default {
    components: {
      AddRecipe
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: true,
      currentComponent: 'AddRecipe'
    }),
    computed: {
      ...mapState({
        user: 'authUser'
      })
    },
    methods: {
      ...mapActions({
        signOut: 'signOut'
      }),
      addRecipe () {
        this.$router.push('/add-recipe')
      }
    }
  }
</script>

<style scoped lang="scss">

</style>

<template>
  <div>
    <b-navbar type="is-primary" spaced>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <vue-fontawesome icon="drumstick-bite" size="lg"></vue-fontawesome>
          <span>piecemeal</span>
        </b-navbar-item>
      </template>

      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/Dashboard' }">
         Recipes
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/Register' }">
          Register
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/Settings' }">
          Settings
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div v-if="user">{{ user.email }}</div>
          <div class="buttons">
            <b-button icon-right="sign-out-alt" type="is-primary">
            </b-button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <section class="section">
      <div class="container">
          <b-menu>
            <b-menu-list label="Menu">
              <b-menu-item icon="hamburger" label="Info"></b-menu-item>
              <b-menu-item icon="account" label="My Account">
                <b-menu-item label="Account data"></b-menu-item>
                <b-menu-item label="Addresses"></b-menu-item>
              </b-menu-item>
            </b-menu-list>
            <b-menu-list>
              <b-menu-item
                label="Expo"
                icon="link"
                tag="router-link"
                target="_blank"
                to="/expo">
              </b-menu-item>
            </b-menu-list>
            <b-menu-list label="Actions">
              <b-menu-item label="Logout"></b-menu-item>
            </b-menu-list>
          </b-menu>

        <component :is="currentComponent"></component>
      </div>
    </section>

  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import AddRecipe from '@/components/AddRecipe'

  export default {
    components: {
      AddRecipe
    },
    props: {
      source: String
    },
    data: () => ({
      isActive: true,
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

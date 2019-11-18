<template>
  <div>
    <!--    top nav-->
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
            <b-button icon-right="sign-out-alt" type="is-primary" @click="signOut">
            </b-button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <b-menu>
              <b-menu-list label="Actions">
                <b-menu-item icon="plus" label="Add a recipe" @click="addRecipe"></b-menu-item>
                <b-menu-item icon="sign-out-alt" label="Sign out" @click="signOut"></b-menu-item>
              </b-menu-list>
              <b-menu-list label="Recipes">
                <b-menu-item
                  icon="book"
                  :active="isActive"
                  :expanded="isActive"
                  @click="isActive = !isActive">
                  <template slot="label" slot-scope="props">
                    Breakfast
                    <b-icon
                      class="is-pulled-right"
                      :icon="props.expanded ? 'caret-down' : 'caret-up'">
                    </b-icon>
                  </template>
                  <b-menu-item label="Recipe 1"></b-menu-item>
                </b-menu-item>
              </b-menu-list>
            </b-menu>
          </div>
          <div class="column">
            <component :is="currentComponent"></component>
          </div>
        </div>


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
        this.component = 'AddRecipe'
      }
    }
  }
</script>

<style lang="scss">
  .navbar-brand {
    a {
      margin-right: 2rem;
      font-size: 1.3rem;
      font-weight: 700;
    }

    svg {
      margin-right: 0.5em;
    }
  }
  .menu-list {
   a {
     line-height: 1;
     .icon.is-small {
       position: relative;
       top: 5px
     }
   }
  }
</style>

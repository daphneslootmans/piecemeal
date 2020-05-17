<template>
  <div id="app">
    <navbar-top></navbar-top>
    <recipe-actions :id="$route.params.id" v-if="recipeRoute"></recipe-actions>
    <section class="section main-section">
      <div class="container">
        <div class="columns">
          <router-view name="sidebar" v-if="!isMobile"></router-view>
          <div class="column main-content">
            <router-view/>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
  import NavbarTop from './components/NavbarTop'
  import RecipeActions from './components/RecipeActions'
  import { auth, db } from './firebaseConfig'
  import { mapState, mapMutations, mapActions } from 'vuex'

  export default {
    components: {
      NavbarTop, RecipeActions
    },
    computed: {
      ...mapState({
        currentRecipe: 'currentRecipe',
        recipes: 'recipes',
        isMobile: 'isMobile'
      }),
      user () {
        return auth.currentUser
      },
      recipe () {
        if (this.$route.params.id && this.recipes.length) {
          return this.recipes.find(recipe => recipe.id === this.$route.params.id)
        }
      },
      recipeRoute () {
        return this.$route.params.id || this.$route.name === 'recipes'
      }
    },
    methods: {
      ...mapMutations({
        setRecipe: 'setCurrentRecipe',
        clearCurrentRecipe: 'clearCurrentRecipe',
        setMobile: 'setMobile',
        setEditing: 'setEditing',
        setNavbarActive: 'setNavbarActive'
      }),
      ...mapActions({
        getUser: 'getUser',
        setUser: 'setUser',
        getRecipes: 'getRecipes'
      }),
      setCategories () {
        // tmp function to edit standard categories
        let data = {
          standard:
            [
              {
                name: 'Dinner',
                expanded: true
              },
              {
                name: 'Lunch',
                expanded: true
              },
              {
                name: 'Breakfast',
                expanded: true
              },
              {
                name: 'Side Dish',
                expanded: true
              },
              {
                name: 'Dessert',
                expanded: true
              },
            ]
        }
        db.collection('users').doc('categories').set(data)
      },
      checkRoute () {
        console.log('checking route')
        if (this.$route.params.id && this.recipe) {
          console.log('id in route')
          if (this.recipe.id !== this.currentRecipe.id) {
            this.setRecipe(this.recipe)
          }
        } else {
          this.clearCurrentRecipe()
        }
        if (this.$route.name !== 'edit-recipe') {
          this.setEditing({ editing: false })
        }
      },
      checkWindow () {
        let windowWidth = window.innerWidth
        this.setMobile(windowWidth)
      }
    },
    watch: {
      user () {
        this.getRecipes()
      },
      $route (to, from) {
        this.checkRoute()
        this.setNavbarActive({navbarActive: false})
      },
      recipes () {
        if (this.recipes.length) this.checkRoute()
      }
    },
    created () {
      if (this.user) {
        this.getUser()
        this.getRecipes()
      }
    },
    mounted () {
      this.$nextTick(() => {
        window.addEventListener('resize', this.checkWindow)
        this.checkWindow()
      })
    }
  }
</script>

<style lang="scss">
  @import "sass/main.scss";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 100vh;
  }

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

  .main-content {
    @media screen and (min-width: 769px) {
      padding-left: 2rem;
    }
  }
</style>

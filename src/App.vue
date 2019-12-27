<template>
  <div id="app">
    <navbar-top></navbar-top>
    <section class="section main-section">
      <div class="container">
        <div class="columns">
          <router-view name="sidebar"></router-view>
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
  import { auth, db } from './firebaseConfig'
  import { mapState, mapMutations, mapActions } from 'vuex'

  export default {
    components: {
      NavbarTop
    },
    computed: {
      ...mapState({
        currentRecipe: 'currentRecipe',
        recipes: 'recipes'
      }),
      user () {
        return auth.currentUser
      },
      recipe () {
        if (this.$route.params.id && this.recipes) {
          return this.recipes.find(recipe => recipe.id === this.$route.params.id)
        }
      },
    },
    methods: {
      ...mapMutations({
        setRecipe: 'setCurrentRecipe',
        setEditing: 'setEditing'
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
        if (this.$route.params.id) {
          console.log('id in route')
          if (this.recipe.id !== this.currentRecipe.id) {
            this.setRecipe(this.recipe)
          }
        }
        if (this.$route.query.editing) {
          console.log('editing in route')
          this.setEditing({editing: true})
        }
      }
    },
    watch: {
      user () {
        this.getRecipes()
      },
      recipe () {
        this.checkRoute()
      }
    },
    created () {
      this.getUser()
      this.getRecipes()
    },
    mounted () {
      this.checkRoute()
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
    padding-left: 2rem;
  }
</style>

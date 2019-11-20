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
          <div class="column is-3 sidebar">
            <b-button icon-right="plus" type="is-primary" outlined expanded @click="addRecipe">
              Add a recipe
            </b-button>
            <b-menu>
              <b-menu-list label="Recipes">
                <b-menu-item
                  v-for="category in categories"
                  v-if="categoryRecipes(category)"
                  icon="utensils"
                  :active="activeCat === category"
                  :expanded="true"
                  @click="setActiveCat(category)">
                  <template slot="label" slot-scope="props">
                    {{ category }}
                    <b-icon
                      class="is-pulled-right"
                      :icon="props.expanded ? 'angle-down' : 'angle-up'">
                    </b-icon>
                  </template>
                  <b-menu-item
                    v-for="recipe in recipes"
                    v-if="recipe.data.category === category"
                    :label="recipe.data.title"
                    @click="getRecipeDetail(recipe.id)"
                  ></b-menu-item>
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
  import { db, auth } from '../firebaseConfig'
  import AddRecipe from '@/components/AddRecipe'

  export default {
    components: {
      AddRecipe
    },
    props: {
      source: String
    },
    data: () => ({
      activeCat: '',
      currentComponent: 'AddRecipe',
      recipes: []
    }),
    computed: {
      ...mapState({
        categories: 'categories'
      }),
      user () {
        return auth.currentUser
      }
    },
    methods: {
      ...mapActions({
        signOut: 'signOut'
      }),
      addRecipe () {
        this.component = 'AddRecipe'
      },
      setActiveCat (cat) {
        this.activeCat = cat
      },
      getRecipeDetail (id) {
        this.$buefy.toast.open({
          message: `clicked recipe ${id}`,
          type: 'is-dark',
          position: 'is-top-right',
          duration: 3000
        })
      },
      categoryRecipes (cat) {
        return this.recipes.some(recipe => recipe.data.category === cat)
      },
      getRecipes () {
        if (this.user.uid) {
          console.log(this.user.email)
          let recipeQuery = db.collection('recipes').where('users', 'array-contains', this.user.uid)
          let recipeObserver = recipeQuery.onSnapshot(snapshot => {
            console.log(snapshot)
            if (snapshot.empty) {
              console.log('No matching documents.')
              return
            }
            snapshot.docChanges().forEach(change => {
              if (change.type === 'added') {
                this.recipes.push({
                  id: change.doc.id,
                  data: change.doc.data()
                })
              }
              if (change.type === 'modified') {
                console.log('Modified recipe: ', change.doc.data())
              }
              if (change.type === 'removed') {
                console.log('Removed recipe: ', change.doc.data())
              }
            })
          })
        } else {
          this.recipes = []
        }
      }
    },
    watch: {
      user () {
        this.getRecipes()
      }
    },
    mounted () {
      this.activeCat = this.categories[0]
      this.getRecipes()
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

  .sidebar {
    button {
      margin-bottom: 1rem;
    }
  }

  .menu-list {
    a {
      line-height: 1;

      .icon.is-small {
        position: relative;
        top: 5px;
        margin-right: 5px;
      }
    }
  }
</style>

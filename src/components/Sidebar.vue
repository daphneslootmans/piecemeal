<template>
  <div class="column is-3 sidebar">
    <b-button icon-left="plus"
              type="is-primary"
              outlined
              expanded
              tag="router-link"
              to="/recipes"
              :disabled="$route.name === 'recipes'"
    >Add a Recipe
    </b-button>
    <b-button icon-left="people-arrows"
              type="is-primary"
              outlined
              expanded
              tag="router-link"
              to="/friends"
    >Friend Recipes
    </b-button>
    <b-menu>
      <b-menu-list
        label="Recipes"
      >
        <b-menu-item
          v-for="(category, index) in categories"
          :key="category.name + index"
          v-if="categoryRecipes(category.id)"
          icon="utensils"
          :active="activeCat === category.id"
          :expanded="category.expanded">
          <template slot="label" slot-scope="props">
            {{ category.name }}
            <b-icon
              class="is-pulled-right"
              :icon="props.expanded ? 'angle-down' : 'angle-up'">
            </b-icon>
          </template>
          <b-menu-item
            v-for="recipe in recipes"
            :key="recipe.id"
            v-if="recipe.category === category.id && !recipe.isDeleted"
            :label="recipe.title"
            @click="getRecipeDetail(recipe.id)"
          ></b-menu-item>
        </b-menu-item>
        <b-menu-item
          key="unsorted-recipes"
          v-if="unsortedRecipes.length"
          icon="utensils"
          :expanded="true">
          <template slot="label" slot-scope="props">
            Unsorted recipes
            <b-icon
              class="is-pulled-right"
              :icon="props.expanded ? 'angle-down' : 'angle-up'">
            </b-icon>
          </template>
          <b-menu-item
            v-for="recipe in unsortedRecipes"
            :key="recipe.id"
            v-if="!recipe.isDeleted"
            :label="recipe.title"
            @click="getRecipeDetail(recipe.id)"
          ></b-menu-item>
        </b-menu-item>
      </b-menu-list>
    </b-menu>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'Sidebar',
    props: {
      source: String
    },
    data () {
      return {
        activeCat: ''
      }
    },
    computed: {
      ...mapState({
        currentUser: 'currentUser',
        recipes: 'recipes',
        categories: 'categories'
      }),
      unsortedRecipes () {
        let unsorted = []
        this.recipes.forEach(recipe => {
          let category = this.categories.find(cat => cat.id === recipe.category)
          if (!category) unsorted.push(recipe)
        })
        return unsorted
      }
    },
    methods: {
      ...mapActions({
        getRecipes: 'getRecipes'
      }),
      setActiveCat (cat) {
        this.activeCat = cat.id
      },
      getRecipeDetail (id) {
        console.log('id: ', id)
        this.$router.push({ name: 'recipe', params: { recipeId: id } })
      },
      categoryRecipes (cat) {
        return this.recipes.some(recipe => recipe.category === cat)
      }
    },
    watch: {}
  }
</script>

<style lang="scss">
  .sidebar {
    position: sticky;
    top: 70px;

    > a, > button {
      margin-bottom: 1rem;
    }

    @media screen and (min-width: 769px) {
      border-right: 1px solid $grey-lightest;
      height: calc(100vh - 132px - 1.5rem);
      max-height: calc(100vh - 132px - 1.5rem);
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

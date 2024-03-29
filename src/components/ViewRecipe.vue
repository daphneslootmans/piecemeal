<template>
  <div>
    <div class="content" v-if="recipe">
      <section class="info-section">
        <!--    title-->
        <div class="columns mb-0 is-multiline">
          <div class="column title-column">
            <h1 :class="['is-marginless']">{{ recipe.title }}</h1>
            <p class="is-italic mobile-date" v-if="isMobile">{{ recipe.createdAt | moment('DD-MM-YYYY HH:mm') }}</p>
          </div>
          <div class="column is-narrow">
            <b-field label="">
              <b-rate icon="heart" spaced v-model="recipe.rating" disabled/>
            </b-field>
          </div>
        </div>

        <div class="columns is-multiline is-mobile">
          <div class="column date-stamp" v-if="!isMobile">
            <p class="is-italic">{{ recipe.createdAt | moment('DD-MM-YYYY HH:mm') }} <span v-if="recipe.copiedFrom">- copied from {{ originName }}</span></p>
          </div>
          <div class="column is-narrow" v-if="recipe.portions > 0">
            <div class="prep-time has-text-right-desktop">
              <vue-fontawesome icon="utensils"/>
              {{ recipe.portions }}
            </div>
          </div>
          <div class="column is-narrow">
            <div class="prep-time has-text-right-desktop">
              <vue-fontawesome icon="stopwatch"/>
              {{ recipe.prepTime }} min
            </div>
          </div>
        </div>

        <!--    description-->
        <div class="columns">
          <div class="column pt-0">
            <p>{{ recipe.description }}</p>
          </div>
        </div>

        <!--    tags-->
        <div class="columns">
          <div class="column">
            <div class="tags">
              <div v-for="tag in recipe.tags">
                {{ tag }}
              </div>
              <div v-if="getCategoryName">{{ getCategoryName }}</div>
            </div>
          </div>
        </div>
      </section>

      <!--      ingredients-->
      <section class="body-section">
        <div class="columns">
          <div class="column is-half" v-if="recipe.ingredients.length">
            <div class="card ingredients">
              <div class="card-header">
                <div class="card-header-title">
                  Ingredients
                </div>
              </div>
              <div class="card-content">
                <p
                  v-for="ingredient in recipe.ingredients"
                >
                <span>
                  <vue-fontawesome v-if="randIngredient === ingredient" icon="cookie-bite"/>
                  <vue-fontawesome v-else icon="cookie"/>
                </span>
                  {{ ingredient }}
                </p>
              </div>
            </div>
          </div>
          <div class="column is-half" v-if="recipe.materials.length">
            <div class="card">
              <div class="card-header">
                <div class="card-header-title">
                  Materials
                </div>
              </div>
              <div class="card-content">
                <p
                  v-for="material in recipe.materials"
                >
                <span>
                  <vue-fontawesome v-if="randMaterial === material" icon="cookie-bite"/>
                  <vue-fontawesome v-else icon="cookie"/>
                </span>
                  {{ material }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!--        directions-->
        <div class="columns" v-if="recipe.directions.length">
          <div class="column is-full">
<!--            <h4>Directions</h4>-->
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">Directions</p>
              </header>
              <div class="card-content">
                <ol>
                  <li v-for="(step) in recipe.directions" class="">
                    <p class="">{{ step }}</p>
                  </li>
                </ol>
              </div>
            </div>
<!--            <ol>-->
<!--              <li v-for="(step, index) in recipe.directions">-->
<!--                {{ step }}-->
<!--              </li>-->
<!--            </ol>-->
          </div>
        </div>

        <div class="columns" v-if="recipe.comment">
          <div class="column is-full">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">Comment</p>
              </header>
              <div class="card-content">
                <p>
                  {{ recipe.comment }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!--   source-->
        <div class="columns" v-if="recipe.source">
          <div class="column pt-0">
            <p>Source: {{ recipe.source }}</p>
          </div>
        </div>
      </section>
    </div>
    <div class="content" v-else>
      <b-message type="is-danger">
        Invalid recipe id
      </b-message>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import RecipeActions from './RecipeActions'
import { userCollection, auth } from '@/firebaseConfig'

  export default {
    name: 'ViewRecipe',
    components: { RecipeActions },
    data () {
      return {
        originName: ''
      }
    },
    computed: {
      ...mapState({
        recipes: 'recipes',
        friendRecipes: 'friendRecipes',
        recipe: 'currentRecipe',
        isMobile: 'isMobile',
        user: 'currentUser',
        categories: 'categories'
      }),
      randIngredient () {
        let ingr = this.recipe.ingredients
        if (ingr.length > 1) {
          return ingr[Math.random() * ingr.length | 0]
        }
      },
      randMaterial () {
        let mat = this.recipe.materials
        if (mat.length > 1) {
          return mat[Math.random() * mat.length | 0]
        }
      },
      getCategoryName () {
        if (this.recipe && this.categories.length > 0) {
          let cat = this.categories.find(cat => cat.id === this.recipe.category)
          return cat ? cat.name : undefined
        }
      }
    },
    methods: {
      ...mapActions({
        setRecipeById: 'setRecipeById'
      }),
      getRecipe () {
        let payload = {
          friendId: this.$route.params.friendId,
          recipeId: this.$route.params.recipeId
        }
        this.setRecipeById(payload)
      },
      findUsername (id) {
        let uid = auth.currentUser.uid
        if (id === uid) this.originName = this.user.username
        else {
          userCollection.doc(id).get()
            .then((doc) => {
              this.originName = doc.data().username
            })
            .catch((error) => console.log(error))
        }
      }
    },
    watch: {
      recipes () {
        this.getRecipe()
      },
      friendRecipes () {
        this.getRecipe()
      },
      $route (to, from) {
        this.getRecipe()
      },
      'recipe.copiedFrom' () {
        if (this.recipe.copiedFrom) this.findUsername(this.recipe.copiedFrom)
      }
    },
    mounted () {
    },
    created () {
      this.getRecipe()
    }
  }
</script>

<style scoped lang="scss">
  .deleted {
    color: darkred;
  }

  .tags {
    display: flex;

    > div {
      background: $grey-lightest;
      padding: 0.2em 0.8em;
      border-radius: 4px;
      margin-right: 0.4em;
      text-transform: lowercase;
    }
  }

  .prep-time {
    font-size: 1.2em;
  }

  .card {
    margin-bottom: 1rem;
    height: 100%;
  }

  .card-header {
    background: $grey-lightest;
  }

  .card-content {
    p {
      display: flex;
      /*align-items: center;*/
    }

    span {
      margin-right: 0.8em;
      margin-top: 3px;
      font-size: 0.8em;
    }
  }

  .detail-row {
    margin-bottom: 1em;
  }

  .info-section {
    margin-bottom: 2rem;
  }

  .date-stamp {
    font-size: 0.9em;
  }

  ol {
    li {
      font-weight: 700;
    }
    p {
      font-weight: initial;
      margin-bottom: 0.5em;
    }
  }

  .mobile-date {
    margin-top: 0.5em;
  }

  .title-column {
    @media screen and (max-width: 768px) {
      padding-bottom: 0;
    }
  }
</style>

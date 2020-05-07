<template>
  <div>
    <div class="content" v-if="recipe">
      <recipe-actions :id="$route.params.id"></recipe-actions>
      <section class="info-section">
        <!--    title-->
        <div class="columns mb-0 is-multiline">
          <div class="column">
            <h1 :class="['is-marginless']">{{ recipe.title }}</h1>
          </div>
          <div class="column is-narrow">
            <b-field label="">
              <b-rate icon="heart" spaced v-model="recipe.rating" disabled/>
            </b-field>
          </div>
        </div>

        <div class="columns is-multiline">
          <div class="column date-stamp">
            <p class="is-italic">{{ recipe.createdAt | moment('DD-MM-YYYY HH:mm') }}</p>
          </div>
          <div class="column is-narrow">
            <div class="prep-time has-text-right">
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
              <div>{{ recipe.category }}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="body-section">
        <div class="columns">
          <div class="column is-half">
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

        <div class="columns">
          <div class="column is-full">
            <h4>Directions</h4>
            <div v-for="(step, index) in recipe.directions" class="card">
              <header class="card-header">
                <p class="card-header-title">Step {{ index +1 }}</p>
              </header>
              <div class="card-content">
                <p>
                  {{ step }}
                </p>
              </div>
            </div>
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
  import { mapState } from 'vuex'
  import RecipeActions from './RecipeActions'

  export default {
    name: 'ViewRecipe',
    components: { RecipeActions },
    data () {
      return {}
    },
    computed: {
      ...mapState({
        recipes: 'recipes',
        recipe: 'currentRecipe'
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
      recipeNotEmpty () {
        return Object.entries(this.recipe).length !== 0
      }
    },
    methods: {
    },
    mounted () {
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
  }

  .card-header {
    background: $grey-lightest;
  }

  .card-content {
    p {
      display: flex;
      align-items: center;
    }

    span {
      margin-right: 0.8em;
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
</style>

<template>
  <div class="content">
    <!--    title-->
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h1 class="is-marginless">{{ recipe.title }}</h1>
        </div>
        <div class="level-item">
          <b-field label="">
            <b-rate icon="heart" spaced v-model="recipe.rating" disabled></b-rate>
          </b-field>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <p class="prep-time">
            <vue-fontawesome icon="stopwatch"></vue-fontawesome>
            {{ recipe.prepTime }} min
          </p>
        </div>
      </div>
    </div>

    <!--    tags-->
    <div class="level ">
      <div class="level-left">
        <div class="level-item">
          <div class="tags">
            <div v-for="tag in recipe.tags">
              {{ tag }}
            </div>
            <div>{{ recipe.category }}</div>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <p>{{ recipe.createdAt.toDate() | moment('DD-MM-YYYY HH:mm') }}</p>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-narrow">
        <p class="is-italic">{{ recipe.description }}</p>
      </div>
    </div>

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
                  <vue-fontawesome v-if="randIngredient === ingredient" icon="cookie-bite"></vue-fontawesome>
                  <vue-fontawesome v-else icon="cookie"></vue-fontawesome>
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
                  <vue-fontawesome v-if="randMaterial === material" icon="cookie-bite"></vue-fontawesome>
                  <vue-fontawesome v-else icon="cookie"></vue-fontawesome>
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
        <ol>
          <li
            v-for="step in recipe.directions"
          >{{ step }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'ViewRecipe',
    data () {
      return {}
    },
    computed: {
      ...mapState({
        recipes: 'recipes'
      }),
      recipe () {
        return this.recipes.find(recipe => recipe.id === this.$route.params.id)
      },
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
      }
    },
    methods: {
      randValue (array) {
        console.log(array)

      }
    },
    mounted () {
      console.log('recipes: ', this.recipes)
    }
  }
</script>

<style scoped lang="scss">
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

  /*.card {*/
  /*  height: 100%;*/
  /*}*/
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
</style>

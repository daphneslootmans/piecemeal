<template>
  <div class="content">
    <section class="info-section">
      <!--    title-->
      <div class="columns mb-0 is-multiline">
        <div class="column">
          <h1 :class="[{deleted: deleted}, 'is-marginless']">{{ recipe.title }}</h1>
        </div>
        <div class="column is-narrow">
          <b-field label="">
            <b-rate icon="heart" spaced v-model="recipe.rating" disabled/>
          </b-field>
          <p class="prep-time has-text-right">
            <vue-fontawesome icon="stopwatch"/>
            {{ recipe.prepTime }} min
          </p>
        </div>
        <div class="column is-full date-stamp">
          <p class="is-italic">{{ recipe.createdAt.toDate() | moment('DD-MM-YYYY HH:mm') }}</p>
        </div>
      </div>

      <!--    description-->
      <div class="columns">
        <div class="column">
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
        <div class="column is-narrow">
          <div class="button-group">
            <b-button icon-right="pen-alt" type="is-primary" outlined expanded @click="editRecipe(recipe.id)">
              Edit recipe
            </b-button>
            <b-button icon-right="trash" type="is-primary" outlined @click="deletePrompt(recipe.id)">
            </b-button>
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
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import router from '../store/actions'

  export default {
    name: 'ViewRecipe',
    data () {
      return {}
    },
    computed: {
      ...mapState({
        recipes: 'recipes'
      }),
      ...mapMutations({
        removeRecipe: 'removeRecipe'
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
      },
      deleted () {
      return this.recipe ? this.recipe.isDeleted : false
      }
    },
    methods: {
      ...mapActions({
        deleteRecipe: 'deleteRecipe'
      }),
      editRecipe (id) {
        this.$router.push({ name: 'edit-recipe', params: { id } })
      },
      deletePrompt (id) {
        this.$buefy.dialog.confirm({
          title: `Deleting recipe`,
          message: `Are you sure you want to <b>delete</b> '${this.recipe.title}'? This action cannot be undone.`,
          confirmText: 'Delete Recipe',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.deleteRecipe(id).then(() => {
            this.$buefy.toast.open({
              message: `Recipe deleted`,
              type: 'is-dark',
              position: 'is-top-right',
              duration: 3000
            })
            console.log('first recipe id: ', this.recipes[0].id)
            this.$router.push({ name: 'recipe', params: { id: this.recipes[0].id} })
          })
        })
      }
    },
    mounted () {
      console.log('recipes: ', this.recipes)
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
    padding-top: 0;
    font-size: 0.9em;
  }
</style>

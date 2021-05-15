<template>
  <form>
    <div class="content">
      <h3>Details</h3>
    </div>

    <!--title-->
    <div class="columns">
      <div class="column">
        <div class="columns is-multiline">
          <div class="column">
            <b-field label="Title">
              <b-input
                type="text"
                v-model="title"
              ></b-input>
            </b-field>
          </div>

          <!--category-->
          <div class="column is-narrow">
            <b-field label="Category">
              <b-select
                v-model="category"
              >
                <option
                  v-for="option in categories"
                  :value="option.id"
                  :key="option.name"
                >
                  {{ option.name }}
                </option>
              </b-select>
            </b-field>
          </div>
        </div>

        <div class="columns is-multiline">
          <!--description-->
          <div class="column">
            <b-field label="Description">
              <b-input
                type="textarea"
                v-model="description"
                rows="4"
              ></b-input>
            </b-field>
          </div>

          <!--rating-->
          <div class="column is-narrow">
            <b-field label="Rating">
              <b-rate icon="heart" spaced v-model="rating"></b-rate>
            </b-field>
          </div>

          <!--source-->
          <div class="column is-full">
            <b-field label="Source">
              <b-input
                type="text"
                v-model="source"
                rows="4"
              ></b-input>
            </b-field>
          </div>

          <!--tags-->
          <div class="column is-full">
            <b-field label="Tags">
              <b-taginput
                v-model="tags"
                ellipsis
                icon="tag"
                placeholder="Add a tag">
              </b-taginput>
            </b-field>
          </div>

          <!--prep time-->
          <div class="column is-6">
            <b-field label="Preparation time in minutes">
              <b-numberinput
                v-model.number="prepTime"
              ></b-numberinput>
            </b-field>
          </div>

          <div class="column is-6">
            <b-field label="Portions">
              <b-numberinput
                v-model.number="portions"
              ></b-numberinput>
            </b-field>
          </div>
        </div>
      </div>

      <!--image-->
      <!--      <div class="column is-5">-->
      <!--        <b-field label="Image">-->
      <!--          <b-upload v-model="dropFiles"-->
      <!--                    multiple-->
      <!--                    drag-drop-->
      <!--                    accept="image/*"-->
      <!--          >-->
      <!--            <section class="section">-->
      <!--              <div class="content has-text-centered">-->
      <!--                <p>-->
      <!--                  <b-icon-->
      <!--                    icon="upload"-->
      <!--                    size="is-large">-->
      <!--                  </b-icon>-->
      <!--                </p>-->
      <!--                <p>Drop your image here or click to upload</p>-->
      <!--              </div>-->
      <!--            </section>-->
      <!--          </b-upload>-->
      <!--        </b-field>-->

      <!--        <div class="tags">-->
      <!--            <span v-for="(file, index) in dropFiles"-->
      <!--                  :key="index"-->
      <!--                  class="tag is-primary">-->
      <!--                {{file.name}}-->
      <!--                <button class="delete is-small"-->
      <!--                        type="button"-->
      <!--                        @click="deleteDropFiles(index)">-->
      <!--                </button>-->
      <!--            </span>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>

    <!--ingredients-->
    <div class="columns">
      <div class="column is-half">
        <b-field label="Ingredients">
          <b-input
            type="textarea"
            v-model.trim="ingredientsRaw"
            placeholder="Add one ingredient per line"
            rows="8"
          ></b-input>
        </b-field>
      </div>

      <!--materials-->
      <div class="column is-half">
        <b-field label="Materials">
          <b-taginput
            v-model="materials"
            ellipsis
            icon="blender"
            placeholder="Add required materials">
          </b-taginput>
        </b-field>

        <!--comment-->
        <b-field label="Comment">
          <b-input
            type="textarea"
            v-model.trim="comment"
            class="comment-input"
          ></b-input>
        </b-field>
      </div>
    </div>

    <!--directions-->
    <div class="columns">
      <div class="column">
        <b-field label="Directions">
          <b-input
            type="textarea"
            v-model.trim="directionsRaw"
            placeholder="Add one direction per line"
            rows="10"
          ></b-input>
        </b-field>
      </div>
    </div>
  </form>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { auth } from '../firebaseConfig'

  export default {
    name: 'RecipeForm',
    props: {
      loading: {
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapState({
        currentUser: 'currentUser',
        recipes: 'recipes',
        recipe: 'currentRecipe',
        categories: 'categories',
        editing: 'editing'
      }),
      user () {
        return auth.currentUser
      },
      title: {
        get () {
          return this.recipe.title
        },
        set (value) {
          this.$store.commit('updateTitle', value)
        }
      },
      category: {
        get () {
          return this.recipe.category
        },
        set (value) {
          this.$store.commit('updateCategory', value)
        }
      },
      description: {
        get () {
          return this.recipe.description
        },
        set (value) {
          this.$store.commit('updateDescription', value)
        }
      },
      rating: {
        get () {
          return this.recipe.rating
        },
        set (value) {
          this.$store.commit('updateRating', value)
        }
      },
      imageUrl: {
        get () {
          return this.recipe.imageUrl
        },
        set (value) {
          this.$store.commit('imageUrl', value)
        }
      },
      tags: {
        get () {
          return this.recipe.tags
        },
        set (value) {
          this.$store.commit('updateTags', value)
        }
      },
      prepTime: {
        get () {
          return this.recipe.prepTime
        },
        set (value) {
          this.$store.commit('updatePrepTime', value)
        }
      },
      ingredientsRaw: {
        get () {
          return this.recipe.ingredientsRaw
        },
        set (value) {
          this.$store.commit('updateIngredientsRaw', value)
        }
      },
      materials: {
        get () {
          return this.recipe.materials
        },
        set (value) {
          this.$store.commit('updateMaterials', value)
        }
      },
      comment: {
        get () {
          return this.recipe.comment
        },
        set (value) {
          this.$store.commit('updateComment', value)
        }
      },
      directionsRaw: {
        get () {
          return this.recipe.directionsRaw
        },
        set (value) {
          this.$store.commit('updateDirectionsRaw', value)
        }
      },
      dropFiles: {
        get () {
          return this.recipe.dropFiles
        },
        set (value) {
          this.$store.commit('updateDropFiles', value)
        }
      },
      portions: {
        get () {
          return this.recipe.portions
        },
        set (value) {
          this.$store.commit('updatePortions', value)
        }
      },
      source: {
        get () {
          return this.recipe.source
        },
        set (value) {
          this.$store.commit('updateSource', value)
        }
      }
    },
    methods: {
      deleteDropFiles (index) {
        this.dropFiles.splice(index, 1)
      }
    },
    watch: {
      currentUser () {
        if (!this.editing && this.categories.length > 0 && this.category === '') {
          this.$store.commit('updateCategory', this.categories[0].id)
        }
      },
      recipe () {
        if (!this.editing && this.categories.length > 0 && this.category === '') {
          console.log('adding recipe, set category to: ', this.categories[0].id)
          this.$store.commit('updateCategory', this.categories[0].id)
        }
      },
      categories () {
        if (!this.editing && this.categories.length > 0 && this.category === '') {
          console.log('adding recipe, set category to: ', this.categories[0].id)
          this.$store.commit('updateCategory', this.categories[0].id)
        }
      }
    },
    mounted () {
    }
  }
</script>

<style scoped lang="scss">

</style>

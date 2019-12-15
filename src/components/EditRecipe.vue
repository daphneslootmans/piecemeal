<template>
  <section class="section">
    <div class="content">
      <h1>Edit recipe</h1>
    </div>
    <form>
      <div class="content">
        <h3>Details</h3>
      </div>

      <!--title-->
      <div class="columns">
        <div class="column">
          <div class="columns is-multiline">
            <div class="column is-full">
              <b-field label="Title">
                <b-input
                  type="text"
                  v-model="title"
                ></b-input>
              </b-field>
            </div>

            <!--category-->
            <div class="column is-full">
              <b-field label="Category">
                <b-select
                  v-model="category"
                >
                  <option
                    v-for="option in currentUser.categories"
                    :value="option.name"
                    :key="option.name"
                  >
                    {{ option.name }}
                  </option>
                </b-select>
              </b-field>
            </div>

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
          </div>
        </div>

        <!--image-->
        <div class="column is-5">
          <b-field label="Image">
            <b-upload v-model="dropFiles"
                      multiple
                      drag-drop
                      accept="image/*"
            >
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon
                      icon="upload"
                      size="is-large">
                    </b-icon>
                  </p>
                  <p>Drop your image here or click to upload</p>
                </div>
              </section>
            </b-upload>
          </b-field>

          <div class="tags">
            <span v-for="(file, index) in dropFiles"
                  :key="index"
                  class="tag is-primary">
                {{file.name}}
                <button class="delete is-small"
                        type="button"
                        @click="deleteDropFiles(index)">
                </button>
            </span>
          </div>
        </div>
      </div>

      <!--ingredients-->
      <div class="columns">
        <div class="column is-half">
          <b-field label="Ingredients">
            <b-input
              v-model="ingredientsRaw"
              type="textarea"
              rows="8"
              placeholder="Add one ingredient per line"
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
              v-model="comment"
              class="comment-input"
            ></b-input>
          </b-field>
        </div>
      </div>

      <!--directions-->
      <div class="columns">
        <div class="column">
          <div class="content">
            <h3>Directions</h3>
          </div>
          <b-field
            v-for="(step, index) in directions"
            :label="stepName(index)"
            :key="'step' + index"
          >
            <b-input
              type="textarea"
              v-model.trim="directions[index]"
            ></b-input>
          </b-field>
          <b-button icon-right="plus" type="is-primary" @click="addStep">
          </b-button>
        </div>
      </div>
      <div class="columns">
        <div class="column is-narrow ml-auto">
          <b-button
            type="is-primary"
            expanded
            size="is-medium"
            @click="updateRecipe"
            :loading="this.loading"
            :disabled="this.loading"
          >Save recipe</b-button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
  import { db, auth } from '../firebaseConfig.js'
  import { mapState } from 'vuex'

  export default {
    name: 'AddRecipe',
    data () {
      return {
        title: '',
        category: '',
        description: '',
        rating: 0,
        imageUrl: '',
        tags: [],
        prepTime: null,
        ingredientsRaw: '',
        ingredients: [],
        materials: [],
        comment: '',
        directions: [''],
        dropFiles: [],
        loading: false
      }
    },
    computed: {
      ...mapState({
        currentUser: 'currentUser'
      }),
      user () {
        return auth.currentUser
      }
    },
    methods: {
      deleteDropFiles (index) {
        this.dropFiles.splice(index, 1)
      },
      stepName (index) {
        let stepNr = index + 1
        return 'Step ' + stepNr.toString()
      },
      addStep () {
        this.directions.push('')
      },
      parseIngredients () {
        this.ingredients = this.ingredientsRaw.replace(/\r\n/g, '\n').split('\n')
      },
      updateRecipe () {
        this.loading = true

        let ingredientsList = []
        this.ingredients.forEach(item => {
          if (item !== '') {
            ingredientsList.push(item)
          }
        })
        let recipe = {
          title: this.title,
          category: this.category,
          description: this.description,
          rating: this.rating,
          imageUrl: this.imageUrl,
          tags: this.tags,
          prepTime: this.prepTime,
          ingredients: ingredientsList,
          materials: this.materials,
          comment: this.comment,
          directions: this.directions,
          createdAt: new Date(),
          users: [this.user.uid]
        }
        let setDoc = db.collection('recipes').add(recipe)
            .then(docRef => {
              this.loading = false
              this.$buefy.toast.open({
                message: `Recipe saved successfully!`,
                type: 'is-dark',
                position: 'is-top-right',
                duration: 3000
              })
            })
      }
    },
    watch: {
      ingredientsRaw () {
        this.parseIngredients()
      },
      currentUser () {
        if (this.currentUser.categories) {
          this.category = this.currentUser.categories[0].name
        }
      }
    },
    mounted () {
    }
  }
</script>

<style lang="scss">
  .comment-input {
    textarea:not([rows]) {
      min-height: 133px;
    }
  }
</style>

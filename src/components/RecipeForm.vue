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
                v-model="form.title"
              ></b-input>
            </b-field>
          </div>

          <!--category-->
          <div class="column is-narrow">
            <b-field label="Category">
              <b-select
                v-model="form.category"
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
        </div>

        <div class="columns is-multiline">
          <!--description-->
          <div class="column" >
            <b-field label="Description">
              <b-input
                type="textarea"
                v-model="form.description"
                rows="4"
              ></b-input>
            </b-field>
          </div>

          <!--rating-->
          <div class="column is-narrow">
            <b-field label="Rating">
              <b-rate icon="heart" spaced v-model="form.rating"></b-rate>
            </b-field>
          </div>

          <!--tags-->
          <div class="column is-full">
            <b-field label="Tags">
              <b-taginput
                v-model="form.tags"
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
                v-model.number="form.prepTime"
              ></b-numberinput>
            </b-field>
          </div>
        </div>
      </div>

      <!--image-->
<!--      <div class="column is-5">-->
<!--        <b-field label="Image">-->
<!--          <b-upload v-model="form.dropFiles"-->
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
<!--            <span v-for="(file, index) in form.dropFiles"-->
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
            v-model="form.materials"
            ellipsis
            icon="blender"
            placeholder="Add required materials">
          </b-taginput>
        </b-field>

        <!--comment-->
        <b-field label="Comment">
          <b-input
            type="textarea"
            v-model="form.comment"
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
          v-for="(step, index) in form.directions"
          :label="stepName(index)"
          :key="'step' + index"
        >
          <b-input
            type="textarea"
            v-model.trim="form.directions[index]"
          ></b-input>
        </b-field>
      </div>
      </div>
    <div class="columns">
      <div class="column is-narrow">
        <b-button
          icon-left="plus"
          type="is-primary"
          @click="addStep"
          size="is-medium"
          expanded
          outlined>
          Add a step
        </b-button>
      </div>
    </div>
    <div class="columns">
      <div class="column is-narrow ml-auto">
        <b-button
          icon-left="cloud-upload-alt"
          type="is-primary"
          expanded
          size="is-medium"
          @click="save"
          :loading="this.loading"
          :disabled="this.loading"
        >Save recipe</b-button>
      </div>
    </div>
  </form>
</template>

<script>
  import { mapState } from 'vuex'
  import { auth } from '../firebaseConfig'

  export default {
    name: 'RecipeForm',
    props: {
      loading: {
        type: Boolean,
        required: true
      },
      editing: {
        type: Boolean
      }
    },
    data () {
      return {
        form: {
          title: '',
          category: '',
          description: '',
          rating: 0,
          imageUrl: '',
          tags: [],
          prepTime: null,
          ingredients: [],
          materials: [],
          comment: '',
          directions: [''],
          dropFiles: [],
        },
        ingredientsRaw: '',
      }
    },
    computed: {
      ...mapState({
        currentUser: 'currentUser',
        recipes: 'recipes'
      }),
      user () {
        return auth.currentUser
      }
    },
    methods: {
      deleteDropFiles (index) {
        this.form.dropFiles.splice(index, 1)
      },
      stepName (index) {
        let stepNr = index + 1
        return 'Step ' + stepNr.toString()
      },
      addStep () {
        this.form.directions.push('')
      },
      parseIngredients () {
        this.form.ingredients = this.ingredientsRaw.replace(/\r\n/g, '\n').split('\n')
      },
      save () {
        let ingredientsList = []
        this.form.ingredients.forEach(item => {
          if (item !== '') {
            ingredientsList.push(item)
          }
        })
        this.form.ingredients = ingredientsList
        this.$emit('save-form', this.form)
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
      if (this.editing) {
        let recipe = this.recipes.find(rec => rec.id === this.$route.params.id)
        this.form = recipe
        let ingr = recipe.ingredients.toString()
        this.ingredientsRaw = ingr.replace(/,/g, "\n")
      }
    }
  }
</script>

<style scoped lang="scss">

</style>

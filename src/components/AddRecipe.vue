<template>
  <section class="section">
    <div class="content">
      <h1>Add a recipe</h1>
    </div>
    <form>
      <div class="content">
        <h3>Details</h3>
      </div>
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
            <div class="column is-full">
              <b-field label="Description">
                <b-input
                  type="textarea"
                  v-model="description"
                  rows="2"
                ></b-input>
              </b-field>
            </div>
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
            <div class="column is-6">
              <b-field label="Preparation time in minutes">
                <b-numberinput
                  v-model="prepTime"
                ></b-numberinput>
              </b-field>
            </div>
          </div>
        </div>

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
      <div class="columns">
        <div class="column is-half">
          <b-field label="Ingredients">
            <b-input
              type="textarea"
              v-model="ingredients"
              rows="8"
              placeholder="Add one ingredient per line"
            ></b-input>
          </b-field>
        </div>
        <div class="column is-half">
          <b-field label="Materials">
            <b-taginput
              v-model="materials"
              ellipsis
              icon="blender"
              placeholder="Add required materials">
            </b-taginput>
          </b-field>
          <b-field label="Comment">
            <b-input
              type="textarea"
              v-model="comment"
              class="comment-input"
            ></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="content">
            <h3>Directions</h3>
          </div>
          <b-field
            v-for="(step, index) in prepSteps"
            :label="stepName(index)"
            :key="'step' + index"
          >
            <b-input
              type="textarea"
              v-model="prepSteps[index]"
            ></b-input>
          </b-field>
          <b-button icon-right="plus" type="is-primary" @click="addStep">
          </b-button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
  const fb = require('@/firebaseConfig.js')
  export default {
    name: 'AddRecipe',
    data () {
      return {
        title: '',
        prepTime: null,
        tags: [],
        description: '',
        ingredients: '',
        materials: [],
        dropFiles: [],
        prepSteps: [''],
        comment: ''
      }
    },
    computed: {},
    methods: {
      deleteDropFiles (index) {
        this.dropFiles.splice(index, 1)
      },
      stepName (index) {
        let stepNr = index + 1
        return 'Step ' + stepNr.toString()
      },
      addStep () {
        this.prepSteps.push('')
      }
    },
    mounted () {
      fb.db.ref('recipes').on('value', snapshot => {
        this.$store.commit('addRecipe', snapshot.val())
      })
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

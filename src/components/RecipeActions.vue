<template>
  <div class="columns justify-content-end actions is-marginless">
    <div class="column is-narrow">
      <div class="button-group">
        <b-button v-if="editing && id"
                  icon-left="times"
                  type="is-primary"
                  outlined
                  inverted
                  @click="stopEditing(id)"
        >
          Stop editing
        </b-button>
        <b-button v-if="!editing && id && !friendId"
                  icon-left="pen-alt"
                  type="is-primary"
                  outlined
                  inverted
                  @click="editRecipe(id)"
        >
          Edit recipe
        </b-button>
        <b-button v-if="!editing && id && friendId"
                  icon-left="copy"
                  type="is-primary"
                  outlined
                  inverted
                  @click="copyRecipe(id)"
        >
          Copy recipe
        </b-button>
        <b-button
          v-else-if="editing || !id"
          icon-left="cloud-upload-alt"
          type="is-primary"
          outlined
          inverted
          @click="save"
          :loading="this.loading"
          :disabled="this.loading"
        >Save recipe
        </b-button>
        <b-button icon-left="trash"
                  type="is-primary"
                  outlined
                  inverted
                  @click="deletePrompt(id)"
                  v-if="id"
        >
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex'
  import { eventBus } from '../services/event-bus'

  export default {
    name: 'RecipeActions',
    props: {
      id: '',
      friendId: ''
    },
    data () {
      return {
        loading: false
      }
    },
    computed: {
      ...mapState({
        recipes: 'recipes',
        recipe: 'currentRecipe',
        editing: 'editing'
      }),
    },
    methods: {
      ...mapMutations({
        setEditing: 'setEditing',
        isMobile: 'isMobile'
      }),
      ...mapActions({
        deleteRecipe: 'deleteRecipe',
        parseRecipe: 'parseRecipe'
      }),
      editRecipe (id) {
        this.$router.push({ name: 'edit-recipe', params: { recipeId: id } })
      },
      copyRecipe () {
        this.save()
      },
      stopEditing (id) {
        this.setEditing({ editing: false})
        this.$router.push({ name: 'recipe', params: { recipeId: id } })
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
              type: 'is-success',
              position: this.isMobile? 'is-bottom' : 'is-top-right',
              duration: 3000
            })
            this.$router.push({ name: 'recipes' })
          })
        })
      },
      save () {
        this.parseRecipe().then(() => {
          this.editing ? eventBus.$emit('update-recipe', this.recipe) : eventBus.$emit('add-recipe', this.recipe)
        })
      }
    },
    watch: {}
  }
</script>

<style scoped lang="scss">
  .actions {
    position: sticky;
    top: 0;
    z-index: 40;
    background: $primary;
    justify-content: flex-end;
  }
  .button-group {
    display: flex;
    justify-content: flex-end;
  }
</style>

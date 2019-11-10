<template>
  <v-container d-flex>
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="12" md="6">
        <v-form @submit="register">
          <h2>Register</h2>
          <v-col cols="12">
            <v-text-field
              label="Email"
              placeholder="user@email.com"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Password"
              placeholder="**********"
              outlined
            ></v-text-field>
          </v-col>
        </v-form>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Login',
    methods: {
      register () {
        console.log('registering')
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    min-height: 100vh;
  }
</style>

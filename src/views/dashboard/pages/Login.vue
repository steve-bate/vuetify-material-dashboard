<template>
  <v-app>
    <v-main>
      <div class="l-auth">
        <v-form v-model="validLogin">
          <v-text-field
            v-model="credentials.username"
            label="Username"
            prepend-icon="mdi-account"
            :rules="rules"
            required
            color="light-blue lighten-"
          />

          <v-text-field
            v-model="credentials.password"
            label="Password"
            prepend-icon="mdi-lock"
            :rules="rules"
            :append-outer-icon="loginPasswordVisible ? 'mdi-flashlight' : 'mdi-flashlight-off'"
            :type="loginPasswordVisible ? 'text' : 'password'"
            color="light-blue lighten-1"
            required
            autocomplete
            @click:append-outer="() => (loginPasswordVisible = !loginPasswordVisible)"
          />

          <v-btn
            block
            rounded
            color="light-blue lighten-1"
            @click.native="submitAuthentication()"
          >
            Login
          </v-btn>

          <v-btn
            block
            rounded
            text
            style="color: lightgray"
            @click.native="signUpVisible = true"
          >
            Create account
          </v-btn>

        </v-form>
      </div>

      <div
        v-if="signUpVisible"
        class="l-signup"
      >
        <v-form
          v-model="validSignUp"
        >
          <v-text-field
            v-model="newUser.username"
            label="Username"
            prepend-icon="mdi-account"
            :rules="rules"
            required
            color="light-blue lighten-1"
          />

          <v-text-field
            v-model="newUser.password"
            label="Password"
            prepend-icon="mdi-lock"
            :rules="rules"
            :append-icon="signUpPasswordVisible ? 'mdi-flashlight' : 'mdi-flashlight-off'"
            :append-icon-cb="() => (signUpPasswordVisible = !signUpPasswordVisible)"
            :type="signUpPasswordVisible ? 'text' : 'password'"
            color="light-blue lighten-1"
            required
          />

          <v-btn
            block
            color="light-blue lighten-1"
            @click.native="submitSignUp()"
          >
            Sign Up
          </v-btn>
        </v-form>
      </div>

      <v-snackbar
        v-model="snackbar"
        timeout="6000"
        bottom="bottom"
        color="red lighten-1"
      >
        {{ message }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        snackbar: false,
        validLogin: false,
        validSignUp: false,
        signUpVisible: false,
        loginPasswordVisible: false,
        signUpPasswordVisible: false,
        rules: [(value) => !!value || 'This field is required'],
        credentials: {
          username: '',
          password: '',
        },
        newUser: {
          username: '',
          password: '',
        },
        message: '',
      }
    },
    methods: {
      submitAuthentication () {
        console.log(`submitAuthentication: user=${this.credentials.username}, pass=${this.credentials.password}`)
      },
    },
  }
</script>

<style lang="scss">
@import "../../../assets/styles.scss";

.l-auth {
  background-color: $background-tint;
  padding: 15px;
  margin: 45px auto;
  min-width: 272px;
  max-width: 320px;
  animation: bounceIn 1s forwards ease;
}

.l-signup {
  background-color: $background-tint;
  padding: 15px;
  margin: 45px auto;
  min-width: 272px;
  max-width: 320px;
  animation: slideInFromLeft 1s forwards ease;
}

.v-main {
  font-family: helvetica;

  background: url('../../../assets/login.jpg') no-repeat center center fixed;

  &::after {
    content: '';
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: $background-tint;
    opacity: .3;
    z-index: 1;
  }
}
</style>

<template>
  <div class="center aligned column signup">
    <h2 class="ui teal center aligned header">
      Get your account
    </h2>
    <Notification :message="alert" v-if="alert" />
    <form class="ui large form" method="post" @submit.prevent="submitForm">
      <div class="ui raised segment">
        <div class="field signup" :class="{error: validationErrors.username }">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input v-model="username" @blur="usernameHandler" name="username" placeholder="User Name" type="text" />
          </div>
          <label class="ui left aligned container" v-if="validationErrors.username" v-text="validationErrors.username" />
        </div>
        <div class="field signup" :class="{error: validationErrors.email }">
          <div class="ui left icon input">
            <i class="envelope icon"></i>
            <input v-model="email" @blur="emailHandler" name="email" placeholder="E-mail address" type="text" />
          </div>
          <label class="ui left aligned container" v-if="validationErrors.email" v-text="validationErrors.email" />
        </div>
        <div class="field signup" :class="{error: validationErrors.password }">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input v-model="password" @blur="passwordHandler" name="password" placeholder="Password" type="password" />
          </div>
          <label class="ui left aligned container" v-if="validationErrors.password" v-text="validationErrors.password" />
        </div>
        <button type="submit" class="ui fluid large teal button signup">
                Sign Up
              </button>
      </div>
      <div class="ui error message"></div>
    </form>
    <div class="ui message">Have an account?
      <nuxt-link to="/login">Login</nuxt-link>
    </div>
  </div>
</template>

<style>
  .column.signup {
    max-width: 450px;
  }
  .ui.left.icon.input {
    margin-bottom: 0px !important;
  }
</style>

<script>
  export default {
    name: 'SignupForm',
    data() {
      return {
        username: '',
        email: '',
        password: '',
        alert: null,
        validationErrors: {
          username: '',
          email: '',
          password: '',
        }
      };
    },
    methods: {
      submitForm() {
        if (this.validateForm()) {
          this.$store.dispatch('auth/signup', {
            username: this.username,
            email: this.email,
            password: this.password
          }).then(result => {
            this.alert = {
              type: 'success',
              message: 'Welcome'
            }
            this.$router.push('/admin')
          }).catch(error => {
            if (error.response && error.response.data) {
              this.alert = {
                type: 'error',
                message: error.response.data.message || error.reponse.status
              }
            }
          })
        }
      },
      usernameHandler() {
        if (this.username === '') {
          this.validationErrors.username = 'Please enter user name.'
          return false
        } else if (this.username.length < 3) {
          this.validationErrors.username = 'User name must be at least 3 characters'
          return false
        } else {
          this.validationErrors.username = ''
          return true
        }
      },
      emailHandler() {
        if (this.email === '') {
          this.validationErrors.email = 'Please enter email.'
          return false
        } else if (!this.isValidEmailAddress(this.email)) {
          this.validationErrors.email = 'Please enter a valid email'
          return false
        } else {
          this.validationErrors.email = ''
          return true
        }
      },
      passwordHandler() {
        if (this.password === '') {
          this.validationErrors.password = 'Please enter password.'
          return false
        } else if (this.password.length < 6) {
          this.validationErrors.password = 'Password must be at least 6 characters'
          return false
        } else {
          this.validationErrors.password = ''
          return true
        }
      },
      isValidEmailAddress(emailAddress) {
        const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return pattern.test(emailAddress)
      },
      validateForm() {
        const usernameValidation = this.usernameHandler()
        const emailValidation = this.emailHandler()
        const passValidation = this.passwordHandler()
        if (usernameValidation && emailValidation && passValidation) return true
        else return false;
      }
    }
  }
</script>
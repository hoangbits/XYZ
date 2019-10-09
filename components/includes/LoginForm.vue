<template>
  <div class="center aligned column login">
    <h2 class="ui teal center aligned header">
      Log-in to your account
    </h2>
    <Notification :message="error" v-if="error" />
    <form class="ui large form" method="post" @submit.prevent="submitForm">
      <div class="ui raised segment">
        <div class="field login" :class="{error: validationErrors.email }">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input v-model="email" @blur="emailHandler" name="email" placeholder="E-mail address" type="text" />
          </div>
          <label class="ui left aligned container" v-if="validationErrors.email" v-text="validationErrors.email" />
        </div>
        <div class="field login" :class="{error: validationErrors.password }">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input v-model="password" @blur="passwordHandler" name="password" placeholder="Password" type="password" />
          </div>
          <label class="ui left aligned container" v-if="validationErrors.password" v-text="validationErrors.password" />
        </div>
        <button type="submit" class="ui fluid large teal button signup">
                Login
              </button>
      </div>
      <div class="ui error message" />
    </form>
    <div class="ui message">New to us?
      <nuxt-link to="/signup">Sign Up</nuxt-link>
    </div>
  </div>
</template>

<style>
  .column.login {
    max-width: 450px;
  }
  .ui.left.icon.input {
    margin-bottom: 0px !important;
  }
</style>

<script>
  export default {
    name: 'LoginForm',
    data() {
      return {
        email: '',
        password: '',
        error: null,
        validationErrors: {
          email: '',
          password: '',
        }
      };
    },
    methods: {
      submitForm() {
        if (this.validateForm()) {
          this.$store.dispatch('auth/login', {
            identifier: this.email,
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
      emailHandler() {
        if (this.email === '') {
          this.validationErrors.email = 'Please enter email.'
          return false;
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
        const emailValidation = this.emailHandler();
        const passValidation = this.passwordHandler();
        if (emailValidation && passValidation) {
          return true
        } else return false
      }
    }
  }
</script>
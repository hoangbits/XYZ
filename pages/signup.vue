<template>
  <div class="ui three column centered grid signup">
    <div class="column">
      <div class="ui card container">
        <h2 class="center aligned">Sign Up</h2>
        <Notification :message="error" v-if="error" />
        <form method="post" @submit.prevent="register">
          <div class="field">
            <label>User Name</label>
            <div class="ui left icon input">
              <input type="text" v-model="username" required placeholder="JoDoe">
              <i class="user icon"></i>
            </div>
          </div>
          <div class="field">
            <label>Email</label>
            <div class="ui left icon input">
              <input type="email" v-model="email" required placeholder="me@myemail.com">
              <i class="envelope icon"></i>
            </div>
          </div>
          <div class="field">
            <label>Password</label>
            <div class="ui left icon input">
              <input type="password" placeholder="password" v-model="password" required>
              <i class="lock icon"></i>
            </div>
          </div>
          <div class="ui two column centered grid signupButton">
            <div class="column">
              <button type="submit" class="ui primary button signup">
                Sign Up
              </button>
            </div>
          </div>
        </form>
        <div class="right aligned login-text-area">
          Already have an account?
          <nuxt-link to="/signin">Login</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Signup',
    data() {
      return {
        username: '',
        email: '',
        password: '',
        error: null,
      };
    },
    methods: {
      async register() {
        try {
          await this.$axios.post('auth/local/register', {
            username: this.username,
            email: this.email,
            password: this.password,
          });
          this.$router.push('/admin');
        } catch (e) {
          this.error = e.response.data.message[0].messages[0].message;
        }
      },
    },
  }
</script>

<style>
  .ui.three.column.centered.grid.signup {
    width: 100%;
    height: calc(100vh - 60px);
  }
  .ui.card.container {
    margin-top: 100px;
    padding: 30px;
  }
  .ui.left.icon.input {
    width: 100%;
    margin-bottom: 20px;
  }
  .ui.primary.button.signup {
    min-width: 150px;
    margin-top: 10px;
    width: 100%;
  }
  .login-text-area {
    padding-top: 30px;
  }
</style>


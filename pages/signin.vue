<template>
  <div class="ui three column centered grid login">
    <div class="column">
      <div class="ui card container">
        <h2 class="center aligned">Login</h2>
        <Notification :message="error" v-if="error" />
        <form method="post" @submit.prevent="login">
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
          <div class="right aligned forgot-password-text-area">
            <nuxt-link to="/reset-password">Forgot password?</nuxt-link>
          </div>
          <div class="ui two column centered grid loginButton">
            <div class="column">
              <button type="submit" class="ui primary button login">
                    Login
                  </button>
            </div>
          </div>
        </form>
        <div class="right aligned login-text-area">
          Have a new account?
          <nuxt-link to="/signup">Sign Up</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        error: null,
      };
    },
    methods: {
      async register() {
        try {
          await this.$axios.post('auth/local', {
            email: this.email,
            password: this.password,
          });
          this.$router.push('/admin');
        } catch (e) {
          this.error = e.response.data.message;
        }
      },
    },
  }
</script>

<style>
  .ui.three.column.centered.grid.login {
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
  .ui.primary.button.login {
    margin-top: 10px;
    width: 100%;
  }
  .ui.primary.button.login {
    min-width: 150px;
  }
  .login-text-area {
    padding-top: 30px;
  }
</style>
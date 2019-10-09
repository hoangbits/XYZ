<template>
  <div>
    <div class="ui middle aligned center aligned grid">
      <SignupForm />
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
  .ui.middle.aligned.center.aligned.grid {
    width: 100%;
    height: calc(100vh - 60px);
  }
</style>


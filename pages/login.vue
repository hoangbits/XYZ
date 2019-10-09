<template>
  <div>
    <div class="ui middle aligned center aligned grid">
      <LoginForm />
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
    },
  }
</script>

<style>
  .ui.middle.aligned.center.aligned.grid {
    width: 100%;
    height: calc(100vh - 60px);
  }
</style>
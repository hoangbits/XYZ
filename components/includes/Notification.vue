<template>
  <div class="ui red message">
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: 'Notification',
    props: ['message'],
  };
</script>

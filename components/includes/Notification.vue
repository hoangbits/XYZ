<template>
  <div class="ui warning message transition hidden">
    <i class="close icon"></i> {{ message }}
  </div>
</template>

<script>
  export default {
    name: 'Notification',
    props: ['message'],
  };
</script>

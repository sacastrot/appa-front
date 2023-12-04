<script setup lang="ts">
const {data} = defineProps<{
  data: {
    title: string,
    message: string,
  }
}>();
</script>

<template>
  <div class="header-container">
    <div class="logo"></div>
    <h1 class="title">{{data.title}}</h1>
    <p class="message">{{data.message}}</p>
  </div>
</template>

<style scoped>

.header-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  width: 100%;

  .logo {
    height: 10rem;
    width: 10rem;
    background: url("/img/Logo-update-location.svg") no-repeat;
    background-size: cover;
    margin-bottom: 2.5rem;
  }
  .message{
    font-size: 1.5rem;
    color: var(--primary-text);
    text-align: center;
  }
}

</style>
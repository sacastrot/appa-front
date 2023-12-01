<script setup lang="ts">
</script>
<template>
  <div class="loader">

  </div>
</template>
<style scoped>
.loader {
  position: absolute;
  left: calc(50%);
  top: calc(50%);
  z-index: 1;
  width: 60px;
  height: 60px;
  margin: -76px 0 0 -76px;
  border: 10px solid var(--color-primary-orange);
  border-radius: 50%;
  border-top: 10px solid var(--color-primary-orange);
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
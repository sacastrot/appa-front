<script setup lang="ts">

</script>

<template>
  <div class="card">
    <div class="thumbnail"></div>
      <p></p>
  </div>

</template>

<style scoped>
.card {
  display: flex;
  align-items: center;
  background-color: var(--input-field);
  width: 80rem;
  height: 80px;
  border-radius: 6px;
}

.thumbnail {
  position: relative;
  float: left;
  height: 100%;
  width: 15%;
  border-radius: 6px 0 0 6px;
}

p {

  width: 40%;
  height: 50%;
  margin: 10px 60px 0 20px;
}

.card * {
  background: linear-gradient(
      120deg,
      #e5e5e5 30%,
      #f0f0f0 38%,
      #f0f0f0 40%,
      #e5e5e5 48%
  );
  background-size: 200% 100%;
  background-position: 100% 0;
  animation: load 2s infinite;
}

@keyframes load {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
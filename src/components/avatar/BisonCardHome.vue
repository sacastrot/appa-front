<script setup lang="ts">
const {name, email} = defineProps(['name', 'email']);
</script>

<template>
  <div class="card">
    <div class="squared">
      <img src="/img/logo-white.svg" alt="Bisonte" />
    </div>
    <div class="rotate"></div>
    <div class="content">
      <p class="has-text-weight-bold"> {{ name }}</p>
      <p>{{ email }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  margin-bottom: 2rem;
  margin-top: 2rem;
  height: 8rem;
  border-radius: 1em;
  z-index: 1;
  overflow: hidden;
  align-items: center;
  & p {
    margin-left: 3%;
    margin-bottom: 0;
  }

  .squared {
    position: relative;
    width: 25%;
    height: 100%;
    background-color: var(--color-primary-orange);
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;
    z-index: 2;
    & img {
      width: 60%;
      height: 60%;
      margin-right: 20%;
    }
    @media (max-width: 767px) {
      width: 37%;
      & img {
        width: 50%;
        height: 50%;
        margin-right: 35%;
      }
    }
  }
  .rotate {
    position: absolute;
    margin-left: 1.5rem;
    left: 25%;
    width: 0;
    height: 0;
    border-right: 5rem solid transparent;
    border-top: 5rem solid transparent;
    border-left: 5rem solid white;
    border-bottom: 5rem solid white;
    transform: translateX(-45%) rotate(45deg);
    z-index: 3;
    border-bottom-left-radius: 0.8rem;
    @media (max-width: 767px) {
      left: 34.5%;
    }
  }

  .content {
    width: 80%;
    z-index: 1000;
    margin-top: 3%;
    margin-bottom: 3%;
    & p{
      font-size: 1.7rem;
    }
  }
}
</style>
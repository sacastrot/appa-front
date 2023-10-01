<script setup lang="ts">

</script>

<template>
  <form action="">
    <div class="form-header">
      <h1>Dimensiones</h1>
      <p>¿Cuánto mide el paquete que vamos a recoger?</p>
    </div>
    <div class="form-content">
      <div class="form-image">
        <figure class="image is-96x96">
          <img src="/stepper/package/package.png" alt="">
        </figure>
      </div>
      <div class="form-inputs">
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="number" placeholder="Height">
            <span class="icon is-small is-left">
            <fa icon="ruler-vertical"></fa>
          </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="number" placeholder="Width">
            <span class="icon is-small is-left">
            <fa icon="ruler"></fa>
          </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="number" placeholder="Length">
            <span class="icon is-small is-left">
            <fa icon="ruler-horizontal"></fa>
          </span>
          </p>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
form {
  .form-header{
    margin-bottom: 30px;
    text-align: center;

    & h1 {
      font-size: 1.6rem;
    }

    & p {
      font-size: 1.2rem;
    }
  }

  .form-content {
    margin: 0 auto;
    max-width: 80%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    .form-image {
      place-self: center;
      & figure {
        margin: 0;
      }
    }
    .form-inputs {
      justify-self: center;
      width: 90%;
      margin: 0 auto;

      .input {
        font-size: 1.2rem;
        background-color: var(--color-seconday-orange);
      }

    }
  }
}
</style>
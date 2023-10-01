<script setup lang="ts">

</script>

<template>
  <form action="">
    <div class="form-header">
      <h1>Ubicación</h1>
      <p>Ingrese el lugar de origen, y el lugar de destino del paquete</p>
    </div>
    <div class="form-content">
      <div class="form-inputs">
        <label class="label">Origen</label>
        <div class="select">
          <select>
            <option value="None">-- Seleccione una nación --</option>
            <option value="Air">Aire</option>
          </select>
        </div>
        <div class="select">
          <select>
            <option value="None">-- Seleccione un punto de control --</option>
            <option value="Air">Templo aire del norte</option>
          </select>
        </div>

        <div class="field">
          <label class="label">Destino</label>
          <p class="control has-icons-left">
            <input class="input is-medium" type="number" placeholder="Nación">
            <span class="icon is-large is-left">
              <fa icon="location-dot"></fa>
            </span>
          </p>
          <p class="control has-icons-left">
            <input class="input is-medium" type="number" placeholder="Punto de control">
            <span class="icon is-large is-left">
              <fa icon="location-dot"></fa>
            </span>
          </p>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
form {
  .form-header {
    max-width: 80%;
    margin: 0 auto 30px auto;
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

    .form-inputs {
      justify-self: center;
      width: 90%;
      margin: 0 auto;

      .select {
        & select {
          font-size: 1.2rem;
          background-color: var(--color-seconday-orange);

        }
      }

      .label {
        font-size: 1.2rem;
      }

      .input {
        font-size: 1.2rem;
        background-color: var(--color-seconday-orange);
      }


    }
  }
}
</style>
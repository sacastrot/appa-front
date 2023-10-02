<template>
    <header>
        <div class="image">
            <img src="src\assets\img\Logo-background-brown.svg" alt="Appa Logo brown background">
        </div>
        <h1>Hola, Toph Beifong</h1>
        <p>Bienvenido a la mejor aplicación de pedidos y acarreos.</p>
    </header>
    <main class="home-page">
        <div class="rastrear">
            <br>
            <h1 style="color: var(--primary-text)">Rastrear envío</h1>
            <div class="field">
                <p class="control has-icons-left">
                    <span class="icon is-left material-symbols-outlined">search</span>
                    <input class="input is-medium" type="text" placeholder="Número de guía">
                </p>
            </div>
        </div>
    </main>
</template>

<style scoped>
h1{
    font-size: 2.5rem;
    color: var(--title-section);
    font-weight: bold;
}

p {
    font-size: 2rem;
}

header .image {
    padding-top: 2rem;
    height: 12rem;
    width: 10rem;
}

.icon {
    padding-left: 0.5rem;
    padding-top: 0.8rem;
}

.control.has-icons-left .input {
    padding-left: 3rem;
    width: 50%;
    background-color: var(--input-field);
    font-size: 1.5rem;
}
</style>
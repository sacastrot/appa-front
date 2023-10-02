<template>
    <header>
        <div class="avatar">
            <div class="image">
                <img src="src\assets\img\Logo-background-brown.svg" alt="Appa Logo brown background">
            </div>
            <h1>Hola, </h1>
            <h1>Toph Beifong</h1>
        </div>
        <p>Bienvenido a la mejor aplicación de pedidos y acarreos.</p>
    </header>
    <main class="home-page">
        <div class="rastrear">
            <br>
            <h2>Rastrear envío</h2>
            <div class="field">
                <p class="control has-icons-left">
                    <span class="icon is-left material-symbols-outlined">search</span>
                    <input class="input is-medium" type="text" placeholder="Número de guía">
                </p>
            </div>
        </div>
        <div class="pedido">
            <br>
            <h2>Último pedido</h2>
        </div>
    </main>
</template>

<style scoped>
h1{
    font-size: 2.5rem;
    color: var(--title-section);
    font-weight: bold;
}

h2 {
    font-size: 2rem;
    color: var(--primary-text);
    font-weight: bold;
    padding: 1rem 1rem 1.5rem 0;
}

p {
    font-size: 1.7rem;
}

header .image {
    padding: 2rem 1.5rem 0 0;
    height: 12rem;
    width: 10rem;
}

.avatar {
    display: flex;
    align-items: center;
}

.icon {
    padding-left: 0.5rem;
    padding-top: 0.8rem;
}

.control.has-icons-left .input {
    padding-left: 3rem;
    width: 80rem;
    background-color: var(--input-field);
    font-size: 1.5rem;
}
</style>
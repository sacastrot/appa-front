<template>
    <header>
        <div class="avatar">
            <div class="image">
                <img src="src\assets\img\Logo-background-brown.svg" alt="Appa Logo brown background">
            </div>
            <h1>Hola,<br>Toph Beifong</h1>
        </div>
        <p>Bienvenido a la mejor aplicación de pedidos y acarreos.</p>
    </header>
    <main class="home-page">
        <div class="rastrear">
            <h2>Rastrear envío</h2>
            <div class="field">
                <p class="control has-icons-left">
                    <span class="icon is-left material-symbols-outlined">search</span>
                    <input class="input is-medium" type="text" placeholder="Número de guía">
                </p>
            </div>
        </div>
        <div class="pedido">
            <h2>Último pedido</h2>
            <div class="box">
                <div id="estado-pedido">
                    <p>Entregado</p>
                </div>
                <div id="detalle-pedido">
                    <p><b>Acarreo<br>Destino:</b> Nación del fuego<br>Entregado el: 15 de Septiembre de 2023</p>
                </div>
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

h2 {
    font-size: 2rem;
    color: var(--primary-text);
    font-weight: bold;
    padding: 3rem 1rem 1.5rem 0;
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
    box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02);
}

.box {
    background-color: var(--input-field);
    display: flex;
    padding: 0;
    /* width: 80rem; */
}

/* Fix the fact that to center the text it had to be done with padding, so rn it's not dynamic*/
.box #estado-pedido {
    background-color: var(--primary-button);
    padding: 1.25rem;
    border-radius: 0.6rem 0 0 0.6rem;
}

#estado-pedido p {
    color: var(--color-primary-white);
    font-size: 1.5rem;
    padding-top: 25%;
}

#detalle-pedido p {
    color: var(--primary-text);
    font-size: 1.25rem;
    padding: 1.25rem;
    width: 100%;
}
</style>
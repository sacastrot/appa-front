# Appa Frontend

Este archivo te ayuda a iniciar el proyecto desarrollado con Vue 3 en Vite.

## Setup de IDE recomendado

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (y
desactivar
Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Requisitos

1) [Node.js](https://nodejs.org/es/) (v18.17.1 o superior)
2) [npm](https://www.npmjs.com/) (v10.1.0 o superior)
3) [git](https://git-scm.com/) (v2.41.0 o superior)

## Setup del proyecto

### Clonar el repositorio

```sh
git clone https://github.com/sacastrot/appa-front.git
```

### Instalar dependencias

```sh
npm install
```

### Compilar y permitir Hot-Reload en desarrollo

```sh
npm run dev
```

## Credenciales

La aplicación cuenta con tres usuarios de prueba:

| Correo electrónico | Contraseña | Rol                 |
|--------------------|------------|---------------------|
| aang@appa.com      | Aang*1234  | Avatar              |
| katara@appa.com    | Katara*234 | Habitante de nación |
| appa@appa.com      | Appa*1234  | Bisonte             |

## Función de cada rol

| Rol                 | Función                                                                                                                                                                                |
|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Avatar              | Puede ver, crear y eliminar bisontes además de editar o eliminar su cuenta                                                                                                             |
| Habitante de nación | Puede calcular un estimado del valor de un paquete, ver historial de paquetes y acarreos, solicitar paquetes y acarreos, editar o eliminar su cuenta                                   |
| Bisonte             | Puede ver el historial de paquetes y acarreos, editar su cuenta, ver su pedido asginado actual, actualizar la ubicación del pedido o el paquete, y definir el precio final del acarreo |

## Contraseña de Bisontes

Cuando un avatar registra un bisonte el sistema asigna una contraseña compuesta por la placa del vehiculo y el id del bisonte, por ejemplo: 

| Placa | ID | Contraseña |
|-------|----|------------|
| BC4   | 12 | BC412      |
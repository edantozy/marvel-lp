# Proyecto Marvel LP hecho con React + TypeScript + Vite

Proyecto realizado con la API de Marvel.

Este proyecto utiliza un archivo data.json para la autenticación, por lo que no es posible registrarse, solo iniciar sesión. Los usuarios son:

- user: john@doe.com -> password: password
- user: jane@doe.com -> password: password

## Funcionalidades

- Es posible visualizar personajes y comics en un listado paginado que implementa la búsqueda. Es importante mencionar que la búsqueda solo funciona si se realiza con las palabras iniciales de un personaje. Por ejemplo: para "Spider Man" la búsqueda que funcionaría es "Spi", si se intenta buscar "der" no aparecerá el resultado.

- La búsqueda realizada se guarda en localstorage para poder regresar a la página del listado y esta sea conservada.

- También es posible añadir a favoritos los personajes cuando se está autenticado. Desafortunadamente como solo es un proyecto de React sin backend, no es posible añadirlos al archivo data.json. Solamente se guardan en el estado de Redux.

## Ejecutar el proyecto en local
Para ejecutar el proyecto en local, ejecute:
```bash
   npm install
```
Seguido de:
```bash
   npm run dev
```
Finalmente visualice la dirección que aparece en la consola.

## Ejecutar el proyecto en producción
Para ejecutar el proyecto en producción, ejecute:
```bash
   npm install
```

Después ejecute:
```bash
   npm run build
```

Seguido de:
```bash
   npm run preview
```

Finalmente visualice la dirección que aparece en la consola.

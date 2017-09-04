## App Dark Sky

# Framework FullStack MeteorJS

Instalacion de MeteorJS:

```
$ curl https://install.meteor.com/ | sh
``` 

Instalacion de paquetes NPM:

```
$ meteor npm install
```

# Ejecucion del servidor de la aplicación

```
$ meteor 

# Redis NPM

Para el motor de base de datos en memoria.

# Fibers NPM

Para el control de las promises de meteor.

# Forecast NPM

Proporciona una API para múltiples proveedores de tiempo y devuelve los resultados como un objeto normalizado.

# Babel Runtime

Se usa para transpilar el codigo de la aplicación.

# FrontEnd

Uso de Spacesbars y Materialize para el diseño de la aplicación.

# Reactive Vars y Session Vars

Las variables de sesión se usan para almacenar datos reactivos en la aplicación y funcionan utilizando pares "clave/valor".

Reactive Vars se destinan para almacenar valores individuales de cualquier tipo en este caso datos locales, específicamente a nivel de cambios en la plantilla.

# Heroku

https://dark-sky-app.herokuapp.com/

Con relación a este ultimo punto no logre estabilizar la aplicación en el servidor dado que requiere como configuración "addons heroku-redis" y como no dispongo de tarjeta de credito la App Heroku no me permitio hacer uso del plugin o extensión. 

```
$ heroku-redis:hobby-dev
```
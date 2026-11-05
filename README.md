# Trabajo práctico 06
## Proyecto de partida y cambios
El proyecto de partida fue el Trabajo Práctico Nº 5, el cual es un programa que permite leer un catálogo de reservas de salas de estudios  desde una constante reservas definido en el index.js como un arreglo de objetos. 
Este programa permite leer el contenido de reservas, cuyo contenido es utilizado a traves del servidor express, para poder mostrar con distintos EndPoints como ser: 
* Listado de todas las reservas.
* Mostrar el detalle de una reserva seleccionada (especificada por id en el endpoint).
* Agregar una nueva reserva. 

Las distintas funciones, endpoints y middleware estaban definidos en el archivo index.js.
Al separa en módulos, las mismas fueron reubicadas en carpetas de acuerdo a la misión que cumplen, como ser: rutas (deifne el router y los endpoints), middleware (validaciones y solicitudes), controlador (renderiza las vistas) y servicios (interacción con los datos). En el index se crea los servicios de reserva, que luego es parametro al invocar la funcion app.js, en la que se crea el controlador (utilizando el servicio creado como parámetro), para poder acceder a los endponits mediante las rutas establecidas utilizando la libreria Router de Express. También utiliza configuracion.js donde esta definido el puerto a utilizar, como el formato del registro para morgan. 


## Instalación
Para poder ejecutar el programa en cualquier PC, se descargan los archivos del repositorio, luego abrir la carpeta en Visual Studio, abrir una terminal haciendo click en la barra de Menú en los 3 puntos("...") que aparecen al final, seleccionar el submenú "Terminal", y dentro del submenú que se despliega elegir la Opcion "Nuevo terminal".
Al abrirse en la parte inferior de la ventana de Visual Studio la terminal, ahi escribir lo siguiente:
"npm install", esto creará una carpeta llamada "node_modules" la cual contendrá las dependencias incluidas en el archivo "package.json".

## Ejecución
Para poder ejecutarlo se debe abrir una terminal haciendo click en la barra de Menú en los 3 puntos("...") que aparecen al final, seleccionar el submenú "Terminal", y dentro del submenú que se despliega elegir la Opcion "Nuevo terminal".
Al abrirse en la parte inferior de la ventana de Visual Studio la terminal, ahi escribir lo siguiente: "npm run check" (chequea que las rutas del proyecto esten correctas y existan), y para ejecutar el programa escribir "npm start" y presionar la tecla Enter, esto ejecutará el programa que levantar el servidor en el puerto 3000 (direccion de acceso: http://localhost:3000/). Ambos son scripts que realizan las funciones descriptas anteriormente.
Para detener el servidor se debe presionar las teclas CTRL + C.

## Configuración del entorno
En este apartado se utiliza el archivo configuracion.js, de donde se puede extraer la configuración por entorno como son los valores de la variable PORT (se evalua que sea un avlor entre 1 y 65535, si no se carga nada pone por defecto el valor 3000 para la constante puerto), y para configurar morgan, se utyiliza una constante llamda formatoRegistro, donde se establece el valor por defecto como "dev".

## Mapa de módulos y dependencias
tp-06-salas-modular/
* -- public/                   # conservar CSS y otros recursos
* -- views/                    # conservar layout y vistas
* -- src/
*   |-- index.js              # crea dependencias y arranca
*   |-- app.js                # configura Express y monta routers
*   |-- configuracion.js      # procesa process.env
*   |-- rutas/reservas.js
*   |-- controladores/reservas.js
*   |-- servicios/reservas.js
*   `-- middleware/
*       |-- solicitudes.js    # ID y tiempo
*       `-- reservas.js       # sección y validación
* -- .env.example
* -- .gitignore
* -- eslint.config.js
* -- package.json
* -- package-lock.json
* -- README.md

## Pipeline y contrato de rutas
POST /reservas
  ↓ morgan("dev")
  ↓ identificarSolicitud
  ↓ medirDuracion
  ↓ expressLayouts
  ↓ express.urlencoded
  ↓ crearRouterReservas (router)
  ↓ prepararAreaReservas
  ↓ validarReserva
  ↓ crear (controlador.crear() - Crear Reserva)
  ↓ 302 /reservas
  ↓ finish: ID + estado + duración

## Contrato de rutas
* GET: http://localhost:3000/ (Pagina de Inicio)
* GET: http://localhost:3000/estado (Responde un JSON con datos de la aplicacion)
* GET: http://localhost:3000/reservas (Listado de reservas)
* GET: http://localhost:3000/reservas/nueva (Formulario para cargar una nueva reserva)
* GET: http://localhost:3000/reservas/:id (Detalle de una reserva seleccionada)
* POST: http://localhost:3000/reservas (Envio de datos del Formulario para guardar la nueva reserva)
* GET  /css/estilos.css
* otra URL

 ## Diagrama del POST inválido
  POST /reservas
  ↓ morgan("dev")
  ↓ identificarSolicitud
  ↓ medirDuracion
  ↓ expressLayouts
  ↓ express.urlencoded
  ↓ reservasRouter
  ↓ prepararAreaReservas
  ↓ validarReserva (Termina en esta funcion, al Validar algun dato y el mismo falta o no cumple las condiciones del middleware)
  ↓ 400 /reservas
  ↓ finish: ID + estado + duración

## Alcance de cada función
* identificarSolicitud: Permite identificar cada solicitud con un número.
* medirDuracion: Permite medir la duración de una petición o proceso.
* prepararAreaReservas: Indica que la seccion donde nos encontramos.
* validarReserva: Valida los datos enviados desde el formulario de nuevas reservas.
* crearReserva: Crea la reserva si los datos ingresados de la misma son válidos.

## Validación
Valida los datos enviados desde el formulario de nuevas reservas, a traves del middleware "validarReserva".
Validaciones: 
    * Si se cargo el nombre del estudiante 
    * Que el email incluya @
    * Si la sala seleccionada sea una opción de las listadas en el arreglo salasPermitidas.
    * Que la fecha este ingresada
    * Si el turno seleccionado sea una opción de los listados en el arreglo turnosPermitidos.
    * Si el numero de personas ingresado es un numero y que su valor sea >=1 y <=6

## Matriz antes/después
Inicio - Estado: 200 - Navegación y solicitud ID (http://localhost:3000/)
Estado - Estado: 200 - JSON con cantidad e ID (http://localhost:3000/estado)
Listado - Estado: 200 - Cuatro o más reservas (http://localhost:3000/reservas)
Detalle inexistente - Estado: 404 - Página HTML (http://localhost:3000/reservas/:id) (id inexistente)
Formulario - Estado: 200 - Controles etiquetados (http://localhost:3000/reservas/nueva)
POST vacio - Estado: 400 - Error - sin alta (http://localhost:3000/reservas)
Sala no permitida - Estado: 400 - No se crea registro (http://localhost:3000/reservas)
Email sin @ - Estado: 400 - No se crea registro (http://localhost:3000/reservas)
Personas igual a 0 - Estado: 400 - No se crea registro (http://localhost:3000/reservas)
Personas igual a 7 - Estado: 400 - No se crea registro (http://localhost:3000/reservas)
POST válido - Estados: 302 y luego 200 - Nueva tarjeta (http://localhost:3000/reservas)
URL inexistente - Estado: 404 - Middleware final (http://localhost:3000/reservas123)
Reinicio - Estado: 200 - Regreso a datos iniciales (http://localhost:3000/reservas)
Puerto alternativo - Estado: 200 - Responde el puerto configurado
Puerto inválido - Estado: No inicia. 

## Formato y análisis estático
* npm install --save-dev prettier eslint @eslint/js
* Agregar scripts sin borrar los existentes:
{
  "scripts": {
    "start": "node src/index.js",
    "start:local": "node --env-file=.env src/index.js",
    "format": "prettier --write src",
    "format:check": "prettier --check src",
    "lint": "eslint src",
    "check": "npm run format:check && npm run lint"
  }
}

* eslint.config.js para CommonJS:
const js = require("@eslint/js");
module.exports = [
  {
    files: ["src/**/*.js"],
    ...js.configs.recommended,
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        __dirname: "readonly",
        console: "readonly",
        module: "readonly",
        process: "readonly",
        require: "readonly",
      },
    },
  },
];

* npm run format

> format
> prettier --write src
src/app.js 56ms
src/configuracion.js 5ms
src/controladores/reservas.js 8ms
src/index.js 8ms
src/middleware/reservas.js 5ms
src/middleware/solicitudes.js 4ms
src/rutas/reservas.js 2ms
src/servicios/reservas.js 2ms

* npm run check

> check
> npm run format:check && npm run lint


> format:check
> prettier --check src

Checking formatting...
All matched files use Prettier code style!

> lint
> eslint src

## Persistencia temporal y límites
Al reiniciar el servidor solo se cargarán las reservas definidas en la constante reservas. 
Cuando se cree una nueva reserva, la misma estará guardada en memoria mientras el servidor este funcionando, de lo contrario si se reinicia, la/s nueva/s reserva/s no aparecerán. 


* Por qué el servicio no usa res
La capa de servicio no usa res ya que solo se encarga de la lógica del negocio(consultar bases de datos, calcular, procesar datos). No tiene que encragarse de entregar respuesta ya sea via HTTPB o de otra manera.  

*  Qué hace el controlador
El controlador es la función o clase encargada de gestionar la lógica de una petición HTTP específica cuando un cliente accede a una ruta.
  * Recibe la petición, captura los datos que envia el cliente, (parámetros en la URL, datos de un formulario o el cuerpo body de un JSON).
  * Se comunica la capa de servicio para consultar, guardar o modificar alguna información.
  * Devuelve el resultado al cliente, ya sea renderizando una vista HTML tradicional o enviando datos estructurados en formato JSON  

 Captura o deriva los errores que ocurren durante el procesamiento para que el servidor no se detenga y responda con un código de estado adecuado (como un 404 o 500).


* Por qué el router declara caminos relativos
Declara caminos relativos para permitir que los módulos sean portátiles, aislados y reutilizables.


* Dónde vive el único arreglo de reservas y que ocurrirá al reiniciar.
El arreglo de reservas se encuentra definido en el archivo index.js, y vive en memoria mientras se ejecuta el servidor. Al reiniciar el servidor solo se cargarán las reservas definidas en la constante reservas del archivo index.js.

* Comandos ejecutados y sus resultados:

* npm run format

> format
> prettier --write src
src/app.js 56ms
src/configuracion.js 5ms
src/controladores/reservas.js 8ms
src/index.js 8ms
src/middleware/reservas.js 5ms
src/middleware/solicitudes.js 4ms
src/rutas/reservas.js 2ms
src/servicios/reservas.js 2ms

* npm run check

> check
> npm run format:check && npm run lint


> format:check
> prettier --check src

Checking formatting...
All matched files use Prettier code style!

> lint
> eslint src

* npm start                 
                       
> start
> node src/index.js

Disponible en http://localhost:3000
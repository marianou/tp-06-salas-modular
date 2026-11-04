# Trabajo práctico 05
## Descripción
Programa que permite leer un catálogo de reservas de salas de estudios  desde una constante reservas definido en el index.js como un arreglo de objetos. 
Este programa permite leer el contenido de reservas, cuyo contenido es utilizado a traves del servidor express, para poder mostrar con distintos EndPoints como ser: 
* Listado de todas las reservas.
* Mostrar el detalle de una reserva seleccionada (especificada por id en el endpoint).
* Agregar una nueva reserva. 

## Instalación
Para poder ejecutar el programa en cualquier PC, se descargan los archivos del repositorio, luego abrir la carpeta en Visual Studio, abrir una terminal haciendo click en la barra de Menú en los 3 puntos("...") que aparecen al final, seleccionar el submenú "Terminal", y dentro del submenú que se despliega elegir la Opcion "Nuevo terminal".
Al abrirse en la parte inferior de la ventana de Visual Studio la terminal, ahi escribir lo siguiente:
"npm install", esto creará una carpeta llamada "node_modules" la cual contendrá las dependencias incluidas en el archivo "package.json".

## Ejecución
Para poder ejecutarlo se debe abrir una terminal haciendo click en la barra de Menú en los 3 puntos("...") que aparecen al final, seleccionar el submenú "Terminal", y dentro del submenú que se despliega elegir la Opcion "Nuevo terminal".
Al abrirse en la parte inferior de la ventana de Visual Studio la terminal, ahi escribir lo siguiente: "npm run check" (chequea que las rutas del proyecto esten correctas y existan), y para ejecutar el programa escribir "npm start" y presionar la tecla Enter, esto ejecutará el programa que levantar el servidor en el puerto 3000 (direccion de acceso: http://localhost:3000/). Ambos son scripts que realizan las funciones descriptas anteriormente.
Para detener el servidor se debe presionar las teclas CTRL + C.

## Rutas
* GET: http://localhost:3000/ (Pagina de Inicio)
* GET: http://localhost:3000/estado (Responde un JSON con datos de la aplicacion)
* GET: http://localhost:3000/reservas (Listado de reservas)
* GET: http://localhost:3000/reservas/nueva (Formulario para cargar una nueva reserva)
* GET: http://localhost:3000/reservas/:id (Detalle de una reserva seleccionada)
* POST: http://localhost:3000/reservas (Envio de datos del Formulario para guardar la nueva reserva)

## Pipeline de middleware
POST /reservas
  ↓ morgan("dev")
  ↓ identificarSolicitud
  ↓ medirDuracion
  ↓ expressLayouts
  ↓ express.urlencoded
  ↓ reservasRouter
  ↓ prepararAreaReservas
  ↓ validarReserva
  ↓ crearReserva
  ↓ 302 /reservas
  ↓ finish: ID + estado + duración

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

## Pruebas manuales
Inicio - Estado: 200 - Navegación y solicitud ID (http://localhost:3000/)
Estado - Estado: 200 - JSON con cantidad e ID (http://localhost:3000/estado)
Listado - Estado: 200 - Cuatro o más reservas (http://localhost:3000/reservas)
Estado vacío - Estado: 200 -  Mensaje alternativo (http://localhost:3000/estado)
Formulario - Estado: 200 - Controles etiquetados (http://localhost:3000/reservas/nueva)
Detalle válido - Estado: 200 - Datos completos (http://localhost:3000/reservas/:id)
Detalle inexistente - Estado: 404 - Página HTML (http://localhost:3000/reservas/:id) (id inexistente)
Campos vacíos - Estado: 400 - Error y valores conservados (http://localhost:3000/reservas)
Sala no permitida - Estado: 400 - No se crea registro (http://localhost:3000/reservas)
Turno no permitido - Estado: 400 - No se crea registro (http://localhost:3000/reservas)
Email sin @ - Estado: 400 - No se crea registro (http://localhost:3000/reservas)
Personas igual a 0 - Estado: 400 - No se crea registro (http://localhost:3000/reservas)
Personas igual a 7 - Estado: 400 - No se crea registro (http://localhost:3000/reservas)
Reserva válida - Estados: 302 y luego 200 - Nueva tarjeta (http://localhost:3000/reservas)
URL inexistente - Estado: 404 - Middleware final (http://localhost:3000/reservas123)
Reinicio - Estado: 200 - Regreso a datos iniciales (http://localhost:3000/reservas)

## Persistencia temporal
Al reiniciar el servidor solo se cargarán las reservas definidas en la constante reservas. 
Cuando se cree una nueva reserva, la misma estará guardada en memoria mientras el servidor este funcionando, de lo contrario si se reinicia, la/s nueva/s reserva/s no aparecerán. 

## 1
* Middleware Incorporado:
Son funciones que ya vienen incluidas en Express. No se necesita instalar ningún paquete adicional mediante npm para ser utilizadas.

* Middleware de Terceros:
Son paquetes creados por otros desarrolladores, para resolver problemas comunes. Tienes que ser instalados a través de npm para poder ser utilizados. (Ejemplo: morgan).

* Middleware Personalizado:
Son las funciones que uno mismo puede escribir, para cumplir con una regla de negocio específica de la aplicación a desarrollar.

## 2
* La función next() se utiliza dentro de los middlewares, para pasar el control de la petición al siguiente middleware en la cadena.

## 3
* Los parsers se ejecutan antes de la validación, porque no se puede validar la estructura o el contenido de un dato que todavía no se ha interpretado.
Un validador necesita objetos, números o textos para trabajar, y el parser es el encargado de transformar la información en esos formatos manejables. Por ejemplo el middleware express.json().

## 4
* La diferencia se refiere al nivel de acceso y aplicación de los middlewares y las variables. Es decir en qué partes de tu aplicación se ven afectadas por la configuración.
* En el alcance global el ámbito es toda la aplicación. Todas las rutas entrantes.
* En el alcance de router el ámbito es un grupo especifico de rutas, que serian solos las rutas agrupadas bajo ese router.
* En el alcance de ruta el ámbito es de una sola URL y método específico. Seria unicamen en el Endponit donde se la declara (donde es llamada).


## 5
* El evento finish se emite en los flujos de escritura (stream.Writable) justo después de que se haya llamado al método stream.end() y de que todos los datos pendientes hayan sido procesados y vaciados (flushed) en el sistema subyacente. 
En este caso se ejecuta cuando finaliza un determinado proceso de carga de pagina, o dar de alta una nueva reserva donde muestra la solicitud, método, URL, codigo de estado y duracion del evento. 

## 6
* El resultado del montaje del router en Node.js (usando el framework Express), es la creación de un sistema de rutas modular, limpio y escalable. Al montar un enrutador mediante express.Router(), se aíslan las peticiones de diferentes entidades (como /reservas o /productos) en archivos independientes, evitando saturar el archivo principal (index.js en nuestro caso).

## 7
* la diferencia radica en cómo cambian el método HTTP y la intención de la solicitud, cuando un servidor Node.js responde con un código 302 Found.
• POST (Solicitud Inicial): El cliente (navegador) envía datos al servidor, para crear o modificar un recurso (por ejemplo, enviar un formulario de inicio de sesión o un registro).
• 302 Found (Respuesta de Node.js): El servidor procesa el POST y le dice al navegador: "Listo, ahora dirigete a esta otra URL para ver el resultado". Esto se conoce como Redirección.
• GET (Solicitud Posterior): El navegador, al recibir el 302, realiza automáticamente una nueva solicitud a la URL indicada, pero cambiando el método a GET para solicitar/leer la nueva página sin enviar datos en el cuerpo.

## 8
Al reiniciar el servidor solo se cargarán las reservas definidas en la constante reservas. 
La nueva reserva desaparecerá, ya que la misma estuvo guardada en memoria. 


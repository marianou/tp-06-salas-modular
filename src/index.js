const { leerConfiguracion } = require("./configuracion");
const { crearServicioReservas } = require("./servicios/reservas");
const { crearApp } = require("./app");

const reservas = [
  {
    id: 1,
    estudiante: "Homero Simpson",
    email: "hsimpson@gmail.com",
    sala: "Sala Norte",
    fecha: "2026-10-27",
    turno: "Mañana",
    personas: 2,
  },
  {
    id: 2,
    estudiante: "Pedro Perez",
    email: "pperez@gmail.com",
    sala: "Sala Sur",
    fecha: "2026-10-26",
    turno: "Tarde",
    personas: 1,
  },
  {
    id: 3,
    estudiante: "Carl Carlson",
    email: "ccarlson@gmail.com",
    sala: "Sala Multimedia",
    fecha: "2026-10-27",
    turno: "Noche",
    personas: 3,
  },
  {
    id: 4,
    estudiante: "Lenny Lenard",
    email: "llenard@gmail.com",
    sala: "Sala Norte",
    fecha: "2026-10-29",
    turno: "Tarde",
    personas: 6,
  },
];

try {
  const { puerto, formatoRegistro } = leerConfiguracion();
  const serviciosReservas = crearServicioReservas(reservas);

  const app = crearApp({ serviciosReservas, formatoRegistro });

  app.listen(puerto, () => {
    console.log(`Disponible en http://localhost:${puerto}`);
  });
} catch (error) {
  console.error("no se pudo iniciar la aplicación", error);
  process.exitCode = 1;
}

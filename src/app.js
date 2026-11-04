const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const path = require("node:path");
const {crearControladorReservas} =require("./controladores/reservas");
const {crearRouterReservas} = require("./rutas/reservas");
const {identificarSolicitud,medirDuracion} = require("./middleware/solicitudes");


function crearApp({ serviciosReservas, formatoRegistro}) {
    const app = express();
    const controlador = crearControladorReservas (serviciosReservas);

    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "..", "views"));
    app.set("layout", "layouts/main");
    //Usamos Morgan en modo desarrollo
    app.use(morgan(formatoRegistro));
    app.use(identificarSolicitud);
    app.use(medirDuracion);
    app.use(expressLayouts);
    app.use(express.static(path.join(__dirname, "..", "public")));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json()); //Para que las expresiones que maneja express se conviertan a JSON

    console.log(controlador.estado);
    app.get("/estado", controlador.estado);

    app.get("/", (req, res) => {
    res.status(200).render("inicio", {
        titulo: "Salas de Estudios Catamarca",
        solicitud: res.locals.solicitudId,
    });
    });

    app.use("/reservas", crearRouterReservas(controlador));
    
    app.use((req, res) => {
        res.status(400).render("no-encontrado", {
            titulo: "Página no encontrada",
            mensaje: "No existe una página para esta dirección",
            solicitud: res.locals.solicitudId,
        });
    });

    return app;

}

module.exports = {crearApp};     
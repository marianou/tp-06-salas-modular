let numeroDeSolicitud = 0;

//middleware que registra el numero de solicitudes
function identificarSolicitud(req, res, next) {    
    numeroDeSolicitud += 1;
    res.locals.solicitudId = `BIB-000${String(numeroDeSolicitud)}`;
    console.log(
      `identificarSolicitud : [${res.locals.solicitudId}] ${req.method} ${req.originalUrl}`,
    );
    next();
  }

//middleware que permite medir cuanto tarda una solicitud
function medirDuracion(req, res, next) {
  const inicio = process.hrtime.bigint();

  res.on("finish", () => {
    const duracion = Number(process.hrtime.bigint() - inicio) / 1_000_000;
    console.log(
      `duracion: [${res.locals.solicitudId}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duracion.toFixed(2)} ms`,
    );
  });
  next();
}

module.exports = {identificarSolicitud, medirDuracion};
function prepararAreaReservas(req, res, next) {
  res.locals.seccion = "Reservas de Salas";
  console.log("seccion: " + res.locals.seccion);
  next();
}

function validarReserva(req, res, next) {
  const valores = req.body ?? {};
  const estudiante = valores.estudiante?.trim();
  const email = valores.email?.trim();
  const sala = valores.sala?.trim();
  const fecha = valores.fecha?.trim();
  const turno = valores.turno?.trim();
  const personas = Number(valores.personas);
  const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];
  const turnosPermitidos = ["Mañana", "Tarde", "Noche"];

  const datosValidos =
    estudiante &&
    email.includes("@") &&
    salasPermitidas.includes(sala) &&
    fecha &&
    turnosPermitidos.includes(turno) &&
    Number.isInteger(personas) &&
    personas >= 1 &&
    personas <= 6;

  if (!datosValidos) {
    return res.status(400).render("reservas/nueva", {
      titulo: "Nueva Reserva",
      error: "Revisa los campos y completá con valores válidos",
      valores: req.body,
      solicitud: res.locals.solicitudId,
    });
  }

  req.reservaValidada = { estudiante, email, sala, fecha, turno, personas };
  next();
}

module.exports = { prepararAreaReservas, validarReserva };

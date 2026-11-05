function crearControladorReservas(servicio) {
  function listar(req, res) {
    res.render("reservas/lista", {
      titulo: "Reservas",
      reservas: servicio.listar(),
      solicitud: res.locals.solicitudId,
    });
  }

  function mostrarFormulario(req, res) {
    res.render("reservas/nueva", {
      titulo: "Nueva Reserva",
      error: null,
      valores: {},
      solicitud: res.locals.solicitudId,
    });
  }

  function crear(req, res) {
    servicio.crear(req.reservaValidada);
    res.redirect("/reservas");
  }

  function detalle(req, res) {
    const reservas = servicio.listar();
    const reserva = reservas.find((m) => m.id === Number(req.params.id));

    if (!reserva) {
      return res.status(404).render("no-encontrado", {
        titulo: "Reserva no encontrada",
        mensaje: "No existe una reserva con ese identificador",
        solicitud: res.locals.solicitudId,
      });
    }

    return res.status(200).render("reservas/detalle", {
      titulo: reserva.estudiante,
      reserva,
      solicitud: res.locals.solicitudId,
    });
  }

  function estado(req, res) {
    res.json({
      servicio: "activo",
      reservas: servicio.contar(),
      solicitud: res.locals.solicitudId,
    });
  }

  return { listar, mostrarFormulario, crear, detalle, estado };
}

module.exports = { crearControladorReservas };

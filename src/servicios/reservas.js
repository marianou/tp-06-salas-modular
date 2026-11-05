function crearServicioReservas(datosIniciales) {
  const reservas = [...datosIniciales];

  function listar() {
    return [...reservas];
  }

  function contar() {
    return reservas.length;
  }

  function crear(datosValidados) {
    const utlimoId = reservas.reduce(
      (mayor, reserva) => Math.max(mayor, reserva.id),
      0,
    );

    const nueva = { id: utlimoId + 1, ...datosValidados };

    reservas.push(nueva);

    return nueva;
  }

  return { listar, contar, crear };
}

module.exports = { crearServicioReservas };

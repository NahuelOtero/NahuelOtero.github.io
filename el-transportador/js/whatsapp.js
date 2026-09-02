// ============================================================
//  WHATSAPP.JS — Generación de mensaje y URL
// ============================================================

const WA_NUMBER = '5493517401122';

function generarUrlWhatsApp(datos) {
  const { origen, paradas, destino, tipoViaje, fecha, hora, minutosEspera, precioFinal } = datos;

  const paradasTexto = paradas && paradas.length > 0
    ? paradas.map((p, i) => `   • Parada ${i + 1}: ${p.texto}`).join('\n')
    : '   Sin paradas intermedias';

  const tipoTexto  = tipoViaje === 'ida_vuelta' ? 'Ida y Vuelta' : 'Solo Ida';

  // Formatear fecha de YYYY-MM-DD a DD/MM/AAAA
  let fechaTexto = 'A coordinar';
  if (fecha) {
    const partes = fecha.split('-');
    if (partes.length === 3) {
      fechaTexto = `${partes[2]}/${partes[1]}/${partes[0]}`;
    } else {
      fechaTexto = fecha;
    }
  }
  const horaTexto = hora ? `${hora} hs` : 'A coordinar';

  // Generar link de Google Maps con la ruta exacta
  let mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${origen.lat},${origen.lon}&destination=${destino.lat},${destino.lon}`;
  if (paradas && paradas.length > 0) {
    const waypoints = paradas.map(p => `${p.lat},${p.lon}`).join('|');
    mapUrl += `&waypoints=${waypoints}`;
  }

  let textoEspera = 'Sin espera';
  if (minutosEspera > 0) {
    const hs = Math.floor(minutosEspera / 60);
    const mins = minutosEspera % 60;
    const partes = [];
    if (hs > 0) partes.push(`${hs} ${hs === 1 ? 'hora' : 'horas'}`);
    if (mins > 0) partes.push(`${mins} min`);
    textoEspera = partes.join(' y ');
  }

  const msg =
    `¡Hola! Acabo de cotizar un viaje en tu web. Te paso los detalles:\n\n` +
    `📍 Origen: ${origen.texto}\n` +
    `🛑 Paradas:\n${paradasTexto}\n` +
    `🏁 Destino: ${destino.texto}\n` +
    `📅 Fecha de salida: ${fechaTexto}\n` +
    `🕐 Hora de salida: ${horaTexto}\n` +
    `🔄 Modalidad: ${tipoTexto}\n` +
    `⏱️ Tiempo de espera: ${textoEspera}\n` +
    `💳 Precio Estimado: ${formatARS(precioFinal)} ARS\n\n` +
    `🗺️ Ver ruta en el mapa:\n${mapUrl}\n\n` +
    `Quiero coordinar la fecha del viaje y confirmar disponibilidad.`;

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

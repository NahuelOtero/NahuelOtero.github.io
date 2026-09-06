// ============================================================
//  TARIFAS.JS — Motor de precios de El Transportador
//  Actualizado: Septiembre 2026
// ============================================================

const PRECIOS = {
  TARIFA_MINIMA_URBANA: 12000,
  PRECIO_KM_URBANO:      1200,
  PRECIO_MIN_URBANO:      200,
  RECARGO_HORA_PICO:     1.20,
  PRECIO_KM_CORTO:        825,
  PRECIO_KM_LARGO_IDA:    825,
  PRECIO_KM_LARGO_VUELTA: 400,
  PRECIO_HORA_ESPERA:   10000,
  PLUS_RETORNO_VACIO:   12000,
};

// ═══════════════════════════════════════════════════════════════
//  TABLA DE PEAJES — Precios en EFECTIVO EN CABINA (septiembre 2026)
//
//  Caminos de las Sierras (RAC): $3.000 / pasada  (Cat. 2 – Auto)
//  Corredores Viales Nacionales: ~$1.500 / estación (Cat. 2 – Auto)
//
//  Cada "costo" = suma de TODAS las cabinas del trayecto de IDA
//  desde Córdoba Capital hasta el destino indicado.
//
//  ── RUTAS PROVINCIALES (Caminos de las Sierras) ──────────────
//  • RN 20/38 (Autopista Cba → Carlos Paz → Punilla):
//      1 peaje = $3.000
//  • RN 36 (Cba → Alta Gracia → Calamuchita → Río Cuarto):
//      Bouwer + Piedras Moras + Arroyo Tegua = 3 peajes
//      Alta Gracia queda ANTES de Bouwer → $0
//      Sta. Rosa de Calamuchita → 2 peajes ($6.000)
//      Río Cuarto → 3 peajes ($9.000)
//  • RN 9 Norte (Cba → Jesús María → Colonia Caroya):
//      1 peaje (Juárez Celman) = $3.000
//  • RN 9 Sur (Cba → Pilar → Villa María → Rosario → Bs As):
//      1 peaje RAC (Capilla de los Remedios) = $3.000
//      + nacionales (James Craik, Carcarañá, etc.)
//  • Autovía Punilla (Cosquín, La Falda, Capilla del Monte):
//      1 peaje = $3.000  (misma cabina que Carlos Paz)
//  • RP 5 (Alta Gracia → Villa Gral. Belgrano):
//      1 peaje (Autovía Calamuchita) = $3.000
//
//  ── RUTAS INTERPROVINCIALES (acumulado ida) ──────────────────
//  • Córdoba → Rosario:
//      1 RAC (RN9 Sur) + 2 nacionales (James Craik + Carcarañá)
//      = $3.000 + $3.000 = $6.000
//  • Córdoba → Buenos Aires:
//      1 RAC + ~5 nacionales (James Craik, Carcarañá, Gral. Lagos,
//        Zárate-Brazo Largo, acceso CABA)
//      ≈ $3.000 + $7.500 = ~$10.500  → redondeamos a $11.000
//  • Córdoba → Mendoza (RN 7 via San Luis):
//      1 RAC + ~3 nacionales
//      ≈ $3.000 + $4.500 = ~$7.500  → redondeamos a $8.000
//  • Córdoba → San Luis / Villa Mercedes (RN 36 o RN 7):
//      3 RAC + ~1 nacional
//      ≈ $9.000 + $1.500const CABINAS_PEAJE = [
  // ── RED RAC CÓRDOBA (Caminos de las Sierras) - Auto Normal: $1.500 ──────
  { id: 'cba-carlos-paz',    nombre: 'Peaje Yocsina / Carlos Paz (RAC RN 20)',        lat: -31.43664, lon: -64.31235, costo: 1500, radioKm: 2.0 },
  { id: 'cba-bouwer',        nombre: 'Peaje Bouwer (RAC RN 36)',                     lat: -31.51971, lon: -64.22888, costo: 1500, radioKm: 2.0 },
  { id: 'cba-piedras-moras', nombre: 'Peaje Piedras Moras (RN 36 Almafuerte)',       lat: -32.13206, lon: -64.29366, costo: 1500, radioKm: 2.0 },
  { id: 'cba-arroyo-tegua',  nombre: 'Peaje Arroyo Tegua (RN 36 Alcira Gigena)',     lat: -32.69899, lon: -64.35068, costo: 1500, radioKm: 2.0 },
  { id: 'cba-juarez-celman', nombre: 'Peaje Juárez Celman (RAC RN 9 Norte)',         lat: -31.19080, lon: -64.15301, costo: 1500, radioKm: 2.0 },
  { id: 'cba-toledo',        nombre: 'Peaje Toledo / C. Remedios (RAC RN 9 Sur)',     lat: -31.53996, lon: -63.97204, costo: 1500, radioKm: 2.0 },
  { id: 'cba-aeropuerto',    nombre: 'Peaje Mendiolaza (RAC E-53)',                  lat: -31.29500, lon: -64.20900, costo: 1500, radioKm: 2.0 },
  { id: 'cba-los-cedros',    nombre: 'Peaje Los Cedros (RAC Ruta 5 Alta Gracia)',    lat: -31.54044, lon: -64.30492, costo: 1500, radioKm: 2.0 },
  { id: 'cba-la-calera',     nombre: 'Peaje La Calera (RAC E-55)',                   lat: -31.35200, lon: -64.33100, costo: 1500, radioKm: 2.0 },
  { id: 'cba-san-roque',     nombre: 'Peaje San Roque (RAC Autovía Punilla)',        lat: -31.38500, lon: -64.44800, costo: 1500, radioKm: 2.0 },
  { id: 'cba-monte-cristo',  nombre: 'Peaje Monte Cristo (RAC RN 19)',               lat: -31.32776, lon: -63.87494, costo: 1500, radioKm: 2.0 },

  // ── CORREDOR NOA (RN 9 / RN 34 / RN 38 / RN 68) ──────────────────────────
  { id: 'noa-fernandez',     nombre: 'Peaje Fernández (RN 34 Santiago del Estero)',  lat: -27.92500, lon: -63.89500, costo: 1500, radioKm: 2.0 },
  { id: 'noa-molle-yaco',    nombre: 'Peaje Molle Yaco (RN 9 Trancas Tucumán)',      lat: -26.29471, lon: -65.28076, costo: 1500, radioKm: 2.0 },
  { id: 'noa-cabeza-buey',   nombre: 'Peaje Cabeza de Buey (RN 9 Salta)',            lat: -24.81427, lon: -65.01586, costo: 1500, radioKm: 2.0 },
  { id: 'noa-aunor',         nombre: 'Peaje Aunor (Acceso a Salta Capital)',         lat: -24.77756, lon: -65.31948, costo: 1500, radioKm: 2.0 },

  // ── CORREDOR RN 9 (Córdoba ➔ Rosario ➔ Buenos Aires) ────────────────────
  { id: 'rn9-james-craik',   nombre: 'Peaje James Craik (RN 9 Córdoba)',             lat: -32.18869, lon: -63.38943, costo: 1500, radioKm: 2.0 },
  { id: 'rn9-carcarana',     nombre: 'Peaje Carcarañá (RN 9 Santa Fe)',              lat: -32.87637, lon: -61.16987, costo: 1500, radioKm: 2.0 },
  { id: 'rn9-general-lagos', nombre: 'Peaje General Lagos (RN 9 Santa Fe)',          lat: -33.12882, lon: -60.57803, costo: 1500, radioKm: 2.0 },
  { id: 'rn9-zarate',        nombre: 'Peaje Zárate (RN 9 Buenos Aires)',             lat: -34.10117, lon: -59.15035, costo: 1500, radioKm: 2.0 },
  { id: 'ausol-campana',     nombre: 'Peaje Panamericana Campana (Ausol)',           lat: -34.25800, lon: -58.91800, costo: 1500, radioKm: 2.0 },
  { id: 'ausol-troncal',     nombre: 'Peaje Panamericana Troncal (Ausol)',           lat: -34.47716, lon: -58.65667, costo: 1500, radioKm: 2.0 },

  // ── CORREDOR RN 19 / RN 168 / MESOPOTAMIA ────────────────────────────────
  { id: 'rn19-devoto',       nombre: 'Peaje Devoto (RN 19 Córdoba)',                 lat: -31.41087, lon: -62.20537, costo: 1500, radioKm: 2.0 },
  { id: 'rn19-franck',       nombre: 'Peaje Franck (RN 19 Santa Fe)',                lat: -31.63625, lon: -60.97415, costo: 1500, radioKm: 2.0 },
  { id: 'rn168-tunel',       nombre: 'Peaje Túnel Subfluvial (Santa Fe - Paraná)',   lat: -31.68742, lon: -60.51205, costo: 1500, radioKm: 2.0 },
  { id: 'rn14-colonia-elia', nombre: 'Peaje Colonia Elía (RN 14 Entre Ríos)',        lat: -32.65800, lon: -58.34800, costo: 1500, radioKm: 2.0 },
  { id: 'rn14-yerua',        nombre: 'Peaje Yeruá (RN 14 Concordia Entre Ríos)',     lat: -31.58500, lon: -58.28500, costo: 1500, radioKm: 2.0 },
  { id: 'rn14-piedras-blan', nombre: 'Peaje Piedras Blancas (RN 14 Corrientes Sur)',  lat: -30.45800, lon: -57.98500, costo: 1500, radioKm: 2.0 },
  { id: 'rn14-bonpland',     nombre: 'Peaje Bonpland (RN 14 Corrientes)',            lat: -29.81800, lon: -57.42800, costo: 1500, radioKm: 2.0 },
  { id: 'rn12-ituzaingo',    nombre: 'Peaje Ituzaingó (RN 12 Corrientes)',           lat: -27.58500, lon: -56.68500, costo: 1500, radioKm: 2.0 },
  { id: 'rn12-santa-ana',    nombre: 'Peaje Santa Ana (RN 12 Misiones)',             lat: -27.35800, lon: -55.58500, costo: 1500, radioKm: 2.0 },
  { id: 'rn12-fachinal',     nombre: 'Peaje Fachinal (RN 105 / RN 12 Posadas)',      lat: -27.64416, lon: -55.81592, costo: 1500, radioKm: 2.0 },

  // ── CORREDOR CUYO / RN 7 / RN 8 / RN 35 ──────────────────────────────────
  { id: 'rn35-sampacho',     nombre: 'Peaje Sampacho (RN 8 / RN 35 Córdoba)',        lat: -33.42416, lon: -64.77561, costo: 1500, radioKm: 2.0 },
  { id: 'rn7-la-cumbre',     nombre: 'Peaje La Cumbre (RN 7 San Luis)',              lat: -33.35912, lon: -66.06709, costo: 1500, radioKm: 2.0 },
  { id: 'rn7-desaguadero',   nombre: 'Peaje Desaguadero (RN 7 San Luis - Mendoza)',  lat: -33.41290, lon: -67.11475, costo: 1500, radioKm: 2.0 },
  { id: 'rn7-la-paz',        nombre: 'Peaje La Paz (RN 7 Mendoza)',                  lat: -33.43584, lon: -67.50243, costo: 1500, radioKm: 2.0 },

  // ── COSTA ATLÁNTICA & BUENOS AIRES ───────────────────────────────────────
  { id: 'aubasa-hudson',     nombre: 'Peaje Hudson (Autopista BsAs - La Plata)',     lat: -34.78800, lon: -58.17500, costo: 1500, radioKm: 2.0 },
  { id: 'aubasa-samborombon',nombre: 'Peaje Samborombón (Ruta 2 Costa Atlántica)',   lat: -35.30755, lon: -58.05360, costo: 2500, radioKm: 2.0 },
  { id: 'aubasa-maipu',      nombre: 'Peaje Maipú (Ruta 2 Costa Atlántica)',         lat: -36.86175, lon: -57.86665, costo: 2500, radioKm: 2.0 },
];

function esHoraPico(hora) {
  return (hora >= 7 && hora < 9) || (hora >= 17 && hora < 20);
}

function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Analiza espacialmente si la traza de la ruta cruza alguna cabina de peaje.
 * @param {Array} routeCoords - Puntos GeoJSON [[lon, lat], ...]
 * @returns {object} { costoTotal, detalles: [{nombre, costo}] }
 */
function calcularPeajesEspaciales(routeCoords) {
  if (!routeCoords || !Array.isArray(routeCoords) || routeCoords.length === 0) {
    return { costoTotal: 0, detalles: [] };
  }

  const cabinasCruzadas = [];
  let costoTotal = 0;

  CABINAS_PEAJE.forEach(cabina => {
    const pasoPorCabina = routeCoords.some(pt => {
      const lon = pt[0];
      const lat = pt[1];
      // Pre-filtro de bounding box (~11km margin)
      if (Math.abs(lat - cabina.lat) > 0.1 || Math.abs(lon - cabina.lon) > 0.1) {
        return false;
      }
      const dist = calcularDistanciaKm(lat, lon, cabina.lat, cabina.lon);
      return dist <= (cabina.radioKm || 2.0);
    });

    if (pasoPorCabina) {
      cabinasCruzadas.push({ nombre: cabina.nombre, costo: cabina.costo });
      costoTotal += cabina.costo;
    }
  });

  return { costoTotal, detalles: cabinasCruzadas };
}st pasoPorCabina = routeCoords.some(pt => {
      const lon = pt[0];
      const lat = pt[1];
      // Pre-filtro de bounding box (~50km margin)
      if (Math.abs(lat - cabina.lat) > 0.05 || Math.abs(lon - cabina.lon) > 0.05) {
        return false;
      }
      const dist = calcularDistanciaKm(lat, lon, cabina.lat, cabina.lon);
      return dist <= (cabina.radioKm || 2.0);
    });

    if (pasoPorCabina) {
      cabinasCruzadas.push({ nombre: cabina.nombre, costo: cabina.costo });
      costoTotal += cabina.costo;
    }
  });

  return { costoTotal, detalles: cabinasCruzadas };
}

/**
 * Calcula el precio del viaje.
 * @param {number} kmIda - Kilómetros de ida según OSRM
 * @param {number} minutosViaje - Duración estimada en minutos
 * @param {string} tipoViaje - 'solo_ida' | 'ida_vuelta'
 * @param {number} horaSalida - Hora en formato 0-23
 * @param {number} minutosEspera - Minutos de espera seleccionados
 * @param {string} destinoText - Texto del destino
 * @param {string} origenText - Texto del origen
 * @param {Array} routeCoords - Puntos GeoJSON de la ruta
 * @returns {object} Desglose de precios
 */
function calcularPrecio(kmIda, minutosViaje, tipoViaje, horaSalida, minutosEspera, destinoText, origenText, routeCoords = null) {
  let precioBase = 0;

  // ── REGLA 1: URBANO < 15 km ──────────────────────────────
  if (kmIda < 15) {
    precioBase = (kmIda * PRECIOS.PRECIO_KM_URBANO) + (minutosViaje * PRECIOS.PRECIO_MIN_URBANO);
    if (esHoraPico(horaSalida)) precioBase *= PRECIOS.RECARGO_HORA_PICO;
    if (tipoViaje === 'ida_vuelta') precioBase *= 2;
    
    if (precioBase < PRECIOS.TARIFA_MINIMA_URBANA) {
      precioBase = PRECIOS.TARIFA_MINIMA_URBANA;
    }
  }

  // ── REGLA 2: INTERURBANO CORTO 15–100 km ─────────────────
  else if (kmIda <= 100) {
    if (tipoViaje === 'solo_ida') {
      precioBase = kmIda * PRECIOS.PRECIO_KM_CORTO;

      const dest = destinoText.toLowerCase();
      const plusNoche  = ['alta gracia', 'bialet massé', 'bialet masse', 'jesús maría', 'jesus maria'];
      const plusMadrug = ['carlos paz', 'villa carlos paz'];

      if (plusNoche.some(loc => dest.includes(loc))) {
        if (horaSalida >= 19 || horaSalida < 7) precioBase += PRECIOS.PLUS_RETORNO_VACIO;
      }
      if (plusMadrug.some(loc => dest.includes(loc))) {
        if (horaSalida >= 3 && horaSalida < 7) precioBase += PRECIOS.PLUS_RETORNO_VACIO;
      }
    } else {
      precioBase = kmIda * 2 * PRECIOS.PRECIO_KM_CORTO;
    }
  }

  // ── REGLA 3: LARGA DISTANCIA > 100 km ────────────────────
  else {
    const costoIda = kmIda * PRECIOS.PRECIO_KM_LARGO_IDA;
    if (tipoViaje === 'solo_ida') {
      precioBase = costoIda + (kmIda * PRECIOS.PRECIO_KM_LARGO_VUELTA);
    } else {
      precioBase = costoIda * 2;
    }
  }

  let minutosACobrar = 0;
  if (minutosEspera > 0) {
    minutosACobrar = Math.max(10, minutosEspera);
  }

  const costoEspera  = (minutosACobrar / 60) * PRECIOS.PRECIO_HORA_ESPERA;
  const infoPeajes   = calcularPeajesEspaciales(routeCoords);
  const costosPeajes = infoPeajes.costoTotal;
  const total        = precioBase + costoEspera + costosPeajes;
  const totalRedondeado = Math.ceil(total / 100) * 100;

  return {
    precioBase:     Math.ceil(precioBase / 100) * 100,
    costoEspera,
    costosPeajes,
    detallesPeajes: infoPeajes.detalles,
    totalRedondeado,
  };
}

function formatARS(valor) {
  return '$' + valor.toLocaleString('es-AR');
}

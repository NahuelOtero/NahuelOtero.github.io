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
//      ≈ $9.000 + $1.500 = ~$10.500  → redondeamos a $11.000
//  • Córdoba → Salta / Tucumán (RN 9 Norte):
//      1 RAC + ~2 nacionales
//      ≈ $3.000 + $3.000 = ~$6.000
//  • Córdoba → Neuquén (RN 36 → RN 35):
//      3 RAC + ~3 nacionales
//      ≈ $9.000 + $4.500 = ~$13.500  → redondeamos a $14.000
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
//  BASE DE DATOS GEORREFERENCIADA DE PEAJES (ARGENTINA)
// ═══════════════════════════════════════════════════════════════

const CABINAS_PEAJE = [
  // ── RED RAC CÓRDOBA (Caminos de las Sierras) ─────────────────
  { id: 'cba-carlos-paz',   nombre: 'Peaje Autopista Carlos Paz (RAC RN 20)',        lat: -31.4589, lon: -64.3031, costo: 3000, radioKm: 0.5 },
  { id: 'cba-bouwer',       nombre: 'Peaje Bouwer (RAC RN 36)',                     lat: -31.5540, lon: -64.1950, costo: 3000, radioKm: 0.5 },
  { id: 'cba-piedras-moras',nombre: 'Peaje Piedras Moras (RN 36 Almafuerte)',       lat: -32.1850, lon: -64.2480, costo: 3000, radioKm: 0.5 },
  { id: 'cba-arroyo-tegua', nombre: 'Peaje Arroyo Tegua (RN 36 Alcira Gigena)',     lat: -32.7480, lon: -64.3210, costo: 3000, radioKm: 0.5 },
  { id: 'cba-juarez-celman',nombre: 'Peaje Juárez Celman (RAC RN 9 Norte)',         lat: -31.2720, lon: -64.1480, costo: 3000, radioKm: 0.5 },
  { id: 'cba-toledo',       nombre: 'Peaje Toledo / C. Remedios (RAC RN 9 Sur)',     lat: -31.5450, lon: -64.0050, costo: 3000, radioKm: 0.5 },
  { id: 'cba-aeropuerto',   nombre: 'Peaje Mendiolaza (RAC E-53)',                  lat: -31.2950, lon: -64.2090, costo: 3000, radioKm: 0.5 },
  { id: 'cba-los-cedros',   nombre: 'Peaje Los Cedros (RAC Ruta 5)',                lat: -31.5490, lon: -64.3010, costo: 3000, radioKm: 0.5 },
  { id: 'cba-la-calera',    nombre: 'Peaje La Calera (RAC E-55)',                   lat: -31.3520, lon: -64.3310, costo: 3000, radioKm: 0.5 },
  { id: 'cba-san-roque',    nombre: 'Peaje San Roque (RAC Autovía Punilla)',        lat: -31.3850, lon: -64.4480, costo: 3000, radioKm: 0.5 },
  { id: 'cba-autovia-calam',nombre: 'Peaje Autovía Calamuchita (RP 5)',             lat: -31.7850, lon: -64.4520, costo: 3000, radioKm: 0.5 },

  // ── CORREDOR RN 9 (Córdoba → Rosario → Buenos Aires) ─────────
  { id: 'rn9-james-craik',  nombre: 'Peaje James Craik (RN 9 Córdoba)',             lat: -32.1640, lon: -63.3420, costo: 1500, radioKm: 0.5 },
  { id: 'rn9-carcarana',    nombre: 'Peaje Carcarañá (RN 9 Santa Fe)',              lat: -32.8550, lon: -61.1680, costo: 1500, radioKm: 0.5 },
  { id: 'rn9-general-lagos',nombre: 'Peaje General Lagos (RN 9 Santa Fe)',          lat: -33.1580, lon: -60.5750, costo: 1500, radioKm: 0.5 },
  { id: 'rn9-zarate',       nombre: 'Peaje Zárate (RN 9 Buenos Aires)',             lat: -34.1450, lon: -59.0780, costo: 1500, radioKm: 0.5 },
  { id: 'rn9-campana',      nombre: 'Peaje Panamericana Campana (Ausol)',           lat: -34.2580, lon: -58.9180, costo: 1500, radioKm: 0.5 },
  { id: 'ausol-henry-ford', nombre: 'Peaje Panamericana Acceso Norte (Ausol)',        lat: -34.4680, lon: -58.5520, costo: 2000, radioKm: 0.5 },

  // ── CORREDOR CUYO / RN 7 / RN 8 (Mendoza / San Luis) ─────────
  { id: 'rn7-desaguadero',  nombre: 'Peaje Desaguadero (RN 7 San Luis-Mendoza)',    lat: -33.4020, lon: -67.1550, costo: 1500, radioKm: 0.5 },
  { id: 'rn7-la-cumbre',    nombre: 'Peaje La Cumbre (RN 7 San Luis)',              lat: -33.5180, lon: -66.1150, costo: 1500, radioKm: 0.5 },
  { id: 'rn7-justo-daract', nombre: 'Peaje Justo Daract (RN 7 San Luis)',           lat: -33.8680, lon: -65.1850, costo: 1500, radioKm: 0.5 },
  { id: 'rn35-mackenna',    nombre: 'Peaje Vicuña Mackenna (RN 35 Córdoba Sur)',    lat: -33.9180, lon: -64.3950, costo: 1500, radioKm: 0.5 },
  { id: 'rn8-lujan',        nombre: 'Peaje Luján / Solís (RN 8)',                   lat: -34.3310, lon: -59.2550, costo: 1500, radioKm: 0.5 },

  // ── CORREDOR NOA (Tucumán / Salta / Santiago del Estero) ──────
  { id: 'rn9-cabeza-buey',  nombre: 'Peaje Cabeza de Buey (RN 9 Salta)',            lat: -24.7850, lon: -65.0480, costo: 1500, radioKm: 0.5 },
  { id: 'rn9-molle-yaco',   nombre: 'Peaje Molle Yaco (RN 9 Tucumán)',              lat: -26.3580, lon: -65.2680, costo: 1500, radioKm: 0.5 },
  { id: 'rn34-fernandez',   nombre: 'Peaje Fernández (RN 34 Santiago del Estero)',  lat: -27.9250, lon: -63.8950, costo: 1500, radioKm: 0.5 },

  // ── BUENOS AIRES / SANTA FE / COSTA ATLÁNTICA ────────────────
  { id: 'ap-rosario-stafe', nombre: 'Peaje Autopista Rosario - Santa Fe (AP-01)',   lat: -32.7850, lon: -60.7480, costo: 1500, radioKm: 0.5 },
  { id: 'aubasa-hudson',    nombre: 'Peaje Hudson (Autopista BsAs - La Plata)',     lat: -34.7880, lon: -58.1750, costo: 2000, radioKm: 0.5 },
  { id: 'aubasa-samborombon',nombre: 'Peaje Samborombón (Ruta 2 Costa Atlántica)',   lat: -35.5680, lon: -58.0480, costo: 3000, radioKm: 0.5 },
  { id: 'aubasa-maipu',     nombre: 'Peaje Maipú (Ruta 2 Costa Atlántica)',         lat: -36.8680, lon: -57.8850, costo: 3000, radioKm: 0.5 },
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
      if (Math.abs(lat - cabina.lat) > 0.02 || Math.abs(lon - cabina.lon) > 0.02) {
        return false;
      }
      const dist = calcularDistanciaKm(lat, lon, cabina.lat, cabina.lon);
      return dist <= (cabina.radioKm || 0.5);
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

/**
 * SCRIPTS/SYNC_PEAJES_OSM.JS
 * Extractor y Compilador Automático de Peajes para Argentina (23 Provincias)
 * Consulta OpenStreetMap Overpass API, agrupa nodos (clustering 800m),
 * clasifica por corredor/concesión y genera js/tarifas.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

function getOSMTolls() {
  return new Promise((resolve, reject) => {
    // Bounding Box completo para toda la República Argentina (23 provincias)
    const query = '[out:json][timeout:60];node["barrier"="toll_booth"](-55.0,-74.0,-21.0,-53.0);out;';
    const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);
    
    https.get(url, { headers: { 'User-Agent': 'ElTransportador-PeajesSync/1.3.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed.elements || []);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function distKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function clasificarNombreYPrecio(c) {
  const tags = c.tags || {};
  let name = tags.name || tags['name:es'] || tags.operator || tags.ref || '';
  const op = (tags.operator || '').toLowerCase();
  const lat = c.lat;
  const lon = c.lon;

  // Precios por defecto para Categoría 2 (Auto Normal - Septiembre 2026)
  let costo = 1500;

  // 1. Red RAC Córdoba (Caminos de las Sierras) - Tarifa ERSeP Septiembre 2026: $3.000 manual
  if (op.includes('caminos de las sierras') || (lat > -33.0 && lat < -30.5 && lon > -65.0 && lon < -63.5)) {
    costo = 3000;
    if (!name || name.includes('Cabina')) {
      if (lat < -31.40 && lat > -31.46 && lon < -64.25) name = 'Peaje Yocsina / Carlos Paz (RAC RN 20)';
      else if (lat < -31.50 && lat > -31.56 && lon > -64.25 && lon < -64.15) name = 'Peaje Bouwer (RAC RN 36)';
      else if (lat < -31.15 && lat > -31.25) name = 'Peaje Juárez Celman (RAC RN 9 Norte)';
      else if (lat < -31.50 && lat > -31.56 && lon > -64.05 && lon < -63.90) name = 'Peaje Toledo / C. Remedios (RAC RN 9 Sur)';
      else if (lat < -31.27 && lat > -31.32 && lon < -64.18) name = 'Peaje Mendiolaza (RAC E-53)';
      else if (lat < -31.52 && lat > -31.58 && lon < -64.28) name = 'Peaje Los Cedros (RAC Ruta 5)';
      else if (lat < -31.33 && lat > -31.37 && lon < -64.30) name = 'Peaje La Calera (RAC E-55)';
      else if (lat < -31.36 && lat > -31.40 && lon < -64.40) name = 'Peaje San Roque (RAC Autovía Punilla)';
      else if (lat < -31.30 && lat > -31.35 && lon > -64.00) name = 'Peaje Monte Cristo (RAC RN 19)';
      else name = `Peaje RAC Córdoba (RP/RN ${tags.ref || ''})`;
    }
  }

  // 2. Ruta 2 / Costa Atlántica (AUBASA) - Tarifa 2026: $3.000 manual
  else if (op.includes('aubasa') || name.toLowerCase().includes('samborombón') || name.toLowerCase().includes('maipú') || name.toLowerCase().includes('la huella')) {
    costo = 3000; // Tarifa Costa Atlántica
    if (!name) name = `Peaje AUBASA (Ruta 2/11)`;
  }

  // 3. NOA & Accesos Capitales (Salta / Jujuy / Tucumán / Corredores Viales Nacionales Res. 248/2026: $1.500)
  else if (lat > -26.5 && lat < -24.0 && lon > -66.0 && lon < -64.5) {
    costo = 1500;
    if (lat < -24.75 && lat > -24.80 && lon < -65.30) name = 'Peaje Aunor (Acceso a Salta Capital)';
    else if (lat < -24.80 && lat > -24.83) name = 'Peaje Cabeza de Buey (RN 9 Salta)';
    else if (lat < -26.25 && lat > -26.35) name = 'Peaje Molle Yaco (RN 9 Trancas Tucumán)';
    else if (!name) name = `Peaje Corredor NOA (RN 9/34)`;
  }

  // 4. Corredores Nacionales Restantes (Corredores Viales S.A.)
  else {
    costo = 1500;
    if (!name) {
      if (tags.ref) name = `Peaje Nacional (Ruta ${tags.ref})`;
      else name = `Estación de Peaje Nacional`;
    }
  }

  return { name: name.trim(), costo };
}

async function run() {
  console.log('1. Consultando nodos de peajes en OpenStreetMap (23 provincias de Argentina)...');
  const rawNodes = await getOSMTolls();
  console.log(`Recibidos ${rawNodes.length} nodos de peaje desde OSM.`);

  // Filtrar nodo falso/obsoleto de OSM al sur del Aeropuerto (lat -31.3128) donde NO existe cabina física
  const argNodes = rawNodes.filter(n => {
    if (n.lon < -69.5 || n.lat < -55.0 || n.lat > -21.0) return false;
    // Nodo obsoleto en OSM de Pajas Blancas previo al Aeropuerto (lat -31.3128, lon -64.2188)
    if (n.lat < -31.305 && n.lat > -31.320 && n.lon < -64.210 && n.lon > -64.225) {
      return false;
    }
    return true;
  });
  console.log(`Filtrados ${argNodes.length} nodos dentro de fronteras argentinas (excluyendo nodos obsoletos).`);

  // Algoritmo de Clustering espacial (agrupar nodos a menos de 0.8 km)
  const clusters = [];
  argNodes.forEach(t => {
    let found = false;
    for (const c of clusters) {
      if (distKm(t.lat, t.lon, c.lat, c.lon) <= 0.8) {
        c.nodes.push(t);
        c.lat = c.nodes.reduce((sum, n) => sum + n.lat, 0) / c.nodes.length;
        c.lon = c.nodes.reduce((sum, n) => sum + n.lon, 0) / c.nodes.length;
        if (t.tags) {
          if (!c.tags) c.tags = t.tags;
          else Object.assign(c.tags, t.tags);
        }
        found = true;
        break;
      }
    }
    if (!found) {
      clusters.push({
        id: `osm-${t.id}`,
        lat: t.lat,
        lon: t.lon,
        tags: t.tags || {},
        nodes: [t]
      });
    }
  });

  console.log(`Agrupados ${argNodes.length} nodos en ${clusters.length} estaciones de peaje únicas.`);

  // Construir array final procesado
  const cabinasCompiladas = clusters.map((c, index) => {
    const info = clasificarNombreYPrecio(c);
    return {
      id: c.id,
      nombre: info.name,
      lat: Number(c.lat.toFixed(5)),
      lon: Number(c.lon.toFixed(5)),
      costo: info.costo,
      radioKm: 2.0
    };
  });

  // Generar contenido para js/tarifas.js
  const jsContent = `// ============================================================
//  TARIFAS.JS — Motor de precios de El Transportador
//  Generado automáticamente desde OpenStreetMap (23 Provincias)
//  Versión: v1.3.0
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
//  BASE DE DATOS NACIONAL DE PEAJES (23 PROVINCIAS ARGENTINAS)
//  Precios para Auto Normal / Categoría 2 (2 ejes < 2.10m)
// ═══════════════════════════════════════════════════════════════
const CABINAS_PEAJE = ${JSON.stringify(cabinasCompiladas, null, 2)};

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
}

/**
 * Calcula el precio del viaje.
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
`;

  const targetPath = path.join(__dirname, '..', 'js', 'tarifas.js');
  fs.writeFileSync(targetPath, jsContent, 'utf8');
  console.log(`\n¡Éxito! Generado js/tarifas.js con ${cabinasCompiladas.length} estaciones de peaje para las 23 provincias.`);
}

run().catch(console.error);

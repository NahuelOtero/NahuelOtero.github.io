// ============================================================
//  MAPA.JS — Leaflet + Nominatim + OSRM
// ============================================================

let map, routeLayer;
const NOMINATIM = 'https://nominatim.openstreetmap.org/search';
const OSRM      = 'https://router.project-osrm.org/route/v1/driving';

// Inicializar el mapa centrado en Córdoba Capital
function initMapa() {
  map = L.map('map', { zoomControl: true }).setView([-31.4135, -64.1811], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map);
}

// Icono personalizado naranja/ámbar
function crearIcono(tipo) {
  const colors = { origen: '#22c55e', parada: '#06b6d4', destino: '#ef4444' };
  const color  = colors[tipo] || '#06b6d4';
  return L.divIcon({
    html: `<div style="background:${color};width:16px;height:16px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.5)"></div>`,
    className: '',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

// Marcadores actuales
let marcadores = [];
function limpiarMarcadores() {
  marcadores.forEach(m => map.removeLayer(m));
  marcadores = [];
}
function agregarMarcador(lat, lon, tipo, label) {
  const m = L.marker([lat, lon], { icon: crearIcono(tipo) })
    .bindTooltip(label, { permanent: false, direction: 'top' })
    .addTo(map);
  marcadores.push(m);
}

// Limpiar ruta dibujada
function limpiarRuta() {
  if (routeLayer) { map.removeLayer(routeLayer); routeLayer = null; }
  limpiarMarcadores();
  document.getElementById('map-info').style.display = 'none';
}

/**
 * Calcula y dibuja la ruta entre waypoints.
 * @param {Array} waypoints - [{lat, lon, texto, tipo}, ...]
 * @returns {Promise<{kmIda, minutos}>}
 */
async function calcularRuta(waypoints) {
  if (waypoints.length < 2) return null;

  document.getElementById('map-loading').style.display = 'flex';
  limpiarRuta();

  const coords = waypoints.map(w => `${w.lon},${w.lat}`).join(';');
  const url    = `${OSRM}/${coords}?overview=full&geometries=geojson`;

  try {
    const res  = await fetch(url);
    const data = await res.json();

    if (data.code !== 'Ok') throw new Error('OSRM sin resultado');

    const ruta    = data.routes[0];
    const kmIda   = parseFloat((ruta.distance / 1000).toFixed(1));
    const minutos = Math.round(ruta.duration / 60);

    // Dibujar ruta
    routeLayer = L.geoJSON(ruta.geometry, {
      style: { color: '#06b6d4', weight: 4, opacity: 0.85 },
    }).addTo(map);
    map.fitBounds(routeLayer.getBounds(), { padding: [30, 30] });

    // Marcadores
    waypoints.forEach((w, i) => {
      const tipo = i === 0 ? 'origen' : i === waypoints.length - 1 ? 'destino' : 'parada';
      agregarMarcador(w.lat, w.lon, tipo, w.texto);
    });

    // Info
    document.getElementById('distancia-text').textContent = kmIda;
    document.getElementById('duracion-text').textContent  = minutos + ' min';
    document.getElementById('map-info').style.display     = 'flex';

    return { kmIda, minutos };
  } catch (e) {
    console.error('Error OSRM:', e);
    return null;
  } finally {
    document.getElementById('map-loading').style.display = 'none';
  }
}

// ── Autocompletado Nominatim ────────────────────────────────
let debounceTimers = {};

async function buscarNominatim(query) {
  if (query.length < 3) return [];

  // Buscar en toda Argentina (sin forzar ciudad). viewbox solo prioriza Córdoba,
  // pero sin bounded=1 cualquier destino del país aparece en los resultados.
  const params = new URLSearchParams({
    q: query + ', Argentina',
    format: 'json',
    limit: 7,
    countrycodes: 'ar',
    addressdetails: 1,
    viewbox: '-64.45,-31.25,-63.90,-31.60',
  });
  try {
    const res  = await fetch(`${NOMINATIM}?${params}`, {
      headers: { 'Accept-Language': 'es' },
    });
    return await res.json();
  } catch { return []; }
}

// ── Geocodificación inversa (lat/lon → dirección) ───────────
async function geocodificarInverso(lat, lon) {
  const params = new URLSearchParams({ lat, lon, format: 'json', zoom: 18, addressdetails: 1 });
  try {
    const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?${params}`, {
      headers: { 'Accept-Language': 'es' },
    });
    const data = await res.json();
    return data.display_name || `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
  } catch {
    return `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
  }
}

// ── Modo Clic en Mapa ───────────────────────────────────────
// campoClic = { inputId, onSelect } | null cuando está inactivo
let campoClic = null;
let clicOverlay = null;

function activarModoClic(inputId, onSelect) {
  // Si ya estaba activo ese mismo campo, lo desactiva (toggle)
  if (campoClic && campoClic.inputId === inputId) {
    desactivarModoClic();
    return;
  }

  campoClic = { inputId, onSelect };

  // Estilo crosshair en el mapa
  document.getElementById('map').classList.add('map-clic-activo');

  // Banner de instrucción encima del mapa
  if (!clicOverlay) {
    clicOverlay = document.createElement('div');
    clicOverlay.className = 'map-clic-overlay';
    clicOverlay.innerHTML = '<i class="fas fa-crosshairs"></i> Hacé clic en el mapa para seleccionar el punto exacto';
    document.querySelector('.cotizador-map-wrap').prepend(clicOverlay);
  }
  clicOverlay.style.display = 'flex';

  // Resaltar el botón activo
  document.querySelectorAll('.btn-pin').forEach(b => b.classList.remove('btn-pin-activo'));
  const btnActivo = document.querySelector(`.btn-pin[data-input="${inputId}"]`);
  if (btnActivo) btnActivo.classList.add('btn-pin-activo');
}

function desactivarModoClic() {
  campoClic = null;
  document.getElementById('map').classList.remove('map-clic-activo');
  if (clicOverlay) clicOverlay.style.display = 'none';
  document.querySelectorAll('.btn-pin').forEach(b => b.classList.remove('btn-pin-activo'));
}

// Listener global del mapa para el modo clic
function initMapaClic() {
  map.on('click', async (e) => {
    if (!campoClic) return;

    const { lat, lng } = e.latlng;
    const { inputId, onSelect } = campoClic;

    // Mostrar loading en el input
    const input = document.getElementById(inputId);
    if (input) input.placeholder = 'Buscando dirección...';

    const texto = await geocodificarInverso(lat, lng);

    if (input) {
      input.value = texto;
      input.placeholder = '';
    }

    desactivarModoClic();
    onSelect({ texto, lat, lon: lng });
  });
}

/**
 * Adjunta autocompletado a un input.
 * @param {string} inputId - ID del input
 * @param {string} listId  - ID del ul de sugerencias
 * @param {function} onSelect - Callback({texto, lat, lon})
 */
function adjuntarAutocompletado(inputId, listId, onSelect) {
  const input = document.getElementById(inputId);
  const list  = document.getElementById(listId);
  if (!input || !list) return;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimers[inputId]);
    const q = input.value.trim();
    if (q.length < 3) { list.innerHTML = ''; list.style.display = 'none'; return; }

    debounceTimers[inputId] = setTimeout(async () => {
      const results = await buscarNominatim(q);
      list.innerHTML = '';

      if (results.length === 0) { list.style.display = 'none'; return; }

      results.forEach(r => {
        const li = document.createElement('li');
        li.textContent = r.display_name;
        li.addEventListener('click', () => {
          input.value = r.display_name;
          list.innerHTML = '';
          list.style.display = 'none';
          onSelect({ texto: r.display_name, lat: parseFloat(r.lat), lon: parseFloat(r.lon) });
        });
        list.appendChild(li);
      });
      list.style.display = 'block';
    }, 400);
  });

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !list.contains(e.target)) {
      list.style.display = 'none';
    }
  });
}



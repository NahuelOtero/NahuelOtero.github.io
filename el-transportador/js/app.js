// ============================================================
//  APP.JS — Controlador principal de El Transportador
// ============================================================

// ── Estado de la aplicación ─────────────────────────────────
const estado = {
  origen:     null,  // { texto, lat, lon }
  destino:    null,
  paradas:    [],    // [{ id, texto, lat, lon }]
  tipoViaje:  'solo_ida',
  kmIda:      0,
  minutos:    0,
  rutaOk:     false,
  resultado:  null,
};

let paradaCounter = 0;

// ── Inicialización ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMapa();
  initMapaClic();
  setDefaults();
  bindEventos();
  initScrollAnimations();
  initSmoothScroll();
  agregarBtnPin('origen', 'origen-list', (datos) => { estado.origen = datos; recalcularRutaAuto(); });
  agregarBtnPin('destino', 'destino-list', (datos) => { estado.destino = datos; recalcularRutaAuto(); });
});

function setDefaults() {
  const hoy   = new Date();
  const fecha = hoy.toISOString().split('T')[0];
  const hora  = hoy.toTimeString().slice(0, 5);
  document.getElementById('fecha').value = fecha;
  document.getElementById('hora').value  = hora;
}

// ── Binding de eventos ──────────────────────────────────────
function bindEventos() {
  // Autocompletado origen
  adjuntarAutocompletado('origen', 'origen-list', (datos) => {
    estado.origen = datos;
    recalcularRutaAuto();
  });

  // Autocompletado destino
  adjuntarAutocompletado('destino', 'destino-list', (datos) => {
    estado.destino = datos;
    recalcularRutaAuto();
  });

  // Agregar parada
  document.getElementById('btn-agregar-parada').addEventListener('click', agregarParada);

  // Tipo de viaje
  document.querySelectorAll('.tipo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tipo-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      estado.tipoViaje = btn.dataset.value;
    });
  });

  // Calcular precio
  document.getElementById('btn-calcular').addEventListener('click', calcular);

  // WhatsApp
  document.getElementById('btn-whatsapp').addEventListener('click', abrirWhatsApp);
}

// ── Agrega botón de pin (📍) al lado de un input ───────────
function agregarBtnPin(inputId, listId, onSelect) {
  const wrapper = document.getElementById(inputId)?.closest('.autocomplete-wrapper');
  if (!wrapper || wrapper.querySelector('.btn-pin')) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn-pin';
  btn.dataset.input = inputId;
  btn.title = 'Seleccionar en el mapa';
  btn.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    activarModoClic(inputId, (datos) => { onSelect(datos); recalcularRutaAuto(); });
  });
  wrapper.appendChild(btn);
}

// ── Paradas dinámicas ───────────────────────────────────────
function agregarParada() {
  paradaCounter++;
  const id     = `parada-${paradaCounter}`;
  const listId = `${id}-list`;
  const obj    = { id, texto: '', lat: 0, lon: 0 };
  estado.paradas.push(obj);

  const div = document.createElement('div');
  div.className = 'form-group parada-group';
  div.id = `group-${id}`;
  div.innerHTML = `
    <label for="${id}"><i class="fas fa-map-pin accent"></i> Parada ${paradaCounter}</label>
    <div class="autocomplete-wrapper parada-row">
      <input type="text" id="${id}" placeholder="Ej: Av. Vélez Sársfield 1234" autocomplete="off">
      <ul class="autocomplete-list" id="${listId}" role="listbox"></ul>
      <button type="button" class="btn-remove-parada" data-id="${id}" aria-label="Eliminar parada">
        <i class="fas fa-times"></i>
      </button>
    </div>`;

  document.getElementById('paradas-container').appendChild(div);

  div.querySelector('.btn-remove-parada').addEventListener('click', () => {
    estado.paradas = estado.paradas.filter(p => p.id !== id);
    div.remove();
    recalcularRutaAuto();
  });

  adjuntarAutocompletado(id, listId, (datos) => {
    const p = estado.paradas.find(p => p.id === id);
    if (p) { p.texto = datos.texto; p.lat = datos.lat; p.lon = datos.lon; }
    recalcularRutaAuto();
  });

  // Botón pin para la parada
  agregarBtnPin(id, listId, (datos) => {
    const p = estado.paradas.find(p => p.id === id);
    if (p) { p.texto = datos.texto; p.lat = datos.lat; p.lon = datos.lon; }
  });
}

// ── Recalcular ruta automáticamente al cambiar puntos ───────
async function recalcularRutaAuto() {
  const waypoints = armarWaypoints();
  if (waypoints.length < 2) { limpiarRuta(); estado.rutaOk = false; return; }

  const res = await calcularRuta(waypoints);
  if (res) {
    estado.kmIda   = res.kmIda;
    estado.minutos = res.minutos;
    estado.rutaOk  = true;
  } else {
    estado.rutaOk = false;
  }
}

function armarWaypoints() {
  const pts = [];
  if (estado.origen  && estado.origen.lat)  pts.push({ ...estado.origen,  tipo: 'origen'  });
  estado.paradas.filter(p => p.lat).forEach(p => pts.push({ ...p, tipo: 'parada' }));
  if (estado.destino && estado.destino.lat) pts.push({ ...estado.destino, tipo: 'destino' });
  return pts;
}

// ── Calcular precio ─────────────────────────────────────────
async function calcular() {
  ocultarError();

  if (!estado.origen  || !estado.origen.lat)  { mostrarError('Ingresá un punto de origen válido.'); return; }
  if (!estado.destino || !estado.destino.lat) { mostrarError('Ingresá un destino válido.'); return; }

  if (!estado.rutaOk) {
    const res = await recalcularRutaAuto();
    if (!estado.rutaOk) { mostrarError('No se pudo calcular la ruta. Verificá los puntos ingresados.'); return; }
  }

  const hora        = parseInt(document.getElementById('hora').value.split(':')[0], 10);
  const minutosEspera = parseInt(document.getElementById('espera').value, 10) || 0;

  const result = calcularPrecio(
    estado.kmIda,
    estado.minutos,
    estado.tipoViaje,
    hora,
    minutosEspera,
    estado.destino.texto,
    estado.origen.texto,
  );

  estado.resultado = result;
  mostrarResultado(result, minutosEspera);
}

function mostrarResultado(r, minutosEspera) {
  document.getElementById('res-distancia').textContent = estado.kmIda + ' km';
  document.getElementById('res-base').textContent      = formatARS(r.precioBase);

  const filaEspera  = document.getElementById('res-espera-row');
  const filaPeajes  = document.getElementById('res-peajes-row');

  if (r.costoEspera > 0) {
    document.getElementById('res-espera').textContent = formatARS(r.costoEspera);
    filaEspera.style.display = 'flex';
  } else { filaEspera.style.display = 'none'; }

  if (r.costosPeajes > 0) {
    document.getElementById('res-peajes').textContent = formatARS(r.costosPeajes);
    filaPeajes.style.display = 'flex';
  } else { filaPeajes.style.display = 'none'; }

  document.getElementById('res-total').textContent = formatARS(r.totalRedondeado);

  const card = document.getElementById('resultado');
  card.style.display = 'block';
  card.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── WhatsApp ────────────────────────────────────────────────
function abrirWhatsApp() {
  if (!estado.resultado) return;
  const url = generarUrlWhatsApp({
    origen:      estado.origen,
    paradas:     estado.paradas.filter(p => p.texto),
    destino:     estado.destino,
    tipoViaje:   estado.tipoViaje,
    fecha:       document.getElementById('fecha').value,
    hora:        document.getElementById('hora').value,
    minutosEspera: parseInt(document.getElementById('espera').value, 10) || 0,
    precioFinal: estado.resultado.totalRedondeado,
  });
  window.open(url, '_blank');
}

// ── Helpers UI ──────────────────────────────────────────────
function mostrarError(msg) {
  document.getElementById('calcular-error-msg').textContent = msg;
  document.getElementById('calcular-error').style.display  = 'flex';
}
function ocultarError() {
  document.getElementById('calcular-error').style.display = 'none';
}

// ── Animaciones de scroll ───────────────────────────────────
function initScrollAnimations() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.animate-in').forEach(el => obs.observe(el));
}

// ── Smooth scroll para nav links ─────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
}

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

const TABLA_PEAJES = [
  // ── Destinos dentro de Córdoba (RAC – Caminos de las Sierras) ──
  // Autopista RN 20 / RN 38 – Sierras Chicas y Punilla
  { id: 'carlos-paz',     keywords: ['carlos paz', 'villa carlos paz'],                                costo: 3000   },
  { id: 'cosquin',        keywords: ['cosquín', 'cosquin'],                                            costo: 3000   },
  { id: 'la-falda',       keywords: ['la falda'],                                                      costo: 3000   },
  { id: 'capilla-monte',  keywords: ['capilla del monte'],                                             costo: 3000   },
  { id: 'huerta-grande',  keywords: ['huerta grande'],                                                 costo: 3000   },
  { id: 'la-cumbre',      keywords: ['la cumbre'],                                                     costo: 3000   },
  { id: 'cruz-eje',       keywords: ['cruz del eje'],                                                  costo: 3000   },

  // RN 36 – Hacia el Sur / Calamuchita
  { id: 'alta-gracia',    keywords: ['alta gracia'],                                                   costo: 0      },
  { id: 'bialet-masse',   keywords: ['bialet massé', 'bialet masse'],                                  costo: 3000   },
  { id: 'sta-rosa-calam', keywords: ['santa rosa de calamuchita', 'santa rosa calamuchita'],           costo: 6000   },
  { id: 'embalse',        keywords: ['embalse'],                                                       costo: 6000   },

  // RP 5 / Autovía Calamuchita
  { id: 'vgb',            keywords: ['villa general belgrano', 'villa gral belgrano', 'villa gral. belgrano'], costo: 3000  },
  { id: 'la-cumbrecita',  keywords: ['la cumbrecita'],                                                costo: 3000   },

  // RN 9 Norte – Hacia Jesús María
  { id: 'jesus-maria',    keywords: ['jesús maría', 'jesus maria'],                                   costo: 3000   },
  { id: 'colonia-caroya',  keywords: ['colonia caroya'],                                               costo: 3000   },
  { id: 'rio-ceballos',   keywords: ['río ceballos', 'rio ceballos', 'unquillo', 'salsipuedes'],      costo: 0      },

  // RN 9 Sur – Hacia Villa María
  { id: 'villa-maria',    keywords: ['villa maría', 'villa maria'],                                   costo: 3000   },
  { id: 'bell-ville',     keywords: ['bell ville', 'bellville'],                                      costo: 3000   },

  // RN 36 – Tramo completo hacia Río Cuarto (3 cabinas RAC)
  { id: 'rio-cuarto',     keywords: ['río cuarto', 'rio cuarto'],                                     costo: 9000   },

  // Traslasierra (RN 20 → RP 28 por Altas Cumbres)
  { id: 'mina-clavero',   keywords: ['mina clavero'],                                                 costo: 3000   },
  { id: 'nono',           keywords: ['nono', 'las rosas'],                                            costo: 3000   },
  { id: 'villa-dolores',  keywords: ['villa dolores'],                                                costo: 3000   },

  // Aeropuerto
  { id: 'aeropuerto',     keywords: ['aeropuerto', 'taravella', 'pajas blancas'],                     costo: 0      },

  // ── Destinos Interprovinciales (acumulado ida) ─────────────────
  // Rosario: 1 RAC + 2 nacionales (James Craik + Carcarañá)
  { id: 'rosario',        keywords: ['rosario'],                                                      costo: 6000   },

  // Buenos Aires: 1 RAC + ~5 nacionales
  { id: 'buenos-aires',   keywords: ['buenos aires', 'retiro', 'palermo', 'caba', 'microcentro', 'ezeiza', 'aeroparque'], costo: 11000  },

  // Mendoza: 1 RAC + ~3 nacionales
  { id: 'mendoza',        keywords: ['mendoza'],                                                      costo: 8000   },

  // San Luis / Villa Mercedes: 3 RAC + ~1 nacional
  { id: 'san-luis',       keywords: ['san luis', 'villa mercedes'],                                   costo: 11000  },

  // Salta / Tucumán: 1 RAC (RN9 Norte) + ~2 nacionales
  { id: 'salta',          keywords: ['salta'],                                                        costo: 6000   },
  { id: 'tucuman',        keywords: ['tucumán', 'tucuman', 'san miguel de tucumán'],                  costo: 6000   },
  { id: 'santiago-estero',keywords: ['santiago del estero'],                                           costo: 5000   },

  // Neuquén: 3 RAC (RN36) + ~3 nacionales
  { id: 'neuquen',        keywords: ['neuquén', 'neuquen'],                                           costo: 14000  },

  // Santa Fe (capital)
  { id: 'santa-fe',       keywords: ['santa fe'],                                                     costo: 6000   },

  // Mar del Plata / Costa Atlántica
  { id: 'mar-del-plata',  keywords: ['mar del plata', 'miramar', 'pinamar', 'villa gesell'],          costo: 14000  },

  // La Rioja / Catamarca
  { id: 'la-rioja',       keywords: ['la rioja'],                                                     costo: 5000   },
  { id: 'catamarca',      keywords: ['catamarca', 'san fernando del valle'],                          costo: 5000   },
];

function esHoraPico(hora) {
  return (hora >= 7 && hora < 9) || (hora >= 17 && hora < 20);
}

function calcularPeajes(origenText, destinoText) {
  const texto = (origenText + ' ' + destinoText).toLowerCase();
  const ruta = TABLA_PEAJES.find(r => r.keywords.some(kw => texto.includes(kw)));
  return ruta ? ruta.costo : 0;
}

/**
 * Calcula el precio del viaje.
 * @param {number} kmIda - Kilómetros de ida según OSRM
 * @param {number} minutosViaje - Duración estimada en minutos
 * @param {string} tipoViaje - 'solo_ida' | 'ida_vuelta'
 * @param {number} horaSalida - Hora en formato 0-23
 * @param {number} minutosEspera - Minutos de espera seleccionados
 * @param {string} destinoText - Texto del destino (para detectar localidades)
 * @param {string} origenText - Texto del origen
 * @returns {object} Desglose de precios
 */
function calcularPrecio(kmIda, minutosViaje, tipoViaje, horaSalida, minutosEspera, destinoText, origenText) {
  let precioBase = 0;

  // ── REGLA 1: URBANO < 15 km ──────────────────────────────
  if (kmIda < 15) {
    precioBase = (kmIda * PRECIOS.PRECIO_KM_URBANO) + (minutosViaje * PRECIOS.PRECIO_MIN_URBANO);
    if (esHoraPico(horaSalida)) precioBase *= PRECIOS.RECARGO_HORA_PICO;
    if (tipoViaje === 'ida_vuelta') precioBase *= 2;
    
    // Al ser un servicio privado con reserva, se fija un costo mínimo
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
      precioBase = costoIda + (kmIda * PRECIOS.PRECIO_KM_LARGO_VUELTA); // vuelta vacía al 50%
    } else {
      precioBase = costoIda * 2; // cliente paga vuelta completa
    }
  }

  let minutosACobrar = 0;
  if (minutosEspera > 0) {
    // Si solicita tiempo de espera, el mínimo cobrado es 10 min ($1.667 ARS).
    // A partir de allí, se fracciona proporcionalmente por cada minuto ingresado.
    minutosACobrar = Math.max(10, minutosEspera);
  }

  const costoEspera  = (minutosACobrar / 60) * PRECIOS.PRECIO_HORA_ESPERA;
  const costosPeajes = calcularPeajes(origenText, destinoText);
  const total        = precioBase + costoEspera + costosPeajes;
  const totalRedondeado = Math.ceil(total / 100) * 100;

  return {
    precioBase:     Math.ceil(precioBase / 100) * 100,
    costoEspera,
    costosPeajes,
    totalRedondeado,
  };
}

function formatARS(valor) {
  return '$' + valor.toLocaleString('es-AR');
}

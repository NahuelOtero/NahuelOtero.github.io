// ============================================================
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
const CABINAS_PEAJE = [
  {
    "id": "osm-30491494",
    "nombre": "Estación de Peaje Nacional",
    "lat": -34.46082,
    "lon": -58.70944,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-30958678",
    "nombre": "Estación de Peaje Nacional",
    "lat": -34.45812,
    "lon": -58.69152,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-32726763",
    "nombre": "Estación Márquez",
    "lat": -34.49837,
    "lon": -58.55094,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-32728289",
    "nombre": "Estación San Martín Ascendente",
    "lat": -34.48769,
    "lon": -58.56172,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-245021388",
    "nombre": "Estación Oeste",
    "lat": -34.61123,
    "lon": -58.71615,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-246682739",
    "nombre": "Estación de Peaje Nacional",
    "lat": -37.37302,
    "lon": -59.00803,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-247688276",
    "nombre": "Estación de Peaje Nacional",
    "lat": -37.73369,
    "lon": -57.44586,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-248471060",
    "nombre": "Peaje Larena",
    "lat": -34.40301,
    "lon": -59.01383,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-249484205",
    "nombre": "Peaje Solís",
    "lat": -34.28453,
    "lon": -59.36352,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-249488949",
    "nombre": "Peaje Sampacho Km 655",
    "lat": -33.42416,
    "lon": -64.77561,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-249763564",
    "nombre": "Estación de Peaje Nacional",
    "lat": -34.80978,
    "lon": -58.54337,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-251776758",
    "nombre": "Estación de Peaje Nacional",
    "lat": -31.50762,
    "lon": -58.18395,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-253907651",
    "nombre": "Peaje La Huella",
    "lat": -36.42818,
    "lon": -57.35101,
    "costo": 2500,
    "radioKm": 2
  },
  {
    "id": "osm-253932149",
    "nombre": "Estación Samborombón",
    "lat": -35.30755,
    "lon": -58.0536,
    "costo": 2500,
    "radioKm": 2
  },
  {
    "id": "osm-256990535",
    "nombre": "Peaje Acceso Puerto San Martín",
    "lat": -32.69945,
    "lon": -60.7856,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-259307966",
    "nombre": "Autopistas del Oeste",
    "lat": -34.62887,
    "lon": -58.69266,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-259310697",
    "nombre": "Autopistas del Oeste",
    "lat": -34.62861,
    "lon": -58.7081,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-259313129",
    "nombre": "Estación Ituzaingó",
    "lat": -34.632,
    "lon": -58.67118,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-259317280",
    "nombre": "Autopistas del Oeste",
    "lat": -34.63142,
    "lon": -58.6525,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-265676836",
    "nombre": "Estación 1",
    "lat": -34.63269,
    "lon": -58.62483,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-288973972",
    "nombre": "Telepeaje",
    "lat": -34.57231,
    "lon": -58.3983,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-298830087",
    "nombre": "CEAMSE",
    "lat": -34.58373,
    "lon": -58.67671,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-298932760",
    "nombre": "CEAMSE",
    "lat": -34.56876,
    "lon": -58.65254,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-303722578",
    "nombre": "Autopistas del Sol",
    "lat": -34.48612,
    "lon": -58.60903,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-307440495",
    "nombre": "Estación de Peaje Nacional",
    "lat": -34.6479,
    "lon": -58.4779,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-307452505",
    "nombre": "Estación Camino Real Ascendente",
    "lat": -34.48847,
    "lon": -58.57956,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-310741044",
    "nombre": "Autopistas del Oeste",
    "lat": -34.63125,
    "lon": -58.57189,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-310741104",
    "nombre": "Autopistas del Oeste",
    "lat": -34.62957,
    "lon": -58.55717,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-311346315",
    "nombre": "Autopistas del Oeste",
    "lat": -34.63227,
    "lon": -58.5981,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-315202861",
    "nombre": "Estación Dock Sud",
    "lat": -34.65117,
    "lon": -58.35315,
    "costo": 2500,
    "radioKm": 2
  },
  {
    "id": "osm-316523823",
    "nombre": "Peaje Mercado Central",
    "lat": -34.70756,
    "lon": -58.5023,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-318023359",
    "nombre": "CEAMSE",
    "lat": -34.56231,
    "lon": -58.62968,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-318024225",
    "nombre": "CEAMSE",
    "lat": -34.56805,
    "lon": -58.63948,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-323122803",
    "nombre": "Estación Buen Ayre",
    "lat": -34.48781,
    "lon": -58.58948,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-337656840",
    "nombre": "CEAMSE",
    "lat": -34.50342,
    "lon": -58.58972,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-340968550",
    "nombre": "Estación de Peaje Nacional",
    "lat": -32.26588,
    "lon": -58.0934,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-350659386",
    "nombre": "Peaje RAC Córdoba (RP/RN )",
    "lat": -31.37009,
    "lon": -64.29964,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-379560190",
    "nombre": "Estación de Peaje \"Villa Espil\"",
    "lat": -34.51985,
    "lon": -59.30891,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-415510221",
    "nombre": "Peaje Mendoza",
    "lat": -34.33482,
    "lon": -56.24506,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-441262863",
    "nombre": "Estación de Peaje Hudson",
    "lat": -34.77411,
    "lon": -58.1635,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-444671904",
    "nombre": "Estación de Peaje \"Puente General Belgrano\"",
    "lat": -27.44621,
    "lon": -58.88729,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-455765322",
    "nombre": "Estación Zárate",
    "lat": -34.11808,
    "lon": -59.01131,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-457895202",
    "nombre": "Santa Ana",
    "lat": -27.42841,
    "lon": -55.62978,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-478717865",
    "nombre": "Peaje Luján",
    "lat": -34.58,
    "lon": -59.00761,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-480191010",
    "nombre": "Peaje Monte Grande",
    "lat": -34.83084,
    "lon": -58.50918,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-481280026",
    "nombre": "Autopistas del Sol",
    "lat": -34.47716,
    "lon": -58.65667,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-481302215",
    "nombre": "Peaje Riccheri (Aguero)",
    "lat": -34.69902,
    "lon": -58.49592,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-534271028",
    "nombre": "Peaje Ponte Internacional",
    "lat": -28.5895,
    "lon": -56.0338,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-598367995",
    "nombre": "Reten Villamontes",
    "lat": -21.2016,
    "lon": -63.42985,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-598368768",
    "nombre": "Estación de Peaje Nacional",
    "lat": -21.26006,
    "lon": -63.51218,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-598370074",
    "nombre": "Estación de Peaje Nacional",
    "lat": -21.87067,
    "lon": -63.62286,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-602268782",
    "nombre": "Peaje - Tunel Hernandarias",
    "lat": -31.71659,
    "lon": -60.50232,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-603451894",
    "nombre": "Estación de Peaje Nacional",
    "lat": -34.48371,
    "lon": -58.62627,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-620522802",
    "nombre": "Peaje Tristán Suárez",
    "lat": -34.85401,
    "lon": -58.55148,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-659567876",
    "nombre": "AUSA",
    "lat": -34.64945,
    "lon": -58.46523,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-665040066",
    "nombre": "Via Campo",
    "lat": -24.74397,
    "lon": -53.26869,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-672076529",
    "nombre": "Estación San Martín Descendente",
    "lat": -34.49135,
    "lon": -58.56627,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-678973741",
    "nombre": "Estación de Peaje Nacional",
    "lat": -35.14294,
    "lon": -58.7403,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-691344408",
    "nombre": "Estación de Peaje Nacional",
    "lat": -34.60233,
    "lon": -58.90087,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-738432440",
    "nombre": "Peaje Pajas Blancas",
    "lat": -31.31235,
    "lon": -64.21882,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-747493910",
    "nombre": "Peaje Autopista Córdoba/Carlos Paz",
    "lat": -31.43664,
    "lon": -64.31235,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-809648134",
    "nombre": "Autopistas del Oeste",
    "lat": -34.6325,
    "lon": -58.61111,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-810542632",
    "nombre": "Peaje Acceso Sauce Viejo",
    "lat": -31.69096,
    "lon": -60.81106,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-874674115",
    "nombre": "Camino de las Sierras",
    "lat": -31.54044,
    "lon": -64.30492,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-898413756",
    "nombre": "Estación Debenedetti",
    "lat": -34.51306,
    "lon": -58.5217,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-908198325",
    "nombre": "Estación de Peaje Nacional",
    "lat": -31.47378,
    "lon": -60.83205,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-942090551",
    "nombre": "Buen Ayre Ascendente",
    "lat": -34.62807,
    "lon": -58.72807,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-967830430",
    "nombre": "Quilmes",
    "lat": -34.71638,
    "lon": -58.23698,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-993305825",
    "nombre": "Peaje Acceso San Lorenzo Norte",
    "lat": -32.72446,
    "lon": -60.76304,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1015151947",
    "nombre": "Estación de Peaje Nacional",
    "lat": -26.82915,
    "lon": -65.10973,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1055479106",
    "nombre": "Peaje Desagüadero",
    "lat": -33.41176,
    "lon": -67.12348,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1061908398",
    "nombre": "Estación de Peaje Nacional",
    "lat": -37.03594,
    "lon": -57.14298,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1091546195",
    "nombre": "Peaje Hinojo",
    "lat": -36.86175,
    "lon": -60.12274,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1131593102",
    "nombre": "Peaje Monte Cristo",
    "lat": -31.32776,
    "lon": -63.87494,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1207142013",
    "nombre": "Estación de Peaje La Pintada",
    "lat": -21.61077,
    "lon": -64.64297,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1241975601",
    "nombre": "Peaje de Santa Lucía",
    "lat": -34.44334,
    "lon": -56.42148,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1260422785",
    "nombre": "Peaje Aunor (Acceso a Salta Capital)",
    "lat": -24.77756,
    "lon": -65.31948,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1270117615",
    "nombre": "Peaje RAC Córdoba (RP/RN )",
    "lat": -31.56943,
    "lon": -63.99541,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1288268595",
    "nombre": "Peaje Soca",
    "lat": -34.67229,
    "lon": -55.76538,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1295445978",
    "nombre": "Concesionario Vial N° 6",
    "lat": -33.35115,
    "lon": -61.1339,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1297385867",
    "nombre": "Peaje de Makallé",
    "lat": -27.18683,
    "lon": -59.3263,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1340952003",
    "nombre": "Cabina de peaje (Fachinal)",
    "lat": -27.64416,
    "lon": -55.81592,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1391802503",
    "nombre": "Peaje R9 Toledo",
    "lat": -31.53996,
    "lon": -63.97204,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1408771137",
    "nombre": "CEAMSE",
    "lat": -34.5334,
    "lon": -58.59713,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1411400604",
    "nombre": "Estación de Peaje Nacional",
    "lat": -33.25411,
    "lon": -66.22701,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1411862333",
    "nombre": "Peaje Los Puquios",
    "lat": -33.27142,
    "lon": -66.1965,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1412966472",
    "nombre": "Estación de Peaje Nacional",
    "lat": -33.30265,
    "lon": -66.10938,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1413019223",
    "nombre": "Peaje La Punilla",
    "lat": -33.09101,
    "lon": -65.08781,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1431651513",
    "nombre": "Estación de Peaje Nacional",
    "lat": -22.69769,
    "lon": -60.53681,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1461236014",
    "nombre": "Peaje Minga Guazú",
    "lat": -25.48689,
    "lon": -54.85423,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1493828536",
    "nombre": "Berazategui",
    "lat": -34.7537,
    "lon": -58.19079,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1500798684",
    "nombre": "Peaje Alberti",
    "lat": -34.62524,
    "lon": -58.40009,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1529886717",
    "nombre": "Peaje Molle Yaco (RN 9 Trancas Tucumán)",
    "lat": -26.2947,
    "lon": -65.28077,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1557692638",
    "nombre": "Peaje RN9 - General Lagos",
    "lat": -33.12882,
    "lon": -60.57803,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1580089957",
    "nombre": "Peaje Manuel Diaz",
    "lat": -31.54674,
    "lon": -55.69877,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1599240751",
    "nombre": "Peaje R9 Carcaraña",
    "lat": -32.87637,
    "lon": -61.16987,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1673308369",
    "nombre": "Peaje Acceso Villa La Ribera",
    "lat": -32.63634,
    "lon": -60.82449,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1758751583",
    "nombre": "Estación de Peaje Nacional",
    "lat": -34.83952,
    "lon": -56.01406,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1759356013",
    "nombre": "Peaje Pando",
    "lat": -34.78482,
    "lon": -55.88853,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1797706004",
    "nombre": "EPR Iguaçu",
    "lat": -25.42701,
    "lon": -54.36405,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1873897866",
    "nombre": "Estación de Peaje Nacional",
    "lat": -33.83756,
    "lon": -54.76641,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1877152236",
    "nombre": "Peaje CARU",
    "lat": -33.10965,
    "lon": -58.24645,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1878712844",
    "nombre": "Peaje Centenario",
    "lat": -32.83994,
    "lon": -56.49355,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1890845166",
    "nombre": "Peaje Solís",
    "lat": -34.77751,
    "lon": -55.39245,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1921337639",
    "nombre": "Peaje Capilla de Cella",
    "lat": -34.7064,
    "lon": -55.46613,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1931258111",
    "nombre": "Peaje Troncal Sauce Viejo",
    "lat": -31.70866,
    "lon": -60.82583,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1939052546",
    "nombre": "Peaje Santa Lucía",
    "lat": -34.77639,
    "lon": -56.3662,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1939052652",
    "nombre": "Peaje Cufré",
    "lat": -34.35498,
    "lon": -57.11349,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-1992373827",
    "nombre": "Colonia Elia",
    "lat": -32.667,
    "lon": -58.44173,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2012998281",
    "nombre": "Estación de Peaje Nacional",
    "lat": -33.11967,
    "lon": -65.16401,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2049605085",
    "nombre": "Bernal",
    "lat": -34.7011,
    "lon": -58.27466,
    "costo": 2500,
    "radioKm": 2
  },
  {
    "id": "osm-2099281432",
    "nombre": "Peaje",
    "lat": -33.21196,
    "lon": -58.04795,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2101959034",
    "nombre": "Peaje Desagüadero",
    "lat": -33.4129,
    "lon": -67.11475,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2129690693",
    "nombre": "Estación de Peaje Nacional",
    "lat": -30.45575,
    "lon": -57.98496,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2196602287",
    "nombre": "Peaje Acceso San Lorenzo Centro",
    "lat": -32.7481,
    "lon": -60.75905,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2246707093",
    "nombre": "Peaje Zárate ruta 9",
    "lat": -34.10117,
    "lon": -59.15035,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2266484259",
    "nombre": "Peaje Jesús Maria",
    "lat": -31.1908,
    "lon": -64.15301,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2300375649",
    "nombre": "Peaje Paso del Puerto",
    "lat": -33.12897,
    "lon": -57.17266,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2313354389",
    "nombre": "Peaje Acceso Santo Tomé",
    "lat": -31.66661,
    "lon": -60.79545,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2326309075",
    "nombre": "Estación de Peaje James Craik",
    "lat": -32.18869,
    "lon": -63.38943,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2333720153",
    "nombre": "Peaje Santa Lucía",
    "lat": -34.78042,
    "lon": -56.35543,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2387637817",
    "nombre": "Estación de Peaje Nacional",
    "lat": -34.5827,
    "lon": -58.99584,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2442093800",
    "nombre": "Autopistas del Oeste",
    "lat": -34.59356,
    "lon": -58.94614,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2504224239",
    "nombre": "Peaje La Paz",
    "lat": -33.43584,
    "lon": -67.50243,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2505826564",
    "nombre": "Estación de Peaje Nacional",
    "lat": -35.09714,
    "lon": -58.93152,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2518892136",
    "nombre": "Estación de Peaje Nacional",
    "lat": -33.92974,
    "lon": -64.45203,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2519379484",
    "nombre": "Peaje Río Quinto",
    "lat": -33.87103,
    "lon": -65.33113,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2519379526",
    "nombre": "Peaje Buena Esperanza",
    "lat": -34.78083,
    "lon": -65.26005,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2583052743",
    "nombre": "EPR Iguaçu",
    "lat": -25.08412,
    "lon": -53.71351,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2616222360",
    "nombre": "Peaje - Tunel Hernandarias",
    "lat": -31.68742,
    "lon": -60.51205,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2625122357",
    "nombre": "Peaje Devoto",
    "lat": -31.41087,
    "lon": -62.20537,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2637745953",
    "nombre": "Peaje Olivera",
    "lat": -34.64505,
    "lon": -59.29428,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2665589283",
    "nombre": "Estación de Peaje \"Gutiérrez\"",
    "lat": -34.78429,
    "lon": -58.1532,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2704913191",
    "nombre": "Estación de Peaje Nacional",
    "lat": -36.84669,
    "lon": -57.86665,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2714354952",
    "nombre": "Peaje Cabeza de Buey (RN 9 Salta)",
    "lat": -24.81427,
    "lon": -65.01586,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2721681550",
    "nombre": "Estación de Peaje Nacional",
    "lat": -34.59626,
    "lon": -58.93549,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2722497996",
    "nombre": "Estación de Peaje Nacional",
    "lat": -34.58842,
    "lon": -58.96935,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2749399192",
    "nombre": "Estación de Peaje Nacional",
    "lat": -24.81881,
    "lon": -56.74053,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2849125675",
    "nombre": "Peaje Venado Tuerto",
    "lat": -33.69124,
    "lon": -62.09726,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2880807071",
    "nombre": "Peaje Santa Rosa",
    "lat": -32.36137,
    "lon": -65.17489,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2928555227",
    "nombre": "Estación de Peaje Nacional",
    "lat": -35.36047,
    "lon": -60.70288,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2961981776",
    "nombre": "Estación de Peaje \"San Vicente\"",
    "lat": -31.79214,
    "lon": -61.56714,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-2994040760",
    "nombre": "Peaje Acceso San Lorenzo Sur",
    "lat": -32.76718,
    "lon": -60.74805,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-3230201661",
    "nombre": "Peaje Santa Ana",
    "lat": -21.54881,
    "lon": -64.59024,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-3280404521",
    "nombre": "peaje",
    "lat": -27.62123,
    "lon": -58.73834,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-3314365383",
    "nombre": "Peaje Junin",
    "lat": -34.57931,
    "lon": -61.09399,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-3343101394",
    "nombre": "Peaje Justo Daract",
    "lat": -33.85211,
    "lon": -65.15087,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-3343101401",
    "nombre": "Peaje Justo Daract",
    "lat": -33.84842,
    "lon": -65.15857,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-3428603553",
    "nombre": "Estación Peaje La Cumbre",
    "lat": -33.35912,
    "lon": -66.06709,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-3466390720",
    "nombre": "Peaje Anchorena",
    "lat": -35.66936,
    "lon": -65.37524,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-3499007998",
    "nombre": "Reten La Mamora",
    "lat": -22.17051,
    "lon": -64.66855,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-3624016771",
    "nombre": "Peaje Bouwer (RAC RN 36)",
    "lat": -31.51971,
    "lon": -64.22888,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-3664306904",
    "nombre": "Estación de Peaje Hornillos",
    "lat": -21.30592,
    "lon": -65.64671,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-3677043541",
    "nombre": "Cabina de peaje Colonia Victoria",
    "lat": -26.33614,
    "lon": -54.61753,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-3866209913",
    "nombre": "Estación de Peaje Nacional",
    "lat": -37.88478,
    "lon": -57.9021,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4007907140",
    "nombre": "EPR Iguaçu",
    "lat": -25.02164,
    "lon": -53.27873,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4008130662",
    "nombre": "Estación de Peaje Nacional",
    "lat": -21.54597,
    "lon": -64.70962,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4209382181",
    "nombre": "Caminos del Golfo",
    "lat": -46.07373,
    "lon": -67.62925,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4329559374",
    "nombre": "Peaje Ibibobo",
    "lat": -21.54137,
    "lon": -62.99211,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4337826294",
    "nombre": "Motiva Pantanal",
    "lat": -23.86517,
    "lon": -54.32993,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4337829582",
    "nombre": "Motiva Pantanal",
    "lat": -23.16755,
    "lon": -54.1991,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4337829584",
    "nombre": "Motiva Pantanal",
    "lat": -22.47591,
    "lon": -54.86088,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4416977277",
    "nombre": "Estación de Peaje Nacional",
    "lat": -31.63625,
    "lon": -60.97415,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4468606421",
    "nombre": "Peaje Remanso",
    "lat": -25.17721,
    "lon": -57.5551,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4470257727",
    "nombre": "Peaje Itá",
    "lat": -25.53088,
    "lon": -57.33341,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4470272464",
    "nombre": "Estación de Peaje Nacional",
    "lat": -26.40627,
    "lon": -57.12953,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4470336893",
    "nombre": "Estación de Peaje Nacional",
    "lat": -25.11818,
    "lon": -57.42947,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4483239086",
    "nombre": "Estación de Peaje Nacional",
    "lat": -22.5342,
    "lon": -67.64893,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4529296141",
    "nombre": "Arroyo Tegua",
    "lat": -32.69899,
    "lon": -64.35068,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4550086433",
    "nombre": "Estación de Peaje Nacional",
    "lat": -27.15319,
    "lon": -53.90403,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4557891890",
    "nombre": "Ituzaingó",
    "lat": -27.57865,
    "lon": -56.61875,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4588225864",
    "nombre": "Peaje Ypacaraí",
    "lat": -25.38931,
    "lon": -57.27129,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4589207513",
    "nombre": "Estación Fernández",
    "lat": -27.94812,
    "lon": -63.84634,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4590186446",
    "nombre": "Estación de Peaje Nacional",
    "lat": -21.5114,
    "lon": -65.67238,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4591940736",
    "nombre": "Estación de Peaje Nacional",
    "lat": -21.24622,
    "lon": -65.20842,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4665585233",
    "nombre": "Peaje La Toma",
    "lat": -33.12053,
    "lon": -65.69128,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4666154588",
    "nombre": "Peaje Villa Mercedes",
    "lat": -33.60822,
    "lon": -65.45162,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-4749961938",
    "nombre": "Estación de Peaje \"Exaltación de la Cruz\" (próximamente)",
    "lat": -34.2123,
    "lon": -58.95845,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-5041086201",
    "nombre": "Trenque Lauquen",
    "lat": -35.91818,
    "lon": -62.5561,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-5067124256",
    "nombre": "Estación de Peaje Nacional",
    "lat": -31.33021,
    "lon": -61.31984,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-5079963599",
    "nombre": "Estación de Peaje Nacional",
    "lat": -22.0542,
    "lon": -59.95238,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-5079974377",
    "nombre": "Peaje Pozo Colorado",
    "lat": -23.50376,
    "lon": -58.78708,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-5261067280",
    "nombre": "Estación de Peaje Nacional",
    "lat": -26.10952,
    "lon": -55.15663,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-5265026326",
    "nombre": "Telepeaje",
    "lat": -34.56675,
    "lon": -58.40645,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-5312834304",
    "nombre": "Estación de Peaje Nacional",
    "lat": -26.01298,
    "lon": -56.65719,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-5342933095",
    "nombre": "Estación de Peaje Nacional",
    "lat": -23.64052,
    "lon": -56.47005,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-5442823456",
    "nombre": "Peaje",
    "lat": -21.83598,
    "lon": -60.85583,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-5668296427",
    "nombre": "Estación de Peaje Nacional",
    "lat": -27.14062,
    "lon": -55.74051,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-5706885925",
    "nombre": "Corredor Cordobés",
    "lat": -32.13206,
    "lon": -64.29366,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-5741485311",
    "nombre": "Estación de Peaje Nacional",
    "lat": -23.14609,
    "lon": -56.73068,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-5741558270",
    "nombre": "Estación de Peaje Nacional",
    "lat": -24.69752,
    "lon": -56.38251,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-5741753192",
    "nombre": "Estación de Peaje Nacional",
    "lat": -24.56695,
    "lon": -56.29654,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-6119601120",
    "nombre": "Estación de Peaje Nacional",
    "lat": -34.53222,
    "lon": -60.90191,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-6119665122",
    "nombre": "Estación de Peaje Nacional",
    "lat": -31.54695,
    "lon": -60.9264,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-6264276098",
    "nombre": "Estación de Peaje Nacional",
    "lat": -26.10266,
    "lon": -55.94236,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-6266866079",
    "nombre": "Motiva Pantanal",
    "lat": -21.86513,
    "lon": -54.52856,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-6290000061",
    "nombre": "Estación de Peaje Nacional",
    "lat": -27.22148,
    "lon": -55.83318,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-6360514407",
    "nombre": "Estación de Peaje Nacional",
    "lat": -26.37627,
    "lon": -57.13083,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-6390976337",
    "nombre": "Peaje Ecovía",
    "lat": -25.20815,
    "lon": -57.38507,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-6628543322",
    "nombre": "Estación de Peaje Nacional",
    "lat": -27.17594,
    "lon": -56.22573,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-6644731960",
    "nombre": "Peaje Garzón",
    "lat": -34.60275,
    "lon": -54.42654,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-6721560979",
    "nombre": "Estación de Peaje Nacional",
    "lat": -25.60484,
    "lon": -56.16057,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-6775789723",
    "nombre": "Estación de Peaje Nacional",
    "lat": -25.72886,
    "lon": -54.47018,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-7141956670",
    "nombre": "Cabina Peaje",
    "lat": -33.25428,
    "lon": -66.21244,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-7176538411",
    "nombre": "Estación de Peaje Nacional",
    "lat": -27.36355,
    "lon": -64.95727,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-7221372206",
    "nombre": "Peaje Coronel Domínguez",
    "lat": -33.1564,
    "lon": -60.72034,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-7926370410",
    "nombre": "Peaje",
    "lat": -22.07706,
    "lon": -60.83273,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-7968841653",
    "nombre": "Peaje Corredor NOA (RN 9/34)",
    "lat": -24.842,
    "lon": -65.47747,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-8151518318",
    "nombre": "Peaje Cerrito",
    "lat": -24.94523,
    "lon": -57.55292,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-8298507400",
    "nombre": "Estación de Peaje Nacional",
    "lat": -29.94602,
    "lon": -61.88645,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-8588502458",
    "nombre": "Estación de Peaje Nacional",
    "lat": -23.08064,
    "lon": -59.23325,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-8797029071",
    "nombre": "Estación de Peaje Nacional",
    "lat": -23.47211,
    "lon": -60.06972,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-8797029073",
    "nombre": "Estación de Peaje Nacional",
    "lat": -23.45409,
    "lon": -59.54638,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-8797029074",
    "nombre": "Estación de Peaje Nacional",
    "lat": -23.44446,
    "lon": -58.89793,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-8893028189",
    "nombre": "Estación de Peaje Nacional",
    "lat": -38.71489,
    "lon": -62.16468,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-8972967447",
    "nombre": "Peaje Queguay",
    "lat": -32.14554,
    "lon": -57.93869,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-9068926574",
    "nombre": "Estación de Peaje Nacional",
    "lat": -21.64829,
    "lon": -61.09204,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-9068926595",
    "nombre": "Estación de Peaje Nacional",
    "lat": -21.29407,
    "lon": -61.13303,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-9442807713",
    "nombre": "Control de Acceso a Termas del Arapey",
    "lat": -30.93648,
    "lon": -57.5341,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-9858582936",
    "nombre": "Peaje Centenario II",
    "lat": -32.84068,
    "lon": -56.48214,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-9877090080",
    "nombre": "Estación de Peaje Nacional",
    "lat": -25.47734,
    "lon": -56.54316,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-9885197663",
    "nombre": "Peaje Juan Manuel Frutos",
    "lat": -25.40274,
    "lon": -55.81413,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-10004717259",
    "nombre": "Pedágio da Palma",
    "lat": -29.72402,
    "lon": -53.58909,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-10004717266",
    "nombre": "Rota de Santa Maria",
    "lat": -29.74871,
    "lon": -53.06757,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-10833260554",
    "nombre": "Estación de Peaje Nacional",
    "lat": -38.9563,
    "lon": -68.05854,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-11060745842",
    "nombre": "Estación de Peaje Nacional",
    "lat": -26.27342,
    "lon": -54.73021,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-11286209298",
    "nombre": "Cooperativa Tatasi",
    "lat": -21.16656,
    "lon": -66.15373,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-11599107376",
    "nombre": "Peaje Héroes del Chaco",
    "lat": -25.22592,
    "lon": -57.60956,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-11612208869",
    "nombre": "Estación de Peaje Nacional",
    "lat": -43.20934,
    "lon": -65.2845,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-12050978848",
    "nombre": "Plaza de Peaje Cerritos Bayos",
    "lat": -22.69578,
    "lon": -69.18845,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-12306943962",
    "nombre": "Peaje Coronel Bogado",
    "lat": -27.19345,
    "lon": -56.19187,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-12352362020",
    "nombre": "Estación de Peaje Nacional",
    "lat": -21.88512,
    "lon": -63.65731,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-12352383150",
    "nombre": "Estación de Peaje Nacional",
    "lat": -21.36268,
    "lon": -63.48128,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-12396584393",
    "nombre": "Camino de las Sierras",
    "lat": -31.74792,
    "lon": -64.41773,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-12588810746",
    "nombre": "Peaje Mendiolaza (RAC E-53)",
    "lat": -31.2988,
    "lon": -64.47395,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-12652953064",
    "nombre": "Peaje Cruce Toledo",
    "lat": -22.32817,
    "lon": -60.27424,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-12820717108",
    "nombre": "Estación de Peaje Nacional",
    "lat": -25.60997,
    "lon": -54.61178,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-13164470568",
    "nombre": "Peaje Mendiolaza (RAC E-53)",
    "lat": -31.28004,
    "lon": -64.22907,
    "costo": 1500,
    "radioKm": 2
  },
  {
    "id": "osm-13356763132",
    "nombre": "Estación de Peaje Nacional",
    "lat": -21.55998,
    "lon": -64.67523,
    "costo": 1500,
    "radioKm": 2
  }
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

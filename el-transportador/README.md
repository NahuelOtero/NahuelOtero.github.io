# 🚗 El Transportador - Cotizador Web de Traslados Privados

Sitio web (Single Page Application) diseñado para cotizar y reservar traslados privados, servicios de paquetería y viajes de larga distancia desde Córdoba Capital a todo el país.

## 🛠️ Stack Tecnológico

*   **Frontend:** HTML5, CSS3, JavaScript ES6 (Vanilla - sin frameworks pesados).
*   **Mapas e Interfaz:** [Leaflet.js](https://leafletjs.com/) (Open Source).
*   **Routing y Distancias:** [OSRM](http://project-osrm.org/) (Open Source Routing Machine).
*   **Autocompletado de Direcciones:** API de [Nominatim (OpenStreetMap)](https://nominatim.org/).
*   **Hosting recomendado:** GitHub Pages.

---

## 📂 Estructura del Proyecto

```text
el-transportador/
├── index.html          # Interfaz principal (Hero, Servicios, Cotizador)
├── css/
│   └── style.css       # Estilos (Dark theme, colores cian/azul, animaciones)
├── js/
│   ├── app.js          # Lógica de la interfaz y eventos del cotizador
│   ├── mapa.js         # Configuración de Leaflet, autocompletado y OSRM
│   ├── tarifas.js      # Motor central de precios y lógica comercial
│   └── whatsapp.js     # Generador de enlaces para reservar por WhatsApp
└── assets/
    └── kwid-hero.jpg   # Imagen principal de fondo
```

---

## 💰 Reglas de Negocio (Motor de Precios)

Toda la lógica de precios se encuentra en el archivo `js/tarifas.js`. El sistema clasifica los viajes en 3 categorías principales basadas en la distancia:

### 1. Viajes Urbanos (Menos de 15 km)
*   Se cobra por **kilómetro recorrido** + **minutos de viaje estimado**.
*   **Recargo por Hora Pico:** Se aplica un multiplicador (+20%) si la salida es entre las 07:00-08:59 o 17:00-19:59.
*   **Tarifa Mínima:** Ningún viaje urbano costará menos de la `TARIFA_MINIMA_URBANA` (actualmente $12.000 ARS). Esto garantiza la rentabilidad de la reserva anticipada de un chofer exclusivo para tramos muy cortos.

### 2. Interurbanos Cortos (Entre 15 km y 100 km)
*   Se cobra una tarifa fija por kilómetro (`PRECIO_KM_CORTO`).
*   **Plus Nocturno por retorno vacío:** Si el viaje es de "Solo Ida" hacia destinos específicos (ej: Alta Gracia, Jesús María) en horarios nocturnos (19:00 a 07:00), se suma un cargo extra (`PLUS_RETORNO_VACIO`) para cubrir el regreso del chofer sin pasajeros. Aplica diferente a Carlos Paz (madrugada).

### 3. Larga Distancia (Más de 100 km)
*   **Ida y Vuelta:** El cliente paga el 100% de los kilómetros de ida y el 100% de la vuelta.
*   **Solo Ida:** El cliente paga el 100% de la ida y se le cobra un **50% de la vuelta** para cubrir parcialmente el rodaje de regreso vacío (`PRECIO_KM_LARGO_VUELTA`).

### Extras Constantes
*   **Tu Nombre:** Campo en el formulario que personaliza el saludo inicial y detalle del pasajero en el mensaje de WhatsApp.
*   **Tiempo de Espera:** El cliente ingresa los minutos de espera deseados. Si se solicita espera, el mínimo cobrado es 30 minutos ($3.500 ARS). A partir de allí, cualquier tiempo (ej: 40 min, 50 min) se fracciona de forma exacta y proporcional a la tarifa por hora (`PRECIO_HORA_ESPERA`).
*   **Peajes:** Módulo manual en `tarifas.js` basado en palabras clave. El sistema busca hacia dónde viaja el cliente y aplica el costo fijo de peajes en efectivo (cabina) para esa ruta.

---

## 🔧 ¿Cómo actualizar las tarifas?

Para modificar los precios en el futuro debido a la inflación, debes abrir el archivo `js/tarifas.js` con cualquier editor de texto y buscar la constante `PRECIOS` al inicio del archivo:

```javascript
const PRECIOS = {
  TARIFA_MINIMA_URBANA: 12000,
  PRECIO_KM_URBANO:      1200,
  PRECIO_MIN_URBANO:      200,
  RECARGO_HORA_PICO:     1.20,
  PRECIO_KM_CORTO:        800,
  PRECIO_KM_LARGO_IDA:    800,
  PRECIO_KM_LARGO_VUELTA: 400,
  PRECIO_HORA_ESPERA:    7000,
  PLUS_RETORNO_VACIO:   12000,
};
```

Simplemente cambia los números por los nuevos valores y guarda el archivo. 

### Actualización de Peajes
Justo debajo de los precios, encontrarás `TABLA_PEAJES`. Debes actualizar manualmente la variable `costo` (ej: `2000`) cada vez que Caminos de las Sierras o los corredores nacionales modifiquen los cuadros tarifarios.

---

## 🚀 Despliegue y Mantenimiento
*   No requiere base de datos ni servidor backend Node/Python.
*   Para actualizar el sitio web, simplemente haz un "push" de los archivos locales a tu repositorio de GitHub `nahuelotero/el-transportador`.
*   El número de celular para las reservas de WhatsApp está configurado en `js/whatsapp.js` en la variable `WA_NUMBER`.

# Café Aroma · Frontend

Sitio web de la cafetería hecho con **Angular** (componentes standalone, signals y control flow).
**Todo el contenido viene de la API en Node** (repositorio `cafeteria-backend`); no hay datos
escritos a mano en el código.

Secciones: Inicio (video en bucle), Servicios, Especialidades, Nosotros, Precios, Contacto
(formulario) y chatbot flotante.

## Requisitos

- Node.js 20 o superior
- El backend corriendo en `http://localhost:3000` (ver `cafeteria-backend`)

## Instalación y ejecución

```bash
npm install
npm start
```

Abre `http://localhost:4200`.

Si el backend usa otro puerto, cambia `API_URL` en `src/app/config/api.ts`.

## Estructura

```
src/app/
├── components/   # un componente por sección (navbar, hero, servicios, ...)
├── directives/   # appReveal: animación al hacer scroll
├── models/       # interfaces de los datos de la API
├── services/     # DataService: único acceso a la API
└── config/api.ts # URL del backend y rutas de fotos/videos
```

## Video y fotos (Pexels)

Los archivos multimedia **no están incluidos**: descárgalos de [pexels.com](https://www.pexels.com)
y guárdalos con estos nombres exactos. Mientras no existan, el sitio muestra un fondo de color.

**Video** → `public/videos/inicio.mp4`
(busca: "coffee shop", "barista pouring coffee", "cafe interior"; horizontal, ideal 10-20 s, menos de 15 MB)

**Fotos de especialidades** → `public/fotos/`

| Archivo | Qué buscar en Pexels |
| --- | --- |
| `espresso.jpg` | espresso shot |
| `capuchino.jpg` | cappuccino |
| `latte-art.jpg` | latte art |
| `cold-brew.jpg` | iced coffee / cold brew |
| `yungas.jpg` | pour over coffee / V60 |
| `reposteria.jpg` | pastries / cake and coffee |

**Fotos de la tienda (sección Nosotros)** → `public/fotos/`

| Archivo | Qué buscar en Pexels |
| --- | --- |
| `tienda-fachada.jpg` | coffee shop exterior |
| `tienda-interior.jpg` | cafe interior |
| `tienda-barra.jpg` | coffee bar counter |
| `tienda-mesas.jpg` | cafe tables window |
| `tienda-barista.jpg` | barista making coffee |
| `tienda-terraza.jpg` | cafe terrace |

Los nombres de archivo se guardan en MySQL (tablas `especialidades` y `fotos_tienda`, y
`cafeteria_info.video_inicio`). Si quieres otros nombres, cámbialos allí.

## Compilar

```bash
npm run build
```

# PANORAMA — Plataforma web de noticias (Angular)

Proyecto académico del módulo de **Desarrollo Front-end** (Entrega 3 — entrega final).
Autor: Santiago Cardona Suaza.

PANORAMA es una aplicación tipo periódico donde el usuario puede explorar noticias
educativas, tecnológicas, turísticas y comerciales, ver su detalle, guardarlas como
favoritas, publicar o eliminar noticias y escribir a la plataforma.

## Tecnologías

- Angular 19 (componentes standalone, rutas, servicios, signals, Reactive Forms)
- TypeScript, HTML5 y CSS3
- JSON local (`public/data/noticias.json`) leído con `HttpClient`
- `localStorage` para favoritos y para las noticias creadas o eliminadas
- GitHub Actions + GitHub Pages para el despliegue

## Estructura

```
src/app/
├── components/     header, footer y noticia-card (tarjeta reutilizable)
├── pages/          home, noticias, detalle, favoritos, contacto, publicar
├── services/       noticias.service (JSON + CRUD) y favoritos.service
├── models/         interfaz Noticia y categorías
├── validators/     validadores personalizados de formularios
└── utils/          lectura/escritura segura en localStorage
public/data/        noticias.json (fuente de datos)
```

## Cómo ejecutarlo en tu computador

Requiere Node.js 20 o superior.

```bash
npm install
npm start
```

Abre http://localhost:4200

## Despliegue

Cada `push` a la rama `main` ejecuta `.github/workflows/deploy.yml`, que compila la app
y la publica en GitHub Pages (Settings → Pages → Source: **GitHub Actions**).

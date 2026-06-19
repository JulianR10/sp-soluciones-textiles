# SP Estampados

[![GitHub Repo](https://img.shields.io/badge/GitHub-JulianR10/sp--soluciones--textiles-blue?logo=github)](https://github.com/JulianR10/sp-soluciones-textiles)

Sitio web corporativo para **SP Estampados**, taller especializado en estampados DTF, bordados personalizados y venta de prendas lisas.

---

## Tabla de Contenidos

- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Diseño](#diseño)
  - [Paleta de Colores](#paleta-de-colores)
  - [Tipografía](#tipografía)
  - [Sistema de Diseño](#sistema-de-diseño)
  - [Componentes Gráficos](#componentes-gráficos)
  - [Animaciones](#animaciones)
- [Assets](#assets)
- [Scripts Disponibles](#scripts-disponibles)

---

## Tecnologías

| Herramienta | Versión |
|-------------|---------|
| [Astro](https://astro.build) | ^6.2.2 |
| [Tailwind CSS](https://tailwindcss.com) | ^4.2.4 |
| [TypeScript](https://www.typescriptlang.org) | ^6.0.3 |
| Node.js | >=22.12.0 |

---

## Estructura del Proyecto

```text
/
├── public/                    # Archivos estáticos (favicon, galería JPG)
├── src/
│   ├── assets/                # Imágenes optimizadas (.webp, logo .png)
│   ├── components/
│   │   ├── icons/             # Iconos SVG (WhatsApp, Instagram, Facebook)
│   │   ├── Footer.astro       # Pie de página
│   │   └── Header.astro       # Barra de navegación superior
│   ├── layouts/
│   │   └── Layout.astro       # Layout base (head, fonts, scripts)
│   ├── pages/
│   │   └── index.astro        # Página principal (todas las secciones)
│   └── styles/
│       └── global.css         # Tokens de diseño Tailwind v4 + animaciones
├── astro.config.mjs           # Configuración de Astro + Vite + Tailwind
├── package.json
└── tsconfig.json
```

---

## Diseño

### Paleta de Colores

| Token | Valor | Uso |
|-------|-------|-----|
| `brand` | `#FF9025` | Naranja principal: botones, acentos, bordes, brillos decorativos |
| `dark` | `#0A0A0A` | Fondo general del sitio |
| `light` | `#FFFFFF` | Texto principal y superficies claras |
| `muted` | `#888888` | Texto secundario y metadatos |

**Variantes con opacidad** usadas extensivamente:
- `bg-brand/5`, `bg-brand/8`, `bg-brand/10` — fondos de secciones y brillos
- `border-brand/20`, `border-brand/30` — bordes decorativos (costuras)
- `text-brand/50`, `bg-brand/20` — badges y pills

**Gradientes decorativos:**
- `linear-gradient(90deg, #FF9025 → #FFB870 → #FFF0DC → #FFB870 → #FF9025)` — efecto shimmer en títulos
- `linear-gradient(90deg, transparent → #000 4% → #000 96% → transparent)` — máscara de desvanecimiento en ticker
- Múltiples `bg-linear-to-b/t/r` para overlays en hero, cards, galería y CTA

**Brillos ambientales:** 3 círculos radiales `blur-[180px–220px]` posicionados en top-left, center-right y bottom-center con `bg-brand/5` a `bg-brand/10`.

### Tipografía

| Fuente | Pesos | Rol |
|--------|-------|-----|
| [Outfit](https://fonts.google.com/specimen/Outfit) | 400, 500, 600, 700, 800 | **Display / headings** (`font-display`) |
| [Inter](https://fonts.google.com/specimen/Inter) | 400, 500, 600 | **Texto corporal** (`font-sans`) |

**Jerarquía tipográfica:**

| Elemento | Font | Peso | Tamaño |
|----------|------|------|--------|
| Hero `<h1>` | Outfit | Bold (700) | `text-4xl` → `text-8xl` |
| Section headings | Outfit | Bold (700) | `text-4xl` → `text-6xl` |
| Section labels | Outfit | Semibold (600) | `text-lg` |
| Card `<h3>` | Outfit | Bold (700) | `text-3xl` → `text-4xl` |
| Card description `<p>` | Inter | Regular (400) | `text-lg` |
| Navegación | Inter | Medium (500) | `text-sm` |
| Botones CTA | Outfit | Semibold (600) | `text-sm` → `text-base` |
| Footer headings | Outfit | Semibold (600) | `text-sm uppercase tracking-widest` |
| Ticker scrolling | Outfit | Bold (700) | `20px` |

### Sistema de Diseño

Definido en `src/styles/global.css` mediante `@theme` de Tailwind v4:

```css
@theme {
  --color-brand: #FF9025;
  --color-dark: #0A0A0A;
  --color-light: #FFFFFF;
  --color-muted: #888888;
  --font-sans: 'Inter', sans-serif;
  --font-display: 'Outfit', sans-serif;
}
```

**Layout:**
- Contenedor máximo: `max-w-6xl` (1152px)
- Padding horizontal estándar: `px-6`
- Fondo general: `bg-dark` (#0A0A0A) con texto `text-light` (#FFFFFF)
- Navegación: `fixed top-0` con `backdrop-blur-xl` (efecto cristal)

### Componentes Gráficos

**Header:**
- Logo con imagen (`logo.png`) y texto "SP Estampados" en `font-semibold`
- Nav desktop `hidden md:flex` con enlaces `text-gray-300 hover:text-white`
- Botón "Contacto" con `bg-brand text-black font-bold`
- Menú móvil mediante `<details>` con hamburger icon

**Footer:**
- Grid `[2fr_1fr_1fr]` con descripción, enlaces de navegación y contacto
- Íconos sociales SVG (WhatsApp, Instagram, Facebook) con `hover:text-brand transition-colors`
- Barra inferior con copyright y frase "Hecho con ❤️ para SP Estampados"

**Hero:**
- Imagen de fondo `bgmain.webp` con overlay `bg-linear-to-b from-dark/10 to-dark`
- Recuadro decorativo con 8 brackets (esquinas) en `bg-brand`
- Título con efecto **shimmer** animado (gradiente sobre clip de texto)
- Botón CTA "Cotizar por WhatsApp"
- Scroll indicator animado

**Servicios (2 cards):**
- "Prendas Personalizadas" — fondo `bgPrendasPersonalizadas.webp` con zoom en hover
- "Prendas Lisas" — fondo `bgPrendasLisas.webp` con zoom en hover
- Detalles de costura simulados: overlock stitch (solid) + safety stitch (dashed) en bordes
- Iconos SVG decorativos (estrella, rectángulo) en `text-brand`

**Ticker (cinta scrolleante):**
- Fondo semitransparente `rgba(31,31,31,0.55)` con `backdrop-filter: blur(8px)`
- Textura SVG noise (feTurbulence) al 6% de opacidad
- Máscara de desvanecimiento en bordes laterales
- Brillo superior/inferior con `box-shadow` brand glow
- Animación `ticker-scroll` 40s linear, se pausa en hover

**Galería:**
- 5 imágenes (galeria1.jpg – galeria5.jpg) en layout horizontal scroll
- Hover: zoom 110%, glow shadow `rgba(255,144,37,0.4)`, overlay degradado, borde brand

**Técnicas:**
- Grid de 4 badges con iconos (DTF, bordado, sublimación, plotter)
- Badges con `bg-brand/20 text-brand font-medium text-xs`
- Borde decorativo con glow en `rgba(255,144,37, ...)`

**CTA / "Hablemos":**
- Fondo `bgelaboracion.webp` con overlay degradado
- Botón "Enviar WhatsApp" con hover slide-up animado
- Borde `border-white/10` con glow `rgba(255,140,0,0.15)`

**"Nosotros":**
- Imagen `nosotros.webp` con overlay blur `bg-brand/20 opacity-40` → `opacity-60` en hover

**Sección Contacto:**
- Formulario en columnas con iconos SVG y decoración brand

### Animaciones

| Animación | Duración | Easing | Descripción |
|-----------|----------|--------|-------------|
| `shimmer` | 12s | linear, infinite | Gradient `background-position` de -200% a 200% en textos |
| `ticker-scroll` | 40s | linear, infinite | translateX(0) → translateX(-50%), pausa en hover |
| `scroll-reveal` | 1s | cubic-bezier(0.2,0.8,0.2,1) | translateY(40px) + opacity, threshold 13% |
| Card image zoom | 700ms | ease | group-hover:scale-110 en fondos de servicio |
| Galería hover | 500ms | ease | scale-110 + glow + overlay |
| Botones CTA | 300ms | ease | opacity, scale, hover slide-up overlay |

---

## Assets

### Imágenes (`src/assets/`)

| Archivo | Descripción |
|---------|-------------|
| `bgmain.webp` | Hero background |
| `bgmainblur.webp` | Variante blur (reserva) |
| `bgPrendasPersonalizadas.webp` | Card servicio personalizado |
| `bgPrendasLisas.webp` | Card servicio prendas lisas |
| `bgelaboracion.webp` | CTA / "Hablemos" background |
| `nosotros.webp` | Sección Nosotros |
| `bordado.webp` | Sin uso actual |
| `logo.png` | Logo corporativo (Header + Footer) |
| `favicon.svg` | Favicon SVG (shirt icon, dark/light mode) |
| `favicon.ico` | Favicon fallback |

### Iconos SVG (`src/components/icons/`)

| Componente | Descripción |
|------------|-------------|
| `WhatsAppIcon.astro` | Icono WhatsApp (props: size, class) |
| `InstagramIcon.astro` | Icono Instagram (props: size, class) |
| `FacebookIcon.astro` | Icono Facebook (props: size, class) |

### Galería (`public/` — pendientes de agregar)

| Archivo | Descripción |
|---------|-------------|
| `galeria1.jpg` | Trabajo de bordado |
| `galeria2.jpg` | Estampado DTF personalizado |
| `galeria3.jpg` | Prenda lisa con bordado |
| `galeria4.jpg` | Detalle de estampado DTF |
| `galeria5.jpg` | Conjunto personalizado |

---

## Scripts Disponibles

| Comando | Acción |
|---------|--------|
| `npm run dev` | Inicia servidor de desarrollo en `localhost:4321/sp-soluciones-textiles` |
| `npm run build` | Genera build de producción en `dist/` |
| `npm run preview` | Previsualiza el build localmente |
| `npm run astro` | CLI de Astro |
| `npm run check` | Ejecuta `astro check` (validación de tipos) |

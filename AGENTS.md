# AGENTS.md — SP Estampados

Contexto completo del proyecto para asistentes de código.

---

## Identidad del Proyecto

**SP Soluciones Textiles** (SP Estampados) — Sitio web corporativo para un taller especializado en estampados DTF, bordados personalizados y venta de prendas lisas.

- **GitHub:** [JulianR10/sp-soluciones-textiles](https://github.com/JulianR10/sp-soluciones-textiles)
- **URL de despliegue:** `https://JulianR10.github.io/sp-soluciones-textiles`
- **Base path:** `/sp-soluciones-textiles` (importante para assets y rutas)

---

## Stack Tecnológico

| Tecnología | Versión | Rol |
|------------|---------|-----|
| Astro | ^6.2.2 | Framework de sitio estático |
| Tailwind CSS | ^4.2.4 | Estilos (v4 con `@theme` en CSS) |
| TypeScript | ^6.0.3 | Tipado |
| Node.js | >=22.12.0 | Runtime |

**Dependencias:**
- `@tailwindcss/vite` — plugin Vite para Tailwind v4
- `@astrojs/check` — validación de tipos (devDependency)

---

## Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Preview del build |
| `npm run check` | Validación de tipos con `astro check` |
| `npm run astro` | CLI de Astro |

**NO hay linter configurado** (no existe eslint, prettier ni similar en el proyecto).

---

## Estructura del Proyecto

```
/
├── AGENTS.md                    # Este archivo
├── astro.config.mjs             # Config: site, base path, Vite + Tailwind
├── package.json
├── tsconfig.json
├── public/                      # Archivos estáticos (copiados tal cual)
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── galeria1.jpg             # Trabajo de bordado
│   ├── galeria2.jpg             # Estampado DTF
│   ├── galeria3.jpg             # Prenda lisa
│   ├── galeria4.jpg             # Detalle DTF
│   ├── galeria5.jpg             # Conjunto personalizado
│   ├── stitch-pattern.svg       # Textura de costura
│   └── weave-pattern.svg        # Textura de tejido (usada en sección Técnicas)
├── src/
│   ├── assets/                  # Imágenes optimizadas por Astro
│   │   ├── bgelaboracion.webp   # Background CTA "Hablemos"
│   │   ├── bgmain.webp          # Background hero (variante original)
│   │   ├── bgmainblur.webp      # Background hero (usado en código)
│   │   ├── bgPrendasLisas.webp  # Card servicio prendas lisas
│   │   ├── bgPrendasPersonalizadas.webp  # Card servicio personalizado
│   │   ├── boton.webp           # Icono decorativo sección Técnicas
│   │   ├── favicon.ico
│   │   ├── favicon.svg
│   │   ├── logo.png             # Logo corporativo
│   │   └── nosotros.webp        # Sección Nosotros
│   ├── components/
│   │   ├── Header.astro         # Navbar fijo con menú móvil (JS vanilla)
│   │   ├── Footer.astro         # Footer con redes sociales
│   │   └── icons/
│   │       ├── WhatsAppIcon.astro
│   │       ├── InstagramIcon.astro
│   │       └── FacebookIcon.astro
│   ├── layouts/
│   │   └── Layout.astro         # Layout base: head, fonts, Header/Footer, observer scroll
│   ├── pages/
│   │   └── index.astro          # Única página (landing page completa)
│   └── styles/
│       └── global.css           # Theme Tailwind v4 + animaciones custom
└── dist/                        # Build de producción
```

---

## Arquitectura y Patrones de Código

### Página Única (SPA estática)
- Todo el contenido está en `src/pages/index.astro`
- Secciones: Hero → Servicios → Ticker → Galería (oculta) → CTA → Técnicas → Nosotros → Contacto
- Navegación por anchors (`#servicios`, `#catalogo`, `#nosotros`, `#contacto`)

### Componentes Astro
- **No hay framework de JS** (React, Vue, etc.) — todo es Astro puro + vanilla JS
- Los componentes son `.astro` con frontmatter (imports) y HTML con clases Tailwind
- **Iconos SVG inline** como componentes Astro con props `size` y `class`

### Manejo de Imágenes
- Imágenes en `src/assets/`: importadas en frontmatter, accedidas con `.src`
  ```astro
  ---
  import bgmain from '../assets/bgmainblur.webp';
  ---
  <div style={`background-image: url('${bgmain.src}');`}></div>
  ```
- Imágenes en `public/`: referenciadas directamente como rutas absolutas
  ```astro
  <img src="galeria1.jpg" />
  ```
- Componente `<Image>` de `astro:assets` para optimización automática

### Estilos — Tailwind CSS v4
- **NO usa `tailwind.config.js`** — configuración vía `@theme` en `global.css`
- Tokens de diseño definidos en CSS:
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
- Uso de opacidad: `bg-brand/10`, `border-brand/30`, `text-brand/50`

### JavaScript Vanilla
- **Header:** menú móvil con `classList.toggle`, sin framework
- **Layout:** `IntersectionObserver` para animaciones scroll-reveal
- Todo el JS está en `<script>` inline en los componentes `.astro`

---

## Paleta de Colores y Design Tokens

| Token | Hex | Uso |
|-------|-----|-----|
| `brand` | `#FF9025` | Naranja principal: botones, acentos, bordes, brillos |
| `dark` | `#0A0A0A` | Fondo general del sitio |
| `light` | `#FFFFFF` | Texto principal |
| `muted` | `#888888` | Texto secundario |

**Variantes comunes:**
- `bg-brand/5`, `bg-brand/8`, `bg-brand/10` — fondos sutiles
- `border-brand/20`, `border-brand/30` — bordes decorativos (simulan costuras)
- `text-brand`, `bg-brand/20 text-brand` — badges y pills

---

## Tipografía

| Fuente | Pesos | Uso |
|--------|-------|-----|
| **Outfit** | 400, 500, 600, 700, 800 | Display/headings (`font-display`) |
| **Inter** | 400, 500, 600 | Texto corporal (`font-sans`) |

- Se cargan desde Google Fonts en `Layout.astro`
- Hero h1: `text-4xl → text-8xl`, Bold
- Section headings: `text-3xl → text-6xl`, Bold
- Botones CTA: `font-display font-semibold`

---

## Animaciones y Efectos

| Efecto | Implementación |
|--------|---------------|
| **Shimmer** | Clase `.text-shimmer` en `global.css` — gradiente animado en títulos |
| **Scroll reveal** | Clase `.reveal` + `IntersectionObserver` en `Layout.astro` |
| **Ticker scrolling** | Clases `.ticker-track`, `.ticker-row` — `translateX(-50%)` 40s linear |
| **Card hover zoom** | `group-hover:scale-110` con `transition-transform duration-700` |
| **Galería hover** | `hover:scale-105` + glow shadow brand + overlay |
| **Galería mobile** | Scroll horizontal con `snap-x snap-mandatory`, scrollbar oculto |

---

## Configuración de Astro

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://JulianR10.github.io',
  base: '/sp-soluciones-textiles',   // ← IMPORTANTE: todas las rutas relativas
  devToolbar: { enabled: false },    // toolbar desactivado
  vite: {
    plugins: [tailwind()],           // Tailwind v4 via Vite plugin
  },
});
```

**Nota sobre `base`:** Todas las rutas deben respetar el base path. En el código se usa `import.meta.env.BASE_URL` para construir rutas (favicon, logo en header).

---

## Secciones de la Página

1. **Hero** — fondo bgmainblur.webp, título con shimmer, CTA WhatsApp, esquinas decorativas brand
2. **Servicios** — 2 cards con fondo de imagen, hover reveal de contenido, bordes de costura (overlock + safety stitch)
3. **Ticker** — cinta scrolleante con servicios, fondo glass con blur, noise texture SVG
4. **Estadísticas** — 4 métricas clave (500+ prendas, 100+ marcas, 5+ años, 48h entrega)
5. **Galería** — 5 imágenes de trabajos con tags de categoría, scroll horizontal en mobile con snap
6. **Testimonios** — 3 cards con reviews de clientes, estrellas y avatares
7. **CTA** — fondo bgelaboracion.webp, botón WhatsApp con slide-up hover
8. **Técnicas** — grid asimétrico bordado/DTF, fondo weave-pattern.svg, bordes de costura
9. **Nosotros** — imagen nosotros.webp + texto descriptivo
10. **Contacto** — info completa (WhatsApp, teléfono, horarios) + formulario que redirige a WhatsApp

---

## Notas Importantes

- **NO hay linter ni formatter** configurado
- **NO hay tests** en el proyecto
- **NO hay base de datos ni backend** — sitio 100% estático
- **NO hay formularios funcionales reales** — el formulario de contacto redirige a WhatsApp
- El teléfono de WhatsApp está como placeholder: `5491112345678`
- Las URLs de Instagram y Facebook son genéricas (`https://www.instagram.com/`, `https://www.facebook.com/`)
- La galería usa imágenes placeholder (`galeria1.jpg` a `galeria5.jpg` en `public/`)

---

## Convenciones de Código

- **Idioma:** HTML en español (textos, comentarios, aria-labels)
- **Clases Tailwind:** utility-first, responsive con prefijos `sm:`, `md:`, `lg:`
- **Componentes:** Astro puro, sin frameworks JS
- **Imágenes:** `.webp` optimizado para assets, `.jpg` para galería en public
- **SVGs:** inline como componentes Astro con props
- **Scripts:** vanilla JS en `<script>` tags dentro de componentes

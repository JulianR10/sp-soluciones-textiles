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
| `npm run lint` | Linter + formatter con Biome (`biome check --write .`) |
| `npm run format` | Solo formateo con Biome (`biome format --write .`) |

**Linter/Formatter:** Biome 2.x configurado en `biome.json`. Los archivos `.astro` tienen `noUnusedVariables` y `noUnusedImports` desactivados (falsos positivos por uso en templates HTML).

---

## Estructura del Proyecto

```
/
├── AGENTS.md                    # Este archivo
├── astro.config.mjs             # Config: site, base path, Vite + Tailwind
├── biome.json                   # Configuración de Biome (linter + formatter)
├── package.json
├── tsconfig.json
├── public/                      # Archivos estáticos (copiados tal cual)
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── stitch-pattern.svg       # Textura de costura
│   └── weave-pattern.svg        # Textura de tejido (usada en sección Técnicas)
├── src/
│   ├── config.ts                # Configuración centralizada (URLs de contacto)
│   ├── assets/                  # Imágenes optimizadas por Astro
│   │   ├── bgmainblur.webp      # Background hero
│   │   ├── bgelaboracion.webp   # Background sección contacto
│   │   ├── boton.webp           # Icono decorativo sección Técnicas
│   │   ├── camiseta-conex.webp  # Producto Camisetas
│   │   ├── buzos.webp           # Producto Buzos
│   │   ├── campera.webp         # Producto Camperas
│   │   ├── camis-trabajo-lux.webp # Producto Camisas
│   │   ├── cuello-polo3.webp    # Producto Cuello Polo
│   │   ├── pantalones1.webp     # Producto Pantalones
│   │   ├── gorras1.webp         # Producto Gorras
│   │   ├── gorritos2.webp       # Producto Gorro Invierno
│   │   ├── fondo-contacto.webp  # Background sección contacto
│   │   ├── firma.png            # Firma "Hecho por" en footer
│   │   └── logo.png             # Logo corporativo
│   ├── scripts/                 # Módulos TS de cliente
│   │   ├── types.ts             # Helpers DOM tipados
│   │   ├── scroll-reveal.ts     # IntersectionObserver para .reveal
│   │   ├── header.ts            # Menú móvil, active nav, header line
│   │   ├── testimonials-slider.ts   # Slider auto-advance + swipe + teclado
│   │   └── stats-counter.ts     # Animación de contadores numéricos
│   ├── components/
│   │   ├── Header.astro         # Navbar fijo con menú móvil
│   │   ├── Footer.astro         # Footer con redes sociales
│   │   ├── sections/            # Componentes de sección (uno por sección)
│   │   │   ├── Hero.astro
│   │   │   ├── Ticker.astro
│   │   │   ├── ProductGrid.astro
│   │   │   ├── Tecnicas.astro
│   │   │   ├── Stats.astro
│   │   │   ├── Testimonials.astro
│   │   │   └── Contact.astro
│   │   └── icons/
│   │       ├── WhatsAppIcon.astro
│   │       ├── InstagramIcon.astro
│   │       └── FacebookIcon.astro
│   ├── layouts/
│   │   └── Layout.astro         # Layout base: head, fonts, Header/Footer
│   ├── pages/
│   │   └── index.astro          # Composición de secciones (Hero → Ticker → ProductGrid → Técnicas → Stats → Testimonials → Contact)
│   └── styles/
│       └── global.css           # Theme Tailwind v4 + animaciones custom
└── dist/                        # Build de producción
```

---

## Filosofía de Desarrollo

**Todo el código debe ser modular, mantenible y listo para futuros cambios.**

- Cada sección de la página es un componente independiente en `src/components/sections/`
- `index.astro` solo compone secciones, no contiene lógica ni contenido
- Datos repetitivos (productos, stats, testimonios) se definen como arrays en el frontmatter de su sección
- URLs de contacto centralizadas en `src/config.ts` — un cambio, un lugar
- Navegación: Inicio → Servicios (`#servicios`) → Contacto (`#contacto`)
- Sin CSS muerto — todo estilo en `global.css` debe tener uso en templates

---

## Arquitectura y Patrones de Código

### Página Única (SPA estática)
- `src/pages/index.astro` compone 7 secciones independientes
- Secciones: Hero → Ticker → ProductGrid → Técnicas → Estadísticas → Testimonios → Contacto
- Navegación por anchors (`#servicios`, `#contacto`)

### Componentes Astro
- **No hay framework de JS** (React, Vue, etc.) — todo es Astro puro + módulos TS
- Los componentes son `.astro` con frontmatter (imports + datos) y HTML con clases Tailwind
- **No contienen JS inline** (salvo `import '../scripts/x';` dentro de `<script>`)
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
  <img src="/sp-soluciones-textiles/logo.png" />
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
    --font-display: 'Fraunces', serif;
  }
  ```
- Uso de opacidad: `bg-brand/10`, `border-brand/30`, `text-brand/50`

### JavaScript / Módulos TypeScript — Contrato de Ingeniería

**Regla fundamental:** TODO el JS de cliente vive en `src/scripts/*.ts`.  
NUNCA escribir JS inline en `.astro` (salvo `import '../scripts/x';` dentro de `<script>`).  
Cada módulo se cablea con: `<script>import '../scripts/x';</script>` (Astro + Vite bundlea y type-checkea el `.ts`).

#### Patrón obligatorio por módulo

1. Importar helpers `getEl(id)` / `queryAll(sel)` desde `./types` (tipados con genéricos).
2. Función `initX(): void` con una sola guard clause al inicio:
   ```ts
   const el = getEl<HTMLElement>('my-id');
   if (!el) return; // → TS narrow automatico, sin `!`
   ```
3. Tras el guard, todos los elementos están tipados y non-null por narrowing.
4. Invocar `initX()` al final del módulo (top-level, no DOMContentLoaded wrapper).

#### Reglas de tipado
- Cero `!` non-null scattered — el guard clause es el único filtro.
- Cero `as any` — si necesitas `dataset`, castea explícito en el boundary:
  ```ts
  (el as HTMLElement).dataset.count
  ```
- Tipos de dominio centralizados en `src/scripts/types.ts`
- Parámetros de funciones siempre tipados (nunca `any` implícito).

#### Módulos existentes
- **`scroll-reveal.ts`** — `IntersectionObserver` para animaciones `.reveal` (desde Layout)
- **`header.ts`** — menú móvil, active nav highlight, header line (desde Header)
- **`testimonials-slider.ts`** — auto-advance 5s, fade, dots, flechas, touch swipe, teclado (desde index)
- **`stats-counter.ts`** — animación contadores `[data-count]` con IntersectionObserver (desde index)

#### Verificación
- `astro check` (`npm run check`) debe dar **0 errores**.
- Cualquier parche con `!`, `as any` o `@ts-ignore` es rechazado en PR review.
- No mezclar comportamiento (TS) con presentación (`.astro`).

---

## Sistema de Diseño

### Paleta de Colores

| Token | Hex | Uso |
|-------|-----|-----|
| `brand` | `#FF9025` | Naranja principal: botones, acentos, bordes, brillos |
| `dark` | `#0A0A0A` | Fondo general del sitio |
| `light` | `#FFFFFF` | Texto principal |
| `muted` | `#888888` | Texto secundario |
| `surface` | `#141414` | Fondos de cards |
| `accent` | `#D4A373` | Acento secundario (limitado) |

**Variantes comunes:**
- `bg-brand/5`, `bg-brand/10` — fondos sutiles
- `text-brand`, `bg-brand/20 text-brand` — badges y pills

### Tokens de Borde (sistema unificado)

| Token | Uso |
|-------|-----|
| `border-white/10` | Contenedores sutiles, divisores de sección |
| `border-brand/25` | Cards en estado default |
| `border-brand/40` | Cards en hover |
| `border-brand/50` | Botones CTA, acentos fuertes |
| `border-brand/70` | Estado activo/selected |

**Regla:** no usar opacidades de borde fuera de estos 5 niveles.

### Padding Horizontal (consistente)

Todas las secciones (incluido Header y Footer) usan `px-5 sm:px-6` para mantener alineación visual en mobile/desktop.

### Escala Tipográfica

| Elemento | Mobile → Desktop |
|----------|-----------------|
| Hero h1 | `text-4xl` → `text-8xl` (36→96px) |
| h2 (sección) | `text-3xl` → `text-5xl` (30→48px) |
| h3 (card/bloque) | `text-xl` → `text-2xl` (20→24px) |
| Body | `text-sm` → `text-base` (14→16px) |
| Subtle | `text-xs` (12px) |

**Regla:** un solo tamaño por rol semántico. No usar valores custom (`leading-[1.05]`, etc).

### Tipografía

| Fuente | Pesos | Uso |
|--------|-------|-----|
| **Fraunces** | 400, 500, 600, 700, 800 | Display/headings (`font-display`) |
| **Inter** | 400, 500, 600 | Texto corporal (`font-sans`) |

### Tratamientos Textiles

Solo la sección **Técnicas** lleva el tratamiento elaborado (doble borde costura + weave pattern). Estadísticas mantiene stitch strips + cards dashed. El resto de secciones va limpio: solo fondo, tipografía y espaciado.

### Accesibilidad

- Slider de testimonios con `role="region"`, `aria-live="polite"`, dots con touch target `44×44px`
- Menú móvil se cierra con Escape
- `prefers-reduced-motion`: desactiva reveal, stagger, shimmer y ticker
- SVGs decorativos con `aria-hidden="true"`

---

## Secciones de la Página

1. **Hero** — fondo bgmainblur.webp, título con shimmer, CTA WhatsApp, esquinas decorativas brand
2. **Ticker** — cinta scrolleante con servicios, fondo glass con blur, noise texture SVG
3. **ProductGrid** — grid 2×4 con 8 productos, imágenes, descripciones 2 líneas, borde dashed brand decorativo, id="servicios"
4. **Técnicas** — layout asimétrico bordado/DTF, fondo weave-pattern.svg, doble borde overlock + puntada
5. **Estadísticas** — 4 métricas (500+ prendas, 100+ marcas, 5+ años, 48h entrega), fondo `bg-brand/5`, stitch strips top/bottom, cards dashed, efecto etiqueta colgante (pin + hilo), `py-32`
6. **Testimonios** — slider auto-advance (5s) con fade, 5 testimonios, navegación por dots + flechas + touch swipe + teclado, sin título
7. **Contacto** — CTA + fondo fondo-contacto.webp con overlay, botones WhatsApp + Instagram
8. **Footer** — 3 columnas centradas, copyright + "Hecho por" con firma

---

## Notas Importantes

- **Linter/Formatter:** Biome 2.x configurado en `biome.json`
- **NO hay tests** en el proyecto
- **NO hay base de datos ni backend** — sitio 100% estático
- **NO hay formularios funcionales reales** — el formulario de contacto redirige a WhatsApp
- El teléfono de WhatsApp está como placeholder: `5491112345678`
- Las URLs de Instagram y Facebook son genéricas (`https://www.instagram.com/`, `https://www.facebook.com/`)

---

## Convenciones de Código

- **Idioma:** HTML en español (textos, comentarios, aria-labels)
- **Clases Tailwind:** utility-first, responsive con prefijos `sm:`, `md:`, `lg:`
- **Componentes:** Astro puro, sin frameworks JS
- **Imágenes:** `.webp` optimizado para assets
- **SVGs:** inline como componentes Astro con props
- **Scripts:** todo en `src/scripts/*.ts`, cableados con `<script>import '../scripts/x';</script>` (nunca JS inline en `.astro`)


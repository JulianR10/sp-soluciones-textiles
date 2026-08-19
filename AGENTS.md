# AGENTS.md — SP Estampados

Contexto para asistentes de código.

---

**SP Soluciones Textiles** — Sitio corporativo, 100% estático, página única, sin frameworks JS (Astro puro + módulos TS).

- **GitHub:** https://github.com/JulianR10/sp-soluciones-textiles
- **Deploy:** https://JulianR10.github.io/sp-soluciones-textiles
- **Base path:** `/sp-soluciones-textiles`

---

## Stack

| Tecnología | Versión |
|------------|---------|
| Astro | ^6.2.2 |
| Tailwind CSS | ^4.2.4 |
| TypeScript | ^6.0.3 |
| Node.js | >=22.12.0 |

**Dependencias clave:** `@tailwindcss/vite`, `@astrojs/check`

---

## Comandos

| Comando | Acción |
|---------|--------|
| `npm run dev` | Dev server |
| `npm run build` | Build → `dist/` |
| `npm run check` | `astro check` — 0 errores requerido |
| `npm run lint` | Biome check --write |
| `npm run format` | Biome format --write |

---

## Estructura

```
/src
├── assets/            # Imágenes .webp, logo, firma
├── components/
│   ├── sections/      # Hero, Ticker, Servicios, ProductGrid, Tecnicas, Stats, Testimonials, Contact
│   ├── icons/         # WhatsAppIcon, InstagramIcon, FacebookIcon (.astro, props size+class)
│   ├── WhatsAppButton.astro  # CTA WhatsApp reutilizable (props: class, size)
│   ├── Header.astro
│   └── Footer.astro
├── layouts/Layout.astro  # head, fonts, Header/Footer
├── pages/index.astro     # compone las 7 sections
├── scripts/              # TODO el JS de cliente (nunca inline en .astro)
│   ├── types.ts          # getEl(), queryAll() tipados
│   ├── header.ts         # menú móvil, active nav
│   ├── scroll-reveal.ts  # IntersectionObserver .reveal
│   ├── stats-counter.ts  # contadores [data-count]
│   └── testimonials-slider.ts  # auto-advance + swipe + teclado
├── styles/global.css     # @theme tokens + animaciones
└── config.ts             # URLs de contacto centralizadas
```

---

## Reglas de Arquitectura

- **Sin frameworks JS** — ni React, Vue, etc.
- **TODO JS cliente en `src/scripts/*.ts`**, cableado con `<script>import '../scripts/x';</script>` — cero JS inline
- **TS modules**: importar `getEl`/`queryAll` de `./types`, función `initX()` con guard clause, invocar al final. Cero `!`, `as any`, `@ts-ignore`
- **Tailwind v4**: sin `tailwind.config.js` — tokens en `@theme` dentro de `global.css`
- **Imágenes `src/assets/`**: importar en frontmatter, acceder con `.src`
- **Imágenes `public/`**: ruta absoluta con base path
- **Navegación**: Inicio → `#servicios` → `#contacto`
- **`astro check` debe dar 0 errores**

---

## Diseño

| Token | Hex | Uso |
|-------|-----|-----|
| `brand` | `#FF9025` | Naranja principal |
| `dark` | `#0A0A0A` | Fondo general |
| `light` | `#FFFFFF` | Texto principal |
| `muted` | `#888888` | Texto secundario |
| `surface` | `#141414` | Fondos de cards |

| Font | Uso |
|------|-----|
| **Outfit** (700, 600) | Display/headings (`font-display`) |
| **Inter** (400, 500, 600) | Texto corporal (`font-sans`) |

Bordes: `border-white/10` (default), `border-brand/25` (cards), `border-brand/40` (hover), `border-brand/50` (CTA), `border-brand/70` (active).  
Padding horizontal secciones: `px-5 sm:px-6`.

---

## Secciones (orden en index.astro)

Hero → Ticker → Servicios (`#servicios`) → ProductGrid (`#productos`) → Stats → Tecnicas → Testimonials → Contact → Footer

---

## Notas

- **No hay backend, DB, ni formularios reales** — el formulario redirige a WhatsApp
- WhatsApp placeholder: `5491112345678`
- Instagram/Facebook URLs genéricas
- Biome config en `biome.json`, archivos `.astro` tienen `noUnusedVariables`/`noUnusedImports` desactivados

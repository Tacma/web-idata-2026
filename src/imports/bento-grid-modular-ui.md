# Bento Grid Modular UI System - iData Corporate Site

## 🎯 Objetivo
Replicar el diseño modular tipo "Bento Box" de plataformas modernas de IA/educación, creando una experiencia visual narrativa con bloques que encajan como piezas de un rompecabezas.

## 📸 Referencia Original
Inspirado en: plataformas educativas de IA, Apple.com, Linear.app, Arc browser

## ✨ Componentes Implementados

### 1. **Header Moderno** ✅
**Archivo:** `/src/app/public/components/Header.tsx`

**Características:**
- Logo izquierda (h-10)
- Menú horizontal CENTRADO (position absolute + translate)
- Items con animación de underline al hover
- Botón "Sign up" / "Contactar" derecha con border pill
- Language switcher integrado
- Glass nav con backdrop-blur

**Layout:**
```
[Logo]          [Nav Items Centered]          [Lang] [Sign Up →]
```

**Hover Animation:**
```css
/* Línea que crece desde 0 a 100% width */
w-0 → w-full (300ms ease-out)
height: 2px
```

---

### 2. **Banner Carousel** ✅
**Archivo:** `/src/app/public/components/hero/BannerCarousel.tsx`

**Características:**
- 3 slides con rotación automática (5s)
- Animación slide de izquierda a derecha
- Controles manuales (flechas laterales)
- Dots indicator abajo
- Background image + gradient overlay
- Texto grande blanco con text-shadow
- Rounded-[32px] - esquinas súper redondeadas

**Animaciones:**
```tsx
Motion Spring: stiffness 300, damping 30
Slide variants: enter(100%) → center(0) → exit(-100%)
Arrows: opacity 0 → hover group 100%
```

**Props:**
- `slides[]` - array de slides
- `autoplayInterval` - tiempo entre slides (5000ms)

---

### 3. **Bento Grid System** ✅
**Archivo:** `/src/app/public/components/bento/BentoGrid.tsx`

**Grid Layout:**
```tsx
grid-cols-1 md:grid-cols-2 lg:grid-cols-12
gap-4 lg:gap-6
```

**Span Classes:**
- `sm`: 4 cols (1/3 width)
- `md`: 6 cols (1/2 width)
- `lg`: 8 cols (2/3 width)
- `full`: 12 cols (full width)

**BentoCard:**
```tsx
rounded-[24px]         // Super rounded
p-6 sm:p-8            // Generous padding
border border-gray-200/60
hover:shadow-lg hover:-translate-y-1
```

---

### 4. **Bento Card Types** ✅

#### **StatsCard** (`/bento/StatsCard.tsx`)
- Número GRANDE (text-7xl sm:text-8xl)
- Label descriptivo
- CTA button pill con flecha
- Uso: "+200 projects", "10k users"

#### **FeatureCard** (`/bento/FeatureCard.tsx`)
- Título + descripción
- Metadata (articles count, read time)
- Icon o Image opcional
- Layout vertical

#### **ImageCard** (`/bento/ImageCard.tsx`)
- Imagen full-size con overlay gradient
- Texto overlay bottom
- Hover scale 105%
- CTA con ArrowUpRight

#### **CTACard** (`/bento/CTACard.tsx`)
- Título bold grande
- Botón circular (w-14 h-14) con ícono
- Background gradient opcional
- High contrast

#### **UserStackCard** (`/bento/UserStackCard.tsx`)
- Avatar stack (-space-x-3)
- User count badge (+27)
- Título + descripción
- Category badge

---

### 5. **Secciones Actualizadas** ✅

#### **ServiceHighlightsSection**
Layout Bento:
```
[Feature Card (md)]  [User Stack (sm)]
[CTA Card (sm)]      [Stats Card (sm)]
[Dark Card (lg) - spanning full width]
```

Elementos:
- 3 servicios en cards diferentes
- Stats: "+200 proyectos"
- CTA: "Datos e Inteligencia"
- Dark card con texto blanco

#### **CaseHighlightsSection**
Layout Bento:
```
[Large Case (lg)]
[Case (sm)]  [Case (sm)]  [Case (sm)]
```

Elementos:
- Client badge con Award icon
- Título + excerpt
- Results badge (📊)
- CTA link con arrow

#### **IndustryHighlightsSection**
Layout Bento:
```
[Industry (lg)]  [Industry (sm)]
[Industry (sm)]  [Industry (sm)]
```

Elementos:
- Industry icons (Building2, Factory, etc.)
- Gradient backgrounds (blue/purple/green/orange)
- Hover: scale icon + rotate 3deg
- Decorative blur circle on hover

#### **InsightsHighlightsSection**
Layout Bento:
```
[Featured (md)]  [Insight (sm)]  [Insight (sm)]
[CTA Gradient (sm)]
```

Elementos:
- Category badges
- Metadata (date + read time)
- CTA card con gradient blue→purple
- White button on dark background

---

## 🎨 Design Tokens

### Border Radius
```css
Cards: rounded-[24px]
Banner: rounded-[32px]
Buttons: rounded-full
Badges: rounded-full
```

### Spacing
```css
Section padding: px-6 sm:px-8 lg:px-12
Card padding: p-6 sm:p-8
Grid gap: gap-4 lg:gap-6
Section margin: py-12 sm:py-16
```

### Typography
```css
Section Title: text-3xl sm:text-4xl lg:text-5xl font-bold
Card Title: text-2xl sm:text-3xl font-bold
Body: text-base font-light
Metadata: text-sm text-gray-500
```

### Colors
```css
Gradients:
- Blue: from-blue-50 to-blue-100
- Purple: from-purple-50 to-purple-100
- Green: from-green-50 to-green-100
- Orange: from-orange-50 to-orange-100

Dark gradient: from-blue-600 to-purple-600
```

### Hover Effects
```css
Cards: hover:shadow-lg hover:-translate-y-1
Icons: hover:scale-110 hover:rotate-3
Links: hover:gap-3 (spacing increase)
Images: hover:scale-105
```

---

## 📐 Grid Layouts Examples

### Ejemplo 1: Servicios
```tsx
<BentoGrid>
  <BentoCard span="md">Feature 1</BentoCard>
  <BentoCard span="sm">Feature 2</BentoCard>
  <BentoCard span="sm">CTA</BentoCard>
  <BentoCard span="sm">Stats</BentoCard>
  <BentoCard span="lg">Dark Feature</BentoCard>
</BentoGrid>
```

### Ejemplo 2: Casos de Estudio
```tsx
<BentoGrid>
  <BentoCard span="lg">Featured Case</BentoCard>
  <BentoCard span="sm">Case 1</BentoCard>
  <BentoCard span="sm">Case 2</BentoCard>
  <BentoCard span="sm">Case 3</BentoCard>
</BentoGrid>
```

### Ejemplo 3: Mix
```tsx
<BentoGrid>
  <BentoCard span="sm">Item 1</BentoCard>
  <BentoCard span="sm">Item 2</BentoCard>
  <BentoCard span="sm">Item 3</BentoCard>
  <BentoCard span="full">Full Width Banner</BentoCard>
</BentoGrid>
```

---

## 🔄 Migration Flow

### Antes (Grid simple)
```tsx
<div className="grid md:grid-cols-3 gap-8">
  <div className="bg-white p-8 rounded-2xl">
    Content
  </div>
</div>
```

### Después (Bento Grid)
```tsx
<BentoGrid>
  <BentoCard span="md" background="bg-white">
    Content
  </BentoCard>
  <BentoCard span="sm" background="bg-gradient-to-br from-blue-50 to-purple-50">
    Content
  </BentoCard>
</BentoGrid>
```

---

## 🎯 Best Practices

### DO ✅
- Usar span="lg" para featured content
- Alternar backgrounds (white, gray-50, gradients)
- Incluir hover states en todos los cards interactivos
- Usar Motion para scroll animations
- Mantener padding consistente (p-6 sm:p-8)
- Usar rounded-[24px] para cards

### DON'T ❌
- No usar más de 2 "lg" spans seguidos (rompe balance)
- No mezclar muchos gradientes (max 2-3 por sección)
- No olvidar metadata en cards (date, time, count)
- No usar border-radius pequeños (min 20px)
- No saturar con CTAs (1-2 por sección)

---

## 📱 Responsive Behavior

### Mobile (< 768px)
- Single column (grid-cols-1)
- Todos los cards span="full"
- Padding reducido (p-6)
- Typography escalado (text-2xl)

### Tablet (768px - 1024px)
- 2 columns (md:grid-cols-2)
- Cards adaptan a 2-col layout
- Some stacking

### Desktop (> 1024px)
- 12-column grid system
- Full bento layout
- Cards mantienen span definido

---

## 🚀 Resultado Final

El sitio ahora tiene:
- ✅ Header moderno con menú centrado y animaciones
- ✅ Banner carousel con 3 slides automáticos
- ✅ Bento Grid modular en todas las secciones
- ✅ 5 tipos de cards diferentes
- ✅ Diseño narrativo que "cuenta una historia"
- ✅ Hover effects premium
- ✅ Responsive completo
- ✅ Datos originales preservados

---

**Created:** March 5, 2026  
**Version:** 3.0 - Bento Grid Modular  
**Status:** Production Ready ✨

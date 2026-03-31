# Apple Liquid Glass UI System - iData Corporate Site

## 🍎 Inspiración: Apple Design Language

Este sistema está inspirado en:
- **macOS Big Sur/Sonoma**: Efectos glassmorphism en sidebars, headers, notificaciones
- **iOS**: Translucency effects, backdrop blur, vibrancy
- **Apple.com**: Cards con glass effect, hero sections, navigation bars
- **Vision Pro UI**: Depth, layers, organic blur effects

## 🎨 Design Principles

1. **Translucency & Depth**: Múltiples capas con blur effects para crear profundidad
2. **Subtle Interactions**: Animaciones suaves de 200-300ms con cubic-bezier
3. **Clean Typography**: SF Pro Display font system, font-weights consistentes
4. **Consistent Spacing**: Sistema de spacing Apple-style (8px base)
5. **Organic Blur**: Blur values de 20px, 40px, 60px según contexto

## 📦 CSS Variables (theme.css)

```css
/* Glass Backgrounds */
--glass-bg-light: rgba(255, 255, 255, 0.72);    /* Cards, buttons */
--glass-bg-medium: rgba(255, 255, 255, 0.6);    /* Panels, hovers */
--glass-bg-heavy: rgba(255, 255, 255, 0.85);    /* Navigation, modals */

/* Glass Borders */
--glass-border: rgba(255, 255, 255, 0.18);

/* Glass Shadows (Apple-style multi-layer) */
--glass-shadow-sm: 0 2px 16px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.02);
--glass-shadow-md: 0 4px 24px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.03);
--glass-shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04);
--glass-shadow-xl: 0 12px 48px rgba(0, 0, 0, 0.1), 0 6px 24px rgba(0, 0, 0, 0.05);

/* Blur Values */
--glass-blur-light: 20px;
--glass-blur-medium: 40px;
--glass-blur-heavy: 60px;

/* Border Radius (Apple-style generous) */
--glass-radius-sm: 12px;
--glass-radius-md: 16px;
--glass-radius-lg: 20px;
--glass-radius-xl: 24px;
```

## 🧩 Utility Classes (glass-utilities.css)

### Base Glass Effects

```css
.glass-light    /* Blur 20px, bg 72% opacity */
.glass-medium   /* Blur 40px, bg 60% opacity */
.glass-heavy    /* Blur 60px, bg 85% opacity */
```

### Component-Specific

```css
.glass-card      /* Cards con hover lift effect */
.glass-button    /* Buttons con scale effect */
.glass-nav       /* Navigation bars con saturate(180%) */
.glass-modal     /* Modals/dialogs con heavy blur */
.glass-input     /* Form inputs con focus state */
.glass-panel     /* Sidebars con saturate(150%) */
.glass-popover   /* Tooltips/dropdowns */
.glass-badge     /* Tags/pills */
```

### Hover States

```css
.glass-hover-lift   /* translateY(-4px) + shadow-lg */
.glass-hover-scale  /* scale(1.02) */
.glass-hover-glow   /* shadow + glow effect */
```

### Active States

```css
.glass-active-press  /* scale(0.98) on active */
```

### Transitions

```css
.glass-transition       /* 300ms cubic-bezier(0.4, 0, 0.2, 1) */
.glass-transition-fast  /* 200ms cubic-bezier(0.4, 0, 0.2, 1) */
```

## 🔧 React Components

### GlassCard

```tsx
import { GlassCard } from '@/shared/components/GlassCard';

<GlassCard 
  variant="card"      // 'light' | 'medium' | 'heavy' | 'card'
  hover="lift"        // 'lift' | 'scale' | 'glow' | 'none'
  as="section"        // 'div' | 'section' | 'article' | 'aside'
  className="p-8"
>
  <h3>Card Title</h3>
  <p>Card content with glassmorphism effect</p>
</GlassCard>
```

### GlassButton

```tsx
import { GlassButton } from '@/shared/components/GlassButton';

<GlassButton 
  variant="primary"   // 'primary' | 'secondary' | 'glass' | 'outline'
  size="md"          // 'sm' | 'md' | 'lg'
  fullWidth={false}
  onClick={handleClick}
>
  Click Me
</GlassButton>
```

### GlassInput

```tsx
import { GlassInput } from '@/shared/components/GlassInput';

<GlassInput
  label="Email"
  placeholder="your@email.com"
  error={errors.email}
  helperText="We'll never share your email"
/>
```

## 📋 Usage Examples

### Navigation Bar

```tsx
<header className="glass-nav sticky top-0 z-50">
  <nav className="max-w-7xl mx-auto px-4">
    <Link className="glass-transition-fast hover:text-[#4387DF]">
      Services
    </Link>
  </nav>
</header>
```

### Service Cards Grid

```tsx
<div className="grid md:grid-cols-3 gap-8">
  {services.map(service => (
    <motion.div 
      className="glass-card p-8 group"
      whileHover={{ y: -5 }}
    >
      <h3 className="group-hover:text-[#4387DF] glass-transition">
        {service.title}
      </h3>
    </motion.div>
  ))}
</div>
```

### Filter Buttons

```tsx
<div className="flex gap-2">
  <button className="glass-badge px-4 py-2 glass-radius-md glass-hover-scale glass-active-press">
    All
  </button>
  <button className="glass-badge px-4 py-2 glass-radius-md glass-hover-scale glass-active-press">
    Design
  </button>
</div>
```

### Hero CTAs

```tsx
{/* Primary CTA */}
<Link className="glass-button bg-[#4387DF] text-white glass-hover-scale glass-active-press">
  Get Started
</Link>

{/* Secondary CTA */}
<Link className="glass-button text-gray-700 glass-hover-scale glass-active-press">
  Learn More
</Link>
```

### Content Cards

```tsx
<ContentCard
  title="Case Study Title"
  excerpt="Brief description..."
  href="/case-study"
  badge="Industry"
  variant="featured"  // Uses glass-card + glass-hover-glow
/>
```

## 🎯 Best Practices

### DO ✅

- Use `glass-card` for content containers
- Use `glass-button` for secondary/tertiary buttons
- Use `glass-nav` for sticky headers
- Combine with Motion for smooth animations
- Use `glass-transition` classes for consistency
- Layer glass elements for depth (lighter on top of heavier)
- Use `backdrop-blur-*` for custom blur values

### DON'T ❌

- Mix glass effects with solid backgrounds in same component
- Use glass on small elements < 100px (looks muddy)
- Stack multiple heavy glass layers (performance)
- Use glass-heavy for cards (too opaque)
- Forget hover/active states on interactive elements
- Use glass on text (readability issues)

## 🌈 Color Combinations

### Brand Blue + Glass

```tsx
<button className="glass-badge text-[#4387DF] glass-hover-scale">
  Tag
</button>
```

### Active State (Selected filter)

```tsx
<button className={`glass-badge ${
  isActive 
    ? 'bg-[#4387DF] text-white glass-shadow-md' 
    : 'text-gray-700'
}`}>
  Filter
</button>
```

### Hover Glow (Featured content)

```tsx
<div className="glass-card glass-hover-glow">
  Featured Content
</div>
```

## 🔄 Migration Guide

### Before (Old Style)

```tsx
<div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all">
```

### After (Glass Style)

```tsx
<div className="glass-card p-8">
```

---

## 📚 References

- **Apple Human Interface Guidelines**: https://developer.apple.com/design/human-interface-guidelines/
- **Glassmorphism UI**: https://hype4.academy/tools/glassmorphism-generator
- **Apple.com**: Inspect navigation, cards, hero sections for inspiration

## 🎨 Design Tokens Summary

| Token | Value | Usage |
|-------|-------|-------|
| `glass-bg-light` | rgba(255,255,255,0.72) | Cards, buttons |
| `glass-bg-medium` | rgba(255,255,255,0.6) | Hover states |
| `glass-bg-heavy` | rgba(255,255,255,0.85) | Nav, modals |
| `glass-blur-light` | 20px | Buttons, badges |
| `glass-blur-medium` | 40px | Cards, panels |
| `glass-blur-heavy` | 60px | Navigation, overlays |
| `glass-radius-md` | 16px | Default radius |
| `glass-shadow-md` | Multi-layer | Default shadow |

---

**Created**: March 5, 2026  
**Version**: 1.0  
**Status**: Production Ready ✨

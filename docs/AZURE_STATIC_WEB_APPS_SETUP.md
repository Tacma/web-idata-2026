# Azure Static Web Apps Setup

Esta guía deja este proyecto listo para publicarse en Azure Static Web Apps usando el plan `Free`.

## Variables que sí debes configurar en Azure

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_PUBLIC_SITE_URL`

## Variable que NO debes subir al sitio público

- `VITE_SUPABASE_SERVICE_ROLE_KEY`

Esa llave es solo para scripts de servidor o administración segura. No debe quedar en GitHub ni en Azure Static Web Apps para este frontend.

## Configuración recomendada al crear la app

- Build preset: `Custom`
- App location: `/`
- Api location: dejar vacío
- Output location: `dist`

## Qué resuelve `staticwebapp.config.json`

- Permite refrescar rutas SPA sin romper:
  - `/admin`
  - `/es/...`
  - `/en/...`
- Reescribe rutas no estáticas hacia `index.html`
- Mantiene los assets directos fuera del fallback

## Verificación mínima después del deploy

1. Abrir la URL pública principal
2. Verificar `/en/`
3. Verificar `/es/`
4. Verificar `/admin/login`
5. Iniciar sesión en admin
6. Confirmar lectura de contenido desde Supabase


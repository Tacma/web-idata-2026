Necesito recuperar la estructura funcional original del Home sin perder el diseño visual actual.

IMPORTANTE:
- No eliminar estilos actuales.
- No eliminar componentes existentes.
- No borrar cambios visuales recientes.
- Solo restaurar estructura lógica y conexión con CMS.

OBJETIVO:
Revisar y reconstruir la arquitectura del Home basada en HomeSections dinámicas.

1) VALIDAR Y RESTAURAR:

- Que el Home renderice secciones desde la colección HomeSections.
- Que cada sección tenga sectionType.
- Que exista switch o renderer dinámico por tipo.
- Que no haya contenido hardcodeado.
- Que ES/EN sigan funcionando correctamente.

2) ASEGURAR QUE EXISTAN LOS TIPOS:

- hero
- strategicBannerTriple
- authority
- maturityPath
- capabilities
- caseStudies
- insights
- ctaFinal

Si falta alguno, recrearlo manteniendo el diseño actual.

3) NO TOCAR:

- Navbar
- Footer
- Sistema de rutas
- SEO base
- Tokens de diseño

4) RESPONSIVE

Verificar que:
- Desktop
- Tablet
- Mobile

Sigan funcionando correctamente.

5) VALIDAR ADMIN

Confirmar que:
- Cada sección editable siga conectada al CMS.
- No haya props rotas.
- No haya textos fijos en el código.

Resultado esperado:
Home visual intacto.
Arquitectura restaurada.
CMS funcional.
Sin contenido hardcodeado.
Sin romper diseño.
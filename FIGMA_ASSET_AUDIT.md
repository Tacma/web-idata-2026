# FIGMA Asset Audit Report

Este archivo documenta todos los imports `figma:asset/...` encontrados en el proyecto, preparados para migración a rutas públicas `/assets/...`.

## Resumen
- **Total de imports encontrados**: 72 (excluyendo 1 en archivo markdown)
- **Archivos afectados**: 12 archivos TypeScript/TSX
- **Categorías identificadas**:
  - Logos de partners: Microsoft, Snowflake, Databricks, Google Cloud, AWS
  - Logos de clients: INS, Velez, Nadro, Haceb, JFK, Davis
  - Imágenes de hero: Páginas principales de secciones
  - Imágenes de servicios: Iconos/ilustraciones de servicios
  - Imágenes de equipo: Fotos del personal
  - Imágenes de about: Contenido de la página About
  - Imágenes de careers: Banner y cultura
  - Logo de brand: Logo principal de iData

## Inventario Detallado

### Careers.tsx (Página de Carreras)
| Variable | Hash | Categoría | Ruta Futura Propuesta |
|----------|------|-----------|----------------------|
| careersBannerImage | 57c6301ab7145ee9f1d118169ba33db8ad13999c | images/careers | /assets/images/careers/careers-banner.png |
| cultureImage | ed370e692ad7f1e382eb99fbc6beef86c1da4251 | images/careers | /assets/images/careers/culture.png |

### About.tsx (Página Acerca de)
| Variable | Hash | Categoría | Ruta Futura Propuesta |
|----------|------|-----------|----------------------|
| heroImage | ebcdc655b31368ba51720354d958d877a0a91062 | images/about | /assets/images/about/hero.png |
| teamImage | ae562fdabd65d9651214906535f0624dca06cc6a | images/about | /assets/images/about/team.png |
| globalPresenceImage | e1362831fe70eb39f894aa7bab963c7d7d25cd4d | images/about | /assets/images/about/global-presence.png |
| transformamosImage | 3bf23a950290c6e1aaeda88947a8341567e11e5e | images/about | /assets/images/about/transformamos.png |
| bayronPhoto | 2d69b2e0003b5983abcea60a809ceb744a552d65 | images/team | /assets/images/team/bayron.png |
| victorPhoto | 023015df2324327451f05c232f40fda738147b0c | images/team | /assets/images/team/victor.png |
| angelaPhoto | bdbe50b8128fa4a2128c222ba5b58b03ea9addd5 | images/team | /assets/images/team/angela.png |
| luciaPhoto | 5dadeafa75d24b5b794373b02353a341522765a7 | images/team | /assets/images/team/lucia.png |
| dayanaPhoto | f5c5b21aadcd070194f8f9f37c8ac6adaf9602c8 | images/team | /assets/images/team/dayana.png |

### IndustriesIndex.tsx (Página de Industrias)
| Variable | Hash | Categoría | Ruta Futura Propuesta |
|----------|------|-----------|----------------------|
| heroImage | 202ec833b06c7799e876fd83c520fa94807e6fe3 | images/hero | /assets/images/hero/industries.png |

### ServicesIndex.tsx (Página de Servicios Index)
| Variable | Hash | Categoría | Ruta Futura Propuesta |
|----------|------|-----------|----------------------|
| heroImage | f13e93a5336016cfdd179a5fe66e5a9ffb036446 | images/hero | /assets/images/hero/services-index.png |

### ServicesPage.tsx (Página de Servicios)
| Variable | Hash | Categoría | Ruta Futura Propuesta |
|----------|------|-----------|----------------------|
| heroImage | 807f4652c8d95ddbee1d44684e9e0291c16c029f | images/hero | /assets/images/hero/services.png |
| dataStrategyImage | e0fd18e1974bd95855a2de171535d160bd4bc63e | images/services | /assets/images/services/data-strategy.png |
| dataEngineeringImage | 76b02f6059883d09d11f4c3a88fd01cd8d66aa9a | images/services | /assets/images/services/data-engineering.png |
| advancedAnalyticsImage | 1299c30cdfc96cd0398b9935d436448d0134427e | images/services | /assets/images/services/advanced-analytics.png |
| artificialIntelligenceImage | f7cb664cad0f1746ea9066ed03e99d14705dcb0a | images/services | /assets/images/services/artificial-intelligence.png |
| dataPlatformsImage | 6b516d23f0f656858f47ef4bf97125f4c1f98dbe | images/services | /assets/images/services/data-platforms.png |
| dataOperationsImage | 0aa3ccc9e83c8e7482164db714ed3d7d8e5ceb33 | images/services | /assets/images/services/data-operations.png |
| microsoftLogo | 48829b35c832ac4a631d74dcfd8ac69d34b0adfa | logos/partners | /assets/logos/partners/microsoft.png |
| snowflakeLogo | 0f1a314fdbee8b957c6504f8fff0a07b3918b269 | logos/partners | /assets/logos/partners/snowflake.png |
| databricksLogo | d77c1b8e6a9a1a6f84c17715022360c027287a95 | logos/partners | /assets/logos/partners/databricks.png |
| googleCloudLogo | 809f376c4277570a490e5d7e959560b3df1ea78b | logos/partners | /assets/logos/partners/google-cloud.png |
| awsLogo | b8142854237a06a23c35b902808cc4d698f6938b | logos/partners | /assets/logos/partners/aws.png |

### Contact.tsx (Página de Contacto)
| Variable | Hash | Categoría | Ruta Futura Propuesta |
|----------|------|-----------|----------------------|
| contactHeroImage | 683c3c060f30ddc97aad2f8f2fe317663df72155 | images/hero | /assets/images/hero/contact.png |

### ServiceDetailPage.tsx (Página Detalle de Servicio)
| Variable | Hash | Categoría | Ruta Futura Propuesta |
|----------|------|-----------|----------------------|
| dataStrategyImage | e0fd18e1974bd95855a2de171535d160bd4bc63e | images/services | /assets/images/services/data-strategy.png |
| dataEngineeringImage | 76b02f6059883d09d11f4c3a88fd01cd8d66aa9a | images/services | /assets/images/services/data-engineering.png |
| advancedAnalyticsImage | 1299c30cdfc96cd0398b9935d436448d0134427e | images/services | /assets/images/services/advanced-analytics.png |
| artificialIntelligenceImage | f7cb664cad0f1746ea9066ed03e99d14705dcb0a | images/services | /assets/images/services/artificial-intelligence.png |
| dataPlatformsImage | 6b516d23f0f656858f47ef4bf97125f4c1f98dbe | images/services | /assets/images/services/data-platforms.png |
| dataOperationsImage | 0aa3ccc9e83c8e7482164db714ed3d7d8e5ceb33 | images/services | /assets/images/services/data-operations.png |
| microsoftLogo | 48829b35c832ac4a631d74dcfd8ac69d34b0adfa | logos/partners | /assets/logos/partners/microsoft.png |
| snowflakeLogo | 0f1a314fdbee8b957c6504f8fff0a07b3918b269 | logos/partners | /assets/logos/partners/snowflake.png |
| databricksLogo | d77c1b8e6a9a1a6f84c17715022360c027287a95 | logos/partners | /assets/logos/partners/databricks.png |
| googleCloudLogo | 809f376c4277570a490e5d7e959560b3df1ea78b | logos/partners | /assets/logos/partners/google-cloud.png |
| awsLogo | b8142854237a06a23c35b902808cc4d698f6938b | logos/partners | /assets/logos/partners/aws.png |

### CaseStudiesIndex.tsx (Página Index de Case Studies)
| Variable | Hash | Categoría | Ruta Futura Propuesta |
|----------|------|-----------|----------------------|
| heroImage | 921b886abff2b12e01dec8866e9d861ee838fd1b | images/hero | /assets/images/hero/case-studies-index.png |
| microsoftLogo | 48829b35c832ac4a631d74dcfd8ac69d34b0adfa | logos/partners | /assets/logos/partners/microsoft.png |
| snowflakeLogo | 0f1a314fdbee8b957c6504f8fff0a07b3918b269 | logos/partners | /assets/logos/partners/snowflake.png |
| databricksLogo | d77c1b8e6a9a1a6f84c17715022360c027287a95 | logos/partners | /assets/logos/partners/databricks.png |
| googleCloudLogo | 809f376c4277570a490e5d7e959560b3df1ea78b | logos/partners | /assets/logos/partners/google-cloud.png |
| awsLogo | b8142854237a06a23c35b902808cc4d698f6938b | logos/partners | /assets/logos/partners/aws.png |
| insLogo | 2e14479f6b7066197b9d67ffd124097086808a61 | logos/clients | /assets/logos/clients/ins.png |
| velezLogo | 06b06e1855dac275c8812f9479d406e8e9c1ca79 | logos/clients | /assets/logos/clients/velez.png |
| nadroLogo | fea3a17e7a6ead1a7633740672cbe99a239fd082 | logos/clients | /assets/logos/clients/nadro.png |
| hacebLogo | c1c9d7e7386341aeb2920aa7bd64068809822c14 | logos/clients | /assets/logos/clients/haceb.png |
| jfkLogo | 7f2a0e2d34d7f6af4acad574a9b15fad31a6695f | logos/clients | /assets/logos/clients/jfk.png |
| davisLogo | c1583c61ef791e553848a046849ced947984afb5 | logos/clients | /assets/logos/clients/davis.png |

### CaseStudyDetail.tsx (Página Detalle de Case Study)
| Variable | Hash | Categoría | Ruta Futura Propuesta |
|----------|------|-----------|----------------------|
| microsoftLogo | 48829b35c832ac4a631d74dcfd8ac69d34b0adfa | logos/partners | /assets/logos/partners/microsoft.png |
| snowflakeLogo | 0f1a314fdbee8b957c6504f8fff0a07b3918b269 | logos/partners | /assets/logos/partners/snowflake.png |
| databricksLogo | d77c1b8e6a9a1a6f84c17715022360c027287a95 | logos/partners | /assets/logos/partners/databricks.png |
| googleCloudLogo | 809f376c4277570a490e5d7e959560b3df1ea78b | logos/partners | /assets/logos/partners/google-cloud.png |
| awsLogo | b8142854237a06a23c35b902808cc4d698f6938b | logos/partners | /assets/logos/partners/aws.png |
| insHeroImage | 64c2a94903fc2aeb8877fc1cde125accceae6357 | images/case-studies | /assets/images/case-studies/ins-hero.png |
| dataArchitectureHero | 95f5231b46b50e1e0563f086e023eda105bcf13b | images/case-studies | /assets/images/case-studies/data-architecture-hero.png |
| hacebHeroImage | 2fe699e45c2e6cb3f77d2eab2fbd09019e366523 | images/case-studies | /assets/images/case-studies/haceb-hero.png |
| insLogo | 2e14479f6b7066197b9d67ffd124097086808a61 | logos/clients | /assets/logos/clients/ins.png |
| velezLogo | 06b06e1855dac275c8812f9479d406e8e9c1ca79 | logos/clients | /assets/logos/clients/velez.png |
| nadroLogo | fea3a17e7a6ead1a7633740672cbe99a239fd082 | logos/clients | /assets/logos/clients/nadro.png |
| hacebLogo | c1c9d7e7386341aeb2920aa7bd64068809822c14 | logos/clients | /assets/logos/clients/haceb.png |
| jfkLogo | 7f2a0e2d34d7f6af4acad574a9b15fad31a6695f | logos/clients | /assets/logos/clients/jfk.png |
| davisLogo | c1583c61ef791e553848a046849ced947984afb5 | logos/clients | /assets/logos/clients/davis.png |

### BannerCarousel.tsx (Componente Carrusel de Banner)
| Variable | Hash | Categoría | Ruta Futura Propuesta |
|----------|------|-----------|----------------------|
| businessAnalytics | f13e93a5336016cfdd179a5fe66e5a9ffb036446 | images/hero | /assets/images/hero/business-analytics.png |
| touchInterface | b86f9f238fc505b2a767d919802c20b3a7008a07 | images/hero | /assets/images/hero/touch-interface.png |
| dataVisualization | 31f47165e77b4832ecdf1b4454b8ab4690c8b1a8 | images/hero | /assets/images/hero/data-visualization.png |

### PartnersSection.tsx (Sección de Partners)
| Variable | Hash | Categoría | Ruta Futura Propuesta |
|----------|------|-----------|----------------------|
| databricksLogo | 6707a99b3f00e8781810e4a2da4770218ad1d3d1 | logos/partners | /assets/logos/partners/databricks.png |
| microsoftLogo | 39c219b2f06de4cb5909c4a548597fc419ee1c9c | logos/partners | /assets/logos/partners/microsoft.png |
| tdSynnexLogo | 624953b8852fe92d4f63e7605e72b0549ba81c89 | logos/partners | /assets/logos/partners/td-synnex.png |

### Footer.tsx (Pie de página)
| Variable | Hash | Categoría | Ruta Futura Propuesta |
|----------|------|-----------|----------------------|
| logoComplete | 4c7049aaff013a605e31fb46a88d0dba9bdf9428 | logos/brand | /assets/logos/brand/logo-complete.png |

### Header.tsx (Encabezado)
| Variable | Hash | Categoría | Ruta Futura Propuesta |
|----------|------|-----------|----------------------|
| logoComplete | 4c7049aaff013a605e31fb46a88d0dba9bdf9428 | logos/brand | /assets/logos/brand/logo-complete.png |

### InsightsHero.tsx (Hero de Insights)
| Variable | Hash | Categoría | Ruta Futura Propuesta |
|----------|------|-----------|----------------------|
| heroImage | 0672d1e82b63fbb8a1b13c17fdbe095b353950ff | images/hero | /assets/images/hero/insights.png |

## Archivos Bloqueados por figma:asset
Actualmente, no se detectan errores de compilación relacionados con los imports `figma:asset`. El proyecto parece compilar correctamente en desarrollo, probablemente porque Vite resuelve estos imports a través del plugin de Figma Make.

Sin embargo, para producción, estos imports fallarán ya que no existen rutas reales. Se recomienda migrar antes del despliegue.

## Próximos Pasos
1. Recibir la carpeta `public/assets` con los archivos PNG finales.
2. Usar el archivo `figma-asset-map.template.json` para mapear hashes a rutas reales.
3. Ejecutar un script de migración para reemplazar todos los imports automáticamente.
4. Verificar que todas las imágenes se carguen correctamente.
5. Probar el build de producción.

## Notas
- Los nombres de archivos propuestos son sugerencias basadas en las variables importadas.
- Algunos logos aparecen en múltiples archivos (ej: microsoftLogo), asegurarse de usar la misma ruta.
- Las rutas propuestas siguen la estructura solicitada: `/assets/logos/...`, `/assets/images/...`.
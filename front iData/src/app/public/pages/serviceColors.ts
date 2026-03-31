// Configuración de colores por servicio
export const serviceColors = {
  'strategy-consulting': {
    main: 'rgba(99, 102, 241, 0.28)',     // Índigo - 30% más transparente (0.4 * 0.7 = 0.28)
    accent: 'rgba(139, 92, 246, 0.245)',   // Púrpura - 30% más transparente (0.35 * 0.7 = 0.245)
    iconColor: '#6366F1',
  },
  'data-delivery': {
    main: 'rgba(59, 130, 246, 0.28)',     // Azul - 30% más transparente
    accent: 'rgba(37, 99, 235, 0.245)',    // Azul oscuro - 30% más transparente
    iconColor: '#3B82F6',
  },
  'data-operations': {
    main: 'rgba(16, 185, 129, 0.28)',     // Verde - 30% más transparente
    accent: 'rgba(5, 150, 105, 0.245)',    // Verde oscuro - 30% más transparente
    iconColor: '#10B981',
  },
  'cloud-services-provider': {
    main: 'rgba(139, 92, 246, 0.28)',     // Púrpura - 30% más transparente
    accent: 'rgba(124, 58, 237, 0.245)',   // Púrpura oscuro - 30% más transparente
    iconColor: '#8B5CF6',
  },
};

export type ServiceSlug = keyof typeof serviceColors;
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { HomeSection, Language } from '../../../shared/types';
import { InsightCard } from '../insights/InsightCard';

interface InsightsEditorialSectionProps {
  section: HomeSection;
  language: Language;
  getLocalizedValue: (esValue: string, enValue: string) => string;
}

/**
 * InsightsEditorialSection
 * Editorial layout with 3-column composition for blog articles
 */
export function InsightsEditorialSection({
  section,
  language,
  getLocalizedValue,
}: InsightsEditorialSectionProps) {
  // Article data
  const articles = {
    es: [
      {
        id: 'article-1',
        title: 'Data Governance: Mejores Prácticas',
        description: 'Cómo implementar un framework efectivo de gobierno de datos en organizaciones modernas.',
        link: '/es/blog/data-governance-mejores-practicas/',
      },
      {
        id: 'article-2',
        title: 'Arquitecturas Modernas de Datos',
        description: 'Principios clave para diseñar arquitecturas de datos escalables en entornos cloud.',
        link: '/es/blog/arquitecturas-modernas-de-datos/',
      },
      {
        id: 'article-3-featured',
        title: 'El Futuro de la Analítica de Datos',
        description: 'Exploramos cómo la analítica avanzada y la inteligencia artificial están redefiniendo la toma de decisiones empresariales.',
        link: '/es/blog/el-futuro-de-la-analitica-de-datos/',
        image: 'https://images.unsplash.com/photo-1761912149936-8f662fc2a13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZnV0dXJpc3RpYyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzczMDc5MDMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        id: 'article-4',
        title: 'IA Generativa en Empresas: Casos de Uso Reales',
        description: 'Aplicaciones prácticas de la inteligencia artificial generativa en empresas.',
        link: '/es/blog/ia-generativa-casos-de-uso/',
      },
    ],
    en: [
      {
        id: 'article-1',
        title: 'Data Governance: Best Practices',
        description: 'How to implement an effective data governance framework in modern organizations.',
        link: '/en/blog/data-governance-best-practices/',
      },
      {
        id: 'article-2',
        title: 'Modern Data Architectures',
        description: 'Key principles for designing scalable data architectures in cloud environments.',
        link: '/en/blog/modern-data-architectures/',
      },
      {
        id: 'article-3-featured',
        title: 'The Future of Data Analytics',
        description: 'Exploring how advanced analytics and artificial intelligence are redefining business decision-making.',
        link: '/en/blog/the-future-of-data-analytics/',
        image: 'https://images.unsplash.com/photo-1761912149936-8f662fc2a13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZnV0dXJpc3RpYyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzczMDc5MDMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
      {
        id: 'article-4',
        title: 'Generative AI in Business: Real Use Cases',
        description: 'Practical applications of generative artificial intelligence in companies.',
        link: '/en/blog/generative-ai-use-cases/',
      },
    ],
  };

  const currentArticles = articles[language];

  return (
    <section className="px-6 sm:px-8 lg:px-12 py-16 sm:py-20 bg-gray-50">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        {section.title && (
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="text-lg sm:text-xl text-gray-600 font-light max-w-3xl mx-auto">
                {section.subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Editorial Grid - 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
          
          {/* COLUMN 1 - Two Compact Articles */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Article 1 */}
            <div className="flex-1">
              <InsightCard
                title={currentArticles[0].title}
                description={currentArticles[0].description}
                link={currentArticles[0].link}
                variant="compact"
                language={language}
              />
            </div>

            {/* Article 2 */}
            <div className="flex-1">
              <InsightCard
                title={currentArticles[1].title}
                description={currentArticles[1].description}
                link={currentArticles[1].link}
                variant="compact"
                language={language}
              />
            </div>
          </motion.div>

          {/* COLUMN 2 - Featured Article */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <InsightCard
              title={currentArticles[2].title}
              description={currentArticles[2].description}
              link={currentArticles[2].link}
              image={currentArticles[2].image}
              variant="featured"
              language={language}
            />
          </motion.div>

          {/* COLUMN 3 - Small Article + CTA */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Article 4 */}
            <div className="flex-1">
              <InsightCard
                title={currentArticles[3].title}
                description={currentArticles[3].description}
                link={currentArticles[3].link}
                variant="compact"
                language={language}
              />
            </div>

            {/* CTA Block */}
            <div className="flex-1">
              <div
                className="h-full rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 flex flex-col justify-center items-center text-center"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {language === 'es' ? 'Más insights' : 'More insights'}
                </h3>
                
                <p className="text-sm text-gray-600 font-light mb-6 leading-relaxed">
                  {language === 'es' 
                    ? 'Explora nuestra biblioteca completa de artículos sobre datos, analítica e inteligencia artificial.' 
                    : 'Explore our complete library of articles on data, analytics, and artificial intelligence.'}
                </p>
                
                <Link
                  to={`/${language}/blog/`}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 text-sm"
                >
                  <span>{language === 'es' ? 'Ver todos los artículos' : 'View all articles'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
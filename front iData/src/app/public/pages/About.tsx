import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Users, Briefcase, Award } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { FloatingElements } from '../components/FloatingElements';
import { useState, useEffect, useRef } from 'react';

// Hero image from Figma
import heroImage from 'figma:asset/ebcdc655b31368ba51720354d958d877a0a91062.png';

// Team image for CoolStars
import teamImage from 'figma:asset/ae562fdabd65d9651214906535f0624dca06cc6a.png';

// Global presence image
import globalPresenceImage from 'figma:asset/e1362831fe70eb39f894aa7bab963c7d7d25cd4d.png';

// Transformamos image
import transformamosImage from 'figma:asset/3bf23a950290c6e1aaeda88947a8341567e11e5e.png';

// Team photos
import bayronPhoto from 'figma:asset/2d69b2e0003b5983abcea60a809ceb744a552d65.png';
import victorPhoto from 'figma:asset/023015df2324327451f05c232f40fda738147b0c.png';
import angelaPhoto from 'figma:asset/bdbe50b8128fa4a2128c222ba5b58b03ea9addd5.png';
import luciaPhoto from 'figma:asset/5dadeafa75d24b5b794373b02353a341522765a7.png';
import dayanaPhoto from 'figma:asset/f5c5b21aadcd070194f8f9f37c8ac6adaf9602c8.png';

export function About() {
  const { language, getLocalizedValue } = useLanguage();
  
  // Carousel state for leadership team
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const totalSlides = 5; // 5 team members

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Scroll to current slide
  useEffect(() => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Width of each card (w-[320px])
      const gap = 32; // gap-8 = 32px
      const scrollPosition = currentSlide * (cardWidth + gap);
      
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [currentSlide]);

  // SEO Content
  const seoTitle = language === 'es' ? 'Nosotros - iData' : 'About Us - iData';
  const seoDescription = language === 'es'
    ? 'En iData Global transformamos datos en decisiones estratégicas, combinando inteligencia artificial, aprendizaje automático y arquitectura en la nube.'
    : 'At iData Global we transform data into strategic decisions through artificial intelligence, machine learning and cloud data architectures.';

  // Hero Content
  const heroContent = {
    title: language === 'es' ? 'Nosotros' : 'About Us',
    description: language === 'es'
      ? 'En iData Global transformamos datos en decisiones estratégicas, combinando inteligencia artificial, aprendizaje automático y arquitectura en la nube para soluciones empresariales en tiempo real.'
      : 'At iData Global we transform data into strategic decisions through artificial intelligence, machine learning and cloud data architectures.',
  };

  // Stats Content
  const stats = [
    {
      value: '10+',
      label: language === 'es' ? 'Años impulsando innovación en Data & AI' : 'Years driving innovation in Data & AI',
      icon: Award,
    },
    {
      value: '100+',
      label: language === 'es' ? 'Clientes confiando en soluciones iData' : 'Clients trusting iData solutions',
      icon: Briefcase,
    },
    {
      value: '50+',
      label: language === 'es' ? 'Expertos transformando negocios con datos' : 'Experts transforming businesses with data',
      icon: Users,
    },
    {
      value: '10+',
      label: language === 'es' ? 'Países con presencia global' : 'Countries with global presence',
      icon: Globe,
    },
  ];

  // Leadership Team
  const leadership = [
    {
      name: 'Bayron Quintero',
      role_es: 'Founder & CEO',
      role_en: 'Founder & CEO',
      photo: bayronPhoto,
    },
    {
      name: 'Victor Hoyos',
      role_es: 'Co-Founder & Director de Desarrollo de Negocios',
      role_en: 'Co-Founder & Business Development Director',
      photo: victorPhoto,
    },
    {
      name: 'Angela Morales',
      role_es: 'Directora de Finanzas y Administración',
      role_en: 'Finance & Administrative Director',
      photo: angelaPhoto,
    },
    {
      name: 'Lucía Cardeño',
      role_es: 'Directora de Recursos Humanos',
      role_en: 'Human Resources Director',
      photo: luciaPhoto,
    },
    {
      name: 'Dayana López',
      role_es: 'Directora de Proyectos',
      role_en: 'Project Director',
      photo: dayanaPhoto,
    },
  ];

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={`/${language}/${language === 'es' ? 'nosotros' : 'about'}/`}
        alternateES="/es/nosotros/"
        alternateEN="/en/about/"
        language={language}
      />

      {/* SECTION 1: Hero Banner - Floating Card Style */}
      <section className="px-6 sm:px-8 lg:px-12 pt-8 pb-8 mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative min-h-[420px] rounded-3xl overflow-hidden shadow-xl flex items-center bg-gray-900">
            {/* Background Image with Parallax */}
            <motion.div 
              className="absolute inset-0"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <img
                src={heroImage}
                alt="iData Team"
                className="w-full h-full object-cover opacity-50"
              />
              {/* Glass overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.4) 100%)',
                  backdropFilter: 'blur(1px)',
                }}
              />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 w-full px-6 sm:px-8 lg:px-12 py-20">
              <div className="max-w-3xl">
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {heroContent.title}
                </motion.h1>
                
                <motion.p 
                  className="text-lg md:text-xl text-gray-200 mb-8 font-light leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {heroContent.description}
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link
                    to={`/${language}/${language === 'es' ? 'contacto' : 'contact'}`}
                    className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-all duration-250 hover:shadow-xl hover:scale-[1.02] active:scale-100 group"
                  >
                    {language === 'es' ? 'Hablar con un experto' : 'Talk to an expert'}
                    <ArrowRight className="w-5 h-5 transition-transform duration-250 group-hover:translate-x-1" />
                  </Link>
                  
                  <Link
                    to={`/${language}/${language === 'es' ? 'casos' : 'case-studies'}`}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/20 transition-all duration-250 border border-white/30 backdrop-blur-sm"
                  >
                    {language === 'es' ? 'Ver casos de éxito' : 'View case studies'}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                {language === 'es'
                  ? 'Transformamos datos en valor empresarial'
                  : 'We transform data into business value'}
              </h2>
              <div className="space-y-4 text-lg text-gray-700 font-light leading-relaxed">
                <p>
                  {language === 'es'
                    ? 'iData Global es una compañía especializada en Data Engineering, Data Science e Inteligencia Artificial. Ayudamos a organizaciones de diversos sectores a transformar sus datos en activos estratégicos que impulsan el crecimiento y la innovación.'
                    : 'iData Global is a company specialized in Data Engineering, Data Science and Artificial Intelligence. We help organizations across various sectors transform their data into strategic assets that drive growth and innovation.'}
                </p>
                <p>
                  {language === 'es'
                    ? 'Con más de una década de experiencia, combinamos tecnología de punta con metodologías ágiles para diseñar, implementar y operar plataformas de datos empresariales que generan resultados medibles.'
                    : 'With over a decade of experience, we combine cutting-edge technology with agile methodologies to design, implement and operate enterprise data platforms that generate measurable results.'}
                </p>
                <p>
                  {language === 'es'
                    ? 'Nuestro enfoque integral abarca desde la estrategia y arquitectura de datos hasta la operación continua de soluciones analíticas avanzadas y modelos de machine learning en producción.'
                    : 'Our comprehensive approach spans from data strategy and architecture to continuous operation of advanced analytics solutions and production machine learning models.'}
                </p>
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={transformamosImage}
                  alt="AI Data Visualization"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Impact Metrics */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              {language === 'es' ? 'Nuestro impacto en cifras' : 'Our impact in numbers'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center justify-center mb-4">
                    <Icon className="w-12 h-12 text-purple-600" />
                  </div>
                  <div className="text-5xl font-light text-gray-900 mb-3">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-light">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: Global Presence */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={globalPresenceImage}
                  alt="Global presence"
                  className="w-full h-[400px] object-cover opacity-80"
                />
              </div>
            </motion.div>

            {/* Right: Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-light mb-6">
                {language === 'es' ? 'Presencia global' : 'Global presence'}
              </h2>
              <p className="text-xl text-gray-300 font-light leading-relaxed mb-6">
                {language === 'es'
                  ? 'Operamos en más de 10 países desarrollando soluciones de datos e inteligencia artificial para organizaciones líderes en diversos sectores.'
                  : 'We operate in more than 10 countries delivering data and AI solutions for leading organizations across various sectors.'}
              </p>
              <p className="text-lg text-gray-400 font-light leading-relaxed">
                {language === 'es'
                  ? 'Nuestro alcance internacional nos permite combinar las mejores prácticas globales con conocimiento local, adaptando nuestras soluciones a las necesidades específicas de cada mercado.'
                  : 'Our international reach allows us to combine global best practices with local knowledge, adapting our solutions to the specific needs of each market.'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Team Culture - CoolStars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                CoolStars
              </h2>
              <p className="text-xl text-gray-700 font-light leading-relaxed mb-6">
                {language === 'es'
                  ? 'Expertos en datos que impulsan la transformación empresarial.'
                  : 'Data experts who drive business transformation.'}
              </p>
              <p className="text-lg text-gray-600 font-light leading-relaxed mb-6">
                {language === 'es'
                  ? 'Nuestro equipo está conformado por profesionales apasionados por los datos, la tecnología y la innovación. Los CoolStars combinan experiencia técnica con visión de negocio para entregar soluciones que generan impacto real.'
                  : 'Our team consists of professionals passionate about data, technology and innovation. CoolStars combine technical expertise with business vision to deliver solutions that generate real impact.'}
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to={`/${language}/${language === 'es' ? 'talento' : 'careers'}/`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-100 group"
                >
                  {language === 'es' ? 'Únete al equipo' : 'Join the team'}
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={teamImage}
                  alt="Team collaboration"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Leadership */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              {language === 'es' ? 'Equipo' : 'Leadership'}
            </h2>
            <p className="text-xl text-gray-600 font-light">
              {language === 'es'
                ? 'Líderes comprometidos con la transformación digital'
                : 'Leaders committed to digital transformation'}
            </p>
          </motion.div>

          {/* Scroll horizontal container */}
          <div className="overflow-x-auto -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 scrollbar-hide">
            <div className="flex gap-8 min-w-max" ref={scrollContainerRef}>
              {leadership.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group w-[320px] flex-shrink-0"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                    {/* Photo */}
                    <div className="relative h-[400px] overflow-hidden">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-light text-gray-900 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-sm text-purple-600">
                        {getLocalizedValue(member.role_es, member.role_en)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {leadership.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index
                    ? 'w-8 h-2 bg-purple-600'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Call To Action */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Background blobs/orbs with vibrant colors */}
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-50" />
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-50" />
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-56 h-56 bg-pink-400 rounded-full blur-3xl opacity-30" />

            {/* Main glassmorphic card */}
            <div
              className="relative rounded-2xl md:rounded-3xl p-6 md:p-8 overflow-hidden border border-white/30"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.75) 50%, rgba(255, 255, 255, 0.85) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.5)',
              }}
            >
              {/* Gradient overlay for depth */}
              <div
                className="absolute inset-0 rounded-2xl md:rounded-3xl"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)',
                }}
              />

              <div className="relative">
                {/* Flex container: vertical en mobile, horizontal en desktop */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
                  
                  {/* Left side: Title and subtitle */}
                  <div className="flex-1 text-center md:text-left">
                    <motion.h2
                      className="text-xl md:text-2xl lg:text-3xl mb-2 font-light leading-tight tracking-tight text-gray-900"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {language === 'es'
                        ? '¿Listo para transformar su negocio con datos?'
                        : 'Ready to transform your business with data?'}
                    </motion.h2>

                    <motion.p
                      className="text-sm md:text-base text-gray-700 leading-relaxed font-light"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {language === 'es'
                        ? 'Conversemos sobre cómo podemos ayudarte a alcanzar tus objetivos de negocio'
                        : "Let's talk about how we can help you achieve your business goals"}
                    </motion.p>
                  </div>

                  {/* Right side: CTA Button */}
                  <motion.div
                    className="flex justify-center md:justify-end md:flex-shrink-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Link
                      to={`/${language}/${language === 'es' ? 'contacto' : 'contact'}/`}
                      className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-250 hover:shadow-xl hover:scale-[1.02] active:scale-100 group whitespace-nowrap"
                    >
                      {language === 'es' ? 'Hablemos' : "Let's talk"}
                      <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                  
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
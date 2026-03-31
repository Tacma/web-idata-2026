import { useLanguage } from '../../shared/contexts/LanguageContext';
import { SEOHead } from '../../shared/components/SEOHead';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Users, Briefcase, Award } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { FloatingElements } from '../components/FloatingElements';
import { InternalPageHero } from '../components/InternalPageHero';
import { useState, useEffect, useRef } from 'react';
import { getPublished as getPublishedTeamMembers } from '../../../services/teamMembersService';
import { getByKey as getPageByKey } from '../../../services/pagesService';

// Hero image from Figma
import heroImage from '/assets/images/about/hero.png';

// Team image for CoolStars
import teamImage from '/assets/images/about/team.png';

// Global presence image
import globalPresenceImage from '/assets/images/about/global-presence.png';

// Transformamos image
import transformamosImage from '/assets/images/about/transformamos.png';

export function About() {
  const { language, getLocalizedValue } = useLanguage();
  const [leadership, setLeadership] = useState<any[]>([]);
  const [pageRecord, setPageRecord] = useState<any | null>(null);
  
  // Carousel state for leadership team
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const totalSlides = leadership.length || 1;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const syncViewport = () => setIsDesktop(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener('change', syncViewport);

    return () => {
      mediaQuery.removeEventListener('change', syncViewport);
    };
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (isDesktop || totalSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [isDesktop, totalSlides]);

  useEffect(() => {
    let cancelled = false;

    async function loadPageRecord() {
      try {
        const record = await getPageByKey('about');
        if (!cancelled) {
          setPageRecord(record);
        }
      } catch (error) {
        console.error('Error loading about page metadata:', error);
      }
    }

    loadPageRecord();

    return () => {
      cancelled = true;
    };
  }, []);

  // Scroll to current slide
  useEffect(() => {
    if (isDesktop) return;
    if (scrollViewportRef.current) {
      const target = scrollViewportRef.current.querySelector<HTMLElement>(`[data-team-card="${currentSlide}"]`);
      target?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentSlide, isDesktop]);

  useEffect(() => {
    const viewport = scrollViewportRef.current;
    if (!viewport || isDesktop) return;

    const handleScroll = () => {
      const cards = Array.from(viewport.querySelectorAll<HTMLElement>('[data-team-card]'));
      if (!cards.length) return;

      const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setCurrentSlide(closestIndex);
    };

    viewport.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      viewport.removeEventListener('scroll', handleScroll);
    };
  }, [isDesktop, leadership.length]);

  // SEO Content
  const seoTitle = pageRecord
    ? getLocalizedValue(pageRecord.title_es, pageRecord.title_en)
    : language === 'es' ? 'Nosotros - iData' : 'About Us - iData';
  const seoDescription = pageRecord
    ? getLocalizedValue(pageRecord.description_es, pageRecord.description_en)
    : language === 'es'
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

  useEffect(() => {
    let cancelled = false;

    async function loadLeadership() {
      try {
        const teamMembers = await getPublishedTeamMembers();
        if (!cancelled && teamMembers.length > 0) {
          setLeadership(teamMembers);
        }
      } catch (error) {
        console.error('Error loading team members:', error);
      }
    }

    loadLeadership();

    return () => {
      cancelled = true;
    };
  }, []);

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

      <InternalPageHero
        eyebrow={language === 'es' ? 'Nosotros' : 'About us'}
        title={heroContent.title}
        description={heroContent.description}
        imageSrc={heroImage}
        imageAlt="iData Team"
      />

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
      <section className="overflow-visible bg-gradient-to-br from-gray-50 to-white py-20">
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
          <div
            ref={scrollViewportRef}
            className="overflow-x-auto overflow-y-visible pb-6 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 lg:overflow-visible scrollbar-hide"
          >
            <div className="flex min-w-max gap-5 pr-6 sm:pr-8 lg:min-w-0 lg:flex-wrap lg:justify-center lg:gap-6 lg:pr-0">
              {leadership.map((member, index) => (
                <motion.div
                  key={index}
                  data-team-card={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group w-[192px] flex-shrink-0 sm:w-[204px] lg:w-[208px] lg:flex-shrink scroll-mx-6 sm:scroll-mx-8 lg:scroll-mx-0"
                >
                  <div className="h-full rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    {/* Photo */}
                    <div className="relative h-[250px] overflow-hidden sm:h-[270px] lg:h-[280px]">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="mb-2 text-lg font-light text-gray-900">
                        {member.name}
                      </h3>
                      <p className="line-clamp-3 text-sm text-purple-600">
                        {getLocalizedValue(member.position_es, member.position_en)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
            <div className="theme-glass-panel relative overflow-hidden rounded-2xl p-6 md:rounded-3xl md:p-8">
              {/* Gradient overlay for depth */}
              <div className="theme-glass-panel-overlay absolute inset-0 rounded-2xl md:rounded-3xl" />

              <div className="relative">
                {/* Flex container: vertical en mobile, horizontal en desktop */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
                  
                  {/* Left side: Title and subtitle */}
                  <div className="flex-1 text-center md:text-left">
                    <motion.h2
                      className="mb-2 text-xl font-light leading-tight tracking-tight text-[var(--glass-text-primary)] md:text-2xl lg:text-3xl"
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
                      className="text-sm font-light leading-relaxed text-[var(--glass-text-secondary)] md:text-base"
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

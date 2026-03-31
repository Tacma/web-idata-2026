import { Quote } from 'lucide-react';
import { Container } from '../../../shared/components/Container';
import { Section } from '../../../shared/components/Section';
import type { HomeSection, Language } from '../../../shared/types';
import { useEffect, useState } from 'react';
import { mockTestimonials } from '../../../data/mockData';
import { getPublished as getPublishedTestimonials } from '../../../../services/testimonialsService';

interface TestimonialsSectionProps {
  section: HomeSection;
  language: Language;
  getLocalizedValue: (esValue: string, enValue: string) => string;
}

const allowMockFallback = import.meta.env.DEV;

export function TestimonialsSection({ 
  section, 
  language, 
  getLocalizedValue 
}: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getPublishedTestimonials();
        if (!cancelled) {
          const selected = data.filter((item) =>
            section.referencedIds?.includes(item.id)
          );
          setTestimonials(selected.length > 0 ? selected : data);
        }
      } catch (error) {
        console.error('Error loading testimonials:', error);
        if (!cancelled) {
          setTestimonials(allowMockFallback ? mockTestimonials : []);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [section.referencedIds]);

  const sourceTestimonials = testimonials.length > 0 ? testimonials : (allowMockFallback ? mockTestimonials : []);
  const visibleTestimonials = sourceTestimonials.filter(t => 
    section.referencedIds?.includes(t.id)
  );
  const cards = visibleTestimonials.length > 0 ? visibleTestimonials : sourceTestimonials;

  return (
    <Section background="white" padding="xl">
      <Container>
        {section.title && (
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 text-gray-900">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {section.subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all"
            >
              <Quote className="w-12 h-12 text-blue-600 mb-6 opacity-50" />
              
              <p className="text-gray-700 mb-8 italic leading-relaxed text-lg">
                "{getLocalizedValue(testimonial.quote_es, testimonial.quote_en)}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-medium text-xl">
                  {testimonial.clientName[0]}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{testimonial.clientName}</p>
                  <p className="text-sm text-gray-600">
                    {getLocalizedValue(testimonial.clientPosition_es, testimonial.clientPosition_en)}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.clientCompany}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

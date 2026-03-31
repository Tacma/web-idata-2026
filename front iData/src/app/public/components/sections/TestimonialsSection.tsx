import { Quote } from 'lucide-react';
import { Container } from '../../../shared/components/Container';
import { Section } from '../../../shared/components/Section';
import type { HomeSection, Language } from '../../../shared/types';
import { mockTestimonials } from '../../../data/mockData';

interface TestimonialsSectionProps {
  section: HomeSection;
  language: Language;
  getLocalizedValue: (esValue: string, enValue: string) => string;
}

export function TestimonialsSection({ 
  section, 
  language, 
  getLocalizedValue 
}: TestimonialsSectionProps) {
  const testimonials = mockTestimonials.filter(t => 
    section.referencedIds?.includes(t.id)
  );

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
          {testimonials.map((testimonial) => (
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

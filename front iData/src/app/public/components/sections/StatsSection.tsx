import { Star } from 'lucide-react';
import { Container } from '../../../shared/components/Container';
import { Section } from '../../../shared/components/Section';
import type { HomeSection } from '../../../shared/types';

interface StatsSectionProps {
  section: HomeSection;
}

export function StatsSection({ section }: StatsSectionProps) {
  const stats = section.config?.stats || [];
  
  if (stats.length === 0) return null;

  return (
    <Section background="gray" padding="xl">
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat: any, index: number) => (
            <div 
              key={index} 
              className="text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-center mb-4">
                <Star className="w-10 h-10 text-blue-600" />
              </div>
              <div className="text-5xl font-light text-gray-900 mb-3">
                {stat.value}
              </div>
              <div className="text-gray-600 text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

import { Container } from '../../../shared/components/Container';
import { Section } from '../../../shared/components/Section';
import type { HomeSection } from '../../../shared/types';

interface CustomSectionProps {
  section: HomeSection;
}

export function CustomSection({ section }: CustomSectionProps) {
  if (!section.customContent) return null;
  
  return (
    <Section background="white" padding="lg">
      <Container>
        <div 
          className="prose prose-lg max-w-none" 
          dangerouslySetInnerHTML={{ __html: section.customContent }} 
        />
      </Container>
    </Section>
  );
}

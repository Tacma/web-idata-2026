import { Container } from '../../../shared/components/Container';
import { Section } from '../../../shared/components/Section';
import type { HomeSection } from '../../../shared/types';

interface CustomSectionProps {
  section: HomeSection;
}

export function CustomSection({ section }: CustomSectionProps) {
  const html =
    typeof section.customContent === 'string'
      ? section.customContent
      : typeof section.content === 'string'
        ? section.content
        : typeof section.content?.html === 'string'
          ? section.content.html
          : null;

  if (!html) return null;

  return (
    <Section background="white" padding="lg">
      <Container>
        <div 
          className="prose prose-lg max-w-none" 
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Container>
    </Section>
  );
}

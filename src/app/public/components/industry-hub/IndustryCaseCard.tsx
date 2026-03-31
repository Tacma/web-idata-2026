import type { HubCaseStudy } from '../../../shared/utils/industryCaseHub';
import type { Language } from '../../../shared/types';
import { CaseStudyCard } from '../case-studies/CaseStudyCard';

interface IndustryCaseCardProps {
  caseStudy: HubCaseStudy;
  language: Language;
}

export function IndustryCaseCard({ caseStudy, language }: IndustryCaseCardProps) {
  return (
    <CaseStudyCard
      href={`/${language}/${language === 'es' ? 'casos' : 'case-studies'}/${caseStudy.slug}`}
      language={language}
      title={caseStudy.title}
      summary={caseStudy.summary}
      industry={caseStudy.industryName}
      region={caseStudy.region}
      solutionType={caseStudy.solutionType}
      results={caseStudy.results}
      technologyTags={caseStudy.technologyTags.map((tag) => tag.label)}
      placeholder={caseStudy.caseType === 'placeholder'}
      logoSrc={caseStudy.clientLogoUrl}
      coverImage={caseStudy.coverImage}
    />
  );
}

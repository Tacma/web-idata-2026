import { InsightsCard } from './InsightsCard';

interface Insight {
  id: string;
  title_es: string;
  title_en: string;
  slug_es: string;
  slug_en: string;
  excerpt_es: string;
  excerpt_en: string;
  featuredImage?: string;
  publishedDate: string;
  readingTime: number;
  categoryTitle_es?: string;
  categoryTitle_en?: string;
  tags?: string[];
}

interface InsightsGridProps {
  insights: Insight[];
}

export function InsightsGrid({ insights }: InsightsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {insights.map((insight, index) => (
        <InsightsCard 
          key={insight.id} 
          insight={insight} 
          index={index}
        />
      ))}
    </div>
  );
}

import { InsightsArticleCard, CardVariant } from './InsightsArticleCard';

interface InsightsEditorialGridProps {
  insights: Array<{
    id: string;
    slug_es: string;
    slug_en: string;
    title_es: string;
    title_en: string;
    excerpt_es: string;
    excerpt_en: string;
    featuredImage?: string;
    publishedDate: string;
    readingTime?: number;
    categoryTitle_es?: string;
    categoryTitle_en?: string;
  }>;
}

export function InsightsEditorialGrid({ insights }: InsightsEditorialGridProps) {
  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {insights.map((insight, index) => {
        return (
          <div key={insight.id} className="h-full">
            <InsightsArticleCard 
              insight={insight} 
              variant="regular"
              index={index}
            />
          </div>
        );
      })}
    </div>
  );
}

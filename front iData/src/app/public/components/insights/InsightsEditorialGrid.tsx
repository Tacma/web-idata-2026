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
  
  // Pattern: Wide articles at positions 0, 3, 6, 9... (every 3rd starting from 0)
  // Regular articles at all other positions
  const getCardSpan = (index: number): 'wide' | 'regular' => {
    return index % 3 === 0 ? 'wide' : 'regular';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {insights.map((insight, index) => {
        const span = getCardSpan(index);
        
        return (
          <div
            key={insight.id}
            className={span === 'wide' ? 'md:col-span-2 lg:col-span-2' : 'md:col-span-1 lg:col-span-1'}
          >
            <InsightsArticleCard 
              insight={insight} 
              variant={span}
              index={index}
            />
          </div>
        );
      })}
    </div>
  );
}
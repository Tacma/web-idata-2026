import type { ContentBlock } from '../../../types/content-blocks';
import { HeroImageBlockComponent } from './blocks/HeroImageBlock';
import { TextBlockComponent } from './blocks/TextBlock';
import { SubtextBlockComponent } from './blocks/SubtextBlock';
import { ImageTextBlockComponent } from './blocks/ImageTextBlock';
import { ImageBlockComponent } from './blocks/ImageBlock';
import { ButtonsBlockComponent } from './blocks/ButtonsBlock';
import { LinksBlockComponent } from './blocks/LinksBlock';
import { ListBlockComponent } from './blocks/ListBlock';
import { QuoteBlockComponent } from './blocks/QuoteBlock';
import { StatsBlockComponent } from './blocks/StatsBlock';
import { LogosBlockComponent } from './blocks/LogosBlock';
import { SocialLinksBlockComponent } from './blocks/SocialLinksBlock';
import { DividerBlockComponent } from './blocks/DividerBlock';
import { EmbedBlockComponent } from './blocks/EmbedBlock';
import { DownloadBlockComponent } from './blocks/DownloadBlock';

interface ArticleContentRendererProps {
  blocks: ContentBlock[];
}

export function ArticleContentRenderer({ blocks }: ArticleContentRendererProps) {
  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="article-content">
      {sortedBlocks.map((block) => {
        switch (block.block_type) {
          case 'hero_image':
            return <HeroImageBlockComponent key={block.id} block={block} />;
          
          case 'text':
            return <TextBlockComponent key={block.id} block={block} />;
          
          case 'subtext':
            return <SubtextBlockComponent key={block.id} block={block} />;
          
          case 'image_text':
            return <ImageTextBlockComponent key={block.id} block={block} />;
          
          case 'image':
            return <ImageBlockComponent key={block.id} block={block} />;
          
          case 'buttons':
            return <ButtonsBlockComponent key={block.id} block={block} />;
          
          case 'links':
            return <LinksBlockComponent key={block.id} block={block} />;
          
          case 'list':
            return <ListBlockComponent key={block.id} block={block} />;
          
          case 'quote':
            return <QuoteBlockComponent key={block.id} block={block} />;
          
          case 'stats':
            return <StatsBlockComponent key={block.id} block={block} />;
          
          case 'logos':
            return <LogosBlockComponent key={block.id} block={block} />;
          
          case 'social_links':
            return <SocialLinksBlockComponent key={block.id} block={block} />;
          
          case 'divider':
            return <DividerBlockComponent key={block.id} />;
          
          case 'embed':
            return <EmbedBlockComponent key={block.id} block={block} />;
          
          case 'download':
            return <DownloadBlockComponent key={block.id} block={block} />;
          
          default:
            return null;
        }
      })}
    </div>
  );
}

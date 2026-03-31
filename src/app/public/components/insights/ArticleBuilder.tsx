import type { ContentBlock } from '../../../types/contentBlocks';
import {
  HeaderImageBlock,
  RichTextBlock,
  ImageTextBlock,
  ImageOnlyBlock,
  LogoStripBlock,
  LinksListBlock,
  BulletListBlock,
  QuoteBlock,
  StatsBlock,
  CTABannerBlock,
  TwoColumnTextBlock,
  DividerBlock,
  DownloadBlock,
  AuthorBoxBlock,
  EmbedBlock,
} from './content-blocks';

interface ArticleBuilderProps {
  blocks?: ContentBlock[];
  content?: string; // Fallback for legacy HTML content
}

export function ArticleBuilder({ blocks, content }: ArticleBuilderProps) {
  // If no blocks provided, render legacy HTML content
  if (!blocks || blocks.length === 0) {
    if (content) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return null;
  }

  // Sort blocks by sortOrder
  const sortedBlocks = [...blocks].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="article-content space-y-6">
      {sortedBlocks.map((block) => {
        switch (block.blockType) {
          case 'header_image':
            return <HeaderImageBlock key={block.id} block={block} />;
          
          case 'rich_text':
            return <RichTextBlock key={block.id} block={block} />;
          
          case 'image_text':
            return <ImageTextBlock key={block.id} block={block} />;
          
          case 'image_only':
            return <ImageOnlyBlock key={block.id} block={block} />;
          
          case 'logo_strip':
            return <LogoStripBlock key={block.id} block={block} />;
          
          case 'links_list':
            return <LinksListBlock key={block.id} block={block} />;
          
          case 'bullet_list':
            return <BulletListBlock key={block.id} block={block} />;
          
          case 'quote':
            return <QuoteBlock key={block.id} block={block} />;
          
          case 'stats':
            return <StatsBlock key={block.id} block={block} />;
          
          case 'cta_banner':
            return <CTABannerBlock key={block.id} block={block} />;
          
          case 'two_column_text':
            return <TwoColumnTextBlock key={block.id} block={block} />;
          
          case 'divider':
            return <DividerBlock key={block.id} block={block} />;
          
          case 'embed':
            return <EmbedBlock key={block.id} block={block} />;
          
          case 'download':
            return <DownloadBlock key={block.id} block={block} />;
          
          case 'author_box':
            return <AuthorBoxBlock key={block.id} block={block} />;
          
          // TODO: Implement related_service and related_industry blocks
          // These would fetch data from mockServices/mockIndustries
          
          default:
            console.warn(`Unknown block type: ${(block as any).blockType}`);
            return null;
        }
      })}
    </div>
  );
}
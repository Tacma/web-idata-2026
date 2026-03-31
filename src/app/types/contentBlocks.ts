// Content Block Types for Modular Article Builder

export type ContentBlockType =
  | 'header_image'
  | 'rich_text'
  | 'image_text'
  | 'image_only'
  | 'logo_strip'
  | 'links_list'
  | 'bullet_list'
  | 'quote'
  | 'stats'
  | 'cta_banner'
  | 'two_column_text'
  | 'divider'
  | 'embed'
  | 'table'
  | 'download'
  | 'related_service'
  | 'related_industry'
  | 'author_box';

// Base interface for all content blocks
export interface BaseContentBlock {
  id: string;
  blockType: ContentBlockType;
  sortOrder: number;
}

// 1. Header Image Block
export interface HeaderImageBlock extends BaseContentBlock {
  blockType: 'header_image';
  image: string;
  altText_es: string;
  altText_en: string;
  caption_es?: string;
  caption_en?: string;
}

// 2. Rich Text Block
export interface RichTextBlock extends BaseContentBlock {
  blockType: 'rich_text';
  content_es: string;
  content_en: string;
}

// 3. Image + Text Block
export interface ImageTextBlock extends BaseContentBlock {
  blockType: 'image_text';
  image: string;
  imagePosition: 'left' | 'right';
  title_es: string;
  title_en: string;
  text_es: string;
  text_en: string;
  caption_es?: string;
  caption_en?: string;
}

// 4. Image Only Block
export interface ImageOnlyBlock extends BaseContentBlock {
  blockType: 'image_only';
  image: string;
  altText_es: string;
  altText_en: string;
  caption_es?: string;
  caption_en?: string;
  sizeVariant: 'full' | 'medium' | 'contained';
}

// 5. Logo Strip Block
export interface LogoStripBlock extends BaseContentBlock {
  blockType: 'logo_strip';
  sectionTitle_es?: string;
  sectionTitle_en?: string;
  logos: Array<{
    image: string;
    altText_es: string;
    altText_en: string;
    link?: string;
  }>;
}

// 6. Links List Block
export interface LinksListBlock extends BaseContentBlock {
  blockType: 'links_list';
  sectionTitle_es: string;
  sectionTitle_en: string;
  items: Array<{
    label_es: string;
    label_en: string;
    url: string;
    description_es?: string;
    description_en?: string;
  }>;
}

// 7. Bullet List Block
export interface BulletListBlock extends BaseContentBlock {
  blockType: 'bullet_list';
  sectionTitle_es?: string;
  sectionTitle_en?: string;
  items_es: string[];
  items_en: string[];
}

// 8. Quote Block
export interface QuoteBlock extends BaseContentBlock {
  blockType: 'quote';
  quote_es: string;
  quote_en: string;
  authorName?: string;
  authorRole_es?: string;
  authorRole_en?: string;
}

// 9. Stats Block
export interface StatsBlock extends BaseContentBlock {
  blockType: 'stats';
  sectionTitle_es?: string;
  sectionTitle_en?: string;
  stats: Array<{
    value: string;
    label_es: string;
    label_en: string;
    description_es?: string;
    description_en?: string;
  }>;
}

// 10. CTA Banner Block
export interface CTABannerBlock extends BaseContentBlock {
  blockType: 'cta_banner';
  title_es: string;
  title_en: string;
  text_es: string;
  text_en: string;
  buttonLabel_es: string;
  buttonLabel_en: string;
  buttonUrl_es: string;
  buttonUrl_en: string;
  backgroundImage?: string;
}

// 11. Two Column Text Block
export interface TwoColumnTextBlock extends BaseContentBlock {
  blockType: 'two_column_text';
  title_es?: string;
  title_en?: string;
  leftContent_es: string;
  leftContent_en: string;
  rightContent_es: string;
  rightContent_en: string;
}

// 12. Divider Block
export interface DividerBlock extends BaseContentBlock {
  blockType: 'divider';
  styleVariant: 'line' | 'space' | 'subtle_graphic';
}

// 13. Embed Block
export interface EmbedBlock extends BaseContentBlock {
  blockType: 'embed';
  embedUrl: string;
  title_es?: string;
  title_en?: string;
  caption_es?: string;
  caption_en?: string;
}

// 14. Table Block
export interface TableBlock extends BaseContentBlock {
  blockType: 'table';
  title_es?: string;
  title_en?: string;
  columns: string[];
  rows: string[][];
  note_es?: string;
  note_en?: string;
}

// 15. Download Block
export interface DownloadBlock extends BaseContentBlock {
  blockType: 'download';
  title_es: string;
  title_en: string;
  fileUrl: string;
  buttonLabel_es: string;
  buttonLabel_en: string;
  description_es?: string;
  description_en?: string;
}

// 16. Related Service Block
export interface RelatedServiceBlock extends BaseContentBlock {
  blockType: 'related_service';
  serviceReference: string;
  customTitle_es?: string;
  customTitle_en?: string;
  customText_es?: string;
  customText_en?: string;
}

// 17. Related Industry Block
export interface RelatedIndustryBlock extends BaseContentBlock {
  blockType: 'related_industry';
  industryReference: string;
  customTitle_es?: string;
  customTitle_en?: string;
  customText_es?: string;
  customText_en?: string;
}

// 18. Author Box Block
export interface AuthorBoxBlock extends BaseContentBlock {
  blockType: 'author_box';
  authorName: string;
  authorRole_es: string;
  authorRole_en: string;
  authorPhoto?: string;
  bio_es: string;
  bio_en: string;
  linkedinUrl?: string;
}

// Union type for all content blocks
export type ContentBlock =
  | HeaderImageBlock
  | RichTextBlock
  | ImageTextBlock
  | ImageOnlyBlock
  | LogoStripBlock
  | LinksListBlock
  | BulletListBlock
  | QuoteBlock
  | StatsBlock
  | CTABannerBlock
  | TwoColumnTextBlock
  | DividerBlock
  | EmbedBlock
  | TableBlock
  | DownloadBlock
  | RelatedServiceBlock
  | RelatedIndustryBlock
  | AuthorBoxBlock;

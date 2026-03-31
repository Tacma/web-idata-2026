// Content Block Types for Modular Article Builder

export type ContentBlockType =
  | 'hero_image'
  | 'text'
  | 'subtext'
  | 'image_text'
  | 'image'
  | 'buttons'
  | 'links'
  | 'list'
  | 'quote'
  | 'stats'
  | 'logos'
  | 'social_links'
  | 'divider'
  | 'embed'
  | 'download';

export interface BaseContentBlock {
  id: string;
  block_type: ContentBlockType;
  order: number;
}

export interface HeroImageBlock extends BaseContentBlock {
  block_type: 'hero_image';
  image: string;
  alt_text_es: string;
  alt_text_en: string;
  caption_es?: string;
  caption_en?: string;
}

export interface TextBlock extends BaseContentBlock {
  block_type: 'text';
  title_es?: string;
  title_en?: string;
  text_es: string;
  text_en: string;
}

export interface SubtextBlock extends BaseContentBlock {
  block_type: 'subtext';
  text_es: string;
  text_en: string;
}

export interface ImageTextBlock extends BaseContentBlock {
  block_type: 'image_text';
  image: string;
  image_position: 'left' | 'right';
  title_es: string;
  title_en: string;
  text_es: string;
  text_en: string;
  caption_es?: string;
  caption_en?: string;
}

export interface ImageBlock extends BaseContentBlock {
  block_type: 'image';
  image: string;
  alt_text_es: string;
  alt_text_en: string;
  caption_es?: string;
  caption_en?: string;
  size_variant: 'small' | 'medium' | 'large';
}

export interface ButtonsBlock extends BaseContentBlock {
  block_type: 'buttons';
  title_es?: string;
  title_en?: string;
  buttons: Array<{
    label_es: string;
    label_en: string;
    url: string;
    style_variant: 'primary' | 'secondary';
  }>;
}

export interface LinksBlock extends BaseContentBlock {
  block_type: 'links';
  title_es?: string;
  title_en?: string;
  links: Array<{
    label_es: string;
    label_en: string;
    url: string;
    description_es?: string;
    description_en?: string;
  }>;
}

export interface ListBlock extends BaseContentBlock {
  block_type: 'list';
  title_es?: string;
  title_en?: string;
  items_es: string[];
  items_en: string[];
}

export interface QuoteBlock extends BaseContentBlock {
  block_type: 'quote';
  quote_es: string;
  quote_en: string;
  author_name?: string;
  author_role_es?: string;
  author_role_en?: string;
}

export interface StatsBlock extends BaseContentBlock {
  block_type: 'stats';
  title_es?: string;
  title_en?: string;
  stats: Array<{
    value: string;
    label_es: string;
    label_en: string;
    description_es?: string;
    description_en?: string;
  }>;
}

export interface LogosBlock extends BaseContentBlock {
  block_type: 'logos';
  title_es?: string;
  title_en?: string;
  logos: Array<{
    image: string;
    alt_text_es: string;
    alt_text_en: string;
    url_optional?: string;
  }>;
}

export interface SocialLinksBlock extends BaseContentBlock {
  block_type: 'social_links';
  title_es?: string;
  title_en?: string;
  networks: Array<{
    platform: 'LinkedIn';
    url: string;
  }>;
}

export interface DividerBlock extends BaseContentBlock {
  block_type: 'divider';
}

export interface EmbedBlock extends BaseContentBlock {
  block_type: 'embed';
  embed_url: string;
  title_es?: string;
  title_en?: string;
  caption_es?: string;
  caption_en?: string;
}

export interface DownloadBlock extends BaseContentBlock {
  block_type: 'download';
  title_es: string;
  title_en: string;
  file_url: string;
  button_label_es: string;
  button_label_en: string;
  description_es?: string;
  description_en?: string;
}

export type ContentBlock =
  | HeroImageBlock
  | TextBlock
  | SubtextBlock
  | ImageTextBlock
  | ImageBlock
  | ButtonsBlock
  | LinksBlock
  | ListBlock
  | QuoteBlock
  | StatsBlock
  | LogosBlock
  | SocialLinksBlock
  | DividerBlock
  | EmbedBlock
  | DownloadBlock;
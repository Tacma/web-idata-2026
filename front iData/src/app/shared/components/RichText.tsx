import { cn } from '../utils/cn';

interface RichTextProps {
  content: string;
  className?: string;
}

export function RichText({ content, className }: RichTextProps) {
  return (
    <div
      className={cn(
        'prose prose-lg max-w-none',
        'prose-headings:font-bold prose-headings:text-gray-900',
        'prose-p:text-gray-700 prose-p:leading-relaxed',
        'prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline',
        'prose-strong:text-gray-900 prose-strong:font-semibold',
        'prose-ul:list-disc prose-ul:pl-6',
        'prose-ol:list-decimal prose-ol:pl-6',
        'prose-li:text-gray-700',
        'prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-4 prose-blockquote:italic',
        className
      )}
    >
      {/* For now, render as plain text. In production, this would use a proper markdown/HTML renderer */}
      <div className="whitespace-pre-wrap">{content}</div>
    </div>
  );
}

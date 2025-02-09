import { FC, useMemo } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { cn } from '@/utils/cn';
import { CodeBlock } from './codeblock';

interface Props {
  children: string;
  asSpan?: boolean;
  components?: Components;
  headingClassName?: string;
}

export const Markdown: FC<Props> = ({ children, asSpan = false, components, headingClassName }) => {
  const value = useMemo(() => {
    return children
      .replaceAll('\\(', '$')
      .replaceAll('\\)', '$')
      .replaceAll('\\[', '$$')
      .replaceAll('\\]', '$$');
  }, [children]);

  const memoizedContent = useMemo(
    () => (
      <ReactMarkdown
        className={
          asSpan
            ? undefined
            : 'prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 flex flex-col gap-4 break-words'
        }
        components={{
          h1({ children }) {
            return (
              <h1 className={cn('text-xl font-bold md:text-2xl', headingClassName)}>{children}</h1>
            );
          },
          h2({ children }) {
            return (
              <h2 className={cn('text-lg font-bold md:text-xl', headingClassName)}>{children}</h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className={cn('text-md font-bold md:text-lg', headingClassName)}>{children}</h3>
            );
          },
          h4({ children }) {
            return (
              <h4 className={cn('md:text-md text-sm font-bold', headingClassName)}>{children}</h4>
            );
          },
          h5({ children }) {
            return (
              <h5 className={cn('text-xs font-bold md:text-sm', headingClassName)}>{children}</h5>
            );
          },
          h6({ children }) {
            return <h6 className={cn('text-xs font-bold', headingClassName)}>{children}</h6>;
          },
          p({ children, node }) {
            const hasBlockElements = node?.children?.some(child => {
              if (child.type !== 'element') return false;
              return ['div', 'p', 'blockquote', 'form'].includes(child.tagName);
            });

            if (hasBlockElements) {
              return <div className="text-sm md:text-base">{children}</div>;
            }

            if (asSpan) {
              return <span>{children}</span>;
            }
            return <p className="text-sm md:text-base">{children}</p>;
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                className="text-brand-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className || '');

            if (!match) {
              return <code className={className}>{children}</code>;
            }

            return (
              <CodeBlock
                language={match[1] || 'Plain Text'}
                value={String(children).replace(/\n$/, '')}
              />
            );
          },
          ol({ children }) {
            return (
              <ol className="flex list-decimal flex-col gap-2 pl-4 text-sm md:text-base">
                {children}
              </ol>
            );
          },
          ul({ children }) {
            return (
              <ul className="flex list-disc flex-col gap-2 pl-4 text-sm md:text-base">
                {children}
              </ul>
            );
          },
          li({ children }) {
            return <li className="ml-4 space-y-2 pl-0 text-sm md:text-base">{children}</li>;
          },
          img({ src, alt }) {
            return <img src={src} alt={alt} className="mx-auto" />;
          },
          ...components,
        }}
      >
        {value}
      </ReactMarkdown>
    ),
    [asSpan, components, value, headingClassName],
  );

  return memoizedContent;
};

Markdown.displayName = 'Markdown';

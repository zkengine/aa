'use client';

import { Check, Copy } from 'lucide-react';
import { FC, memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs, vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Card } from '@/components/ui';
import { useCopyToClipboard } from '@/hooks';
import { ProgrammingLanguages } from '@/types/languages';
import { cn } from '@/utils/cn';

interface Props {
  language: string;
  value: string;
}

type LanguageMap = Record<ProgrammingLanguages, string | undefined>;

export const programmingLanguages: LanguageMap = {
  javascript: '.js',
  python: '.py',
  java: '.java',
  c: '.c',
  cpp: '.cpp',
  'c#': '.cs',
  ruby: '.rb',
  php: '.php',
  swift: '.swift',
  'objective-c': '.m',
  kotlin: '.kt',
  typescript: '.ts',
  go: '.go',
  perl: '.pl',
  rust: '.rs',
  scala: '.scala',
  haskell: '.hs',
  lua: '.lua',
  shell: '.sh',
  sql: '.sql',
  html: '.html',
  css: '.css',
  json: '.json',
  less: '.less',
  lezer: '.lezer',
  markdown: '.md',
  sass: '.sass',
  xml: '.xml',
  clj: '.clj',
};

export const markdownLanguages: Record<string, string> = {
  js: 'JavaScript',
  jsx: 'JavaScript React',
  ts: 'TypeScript',
  tsx: 'TypeScript React',
  py: 'Python',
  java: 'Java',
  c: 'C',
  cpp: 'C++',
  cs: 'C#',
  rb: 'Ruby',
  php: 'PHP',
  swift: 'Swift',
  go: 'Go',
  rs: 'Rust',
  scala: 'Scala',
  kt: 'Kotlin',
  perl: 'Perl',
  lua: 'Lua',
  sh: 'Shell',
  sql: 'SQL',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  sass: 'Sass',
  less: 'Less',
  json: 'JSON',
  xml: 'XML',
  yaml: 'YAML',
  md: 'Markdown',
  graphql: 'GraphQL',
  dockerfile: 'Dockerfile',
  bash: 'Bash',
  powershell: 'PowerShell',
  r: 'R',
  matlab: 'MATLAB',
  clj: 'Clojure',
  fs: 'F#',
  elm: 'Elm',
  erlang: 'Erlang',
  haskell: 'Haskell',
  ocaml: 'OCaml',
};

export const generateRandomString = (length: number, lowercase = false) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXY3456789'; // excluding similar looking characters like Z, 2, I, 1, O, 0
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return lowercase ? result.toLowerCase() : result;
};

export const CodeBlock: FC<Props> = memo(
  ({ language, value }) => {
    const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

    const onCopy = () => {
      if (isCopied) return;
      copyToClipboard(value);
    };

    return (
      <Card className={cn('codeblock relative w-full overflow-hidden rounded-md font-sans')}>
        <div
          className={cn(
            'flex w-full items-center justify-between bg-neutral-100 py-1 pl-4 pr-2 dark:bg-neutral-700',
          )}
        >
          <span className="text-xs font-semibold">{markdownLanguages[language] || language}</span>
          <div className="flex items-center gap-2">
            <span
              className="h-fit w-fit cursor-pointer rounded-md p-2 text-xs transition-colors duration-200 hover:bg-neutral-200 focus-visible:ring-offset-0 dark:hover:bg-neutral-600"
              onClick={onCopy}
            >
              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="sr-only">Copy code</span>
            </span>
          </div>
        </div>
        <div className="dark:hidden">
          <SyntaxHighlighter
            language={language}
            style={vs}
            PreTag="div"
            showLineNumbers
            customStyle={{
              margin: 0,
              width: '100%',
              background: 'transparent',
              padding: '1rem 1rem',
              border: 'none',
            }}
            lineNumberStyle={{
              userSelect: 'none',
            }}
            codeTagProps={{
              style: {
                fontSize: '0.9rem',
                fontFamily: 'var(--font-mono)',
              },
            }}
            className="rounded-b-md border-0"
          >
            {value}
          </SyntaxHighlighter>
        </div>
        <div className="hidden dark:block">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            PreTag="div"
            showLineNumbers
            customStyle={{
              margin: 0,
              width: '100%',
              background: 'transparent',
              padding: '1.5rem 1rem',
              border: 'none',
            }}
            lineNumberStyle={{
              userSelect: 'none',
            }}
            codeTagProps={{
              style: {
                fontSize: '0.9rem',
                fontFamily: 'var(--font-mono)',
              },
            }}
            className="rounded-b-md border-0"
          >
            {value}
          </SyntaxHighlighter>
        </div>
      </Card>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.value === nextProps.value && prevProps.language === nextProps.language;
  },
);

CodeBlock.displayName = 'CodeBlock';

'use client';

import React from 'react';
import type { Message } from 'ai';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { Avatar, AvatarFallback, AvatarImage, Icon, Logo, Markdown } from '@/components/ui';
import { cn } from '@/utils/cn';
import ToolInvocation from './tools';
import { getAgentName } from './tools/tool-to-agent';

interface Props {
  message: Message;
  className?: string;
  previousMessage?: Message;
  nextMessage?: Message;
}

const Message: React.FC<Props> = ({ message, className, previousMessage, nextMessage }) => {
  const { address } = useAccount();

  const isUser = message.role === 'user';

  const nextMessageSameRole = nextMessage?.role === message.role;
  const previousMessageSameRole = previousMessage?.role === message.role;

  return (
    <div
      className={cn(
        'flex h-fit w-full max-w-full px-2 py-4 last:border-b-0 md:first:pt-0',
        'flex-col gap-2',
        'md:flex-row md:gap-4 md:px-4',
        nextMessageSameRole && 'pb-0',
        previousMessageSameRole && 'pt-0',
        !nextMessageSameRole && 'border-b border-gray-200 dark:border-neutral-700',
        isUser && '!flex-row-reverse !text-right',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center gap-2 md:items-start md:gap-4',
          previousMessageSameRole && 'hidden md:block',
        )}
      >
        <div
          className={cn(
            'hidden h-6 w-6 items-center justify-center rounded-full md:flex md:h-10 md:w-10',
            isUser &&
              'border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800',
            previousMessageSameRole && 'opacity-0',
          )}
        >
          {isUser ? (
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                <Icon name="User" className="h-4 w-4 md:h-6 md:w-6" />
              </AvatarFallback>
              {address && <AvatarImage />}
            </Avatar>
          ) : (
            <Logo className="h-10 w-10" />
          )}
        </div>
        <p
          className={cn(
            'text-sm font-semibold md:hidden',
            isUser
              ? 'text-neutral-900 dark:text-neutral-100'
              : 'text-brand-600 dark:text-brand-600',
          )}
        >
          {message.role === 'user' ? 'You' : 'AA'}
        </p>
      </div>
      <div className="flex w-full max-w-full flex-col gap-2 overflow-hidden pt-2 md:w-0 md:flex-1">
        {message.content && <MessageMarkdown content={message.content} />}
        {message.toolInvocations && message.toolInvocations.length > 0 && (
          <div className="flex flex-col gap-2">
            {message.toolInvocations.map((tool, index) => (
              <ToolInvocation
                key={tool.toolCallId}
                tool={tool}
                prevToolAgent={
                  index === 0
                    ? previousMessage?.toolInvocations?.[0]
                      ? getAgentName(previousMessage?.toolInvocations?.[0])
                      : undefined
                    : message.toolInvocations![index - 1]
                      ? getAgentName(message.toolInvocations![index - 1])
                      : undefined
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MessageMarkdown = React.memo(({ content }: { content: string }) => {
  return (
    <Markdown
      components={{
        a: ({ href, children }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
          if (!href) return children;
          return (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:underline"
            >
              {children}
            </Link>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
});

MessageMarkdown.displayName = 'MessageMarkdown';

export default Message;

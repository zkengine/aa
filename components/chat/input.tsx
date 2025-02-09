'use client';

import { CornerDownRight } from 'lucide-react';
import React, { createContext, useEffect, useRef } from 'react';
import Textarea from 'react-textarea-autosize';
import { useAccount } from 'wagmi';
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui';
import { useChat } from '@/contexts/chat';
import { useEnterSubmit } from '@/hooks/useEnterSubmit';
import { cn } from '@/utils/cn';

const FocusContext = createContext<(() => void) | null>(null);

const ChatInput: React.FC = () => {
  const { address } = useAccount();

  const { input, setInput, onSubmit, isLoading, inputDisabledMessage } = useChat();

  const { onKeyDown } = useEnterSubmit({ onSubmit: onSubmit });

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const focusTextarea = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (!isLoading) {
      focusTextarea();
    }
  }, [isLoading]);

  return (
    <FocusContext.Provider value={focusTextarea}>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
        className={cn(
          'mt-10 flex w-full flex-col overflow-hidden rounded-md border border-transparent shadow-none transition-colors duration-200 ease-in-out md:max-w-4xl',
          'bg-neutral-100 focus-within:border-brand-600',
          'dark:bg-neutral-800/50 dark:focus-within:border-brand-600',
          isLoading && 'cursor-not-allowed opacity-50',
        )}
      >
        <OptionalTooltip text={inputDisabledMessage}>
          <Textarea
            ref={inputRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            placeholder="Ask me anything..."
            className={cn(
              'max-h-60 w-full resize-none bg-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-neutral-400',
              'focus-visible:outline-none',
              'dark:placeholder:text-neutral-400',
            )}
            value={input}
            onChange={e => {
              setInput(e.target.value);
            }}
            disabled={isLoading || !address || inputDisabledMessage !== ''}
            autoFocus
          />
        </OptionalTooltip>

        <div className="flex items-center justify-end px-2 pb-2">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  size="icon"
                  disabled={input.trim() === '' || isLoading || !address}
                  variant="ghost"
                  className="h-8 w-8"
                >
                  <CornerDownRight className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  <span className="sr-only">Send message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </form>
    </FocusContext.Provider>
  );
};

const OptionalTooltip = ({ children, text }: { children: React.ReactNode; text: string }) => {
  if (text === '') return children;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side="top">{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ChatInput;

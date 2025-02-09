'use client';

import React from 'react';
import { AnimatedShinyText } from '@/components/ui';
import Logo from '@/components/ui/logo';
import { cn } from '@/utils/cn';

const LoadingMessage: React.FC = () => {
  return (
    <div
      className={cn(
        'flex w-full max-w-full px-2 py-4 last:border-b-0',
        'flex-col gap-2',
        'md:flex-row md:gap-4 md:px-4',
      )}
    >
      <div className="flex items-center gap-2 md:items-start">
        <Logo className={cn('h-6 w-6 md:h-10 md:w-10')} />
      </div>
      <div className="flex w-full max-w-full flex-col items-start gap-2 overflow-hidden md:w-0 md:flex-1 md:pt-2">
        <AnimatedShinyText className="mx-0 w-fit text-left text-sm font-semibold" shimmerWidth={70}>
          Thinking...
        </AnimatedShinyText>
      </div>
    </div>
  );
};

export default LoadingMessage;

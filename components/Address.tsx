'use client';

import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui';
import { cn } from '@/utils/cn';
import { shortenAddress } from '@/utils/helpers';

interface Props {
  address: string;
  className?: string;
}

const Address: React.FC<Props> = ({ address, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <p
            className={cn(
              'w-fit cursor-pointer rounded-md px-1 text-sm text-muted-foreground hover:bg-neutral-200 dark:hover:bg-neutral-700',
              className,
            )}
            onClick={handleCopy}
          >
            {shortenAddress(address)}
          </p>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {copied ? 'Copied to clipboard' : 'Copy to clipboard'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Address;

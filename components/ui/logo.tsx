import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';

interface Props {
  className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="AA Logo"
        width={100}
        height={100}
        className={cn('h-10 w-10', className)}
      />
    </div>
  );
};

export default Logo;

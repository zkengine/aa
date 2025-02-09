'use client';

import React from 'react';
import { Card } from '@/components/ui';

interface Props {
  token: string;
  balance: number;
  logoURI: string;
  name: string;
}

const TokenBalance: React.FC<Props> = ({ token, balance, logoURI, name }) => {
  return (
    <Card className="flex flex-row items-center gap-2 p-2">
      <img src={logoURI} alt={name} className="h-8 w-8 rounded-full" />
      <div className="flex flex-col">
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          {name} ({token})
        </p>
        <p className="text-md font-bold">{balance.toFixed(4)}</p>
      </div>
    </Card>
  );
};

export default TokenBalance;

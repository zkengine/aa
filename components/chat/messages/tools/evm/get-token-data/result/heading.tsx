'use client';

import React from 'react';
import Address from '@/components/Address';
import { Card } from '@/components/ui';
import type { TokenOverview } from '@/types/token-overview';
import { cn } from '@/utils/cn';

interface Props {
  token: TokenOverview;
}

const GetTokenDataResultHeading: React.FC<Props> = ({ token }) => {
  return (
    <Card className="flex flex-col justify-between gap-4 p-2 md:flex-row">
      <div className="flex items-center gap-2">
        <img src={token.logoURI} alt={token.name} className="h-10 w-10 rounded-full" />
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center md:gap-2">
            <h1 className="text-xl font-bold">
              {token.name} ({token.symbol})
            </h1>
            <Address address={token.address} />
          </div>
          <p className="flex items-center gap-1 text-sm font-semibold">
            ${token.price.toLocaleString(undefined, { maximumFractionDigits: 5 })}
            {token.priceChange24hPercent && (
              <span
                className={cn(
                  'text-xs',
                  token.priceChange24hPercent > 0 ? 'text-green-500' : 'text-red-500',
                )}
              >
                {token.priceChange24hPercent
                  ? `(${token.priceChange24hPercent > 0 ? '+' : ''}${token.priceChange24hPercent.toFixed(2)}%)`
                  : ''}
              </span>
            )}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default GetTokenDataResultHeading;

'use client';

import React from 'react';
import { Card } from '@/components/ui';
import type { TokenOverview } from '@/types/token-overview';

interface Props {
  token: TokenOverview;
}

const Stats: React.FC<Props> = ({ token }) => {
  return (
    <Card className="flex flex-col gap-2 p-2">
      <h2 className="text-lg font-semibold">Market Stats</h2>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-2">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold">Market Cap</h3>
          <p>${token.mc.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold">Liquidity</h3>
          <p>${token.liquidity.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold"># of Holders</h3>
          <p>{token.holder.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold"># of Markets</h3>
          <p>{token.numberMarkets.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
      </div>
    </Card>
  );
};

export default Stats;

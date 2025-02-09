import React from 'react';
import type { ToolInvocation } from 'ai';
import TokenBalance from '@/components/TokenBalance';
import { AllBalancesResultBodyType, BaseActionResult } from '@/types/agent';
import ToolCard from '../tool-card';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

type AllBalancesResultType = BaseActionResult<AllBalancesResultBodyType>;

const AllBalances: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting All Balances...`}
      result={{
        heading: (result: AllBalancesResultType) =>
          result.body ? `Fetched All Balances` : `Failed to fetch balances`,
        body: (result: AllBalancesResultType) =>
          result.body ? (
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
              {result.body.balances.map(balance => (
                <TokenBalance
                  key={balance.token}
                  token={balance.token}
                  balance={balance.balance}
                  logoURI={balance.logoURI}
                  name={balance.name}
                />
              ))}
            </div>
          ) : (
            'No balance found'
          ),
      }}
      prevToolAgent={prevToolAgent}
    />
  );
};

export default AllBalances;

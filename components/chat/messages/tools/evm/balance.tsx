import React from 'react';
import type { ToolInvocation } from 'ai';
import TokenBalance from '@/components/TokenBalance';
import { BalanceResultBodyType, BaseActionResult } from '@/types/agent';
import ToolCard from '../tool-card';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

type BalanceResultType = BaseActionResult<BalanceResultBodyType>;

const GetBalance: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting ${tool.args.tokenAddress || 'ETH'} Balance...`}
      result={{
        heading: (result: BalanceResultType) =>
          result.body?.token ? `Fetched ${result.body.token} Balance` : `Failed to fetch balance`,
        body: (result: BalanceResultType) =>
          result.body ? (
            <TokenBalance
              token={result.body.token}
              balance={result.body.balance}
              logoURI={result.body.logoURI}
              name={result.body.name}
            />
          ) : (
            'No balance found'
          ),
      }}
      prevToolAgent={prevToolAgent}
    />
  );
};

export default GetBalance;

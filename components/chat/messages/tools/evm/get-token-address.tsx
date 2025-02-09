import React from 'react';
import type { ToolInvocation } from 'ai';
import Address from '@/components/Address';
import { BaseActionResult, GetTokenAddressResultBodyType } from '@/types/agent';
import ToolCard from '../tool-card';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

type GetTokenAddressResultType = BaseActionResult<GetTokenAddressResultBodyType>;

const GetTokenAddress: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting ${tool.args.keyword} Address...`}
      result={{
        heading: (result: GetTokenAddressResultType) =>
          result.body ? `Fetched ${tool.args.keyword} Address` : `Failed to fetch token address`,
        body: (result: GetTokenAddressResultType) =>
          result.body ? <Address address={result.body.address} /> : 'No token address found',
      }}
      prevToolAgent={prevToolAgent}
      defaultOpen={false}
    />
  );
};

export default GetTokenAddress;

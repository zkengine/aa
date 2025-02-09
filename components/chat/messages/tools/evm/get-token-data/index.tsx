import React from 'react';
import type { ToolInvocation } from 'ai';
import { BaseActionResult, GetTokenDataResultBodyType } from '@/types/agent';
import ToolCard from '../../tool-card';
import GetTokenDataResult from './result';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

type GetTokenDataResultType = BaseActionResult<GetTokenDataResultBodyType>;

const GetTokenData: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting Token Data...`}
      result={{
        heading: (result: GetTokenDataResultType) =>
          result.body
            ? `Fetched ${result.body.token.name || 'Token'} Data`
            : `Failed to fetch token data`,
        body: (result: GetTokenDataResultType) =>
          result.body ? <GetTokenDataResult body={result.body} /> : 'No token data found',
      }}
      defaultOpen={true}
      prevToolAgent={prevToolAgent}
      className="w-full"
    />
  );
};

export default GetTokenData;

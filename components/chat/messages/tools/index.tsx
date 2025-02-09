'use client';

import React from 'react';
import type { ToolInvocation as ToolInvocationType } from 'ai';
import {
  BALANCE_NAME,
  GET_TOKEN_ADDRESS_NAME,
  GET_TOKEN_DATA_NAME,
  GET_TRENDING_TOKENS_NAME,
} from '@/utils/action-names';
import { Balance, GetTokenAddress, GetTokenData, GetTrendingTokens } from './evm';

interface Props {
  tool: ToolInvocationType;
  prevToolAgent?: string;
}

const ToolInvocation: React.FC<Props> = ({ tool, prevToolAgent }) => {
  const toolParts = tool.toolName.split('-');
  const toolName = toolParts.slice(1).join('-');

  switch (toolName) {
    case BALANCE_NAME:
      return <Balance tool={tool} prevToolAgent={prevToolAgent} />;
    case GET_TRENDING_TOKENS_NAME:
      return <GetTrendingTokens tool={tool} prevToolAgent={prevToolAgent} />;
    case GET_TOKEN_DATA_NAME:
      return <GetTokenData tool={tool} prevToolAgent={prevToolAgent} />;
    case GET_TOKEN_ADDRESS_NAME:
      return <GetTokenAddress tool={tool} prevToolAgent={prevToolAgent} />;
    default:
      return <pre className="whitespace-pre-wrap">{JSON.stringify(tool, null, 2)}</pre>;
  }
};

export default ToolInvocation;

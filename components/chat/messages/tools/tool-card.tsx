import { ChevronDown } from 'lucide-react';
import React from 'react';
import type { ToolInvocation } from 'ai';
import {
  AnimatedShinyText,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Icon,
} from '@/components/ui';
import { cn } from '@/utils/cn';
import { getAgentIcon, getAgentName } from './tool-to-agent';

type BaseActionResult<TBody> = {
  message: string;
  body?: TBody;
};

interface Props<ActionResultBodyType, ActionArgsType> {
  tool: ToolInvocation;
  loadingText: string;
  result: {
    heading: (result: BaseActionResult<ActionResultBodyType>) => string;
    body: (result: BaseActionResult<ActionResultBodyType>) => React.ReactNode;
  };
  call?: {
    heading: string;
    body: (toolCallId: string, args: ActionArgsType) => React.ReactNode;
  };
  defaultOpen?: boolean;
  className?: string;
  prevToolAgent?: string;
}

const ToolCard = <ActionResultBodyType, ActionArgsType>({
  tool,
  loadingText,
  result,
  call,
  defaultOpen = true,
  className,
  prevToolAgent,
}: Props<ActionResultBodyType, ActionArgsType>) => {
  const agentName = getAgentName(tool);

  const agentIcon = getAgentIcon(agentName);

  return (
    <div className={cn('flex w-fit flex-col gap-2', className)}>
      <div className={cn('flex items-center gap-2', prevToolAgent === agentName && 'hidden')}>
        {tool.state === 'result' ? (
          tool.result.body ? (
            <Icon name={agentIcon} className="h-4 w-4 text-brand-600 dark:text-brand-600" />
          ) : (
            <Icon name="X" className="h-4 w-4 text-red-500 dark:text-red-400" />
          )
        ) : (
          <Icon name={agentIcon} className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
        )}
        <p className="text-sm font-bold md:text-lg">{agentName}</p>
      </div>
      <div>
        {tool.state === 'partial-call' ? (
          <AnimatedShinyText className="text-sm">{loadingText}</AnimatedShinyText>
        ) : tool.state === 'call' ? (
          call?.body ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {call.heading}
              </p>
              {call.body(tool.toolCallId, tool.args)}
            </div>
          ) : (
            <AnimatedShinyText className="text-sm">{loadingText}</AnimatedShinyText>
          )
        ) : (
          <Collapsible defaultOpen={defaultOpen}>
            <CollapsibleTrigger className="flex items-center gap-2 text-neutral-600 hover:underline dark:text-neutral-400">
              <p className="text-sm">{result.heading(tool.result)}</p>
              <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 text-sm">
              {result.body(tool.result)}
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    </div>
  );
};

export default ToolCard;

'use client';

import React, { useEffect } from 'react';
import type { Message as MessageType } from 'ai';
import { useChat } from '@/contexts/chat';
import { useScrollAnchor } from '@/hooks/useScrollAnchor';
import LoadingMessage from './loading-message';
import Message from './message';

interface Props {
  messages: MessageType[];
  messageClassName?: string;
}

const Messages: React.FC<Props> = ({ messages, messageClassName }) => {
  const { isResponseLoading } = useChat();

  const { scrollRef, messagesRef, scrollToBottom } = useScrollAnchor();

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div
      className="no-scrollbar flex h-0 w-full max-w-full flex-1 flex-col overflow-y-auto"
      ref={scrollRef}
    >
      <div className="messages-container" ref={messagesRef}>
        {messages.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            className={messageClassName}
            previousMessage={index > 0 ? messages[index - 1] : undefined}
            nextMessage={index < messages.length - 1 ? messages[index + 1] : undefined}
          />
        ))}
        {isResponseLoading && <LoadingMessage />}
      </div>
    </div>
  );
};

export default Messages;

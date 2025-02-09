'use client';

import React from 'react';
import { useChat } from '@/contexts/chat';
import EmptyChat from './empty';
import ChatInput from './input';
import Messages from './messages';

const Chat: React.FC = () => {
  const { messages } = useChat();

  const cleanedMessages = messages.filter(message => message.role !== 'system');
  console.log('cleanedMessages:', cleanedMessages);
  return (
    <div className="flex h-screen w-full flex-col items-center py-5">
      <div className="flex h-full w-full max-w-full flex-col justify-between md:max-w-4xl">
        <div className="flex h-[80%] max-w-full flex-1 flex-col overflow-hidden">
          {cleanedMessages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <EmptyChat />
            </div>
          ) : (
            <>
              <Messages messages={cleanedMessages} />
            </>
          )}
        </div>
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;

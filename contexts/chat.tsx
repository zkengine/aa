'use client';

import { Message, useChat as useAiChat } from 'ai/react';
import React, { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { v4 as uuidv4 } from 'uuid';
import { useAccount } from 'wagmi';
import useBoundStore from '@/store';
import { ACTION_NAMES } from '@/utils/constants';

type ToolResult<T> = {
  message: string;
  body?: T;
};

interface ChatContextType {
  messages: Message[];
  input: string;
  setInput: (input: string) => void;
  onSubmit: () => Promise<void>;
  isLoading: boolean;
  sendMessage: (message: string) => void;
  addToolResult: <T>(toolCallId: string, result: ToolResult<T>) => void;
  isResponseLoading: boolean;
  inputDisabledMessage: string;
}

const ChatContext = createContext<ChatContextType>({
  messages: [],
  input: '',
  setInput: () => {},
  onSubmit: async () => {},
  isLoading: false,
  sendMessage: () => {},
  isResponseLoading: false,
  addToolResult: () => {},
  inputDisabledMessage: '',
});

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const { address } = useAccount();

  const [isResponseLoading, setIsResponseLoading] = useState(false);

  const { chatId, setChatId, showGlobalLoading, setGlobalLoading } = useBoundStore(
    useShallow(state => ({
      chatId: state.chatId,
      setChatId: state.setChatId,
      showGlobalLoading: state.showGlobalLoading,
      setGlobalLoading: state.setGlobalLoading,
    })),
  );

  const {
    messages,
    input,
    setInput,
    append,
    isLoading,
    addToolResult: addToolResultBase,
    setMessages,
  } = useAiChat({
    maxSteps: 20,
    onResponse: () => {
      setIsResponseLoading(false);
    },
    api: '/api/agent',
    body: {
      userId: address,
      chatId,
    },
  });

  useEffect(() => {
    const fetchChat = async () => {
      if (!chatId) return;

      try {
        const chat = await fetch(`/api/chats/${chatId}`);
        const chatData = await chat.json();
        if (chatData && chatData.data) {
          setMessages(chatData.data.messages);
        }
      } catch (error) {
        console.error('Error fetching chat:', error);
      } finally {
        setGlobalLoading(false);
      }
    };

    if (address) {
      setChatId(!chatId ? uuidv4() : chatId);
      setGlobalLoading(true);
      fetchChat();
    }
  }, [address, chatId, setChatId, setGlobalLoading, setMessages]);

  const addToolResult = <T,>(toolCallId: string, result: ToolResult<T>) => {
    addToolResultBase({
      toolCallId,
      result,
    });
  };

  useEffect(() => {
    const updateChat = async () => {
      if (messages.length > 0 && !isLoading) {
        try {
          const response = await fetch(`/api/chats/${chatId}`, {
            method: 'POST',
            body: JSON.stringify({
              messages,
            }),
          });
          await response.json();
        } catch (error) {
          console.error('Error updating chat:', error);
        }
      }
    };

    updateChat();
  }, [isLoading]);

  const onSubmit = async () => {
    if (!input.trim()) return;
    setIsResponseLoading(true);
    await append({
      role: 'user',
      content: input,
    });
    setInput('');
  };

  const sendMessage = async (message: string) => {
    setIsResponseLoading(true);
    await append({
      role: 'user',
      content: message,
    });
  };

  const inputDisabledMessage = useMemo(() => {
    if (messages.length === 0) return '';

    const lastMessage = messages[messages.length - 1];
    let message = lastMessage.toolInvocations
      ?.map(toolInvocation => {
        if (toolInvocation.state === 'result') return '';
        const toolName = toolInvocation.toolName.slice(toolInvocation.toolName.indexOf('-') + 1);
        switch (toolName) {
          case ACTION_NAMES.TRADE_NAME:
            return `Complete or cancel your trade`;
          case ACTION_NAMES.TRANSFER_NAME:
            return `Complete or cancel your payment`;
          case ACTION_NAMES.STAKE_NAME:
            return `Complete or cancel your stake`;
          case ACTION_NAMES.UNSTAKE_NAME:
            return `Complete or cancel your unstake`;
          case ACTION_NAMES.GET_WALLET_ADDRESS_NAME:
            return `Connect your wallet`;
          default:
            return '';
        }
      })
      .filter(message => message !== '')
      .join(' and ');

    if (message) {
      message = message?.concat(' to continue');
    }
    return message || '';
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        input,
        setInput,
        onSubmit,
        isLoading: isLoading || showGlobalLoading,
        sendMessage,
        isResponseLoading,
        addToolResult,
        inputDisabledMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);

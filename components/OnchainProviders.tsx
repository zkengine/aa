'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { WagmiProvider } from 'wagmi';
import { hashFn } from 'wagmi/query';
import { getConfig } from '@/configs/wagmi';
import { DEFAULT_CHAIN, ENVIRONMENT, ENVIRONMENT_VARIABLES } from '@/utils/constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24, // 24 hours
      queryKeyHashFn: hashFn,
    },
  },
});

const OnchainProviders = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={getConfig()}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={ENVIRONMENT_VARIABLES[ENVIRONMENT.API_KEY]}
          projectId={ENVIRONMENT_VARIABLES[ENVIRONMENT.CDP_PROJECT_ID]}
          chain={DEFAULT_CHAIN}
          config={{
            appearance: {
              name: 'Automatic Agent',
              logo: 'https://onchainkit.xyz/favicon/48x48.png?v4-19-24',
              mode: 'auto',
              theme: 'default',
            },
            wallet: {
              display: 'modal',
              termsUrl: 'https://www.coinbase.com/legal/cookie',
              privacyUrl: 'https://www.coinbase.com/legal/privacy',
            },
          }}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default OnchainProviders;

import { cookieStorage, createConfig, createStorage, fallback, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { coinbaseWallet, walletConnect } from 'wagmi/connectors';

export function getConfig() {
  return createConfig({
    chains: [base, baseSepolia],
    connectors: [
      coinbaseWallet({
        appName: 'Automatic Agent',
        preference: 'smartWalletOnly',
      }),
      coinbaseWallet({
        appName: 'Automatic Agent',
        preference: 'eoaOnly',
      }),
      walletConnect({
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
        showQrModal: false,
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [base.id]: fallback([
        http(`https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`),
        http(),
      ]),
      [baseSepolia.id]: fallback([
        http(`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`),
        http(),
      ]),
    },
    cacheTime: 1000 * 60 * 5, // 5 minutes
    batch: {
      multicall: true,
    },
  });
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}

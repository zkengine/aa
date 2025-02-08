import { Chain, createPublicClient, createWalletClient, fallback, http } from 'viem';
import { baseSepolia } from 'viem/chains';

const baseSepoliaFallback = fallback([
  http(`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_BASE_SEPOLIA_KEY}`),
  http(),
]);

export const getPublicClient = (chain?: Chain, cacheTime?: number) => {
  return createPublicClient({
    chain: chain || baseSepolia,
    transport: baseSepoliaFallback,
    batch: {
      multicall: true,
    },
    cacheTime: cacheTime || 1000 * 60 * 5, // 5 minutes
  });
};

export const getWalletClient = (chain?: Chain) => {
  return createWalletClient({
    chain: chain || baseSepolia,
    transport: baseSepoliaFallback,
  });
};

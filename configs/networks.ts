import { base, baseSepolia } from 'wagmi/chains';
import { NetworkConfig } from '@/types/network-config';

export const DEFAULT_NETWORK_ID = Number(
  process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID || baseSepolia.id,
);

export const NETWORK_CONFIG: { [key: number]: NetworkConfig } = {
  [base.id]: {
    nativeCurrency: base.nativeCurrency.name,
    networkName: base.name,
    multicall3: base.contracts.multicall3.address ?? '0xcA11bde05977b3631167028862bE2a173976CA11',
    rpcUrl: process.env.NEXT_PUBLIC_ALCHEMY_KEY
      ? `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
      : base.rpcUrls.default.http[0],
    explorerUrl: {
      tx: 'https://basescan.org/tx',
      address: 'https://basescan.org/address',
      block: 'https://basescan.org/block',
      token: 'https://basescan.org/token',
      nft: 'https://basescan.org/nft',
    },
    contracts: {},
  },
  [baseSepolia.id]: {
    nativeCurrency: baseSepolia.nativeCurrency.name,
    networkName: baseSepolia.name,
    multicall3:
      baseSepolia.contracts.multicall3.address ?? '0xcA11bde05977b3631167028862bE2a173976CA11',
    rpcUrl: process.env.NEXT_PUBLIC_ALCHEMY_KEY
      ? `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
      : baseSepolia.rpcUrls.default.http[0],
    explorerUrl: {
      tx: 'https://sepolia.basescan.org/tx',
      address: 'https://sepolia.basescan.org/address',
      block: 'https://sepolia.basescan.org/block',
      token: 'https://sepolia.basescan.org/token',
      nft: 'https://sepolia.basescan.org/nft',
    },
    contracts: {},
  },
};

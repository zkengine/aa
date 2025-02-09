import { zeroAddress } from 'viem';
import { base, baseSepolia } from 'wagmi/chains';

export const QUERY_GC_TIME = 20 * 1000; // 20 seconds
export const QUERY_REFETCH_INTERVAL = 5000; // 5 seconds
export const WALLET_CONNECT_CONNECTOR_ID = 'walletConnect';
export const ZERO_ADDRESS = zeroAddress;
export const DEFAULT_CHAIN = process.env.NODE_ENV === 'development' ? baseSepolia : base;

export const ENVIRONMENT = {
  API_KEY: 'API_KEY',
  ENVIRONMENT: 'ENVIRONMENT',
  CDP_PROJECT_ID: 'CDP_PROJECT_ID',
} as const;
type EnvironmentKey = (typeof ENVIRONMENT)[keyof typeof ENVIRONMENT];
export const ENVIRONMENT_VARIABLES: Record<EnvironmentKey, string | undefined> = {
  [ENVIRONMENT.API_KEY]: process.env.NEXT_PUBLIC_OCK_API_KEY,
  [ENVIRONMENT.ENVIRONMENT]: process.env.NEXT_PUBLIC_VERCEL_ENV,
  [ENVIRONMENT.CDP_PROJECT_ID]: process.env.NEXT_PUBLIC_CDP_PROJECT_ID,
};

export const ACTION_NAMES = {
  GET_WALLET_ADDRESS_NAME: 'getWalletAddress',
  TRADE_NAME: 'trade',
  STAKE_NAME: 'stake',
  UNSTAKE_NAME: 'unstake',
  TRANSFER_NAME: 'transfer',
} as const;

import { Hex } from 'viem';

export interface NetworkConfig {
  nativeCurrency: string;
  networkName: string;
  multicall3: string;
  explorerUrl: {
    tx: string;
    address: string;
    block: string;
    token?: string;
    nft?: string;
  };
  rpcUrl: string;
  contracts: {
    [key: string]: Hex;
  };
}

import { Chain } from 'viem';

export interface ApplicationSlice {
  showGlobalLoading: boolean;
  chain: Chain;

  setGlobalLoading: (val: boolean) => void;
  setChain: (val: Chain | undefined) => void;
  resetAppData: () => void;
}

import { Chain } from 'viem';

export interface ApplicationSlice {
  showGlobalLoading: boolean;
  chain: Chain;
  chatId: string | null;

  setGlobalLoading: (val: boolean) => void;
  setChain: (val: Chain | undefined) => void;
  setChatId: (val: string) => void;
  resetAppData: () => void;
}

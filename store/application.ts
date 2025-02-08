import { produce } from 'immer';
import { StateCreator } from 'zustand';
import { ApplicationSlice } from '@/types/slices';
import { DEFAULT_CHAIN } from '@/utils/constants';

const createApplicationSlice: StateCreator<ApplicationSlice, [], [], ApplicationSlice> = set => ({
  showGlobalLoading: false,
  chain: DEFAULT_CHAIN,

  setGlobalLoading: show =>
    set(
      produce(state => {
        state.showGlobalLoading = show;
      }),
    ),

  setChain: chain =>
    set(
      produce(state => {
        state.chain = chain;
      }),
    ),

  resetAppData: () =>
    set(
      produce(state => {
        state.showGlobalLoading = false;
        state.showMenu = true;
        state.hasPermission = undefined;
        state.chain = DEFAULT_CHAIN;
      }),
    ),
});

export default createApplicationSlice;

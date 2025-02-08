import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ApplicationSlice } from '@/types/slices';
import createApplicationSlice from './application';

type Slices = ApplicationSlice;

const useBoundStore = create<Slices>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createApplicationSlice(...a),
      })),
      {
        name: process.env.NODE_ENV === 'production' ? 'aa' : 'aa-dev',
      },
    ),
  ),
);

export default useBoundStore;

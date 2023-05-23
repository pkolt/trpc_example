import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type RouterOutput } from '@/trpc.js';

type AuthData = RouterOutput['auth']['login'];

export interface AuthState {
  data?: AuthData;
  setData: (data: AuthData) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      setData: (data) => set(() => ({ data })),
      reset: () => set(() => ({ data: undefined })),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

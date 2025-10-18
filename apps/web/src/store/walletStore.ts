import { create } from 'zustand';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  balance: string | null;
  setWallet: (address: string, chainId: number) => void;
  setBalance: (balance: string) => void;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: null,
  chainId: null,
  balance: null,
  setWallet: (address, chainId) =>
    set({
      isConnected: true,
      address,
      chainId,
    }),
  setBalance: (balance) =>
    set({
      balance,
    }),
  disconnect: () =>
    set({
      isConnected: false,
      address: null,
      chainId: null,
      balance: null,
    }),
}));

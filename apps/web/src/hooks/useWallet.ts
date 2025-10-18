'use client';

import { useState } from 'react';

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState('0');

  const connect = async () => {
    try {
      // Wallet connection logic will be implemented
      // Using wagmi/ethers.js
      console.log('Connecting wallet...');
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
    setBalance('0');
  };

  return {
    address,
    isConnected,
    balance,
    connect,
    disconnect,
  };
}

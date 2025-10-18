import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, polygon } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'AIWorkSpace',
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [base, polygon],
  ssr: true,
});

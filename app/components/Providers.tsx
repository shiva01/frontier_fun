'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';

const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [mainnet, polygon, optimism, arbitrum, base],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 
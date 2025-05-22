'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Chat from './components/Chat';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-screen overflow-hidden">
        <Chat />
      </div>
    </QueryClientProvider>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/mock-data';
import { Sidebar } from '@/components/sidebar';
import type React from 'react'; // Added import for React

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const currentUser = useStore(state => state.currentUser);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (currentUser) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    );
  }

  return <>{children}</>;
}

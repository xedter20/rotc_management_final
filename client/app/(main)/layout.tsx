import { Sidebar } from '@/components/sidebar';
import { MainNav } from '@/components/main-nav';
import type React from 'react'; // Added import for React

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* <Sidebar /> */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <MainNav />
        <main className="flex-1 overflow-y-auto bg-background p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

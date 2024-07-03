'use client';

import Header from '@/components/header';
import { SessionProvider } from 'next-auth/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <section className="mx-auto min-h-screen w-full max-w-[1600px]">
        <Header />
        {children}
      </section>
    </SessionProvider>
  );
}

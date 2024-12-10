'use client';

import React from 'react';
import { Providers } from './Providers';
import Header from './Header';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Header />
      {children}
    </Providers>
  );
} 
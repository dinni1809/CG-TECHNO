import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Admin Portal | CG Techno Electronics',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

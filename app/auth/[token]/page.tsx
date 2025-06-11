import React from 'react';
import AuthTokenComponent from '@/components/auth/AuthTokenComponent';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Auth Page',
};

export default function AuthTokenPage() {
  return (
    <div className="w-full">
      <AuthTokenComponent />
    </div>
  );
}

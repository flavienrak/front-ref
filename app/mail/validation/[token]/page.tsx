import React from 'react';
import MailValidationComponent from '@/components/mail/MailValidationComponent';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mail Verification',
  description: 'Mail Verification Page',
};

export default function MailTokenPage() {
  return (
    <div className="w-full h-full">
      <MailValidationComponent />
    </div>
  );
}

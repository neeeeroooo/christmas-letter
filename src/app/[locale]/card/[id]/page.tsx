import CardComponent from '@/components/card/CardComponent';

import { notFound } from 'next/navigation';
import React from 'react';

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="flex justify-center mt-36">
      <CardComponent />
    </div>
  );
}

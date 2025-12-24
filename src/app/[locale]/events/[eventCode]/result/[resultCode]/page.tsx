import { notFound } from 'next/navigation';
import React from 'react';

export default function EventResultDetailPage({
  params,
}: {
  params: Promise<{ eventCode: string; resultCode: string }>;
}) {
  const { eventCode, resultCode } = React.use(params);

  return <div className="flex justify-center mt-36"></div>;
}

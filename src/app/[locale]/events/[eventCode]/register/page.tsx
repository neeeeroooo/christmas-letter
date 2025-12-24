import { notFound } from 'next/navigation';
import React from 'react';

export default function EventRegisterPage({
  params,
}: {
  params: Promise<{ eventCode: string }>;
}) {
  const { eventCode } = React.use(params);

  return <div className="flex justify-center mt-36"></div>;
}

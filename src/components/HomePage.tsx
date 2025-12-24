'use client';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function HomePageComponent() {
  const t = useTranslations('home');
  return <div className="flex justify-center mt-36">{t('home')}</div>;
}

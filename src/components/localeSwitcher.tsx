'use client';
import React from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';

import 'dayjs/locale/th';
import 'dayjs/locale/en';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';

dayjs.extend(buddhistEra);

const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace({ pathname }, { locale: newLocale });
    }
    dayjs.locale(newLocale);
  };

  return (
    <div className="w-32">
      <select
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option
          value="en"
          className={`${locale === 'en' ? 'text-blue-600 font-medium' : ''}`}
        >
          English
        </option>
        <option
          value="th"
          className={`${locale === 'th' ? 'text-blue-600 font-medium' : ''}`}
        >
          ไทย
        </option>
      </select>
    </div>
  );
};

export default LocaleSwitcher;

import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

type Locale = typeof routing.locales extends (infer U)[] ? U : never;

const fetchTranslations = async (locale: string) => {
  try {
    const res = await fetch(
      `${process.env.PUBLIC_DOMAIN}/${locale}/api/translations/${locale}`,
    );
    if (!res.ok) throw new Error('Failed to load translations');
    return await res.json();
  } catch (e) {
    console.error(e);
    return {};
  }
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale: string | undefined = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = 'en';
  }

  const messages = await fetchTranslations(locale);

  return {
    locale,
    messages,
  };
});

import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // Read locale from the request
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !['en', 'zh'].includes(locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../../locales/${locale}.json`)).default,
    timeZone: 'Asia/Shanghai',
    now: new Date()
  };
});

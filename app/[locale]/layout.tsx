import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import { FloatingCTA } from '@/components/floating-cta';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
        <FloatingCTA locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}

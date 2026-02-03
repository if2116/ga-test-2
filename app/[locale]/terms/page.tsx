import TermsOfServiceClient from './terms-client';

// Force static generation
export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function TermsOfServicePage({ params }: TermsPageProps) {
  const { locale } = await params;
  return <TermsOfServiceClient locale={locale} />;
}

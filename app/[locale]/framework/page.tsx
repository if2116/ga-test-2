import FrameworkClient from './framework-client';

// Force static generation
export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

interface FrameworkPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FrameworkPage({ params }: FrameworkPageProps) {
  const { locale } = await params;
  return <FrameworkClient locale={locale} />;
}

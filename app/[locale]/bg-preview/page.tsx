import BackgroundPreviewClient from './bg-preview-client';

// Force static generation
export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function BackgroundPreviewPage() {
  return <BackgroundPreviewClient />;
}

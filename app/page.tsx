import Link from 'next/link';

export const dynamic = 'force-static';

export default function IndexPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0A0E17] text-white">
      <div className="text-center px-6">
        <h1 className="text-2xl font-semibold mb-4">Redirecting…</h1>
        <p className="text-white/70 mb-6">Taking you to the English site.</p>
        <noscript>
          <Link
            href="/en/"
            className="px-6 py-3 rounded-lg bg-[#3B82F6] hover:bg-blue-600 transition-colors inline-block"
          >
            Continue to English
          </Link>
        </noscript>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "var base=window.location.pathname.replace(/\\/?$/, '');window.location.replace((base ? base : '') + '/en/');",
        }}
      />
    </main>
  );
}

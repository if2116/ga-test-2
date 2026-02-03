'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type LocaleRedirectProps = {
  defaultLocale?: 'en' | 'zh';
  targetPath: string;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function LocaleRedirect({ defaultLocale = 'en', targetPath }: LocaleRedirectProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const basePath = pathname.replace(new RegExp(`${escapeRegExp(targetPath)}/?$`), '');
    const nextPath = `${basePath}/${defaultLocale}${targetPath}`.replace(/\/{2,}/g, '/');
    if (nextPath !== pathname) {
      window.location.replace(nextPath);
    }
  }, [defaultLocale, pathname, targetPath]);

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold text-text-primary mb-4">Redirecting…</h1>
      <p className="text-text-secondary">
        If you are not redirected, please use the navigation menu.
      </p>
    </main>
  );
}

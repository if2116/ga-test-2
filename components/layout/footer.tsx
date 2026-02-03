'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Github } from 'lucide-react';

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-gray-200 bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold text-primary mb-4">{t('brand')}</h3>
            <p className="text-sm text-text-secondary">
              {t('brandDescription')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">{t('platform')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/arena`} className="text-sm text-text-secondary hover:text-primary transition-colors">
                  {t('arena')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/framework`} className="text-sm text-text-secondary hover:text-primary transition-colors">
                  {t('framework')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/faq`} className="text-sm text-text-secondary hover:text-primary transition-colors">
                  {t('faq')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">{t('community')}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/THU-ZJAI/Real-World-AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  {t('github')}
                </a>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-sm text-text-secondary hover:text-primary transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <a
                  href="mailto:xuyuyao@tsinghua-zj.edu.cn"
                  className="text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  {t('contactUs')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">{t('legal')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/privacy`} className="text-sm text-text-secondary hover:text-primary transition-colors">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-sm text-text-secondary hover:text-primary transition-colors">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-secondary">{t('copyright')}</p>
          <a
            href="https://github.com/THU-ZJAI/Real-World-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm">{t('followOnGitHub')}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

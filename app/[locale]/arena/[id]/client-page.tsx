'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Arena } from '@/lib/types';
import {
  BarChart3,
  ArrowLeft,
  Mail,
  Star,
  Zap,
  DollarSign,
  Shield,
  Settings,
  Github,
  Trophy,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { motion } from 'framer-motion';

type TabType = 'overview' | 'implementation' | 'tech-configuration';

// Metric value to star rating
const metricToStars: Record<string, number> = {
  '很慢': 1,
  '较低': 1,
  '慢': 1,
  '差': 1,
  '中等': 2,
  '较快': 3,
  '较高': 3,
  '很较': 3,
  '很快': 3,
  '很高': 3,
  '较优': 3,
  '优': 3,
};

// Convert metric value to stars
function getStarRating(value: string): number {
  return metricToStars[value] || 2;
}

// Speed to time mapping
const speedToTimeMapping: Record<string, string> = {
  '很快': '1-2 days',
  '较快': '1 week',
  '中等': '2 weeks',
  '较慢': '1 month',
  // Direct mappings from data
  '一周': '1 week',
  '1~2天': '1-2 days',
  '1-2天': '1-2 days',
  '两周': '2 weeks',
  '一月': '1 month',
  '半天': 'Half day',
};

// Extract time from description
function extractTimeFromDescription(description: string): string {
  const timePatterns: [RegExp, string][] = [
    [/(\d+[-~]\d+[天小时分钟]+)/, '$1'],
    [/两天半/, '2-3天'],
    [/三天半/, '3-4天'],
    [/四天半/, '4-5天'],
    [/五天半/, '5-6天'],
    [/半天/, '半天'],
    [/(一周|七天)/, '一周'],
    [/(两周|十四天)/, '两周'],
    [/(十天)/, '10天'],
    [/(九天)/, '9天'],
    [/(八天)/, '8天'],
    [/(七天的)/, '7天'],
    [/(六天)/, '6天'],
    [/(五天)/, '5天'],
    [/(四天)/, '4天'],
    [/(三天)/, '3天'],
    [/(两天)(?!半)/, '2天'],
    [/(一天)/, '1天'],
    [/(半小时|30分钟)/, '半小时'],
    [/(一小时|60分钟)/, '1小时'],
    [/(两小时|2小时)/, '2小时'],
    [/(三小时|3小时)/, '3小时'],
    [/(四小时|4小时)/, '4小时'],
    [/(五小时|5小时)/, '5小时'],
    [/(六小时|6小时)/, '6小时'],
  ];

  for (const [pattern, replacement] of timePatterns) {
    const match = description.match(pattern);
    if (match) {
      return replacement;
    }
  }

  return '';
}

interface ArenaDetailClientProps {
  arena: Arena;
  locale: string;
  arenaId: string;
  initialContent: { [key: string]: string };
  hasContent: boolean;
}

export function ArenaDetailClient({ arena, locale, arenaId, initialContent, hasContent }: ArenaDetailClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const content = initialContent;

  // Handle URL hash for direct tab linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as TabType;
      if (['overview', 'implementation', 'tech-configuration'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const tabs: { key: TabType; label: string; icon: any; color?: string }[] = [
    { key: 'overview', label: locale === 'zh' ? '概览' : 'Overview', icon: BarChart3 },
    { key: 'implementation', label: locale === 'zh' ? '实施指南' : 'Implementation', icon: Settings, color: 'purple' },
    { key: 'tech-configuration', label: locale === 'zh' ? '技术配置' : 'Technical Configuration', icon: Zap, color: 'blue' },
  ];

  // Extract metrics from arena
  const metrics = {
    quality: arena.metrics?.quality || '较高',
    speed: arena.metrics?.speed || '较快',
    cost: arena.metrics?.cost || '较优',
    security: arena.metrics?.security || '较高',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-primary-50/30 relative overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href={`/${locale}/arena`}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {locale === 'zh' ? '返回Arena列表' : 'Back to Arena List'}
            </Link>
          </nav>

          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                  {arena.title[locale as keyof typeof arena.title] || arena.title.zh}
                </h1>
                {/* Champion/擂主 Info */}
                {(locale === 'zh' ? arena.champion : arena.championEn) ? (
                  <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                    <Trophy className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-purple-900">
                        {locale === 'zh' ? '擂主' : 'Champion'}:
                      </span>
                      <span className="text-gray-700">{locale === 'zh' ? arena.champion : arena.championEn}</span>
                    </div>
                  </div>
                ) : null}
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                  {locale === 'zh' ? arena.highlights : arena.highlightsEn}
                </p>
              </div>

              {/* Status Badge */}
              <div className="hidden sm:block">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
                    <Trophy className="h-4 w-4 mr-1" />
                    {locale === 'zh' ? '已验证' : 'Verified'}
                  </span>
                  {/* GitHub Stars */}
                  {arena.githubStars !== undefined && (
                    <div className="flex items-center gap-1">
                      <Github className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-xs font-medium text-gray-500">
                        {arena.githubStars.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4-Pillar Metrics - Clean horizontal layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              {/* Left: Metrics icons - horizontal, left-aligned, no background */}
              <div className="flex items-center gap-6">
                {/* Speed - Show time instead of stars */}
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-violet-500">
                    <Zap className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm font-semibold text-violet-600 leading-tight">
                      {extractTimeFromDescription(locale === 'zh' ? arena.highlights : arena.highlightsEn) || (locale === 'zh' ? metrics.speed : speedToTimeMapping[metrics.speed] || metrics.speed)}
                    </div>
                    <div className="text-xs text-gray-500">{locale === 'zh' ? '速度' : 'Speed'}</div>
                  </div>
                </div>
                {/* Quality, Security, Cost - Star ratings */}
                {[
                  { label: locale === 'zh' ? '质量' : 'Quality', value: metrics.quality, stars: getStarRating(metrics.quality), icon: Star, color: 'text-amber-500' },
                  { label: locale === 'zh' ? '安全' : 'Security', value: metrics.security, stars: getStarRating(metrics.security), icon: Shield, color: 'text-emerald-500' },
                  { label: locale === 'zh' ? '成本' : 'Cost', value: metrics.cost, stars: getStarRating(metrics.cost), icon: DollarSign, color: 'text-blue-500' },
                ].map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div key={metric.label} className="flex items-center gap-2">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${metric.color}`}>
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-center gap-0.5">
                          {[1, 2, 3].map((star) => (
                            <svg
                              key={star}
                              className={`h-3.5 w-3.5 ${
                                star <= metric.stars
                                  ? `${metric.color} fill-current`
                                  : 'text-gray-200 fill-current'
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <div className="text-xs text-gray-500">{metric.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: CTA Button */}
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all"
              >
                <Mail className="h-4 w-4" />
                {locale === 'zh' ? '联系我们' : 'Contact Us'}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sticky Tab Navigation */}
      <div className="sticky top-16 z-40 bg-white border-b shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 overflow-x-auto py-0" role="tablist">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const colorClasses = tab.color ? {
                purple: 'text-purple-600',
                green: 'text-green-600',
                amber: 'text-amber-600',
                red: 'text-red-600',
              }[tab.color] : '';

              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    window.location.hash = tab.key;
                  }}
                  role="tab"
                  className={`group relative flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.key
                      ? `border-primary text-gray-900 bg-gradient-to-r from-primary-50 to-transparent`
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${activeTab === tab.key ? colorClasses : ''}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {!hasContent ? (
          // Content uploading message
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 mb-6">
              <Settings className="h-10 w-10 text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'zh' ? '内容上传中' : 'Content Uploading'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {locale === 'zh'
                ? '我们正在为这个AI实践案例准备详细的内容文档，包括实施指南、需求文档、验证报告等。敬请期待！'
                : 'We are preparing detailed content documentation for this AI practice case, including implementation guides and more. Stay tuned!'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {/* Main Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="prose prose-lg max-w-none">
                {activeTab === 'overview' && content.overview && (
                  <OverviewSection content={content.overview} locale={locale} />
                )}

                {activeTab === 'implementation' && content.implementation && (
                  <ImplementationSection content={content.implementation} locale={locale} />
                )}

                {activeTab === 'tech-configuration' && content['tech-configuration'] && (
                  <TechConfigurationSection content={content['tech-configuration']} locale={locale} />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

// Custom markdown components to match reference styling
const markdownComponents = {
  h1: ({ children, ...props }: any) => (
    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4 mt-12 first:mt-0" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-3 mt-12" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-8" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4 className="text-xl font-bold text-gray-900 mb-2 mt-6" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: any) => (
    <p className="mb-4 text-gray-700 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  strong: ({ children, ...props }: any) => (
    <strong className="font-bold text-gray-900" {...props}>
      {children}
    </strong>
  ),
  a: ({ href, children, ...props }: any) => (
    <a
      href={href}
      className="text-blue-600 hover:text-blue-700 underline font-medium"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="space-y-2 mb-6 list-disc list-inside text-gray-700" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="space-y-2 mb-6 list-decimal list-inside text-gray-700" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  table: ({ children, ...props }: any) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: any) => (
    <thead className="bg-gray-50" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: any) => (
    <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap" {...props}>
      {children}
    </td>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-blue-600 pl-4 py-2 my-4 italic text-gray-600 bg-gray-50 rounded-r" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ inline, className, children, ...props }: any) => {
    if (inline) {
      return (
        <code className="bg-gray-100 text-gray-900 px-2 py-1 rounded text-sm font-mono border border-gray-300" {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6" {...props}>
      {children}
    </pre>
  ),
  hr: ({ ...props }: any) => <hr className="my-8 border-t border-gray-300" {...props} />,
  div: ({ children, className, ...props }: any) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),
  span: ({ children, className, ...props }: any) => (
    <span className={className} {...props}>
      {children}
    </span>
  ),
};

// Overview Section Component - Card-based design matching Arena style
function OverviewSection({ content, locale }: { content: string; locale: string }) {
  const isChina = locale === 'zh';

  // Icon mapping for sections
  const getSectionIcon = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('key metrics') || lowerTitle.includes('核心指标')) return '📊';
    if (lowerTitle.includes('business highlights') || lowerTitle.includes('业务亮点')) return '🎯';
    if (lowerTitle.includes('solution overview') || lowerTitle.includes('解决方案概览')) return '💡';
    if (lowerTitle.includes('pain points') || lowerTitle.includes('痛点')) return '⚠️';
    if (lowerTitle.includes('performance metrics') || lowerTitle.includes('性能指标')) return '📈';
    if (lowerTitle.includes('best practice') || lowerTitle.includes('最佳实践')) return '🏅';
    if (lowerTitle.includes('demo') || lowerTitle.includes('演示')) return '🎬';
    if (lowerTitle.includes('basic information') || lowerTitle.includes('基本信息')) return '📋';
    return '📄';
  };

  // Parse overview content into structured sections
  const parseContent = (text: string) => {
    const lines = text.split('\n');
    const sections: {
      title: string;
      icon: string;
      subsections: Array<{
        title?: string;
        icon?: string;
        content: string[];
      }>;
    }[] = [];

    let currentSection: typeof sections[0] | null = null;
    let currentSubsection: typeof sections[0]['subsections'][0] | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip empty lines and separators
      if (!line || line === '---') continue;

      // Detect main section headers (##)
      const sectionMatch = line.match(/^##\s+(.+)/);
      if (sectionMatch) {
        if (currentSection) {
          if (currentSubsection) {
            currentSection.subsections.push(currentSubsection);
          }
          sections.push(currentSection);
        }
        const title = sectionMatch[1].trim();
        currentSection = {
          title,
          icon: getSectionIcon(title),
          subsections: []
        };
        currentSubsection = null;
        continue;
      }

      // Detect subsection headers (###)
      const subsectionMatch = line.match(/^###\s+(.+)/);
      if (subsectionMatch && currentSection) {
        if (currentSubsection) {
          currentSection.subsections.push(currentSubsection);
        }
        const title = subsectionMatch[1].trim();
        currentSubsection = {
          title,
          content: []
        };
        continue;
      }

      // Skip language headers
      if (line.startsWith('####')) {
        continue;
      }

      // Add content to current subsection or section
      if (currentSection && line) {
        if (currentSubsection) {
          currentSubsection.content.push(line);
        } else {
          // Create subsection if none exists
          currentSubsection = {
            content: [line]
          };
        }
      }
    }

    // Push last section and subsection
    if (currentSection) {
      if (currentSubsection) {
        currentSection.subsections.push(currentSubsection);
      }
      sections.push(currentSection);
    }

    return sections;
  };

  const sections = parseContent(content);

  // Render Key Metrics section with grid of metric cards
  const renderKeyMetricsCard = (section: typeof sections[0]) => {
    if (!section.title.toLowerCase().includes('key metrics') && !section.title.includes('核心指标')) {
      return null;
    }

    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-100/80 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">{section.icon}</span>
          <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {section.subsections.map((subsection, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-5 border border-slate-100/80 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
            >
              {subsection.title && (
                <h3 className="text-base font-bold text-gray-900 mb-3">{subsection.title}</h3>
              )}
              <div className="space-y-2">
                {subsection.content.filter((c) => c.startsWith('-')).map((item, i) => (
                  <div key={i} className="text-sm text-gray-700 flex items-start gap-1.5">
                    <span className="text-blue-600 flex-shrink-0">•</span>
                    <span>{item.replace(/^-\s+\*\*/, '').replace(/\*\*/g, '')}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render Business Pain Points section with colored problem cards
  const renderPainPointsCard = (section: typeof sections[0]) => {
    if (!section.title.toLowerCase().includes('pain points') && !section.title.includes('痛点')) {
      return null;
    }

    const colors = [
      { bg: 'from-red-50 to-red-100', border: 'border-red-200', text: 'text-red-700' },
      { bg: 'from-orange-50 to-orange-100', border: 'border-orange-200', text: 'text-orange-700' },
      { bg: 'from-yellow-50 to-yellow-100', border: 'border-yellow-200', text: 'text-yellow-700' },
      { bg: 'from-purple-50 to-purple-100', border: 'border-purple-200', text: 'text-purple-700' },
    ];

    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-100/80 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">{section.icon}</span>
          <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {section.subsections.map((subsection, idx) => {
            const color = colors[idx % colors.length];
            return (
              <div
                key={idx}
                className={`bg-gradient-to-br ${color.bg} rounded-xl p-6 border ${color.border} hover:scale-[1.02] hover:shadow-lg transition-all duration-300`}
              >
                {subsection.title && (
                  <h3 className={`text-lg font-bold ${color.text} mb-3`}>{subsection.title}</h3>
                )}
                <div className="text-sm text-gray-700 leading-relaxed space-y-2">
                  {subsection.content.map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render standard section card
  const renderStandardCard = (section: typeof sections[0]) => {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-100/80 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">{section.icon}</span>
          <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
        </div>

        <div className="space-y-5">
          {section.subsections.map((subsection, idx) => (
            <div key={idx} className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-5 border border-slate-100/80">
              {subsection.title && (
                <h3 className="text-lg font-bold text-gray-900 mb-3">{subsection.title}</h3>
              )}
              <div className="space-y-2">
                {subsection.content.filter((c) => c && !c.startsWith('####')).map((item, i) => {
                  if (item.startsWith('-')) {
                    return (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-blue-600 flex-shrink-0 mt-0.5">•</span>
                        <span>{item.replace(/^-\s+/, '').replace(/\*\*/g, '')}</span>
                      </div>
                    );
                  }
                  if (item.startsWith('**') && item.endsWith('**')) {
                    return (
                      <p key={i} className="text-base font-semibold text-gray-900">
                        {item.replace(/\*\*/g, '')}
                      </p>
                    );
                  }
                  return (
                    <p key={i} className="text-sm text-gray-700 leading-relaxed">
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {sections.map((section, idx) => {
        const titleLower = section.title.toLowerCase();

        // Special rendering for Key Metrics
        if (titleLower.includes('key metrics') || section.title.includes('核心指标')) {
          return <div key={idx}>{renderKeyMetricsCard(section)}</div>;
        }

        // Special rendering for Pain Points
        if (titleLower.includes('pain points') || section.title.includes('痛点')) {
          return <div key={idx}>{renderPainPointsCard(section)}</div>;
        }

        // Standard rendering for other sections
        return <div key={idx}>{renderStandardCard(section)}</div>;
      })}
    </div>
  );
}

// Implementation Section Component - Phase-based card design
function ImplementationSection({ content, locale }: { content: string; locale: string }) {
  const isChina = locale === 'zh';

  // Icon mapping for phases
  const getPhaseIcon = (phaseNum: number): string => {
    const icons = ['🎯', '📋', '⚙️', '🚀'];
    return icons[phaseNum - 1] || '📌';
  };

  // Get subsection icon
  const getSubsectionIcon = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('team') || lowerTitle.includes('团队')) return '👥';
    if (lowerTitle.includes('content') || lowerTitle.includes('内容')) return '📝';
    if (lowerTitle.includes('resource') || lowerTitle.includes('资源')) return '🔗';
    if (lowerTitle.includes('deliverable') || lowerTitle.includes('产出') || lowerTitle.includes('结果')) return '📦';
    if (lowerTitle.includes('cycle') || lowerTitle.includes('周期')) return '⏱️';
    if (lowerTitle.includes('step') || lowerTitle.includes('步骤')) return '🔄';
    return '📄';
  };

  // Parse implementation content into phases
  const parseContent = (text: string) => {
    const lines = text.split('\n');
    const phases: {
      number: number;
      title: string;
      icon: string;
      subsections: Array<{
        title: string;
        icon: string;
        content: string[];
      }>;
    }[] = [];

    let currentPhase: typeof phases[0] | null = null;
    let currentSubsection: typeof phases[0]['subsections'][0] | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip empty lines and separators
      if (!line || line === '---') continue;

      // Detect phase headers (__PHASE X__)
      const phaseMatch = line.match(/^__PHASE\s+(\d+)\s+(.+)__$/);
      if (phaseMatch) {
        if (currentPhase) {
          if (currentSubsection) {
            currentPhase.subsections.push(currentSubsection);
          }
          phases.push(currentPhase);
        }
        const phaseNum = parseInt(phaseMatch[1]);
        currentPhase = {
          number: phaseNum,
          title: phaseMatch[2].trim(),
          icon: getPhaseIcon(phaseNum),
          subsections: []
        };
        currentSubsection = null;
        continue;
      }

      // Detect subsection headers (__Title__)
      const subsectionMatch = line.match(/^__(.+)__$/);
      if (subsectionMatch && currentPhase) {
        if (currentSubsection) {
          currentPhase.subsections.push(currentSubsection);
        }
        const title = subsectionMatch[1].trim();
        currentSubsection = {
          title,
          icon: getSubsectionIcon(title),
          content: []
        };
        continue;
      }

      // Add content to current subsection
      if (currentPhase && currentSubsection && line) {
        currentSubsection.content.push(line);
      }
    }

    // Push last phase and subsection
    if (currentPhase) {
      if (currentSubsection) {
        currentPhase.subsections.push(currentSubsection);
      }
      phases.push(currentPhase);
    }

    return phases;
  };

  const phases = parseContent(content);

  // Render phase card
  const renderPhaseCard = (phase: typeof phases[0], idx: number) => {
    const isEven = idx % 2 === 0;

    return (
      <div
        key={idx}
        className="bg-white rounded-2xl p-8 border border-gray-100/80 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
      >
        {/* Phase Header */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-gradient-to-r from-purple-100 to-blue-100">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl text-white text-3xl font-bold shadow-lg">
            {phase.number}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{phase.icon}</span>
              <h2 className="text-3xl font-bold text-gray-900">{phase.title}</h2>
            </div>
          </div>
        </div>

        {/* Phase Subsections */}
        <div className="space-y-6">
          {phase.subsections.map((subsection, subIdx) => {
            // Cycle through different background colors for subsections
            const bgColors = [
              'from-blue-50 to-indigo-50',
              'from-purple-50 to-pink-50',
              'from-green-50 to-emerald-50',
              'from-amber-50 to-orange-50',
              'from-cyan-50 to-sky-50',
            ];
            const bgColor = bgColors[subIdx % bgColors.length];

            return (
              <div
                key={subIdx}
                className={`bg-gradient-to-br ${bgColor} rounded-xl p-6 border border-gray-100/80`}
              >
                {/* Subsection Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{subsection.icon}</span>
                  <h3 className="text-xl font-bold text-gray-900">{subsection.title}</h3>
                </div>

                {/* Subsection Content */}
                <div className="space-y-3">
                  {subsection.content.map((item, itemIdx) => {
                    // List items
                    if (item.match(/^\d+\./) || item.startsWith('-')) {
                      return (
                        <div key={itemIdx} className="flex items-start gap-3 text-gray-700">
                          <span className="text-purple-600 flex-shrink-0 mt-1">
                            {item.match(/^\d+\./) ? '➢' : '•'}
                          </span>
                          <span className="leading-relaxed">{item.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '').replace(/\*\*/g, '')}</span>
                        </div>
                      );
                    }

                    // Links
                    if (item.includes('[') && item.includes(']')) {
                      const linkMatch = item.match(/\[([^\]]+)\]\(([^)]+)\)/);
                      if (linkMatch) {
                        return (
                          <a
                            key={itemIdx}
                            href={linkMatch[2]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium"
                          >
                            <span>🔗</span>
                            {linkMatch[1]}
                          </a>
                        );
                      }
                    }

                    // Regular text
                    if (item && !item.startsWith('__')) {
                      return (
                        <p key={itemIdx} className="text-gray-700 leading-relaxed">
                          {item.replace(/\*\*/g, '')}
                        </p>
                      );
                    }

                    return null;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {phases.map((phase, idx) => renderPhaseCard(phase, idx))}
    </div>
  );
}

// TechConfigurationSection Component - Step-based card design for technical configuration
function TechConfigurationSection({ content, locale }: { content: string; locale: string }) {
  const isChina = locale === 'zh';

  // Icon mapping for steps
  const getStepIcon = (stepNum: number): string => {
    const icons = ['🔧', '⚙️', '🔌', '🌐', '📡', '🤖'];
    return icons[stepNum - 1] || '📋';
  };

  // Get subsection icon
  const getSubsectionIcon = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('step name') || lowerTitle.includes('步骤名称')) return '📌';
    if (lowerTitle.includes('step definition') || lowerTitle.includes('步骤定义')) return '📝';
    if (lowerTitle.includes('participants') || lowerTitle.includes('参与人员')) return '👥';
    if (lowerTitle.includes('step input') || lowerTitle.includes('本步输入')) return '📥';
    if (lowerTitle.includes('step output') || lowerTitle.includes('本步产出')) return '📤';
    if (lowerTitle.includes('estimated time') || lowerTitle.includes('预估时间')) return '⏱️';
    return '📄';
  };

  // Parse technical configuration content into steps
  const parseContent = (text: string) => {
    const lines = text.split('\n');
    const steps: {
      number: number;
      title: string;
      icon: string;
      subsections: Array<{
        title: string;
        icon: string;
        content: string[];
      }>;
    }[] = [];

    let currentStep: typeof steps[0] | null = null;
    let currentSubsection: typeof steps[0]['subsections'][0] | null = null;
    let inContentSection = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip language markers and main title
      if (line.startsWith('####') || line.startsWith('# ')) {
        inContentSection = true;
        continue;
      }

      // Skip content before first step marker
      if (!inContentSection) continue;

      // Detect step headers (both English and Chinese)
      const isStepNumber = line === '__Step Number__' || line === '__步骤序号__';
      const isStepName = line === '__Step Name__' || line === '__步骤名称__';

      if (isStepNumber) {
        // Save previous step
        if (currentStep) {
          if (currentSubsection) {
            currentStep.subsections.push(currentSubsection);
          }
          steps.push(currentStep);
        }

        // Find the step number (skip blank lines)
        let stepNum = 1;
        for (let j = i + 1; j < lines.length; j++) {
          const nextLine = lines[j].trim();
          if (nextLine && !nextLine.startsWith('__')) {
            stepNum = parseInt(nextLine) || 1;
            break;
          }
        }

        // Find the step name (skip to __Step Name__)
        let stepName = '';
        for (let j = i + 1; j < lines.length; j++) {
          const checkLine = lines[j].trim();
          if (checkLine === '__Step Name__' || checkLine === '__步骤名称__') {
            // Get the next non-empty line as the name
            for (let k = j + 1; k < lines.length; k++) {
              const nameLine = lines[k].trim();
              if (nameLine && !nameLine.startsWith('__')) {
                stepName = nameLine;
                break;
              }
            }
            break;
          }
        }

        currentStep = {
          number: stepNum,
          title: stepName || `Step ${stepNum}`,
          icon: getStepIcon(stepNum),
          subsections: []
        };
        currentSubsection = null;
        continue;
      }

      // Detect subsection headers (__Title__)
      const subsectionMatch = line.match(/^__(.+)__$/);
      if (subsectionMatch && currentStep) {
        const title = subsectionMatch[1].trim();

        // Skip Step Number and Step Name headers (both languages)
        if (title === 'Step Number' || title === '步骤序号' ||
            title === 'Step Name' || title === '步骤名称') {
          continue;
        }

        // Save previous subsection
        if (currentSubsection) {
          currentStep.subsections.push(currentSubsection);
        }

        currentSubsection = {
          title,
          icon: getSubsectionIcon(title),
          content: []
        };
        continue;
      }

      // Add content to current subsection
      if (currentStep && currentSubsection && line && !line.startsWith('__')) {
        currentSubsection.content.push(lines[i]); // Use original line, not trimmed
      }
    }

    // Push last step and subsection
    if (currentStep) {
      if (currentSubsection) {
        currentStep.subsections.push(currentSubsection);
      }
      steps.push(currentStep);
    }

    return steps;
  };

  const steps = parseContent(content);

  // Render step card
  const renderStepCard = (step: typeof steps[0], idx: number) => {
    return (
      <div
        key={idx}
        className="bg-white rounded-2xl p-8 border border-gray-100/80 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
      >
        {/* Step Header */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-gradient-to-r from-blue-100 to-cyan-100">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl text-white text-3xl font-bold shadow-lg">
            {step.number}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{step.icon}</span>
              <h2 className="text-3xl font-bold text-gray-900">{step.title}</h2>
            </div>
          </div>
        </div>

        {/* Step Subsections */}
        <div className="space-y-6">
          {step.subsections.map((subsection, subIdx) => {
            // Cycle through different background colors for subsections
            const bgColors = [
              'from-blue-50 to-cyan-50',
              'from-indigo-50 to-blue-50',
              'from-teal-50 to-green-50',
              'from-cyan-50 to-sky-50',
              'from-sky-50 to-blue-50',
            ];
            const bgColor = bgColors[subIdx % bgColors.length];

            return (
              <div
                key={subIdx}
                className={`bg-gradient-to-br ${bgColor} rounded-xl p-6 border border-gray-100/80`}
              >
                {/* Subsection Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{subsection.icon}</span>
                  <h3 className="text-xl font-bold text-gray-900">{subsection.title}</h3>
                </div>

                {/* Subsection Content */}
                <div className="space-y-4 text-gray-700">
                  {(() => {
                    // Group content into blocks (code blocks, lists, paragraphs)
                    const blocks: Array<{type: 'code' | 'list' | 'link' | 'text', content: string[]}> = [];
                    let currentBlock: typeof blocks[0] | null = null;
                    let inCodeBlock = false;
                    let codeLang = '';

                    for (let i = 0; i < subsection.content.length; i++) {
                      const line = subsection.content[i];
                      const trimmed = line.trim();

                      // Handle code blocks
                      if (trimmed.startsWith('```')) {
                        if (inCodeBlock) {
                          // End code block
                          if (currentBlock) {
                            blocks.push(currentBlock);
                          }
                          currentBlock = null;
                          inCodeBlock = false;
                        } else {
                          // Start code block
                          if (currentBlock) {
                            blocks.push(currentBlock);
                          }
                          codeLang = trimmed.replace(/```\s*/, '');
                          currentBlock = { type: 'code', content: [] };
                          inCodeBlock = true;
                        }
                        continue;
                      }

                      if (inCodeBlock && currentBlock) {
                        currentBlock.content.push(line);
                        continue;
                      }

                      // Handle empty lines
                      if (!trimmed) {
                        if (currentBlock && currentBlock.type !== 'code') {
                          blocks.push(currentBlock);
                          currentBlock = null;
                        }
                        continue;
                      }

                      // Determine content type
                      const isListItem = trimmed.match(/^\d+\./) || trimmed.startsWith('-');
                      const isLink = trimmed.includes('[') && trimmed.includes('](');

                      if (isListItem) {
                        if (currentBlock && currentBlock.type !== 'list') {
                          blocks.push(currentBlock);
                          currentBlock = null;
                        }
                        if (!currentBlock) {
                          currentBlock = { type: 'list', content: [] };
                        }
                        currentBlock.content.push(trimmed);
                      } else if (isLink) {
                        if (currentBlock) {
                          blocks.push(currentBlock);
                        }
                        currentBlock = { type: 'link', content: [trimmed] };
                        blocks.push(currentBlock);
                        currentBlock = null;
                      } else {
                        if (currentBlock && currentBlock.type === 'list') {
                          blocks.push(currentBlock);
                          currentBlock = null;
                        }
                        if (!currentBlock) {
                          currentBlock = { type: 'text', content: [] };
                        }
                        currentBlock.content.push(trimmed);
                      }
                    }

                    // Push last block
                    if (currentBlock) {
                      blocks.push(currentBlock);
                    }

                    // Render blocks
                    return blocks.map((block, blockIdx) => {
                      if (block.type === 'code') {
                        return (
                          <div key={blockIdx} className="my-4">
                            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                              <pre className="text-gray-100 text-sm font-mono whitespace-pre-wrap">
                                {block.content.join('\n')}
                              </pre>
                            </div>
                          </div>
                        );
                      }

                      if (block.type === 'list') {
                        return (
                          <div key={blockIdx} className="space-y-2">
                            {block.content.map((item, itemIdx) => (
                              <div key={itemIdx} className="flex items-start gap-3">
                                <span className="text-blue-600 flex-shrink-0 mt-1">
                                  {item.match(/^\d+\./) ? '➢' : '•'}
                                </span>
                                <span className="leading-relaxed flex-1">
                                  {item.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '')}
                                </span>
                              </div>
                            ))}
                          </div>
                        );
                      }

                      if (block.type === 'link') {
                        const linkMatch = block.content[0].match(/\[([^\]]+)\]\(([^)]+)\)/);
                        if (linkMatch) {
                          return (
                            <a
                              key={blockIdx}
                              href={linkMatch[2]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                            >
                              <span>🔗</span>
                              {linkMatch[1]}
                            </a>
                          );
                        }
                        return null;
                      }

                      if (block.type === 'text') {
                        return (
                          <p key={blockIdx} className="leading-relaxed">
                            {block.content.join(' ')}
                          </p>
                        );
                      }

                      return null;
                    });
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {steps.length > 0 ? (
        steps.map((step, idx) => renderStepCard(step, idx))
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-800 font-semibold mb-4">
            {isChina ? '⚠️ 内容解析失败，显示原始内容：' : '⚠️ Content parsing failed, showing raw content:'}
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-4 overflow-auto max-h-96">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {content}
            </ReactMarkdown>
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
              {isChina ? '查看调试信息' : 'Show debug info'}
            </summary>
            <div className="mt-2 bg-gray-900 text-green-400 p-4 rounded overflow-auto text-sm font-mono">
              <p>Content length: {content.length}</p>
              <p>First 500 chars:</p>
              <pre>{content.substring(0, 500)}</pre>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}


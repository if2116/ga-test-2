import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

// Excel file path
const EXCEL_FILE = path.join(process.cwd(), 'Content/Arena/List of Arenas.xlsx');
const OUTPUT_RAW_MD = path.join(process.cwd(), 'Content/Arena/page.raw.md');
const OUTPUT_ZH_MD = path.join(process.cwd(), 'Content/Arena/page.zh.md');
const OUTPUT_EN_MD = path.join(process.cwd(), 'Content/Arena/page.en.md');
const OUTPUT_DATA_TS = path.join(process.cwd(), 'lib/data.ts');

interface ArenaRow {
  __EMPTY: number | string;  // 列A - 空
  __EMPTY_1: number | string;  // 列B - 擂台编号
  __EMPTY_2: string;  // 列C - 擂台名称
  __EMPTY_3: string;  // 列D - 本周擂主
  __EMPTY_4: string;  // 列E - 验证状态（新增列）
  __EMPTY_5: string;  // 列F - 亮点
  __EMPTY_6: string;  // 列G - 行业类别
  __EMPTY_7: string;  // 列H - 应用类别
  __EMPTY_8: string;  // 列I - 简要描述
  __EMPTY_9: string;  // 列J - 技术类别
  __EMPTY_10: string;  // 列K - 速度
  __EMPTY_11: string;  // 列L - 质量
  __EMPTY_12: string;  // 列M - 安全
  __EMPTY_13: string;  // 列N - 成本
}

interface ArenaData {
  id: string;
  folderId: string;      // 文件夹名称（用于链接到详情页）
  title: { zh: string; en: string };
  category: string; // 存储原始的逗号分隔字符串
  categoryEn: string; // 英文
  industry: string; // 存储原始的逗号分隔字符串
  industryEn: string; // 英文
  champion: string; // 本周擂主
  championEn: string; // Champion (English)
  highlights: string;
  highlightsEn: string; // Highlights (English)
  metrics: {
    speed: string;
    quality: string;
    security: string;
    cost: string;
  };
  status: 'verified' | 'in-arena';
  verificationStatus: string; // 原始的验证状态文字（已验证/验证中）
}

// Category mapping (Chinese to English)
const categoryMap: Record<string, string> = {
  '服务': 'service',
  '管理': 'management',
  '营销': 'marketing',
  '风控': 'risk-control',
  '运营': 'operations',
  '通用': 'general',
};

// Industry mapping (Chinese to English)
const industryMap: Record<string, string> = {
  '金融': 'finance',
  '零售': 'retail',
  '教育': 'education',
  '医疗': 'healthcare',
  '能源': 'energy',
  '制造': 'manufacturing',
  '通用': 'general',
  '信息技术': 'general',
  '金融贸易': 'finance',
  '科研教育': 'education',
  '能源制造': 'energy',
  '行政管理': 'general',
  '文化体育': 'general',
  '全场景适用': 'general',
};

// Full industry name translations for markdown
const industryNameMap: Record<string, string> = {
  '信息技术': 'Information Technology',
  '金融贸易': 'Finance & Trade',
  '科研教育': 'Science & Education',
  '能源制造': 'Energy & Manufacturing',
  '行政管理': 'Administration',
  '文化体育': 'Culture & Sports',
  '通用': 'General',
  '农林牧渔': 'Agriculture, Forestry, Animal Husbandry & Fishery',
};

// Champion prefix translations
const championPrefixMap: Record<string, string> = {
  '私部署版：': 'Private Deployment: ',
  '云端版：': 'Cloud Version: ',
};

// Translate champion
function translateChampion(champion: string): string {
  let result = champion;
  for (const [cn, en] of Object.entries(championPrefixMap)) {
    result = result.replace(cn, en);
  }
  // Replace Chinese parentheses with English ones and fix spacing
  result = result
    .replace(/（\s*/g, '(')
    .replace(/\s*）/g, ')')
    .replace(/\(\s*/g, '(')
    .replace(/\s*\)/g, ')');
  return result;
}

// Full category name translations for markdown
const categoryNameMap: Record<string, string> = {
  '服务': 'Service',
  '运营': 'Operations',
  '管理': 'Management',
  '营销': 'Marketing',
  '风控': 'Risk Control',
  '通用': 'General',
};

// Verification status translations
const verificationStatusMap: Record<string, string> = {
  '已验证': 'Verified',
  '验证中': 'In Verification',
};

// Metric value translations
const metricValueMap: Record<string, string> = {
  '很快': 'Very Fast',
  '较快': 'Relatively Fast',
  '中等': 'Medium',
  '较慢': 'Relatively Slow',
  '很高': 'Very High',
  '较高': 'Relatively High',
  '较低': 'Relatively Low',
  '较优': 'Optimal',
};

// Metric label translations
const metricLabelMap: Record<string, string> = {
  '速度': 'Speed',
  '质量': 'Quality',
  '安全': 'Security',
  '成本': 'Cost',
};

// Translate industry categories (comma-separated)
function translateIndustry(industry: string): string {
  return industry.split(/,|，/).map(s => industryNameMap[s.trim()] || s.trim()).join(', ');
}

// Translate application categories (comma-separated)
function translateCategory(category: string): string {
  return category.split(/,|，/).map(s => categoryNameMap[s.trim()] || s.trim()).join(', ');
}

// Translate highlights using sentence-level translation for natural English
function translateHighlights(highlights: string): string {
  // Complete highlight translations (sentence-level for natural flow)
  const highlightTranslations: Record<string, string> = {
    '一周构建1个包含资料搜集、知识整合、报告生成功能的智能调研系统Demo':
      'Build an intelligent research system demo with data collection, knowledge integration, and report generation capabilities in one week',
    '0技术门槛1-2日内搭建出1个有基础互动能力的业务看板或网站Demo':
      'Build a business dashboard or website demo with basic interactive capabilities in 1-2 days with zero technical threshold',
    '一周构建1个完整性检查与风险评估的文档解析系统Demo':
      'Build a document parsing system demo with completeness checks and risk assessment in one week',
    '最快2.5日内生成1个企业级产品或功能简要演示视频':
      'Generate an enterprise-level product or feature demo video within 2.5 days at fastest',
    '一周搭建一个儿童教育应用Demo':
      'Build a children\'s education app demo in one week',
    '一周用低代码快速构建并验证一个面向能源领域的长时间序列预测系统Demo':
      'Rapidly build and verify a long-term time series forecasting system demo for the energy sector using low-code in one week',
    '一周快速构建1个智能文档翻译Demo':
      'Rapidly build an intelligent document translation demo in one week',
    '一天搭建出基于要素抽取与跨合同规则校验、可配置与溯源的智能合同法审系统Demo':
      'Build an intelligent contract legal review system demo with element extraction, cross-contract validation, configurability, and traceability in one day',
    '一周构建1个高精度、含数据流闭环、具备自进化能力的通用目标检测系统Demo':
      'Build a high-precision universal object detection system demo with closed-loop data flow and self-evolving capabilities in one week',
    '快速搭建一个大模型，通过对话生成SQL脚本':
      'Rapidly build a large model that generates SQL scripts through conversation',
    '一周基于低代码构建一个具备主动追问与推荐能力的对话式助手Demo':
      'Build a conversational assistant demo with active questioning and recommendation capabilities using low-code in one week',
    '一周低代码构建具备多源数据整合、合规校验、信贷报告一键生成能力的银行智能信贷系统Demo':
      'Build a banking intelligent credit system demo with multi-source data integration, compliance verification, and one-click credit report generation using low-code in one week',
    '一周低代码完成单条全国产业链图谱全流程构建':
      'Complete the full-process construction of a single national industrial chain graph using low-code in one week',
  };

  // Return exact translation if exists
  if (highlightTranslations[highlights]) {
    return highlightTranslations[highlights];
  }

  // Fallback: word-by-word translation (for any new highlights)
  const wordTranslations: Record<string, string> = {
    '一周': 'One week', '两天': 'Two days', '一天': 'One day', '最快2.5日内': 'Within 2.5 days',
    '搭建': 'build', '构建': 'construct', '生成': 'generate', '创建': 'create',
    '一个': 'a', '1个': 'a', '包含': 'including', '具备': 'featuring',
    '系统': 'system', '应用': 'application', '低代码': 'low-code',
    '快速': 'rapidly', '通过': 'via', '基于': 'based on',
    '企业级': 'enterprise-level', '智能': 'intelligent',
    '或': 'or', '及': '&', '与': 'and', '并': 'and',
    '功能': 'functionality', '能力': 'capability', '含': 'including',
    '用': 'using', '完成': 'complete', '出': '',
    '的': '', 'Demo': ' Demo',
  };

  let result = highlights;
  const sortedKeys = Object.keys(wordTranslations).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    result = result.replace(new RegExp(key, 'g'), wordTranslations[key]);
  }

  // Clean up
  result = result
    .replace(/、/g, ', ')
    .replace(/，/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();

  // Capitalize first letter
  result = result.charAt(0).toUpperCase() + result.slice(1);

  return result;
}

// Translate metric value
function translateMetricValue(value: string): string {
  return metricValueMap[value] || value;
}

function parseMetrics(value: number | string): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    // Extract number from string like "95%" or "95"
    const match = value.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }
  return 0;
}

function generateArenaId(name: string): string {
  // Convert Chinese name to slug-like ID
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Generate folder ID from English title (kebab-case, used for file paths)
function generateFolderId(englishTitle: string): string {
  // First check if there's a manual mapping
  if (folderIdMap[englishTitle]) {
    return folderIdMap[englishTitle];
  }

  // Fallback to auto-generate kebab-case ID
  return englishTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+-+/g, '-'); // Clean up multiple dashes
}

// Folder ID mapping (English title to actual folder name)
const folderIdMap: Record<string, string> = {
  '1-Week Build: Enterprise-Level Intelligent Research Report Generation System Demo': '1-intelligent-research-system',
  '2-Day Build: Business Dashboard & Website Demo': '2-business-dashboard-website',
  '1-Week Build: Document Review & Risk Control Demo': '3-document-review-risk-control',
  '2.5-Day Build: Enterprise-Level Demo Video': '4-demo-video',
  '1-Week Build: Educational App for Children Demo': '5-educational-app-children',
  '1-Week Build: Long-Term Time Series Forecasting System Demo (Energy)': '6-time-series-forecasting-energy',
  '1-Week Build: Intelligent Document Translation System Demo': '7-document-translation',
  '1-Day Build: Multi-Contract Cross-Validation Intelligent Contract Legal Review System Demo': '8-contract-legal-review',
  '1-Week Build: High-Precision Universal Object Detection System Demo (Energy & Agriculture)': '9-object-detection',
  'Universal Practice of SQL Language Intelligent Generation (NL2SQL)': '10-nl2sql',
  '1-Week Build: Conversational Feature Recommendation Assistant Demo (AI)': '11-feature-recommendation',
  '1-Week Build: Intelligent Credit Report Generation System Demo': '12-credit-report',
  '1-Week Build: Single National Industrial Chain Graph': '13-industrial-chain',
};

// Generate natural English translation from Chinese title (sentence-level translation)
function generateEnglishTitle(chineseTitle: string): string {
  // Complete title translations (by ID pattern matching)
  const titleTranslations: Record<string, string> = {
    '一周搭建企业级智能调研报告生成系统Demo': '1-Week Build: Enterprise-Level Intelligent Research Report Generation System Demo',
    '一周搭建企业级智能调研报告生成系统demo': '1-Week Build: Enterprise-Level Intelligent Research Report Generation System Demo',
    '两天搭建业务看板及网站Demo': '2-Day Build: Business Dashboard & Website Demo',
    '两天搭建业务看板及网站demo': '2-Day Build: Business Dashboard & Website Demo',
    '一周搭建文档审核与风控Demo': '1-Week Build: Document Review & Risk Control Demo',
    '一周搭建文档审核与风控demo': '1-Week Build: Document Review & Risk Control Demo',
    '两天半搭建企业级简要演示视频': '2.5-Day Build: Enterprise-Level Demo Video',
    '一周搭建儿童教育趣味应用Demo': '1-Week Build: Educational App for Children Demo',
    '一周搭建儿童教育趣味应用demo': '1-Week Build: Educational App for Children Demo',
    '一周搭建长时间序列预测系统Demo（能源领域）': '1-Week Build: Long-Term Time Series Forecasting System Demo (Energy)',
    '一周搭建长时间序列预测系统demo-能源领域': '1-Week Build: Long-Term Time Series Forecasting System Demo (Energy)',
    '一周搭建智能文档翻译系统Demo': '1-Week Build: Intelligent Document Translation System Demo',
    '一周搭建智能文档翻译系统demo': '1-Week Build: Intelligent Document Translation System Demo',
    '一天构建一个多合同交叉校验的智能合同法审系统Demo': '1-Day Build: Multi-Contract Cross-Validation Intelligent Contract Legal Review System Demo',
    '一天构建一个多合同交叉校验的智能合同法审系统demo': '1-Day Build: Multi-Contract Cross-Validation Intelligent Contract Legal Review System Demo',
    '一周搭建高精度通用目标检测系统Demo（能源&农林领域）': '1-Week Build: High-Precision Universal Object Detection System Demo (Energy & Agriculture)',
    '一周搭建高精度通用目标检测系统demo-能源-农林领域': '1-Week Build: High-Precision Universal Object Detection System Demo (Energy & Agriculture)',
    'SQL语言智能生成(NL2SQL)的通用实践': 'Universal Practice of SQL Language Intelligent Generation (NL2SQL)',
    'sql语言智能生成-nl2sql-的通用实践': 'Universal Practice of SQL Language Intelligent Generation (NL2SQL)',
    '一周搭建对话式功能推荐助手Demo（AI领域）': '1-Week Build: Conversational Feature Recommendation Assistant Demo (AI)',
    '一周搭建对话式功能推荐助手demo-ai领域': '1-Week Build: Conversational Feature Recommendation Assistant Demo (AI)',
    '一周构建智能信贷报告生成系统Demo': '1-Week Build: Intelligent Credit Report Generation System Demo',
    '一周构建智能信贷报告生成系统demo': '1-Week Build: Intelligent Credit Report Generation System Demo',
    '一周构建单条全国产业链图谱': '1-Week Build: Single National Industrial Chain Graph',
  };

  // Return exact translation if exists
  if (titleTranslations[chineseTitle]) {
    return titleTranslations[chineseTitle];
  }

  // Fallback to word-by-word translation (for any new titles)
  const translations: Record<string, string> = {
    '一周': '1-Week ', '两周': '2-Week ', '三天': '3-Day ', '一天': '1-Day ', '两天': '2-Day ', '两天半': '2.5-Day ',
    '搭建': 'Build ', '构建': 'Construct ', '生成': 'Generate ', '创建': 'Create ', '开发': 'Develop ',
    '企业级': 'Enterprise-Level ', '智能': 'Intelligent ', '系统': 'System ', '应用': 'Application ',
    'Demo': ' Demo', 'demo': ' Demo', '及': ' & ', '与': ' and ', '一个': ' a ', '单条': ' Single ', '全国': 'National ',
  };

  let result = chineseTitle;
  const sortedKeys = Object.keys(translations).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    result = result.replace(new RegExp(key, 'g'), translations[key]);
  }

  result = result
    .replace(/（/g, '(').replace(/）/g, ')')
    .replace(/，/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();

  return result.charAt(0).toUpperCase() + result.slice(1);
}

function readExcelData(): ArenaData[] {
  console.log('[sync-arena-list] Reading Excel file:', EXCEL_FILE);

  if (!fs.existsSync(EXCEL_FILE)) {
    console.error('[sync-arena-list] Excel file not found:', EXCEL_FILE);
    return [];
  }

  const workbook = XLSX.readFile(EXCEL_FILE);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const rawData: ArenaRow[] = XLSX.utils.sheet_to_json(worksheet);

  console.log(`[sync-arena-list] Found ${rawData.length} rows in Excel`);

  // Skip first row (Chinese headers) and start from second row
  const dataRows = rawData.slice(1);
  console.log(`[sync-arena-list] After skipping header row: ${dataRows.length} rows`);

  const arenas: ArenaData[] = [];

  for (const row of dataRows) {
    // Skip empty rows
    if (typeof row.__EMPTY !== 'number') {
      continue;
    }

    // Skip placeholder row
    if (typeof row.__EMPTY_1 === 'string' && row.__EMPTY_1.includes('敬请期待')) {
      continue;
    }

    // Get raw category and industry strings (keep all comma-separated values)
    const category = String(row.__EMPTY_6 || '');
    const industry = String(row.__EMPTY_5 || '');

    const chineseTitle = String(row.__EMPTY_1);
    const championRaw = String(row.__EMPTY_2 || '');
    const highlightsRaw = String(row.__EMPTY_4 || '');

    const englishTitle = generateEnglishTitle(chineseTitle);

    const arena: ArenaData = {
      id: generateArenaId(chineseTitle),
      folderId: generateFolderId(englishTitle), // 使用英文标题生成文件夹ID
      title: {
        zh: chineseTitle,
        en: englishTitle,
      },
      category,
      categoryEn: translateCategory(category),
      industry,
      industryEn: translateIndustry(industry),
      champion: championRaw,
      championEn: translateChampion(championRaw),
      highlights: highlightsRaw,
      highlightsEn: translateHighlights(highlightsRaw),
      metrics: {
        speed: String(row.__EMPTY_7 || ''),
        quality: String(row.__EMPTY_8 || ''),
        security: String(row.__EMPTY_9 || ''),
        cost: String(row.__EMPTY_10 || ''),
      },
      status: String(row.__EMPTY_3) === '已验证' ? 'verified' : 'in-arena',
      verificationStatus: String(row.__EMPTY_3 || ''),
    };

    arenas.push(arena);
  }

  console.log(`[sync-arena-list] Parsed ${arenas.length} arenas`);
  return arenas;
}

function generateRawMarkdown(arenas: ArenaData[]): string {
  let markdown = `---
pageTitle: 真实场景AI擂台
pageSubtitle: 为您的场景找到AI最佳实践
---

# Arena Page - Real AI Arena

## Arena List Data

> This file is auto-generated from List of Arenas.xlsx
> Last updated: ${new Date().toISOString()}

`;

  arenas.forEach((arena, index) => {
    markdown += `### ${index + 1}. ${arena.title.zh}

**ID**: \`${arena.id}\`
**行业类别**: ${arena.industry}
**应用类别**: ${arena.category}
**验证状态**: ${arena.verificationStatus}

**擂主**: ${arena.champion}

**亮点**: ${arena.highlights}

**Metrics**:
- 速度: ${arena.metrics.speed}
- 质量: ${arena.metrics.quality}
- 安全: ${arena.metrics.security}
- 成本: ${arena.metrics.cost}

---
`;
  });

  return markdown;
}

function generateEnglishMarkdown(arenas: ArenaData[]): string {
  let markdown = `---
pageTitle: Real World AI Arena
pageSubtitle: Find the ONE AI Best Practice for your Scenario
---

# Arena Page - Real AI Arena

## Arena List Data

> This file is auto-generated from List of Arenas.xlsx
> Last updated: ${new Date().toISOString()}

`;

  arenas.forEach((arena, index) => {
    // Fix title: replace remaining Chinese characters and punctuation
    let titleEn = arena.title.en
      .replace(/及/g, ' & ')
      .replace(/与/g, ' and ')
      .replace(/的/g, ' of ')
      .replace(/（/g, '(')
      .replace(/）/g, ')')
      .replace(/，/g, ', ')
      .replace(/\s+/g, ' ')
      .trim();

    // Generate English ID from title (kebab-case)
    const idEn = titleEn
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    markdown += `### ${index + 1}. ${titleEn}

**ID**: \`${idEn}\`
**Industry**: ${translateIndustry(arena.industry)}
**Category**: ${translateCategory(arena.category)}
**Verification Status**: ${verificationStatusMap[arena.verificationStatus] || arena.verificationStatus}

**Champion**: ${translateChampion(arena.champion)}

**Highlights**: ${translateHighlights(arena.highlights)}

**Metrics**:
- Speed: ${translateMetricValue(arena.metrics.speed)}
- Quality: ${translateMetricValue(arena.metrics.quality)}
- Security: ${translateMetricValue(arena.metrics.security)}
- Cost: ${translateMetricValue(arena.metrics.cost)}

---
`;
  });

  return markdown;
}

function generateTypeScriptData(arenas: ArenaData[]): string {
  const imports = `import { Arena } from './types';
import { Building2, ShoppingCart, GraduationCap, HeartPulse, Zap, Factory } from 'lucide-react';
`;

  const categories = `// 类别配置（用于筛选器显示）
export const categories = {
  service: { en: 'Service', zh: '服务' },
  management: { en: 'Management', zh: '管理' },
  marketing: { en: 'Marketing', zh: '营销' },
  'risk-control': { en: 'Risk Control', zh: '风控' },
  operations: { en: 'Operations', zh: '运营' },
  general: { en: 'General', zh: '通用' },
};

// 行业配置（用于筛选器显示）
export const industries = {
  finance: { en: 'Finance', zh: '金融', icon: Building2 },
  retail: { en: 'Retail', zh: '零售', icon: ShoppingCart },
  education: { en: 'Education', zh: '教育', icon: GraduationCap },
  healthcare: { en: 'Healthcare', zh: '医疗', icon: HeartPulse },
  energy: { en: 'Energy', zh: '能源', icon: Zap },
  manufacturing: { en: 'Manufacturing', zh: '制造', icon: Factory },
  general: { en: 'General', zh: '通用', icon: Building2 },
};

`;

  const arenasArray = `// Arena data - auto-generated from List of Arenas.xlsx
// Last updated: ${new Date().toISOString()}
export const arenas: Arena[] = [
${arenas.map(arena => `  {
    id: '${arena.id}',
    folderId: '${arena.folderId}',
    title: {
      zh: '${arena.title.zh.replace(/'/g, "\\'")}',
      en: '${arena.title.en.replace(/'/g, "\\'")}',
    },
    category: '${arena.category}',
    categoryEn: '${arena.categoryEn}',
    industry: '${arena.industry}',
    industryEn: '${arena.industryEn}',
    verificationStatus: '${arena.verificationStatus}',
    champion: '${arena.champion.replace(/'/g, "\\'")}',
    championEn: '${arena.championEn.replace(/'/g, "\\'")}',
    highlights: '${arena.highlights.replace(/'/g, "\\'")}',
    highlightsEn: '${arena.highlightsEn.replace(/'/g, "\\'")}',
    metrics: {
      speed: '${arena.metrics.speed}',
      quality: '${arena.metrics.quality}',
      security: '${arena.metrics.security}',
      cost: '${arena.metrics.cost}',
    },
  }`).join(',\n')}
];
`;

  const helperFunctions = `
// 根据ID获取Arena
export function getArenaById(id: string): Arena | undefined {
  return arenas.find((arena) => arena.id === id);
}

// 根据folderId获取Arena（用于详情页路由）
export function getArenaByFolderId(folderId: string): Arena | undefined {
  return arenas.find((arena) => arena.folderId === folderId);
}

// 获取热门Arena（按浏览量或其他指标）
export function getFeaturedArenas(limit: number = 6): Arena[] {
  return arenas.slice(0, Math.min(limit, arenas.length));
}

// 获取统计数据
export function getStats() {
  return {
    totalBlueprints: arenas.length,
    verifiedCount: arenas.filter((a) => a.verificationStatus === '已验证').length,
  };
}
`;

  return imports + categories + arenasArray + helperFunctions;
}

function main() {
  console.log('=== Arena List Sync Script ===');
  console.log('');

  // Step 1: Read Excel data
  const arenas = readExcelData();

  if (arenas.length === 0) {
    console.error('[sync-arena-list] No arenas found, exiting');
    process.exit(1);
  }

  // Step 2: Generate and write page.raw.md
  console.log('[sync-arena-list] Writing to:', OUTPUT_RAW_MD);
  const markdown = generateRawMarkdown(arenas);
  fs.writeFileSync(OUTPUT_RAW_MD, markdown, 'utf-8');
  console.log('[sync-arena-list] ✓ Updated page.raw.md');

  // Step 2.5: Copy page.raw.md to page.zh.md
  console.log('[sync-arena-list] Writing to:', OUTPUT_ZH_MD);
  fs.writeFileSync(OUTPUT_ZH_MD, markdown, 'utf-8');
  console.log('[sync-arena-list] ✓ Updated page.zh.md');

  // Step 3: Generate and write page.en.md
  console.log('[sync-arena-list] Writing to:', OUTPUT_EN_MD);
  const englishMarkdown = generateEnglishMarkdown(arenas);
  fs.writeFileSync(OUTPUT_EN_MD, englishMarkdown, 'utf-8');
  console.log('[sync-arena-list] ✓ Updated page.en.md');

  // Step 4: Generate and write lib/data.ts
  console.log('[sync-arena-list] Writing to:', OUTPUT_DATA_TS);
  const typescript = generateTypeScriptData(arenas);
  fs.writeFileSync(OUTPUT_DATA_TS, typescript, 'utf-8');
  console.log('[sync-arena-list] ✓ Updated lib/data.ts');

  console.log('');
  console.log(`=== Sync Complete ===`);
  console.log(`Total arenas: ${arenas.length}`);
}

main();

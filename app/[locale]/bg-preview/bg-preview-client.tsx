'use client';

import { useState } from 'react';
import { HeroBackgroundCanvas } from '@/components/effects/hero-background-canvas';

export default function BackgroundPreviewClient() {
  const [selectedEffect, setSelectedEffect] = useState<string>('HERO');

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">背景效果预览</h1>
        <p className="text-gray-400 text-center mb-8">点击下方按钮切换不同效果</p>

        {/* Effect Selector */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {['HERO', 'A', 'B', 'C', 'D', 'E', 'F'].map((effect) => (
            <button
              key={effect}
              onClick={() => setSelectedEffect(effect)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedEffect === effect
                  ? 'bg-blue-600 text-white scale-105'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {getEffectName(effect)}
            </button>
          ))}
        </div>

        {/* Effect Description */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">{getEffectName(selectedEffect)}</h2>
          <p className="text-gray-400">{getEffectDescription(selectedEffect)}</p>
        </div>

        {/* Preview Area */}
        <div className="relative rounded-xl overflow-hidden border-4 border-gray-700" style={{ height: '600px' }}>
          {renderEffect(selectedEffect)}
        </div>
      </div>
    </div>
  );
}

function getEffectName(effect: string): string {
  switch (effect) {
    case 'HERO':
      return 'Hero Background';
    case 'A':
      return 'Effect A - Light Glow';
    case 'B':
      return 'Effect B - Particle Flow';
    case 'C':
      return 'Effect C - Dynamic Waves';
    case 'D':
      return 'Effect D - Aurora';
    case 'E':
      return 'Effect E - Nebula';
    case 'F':
      return 'Effect F - Matrix';
    default:
      return 'Unknown Effect';
  }
}

function getEffectDescription(effect: string): string {
  switch (effect) {
    case 'HERO':
      return '主页 Hero 区域的动态背景效果';
    case 'A':
      return '柔和光晕效果，适用于卡片背景';
    case 'B':
      return '粒子流动效果，适用于科技感场景';
    case 'C':
      return '动态波浪效果，适用于流畅界面';
    case 'D':
      return '极光效果，适用于梦幻场景';
    case 'E':
      return '星云效果，适用于深空主题';
    case 'F':
      return '矩阵效果，适用于赛博朋克风格';
    default:
      return '';
  }
}

function renderEffect(effect: string) {
  switch (effect) {
    case 'HERO':
      return <HeroBackgroundCanvas />;
    default:
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <div className="text-gray-400 text-lg">效果 {effect} 开发中...</div>
        </div>
      );
  }
}

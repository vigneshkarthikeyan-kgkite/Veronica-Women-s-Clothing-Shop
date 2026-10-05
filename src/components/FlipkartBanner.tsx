import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Ruler, Percent } from 'lucide-react';
import { BodyArchetype } from '../types/clothing';

interface FlipkartBannerProps {
  archetypes: BodyArchetype[];
  selectedArchetype: BodyArchetype;
  onSelectArchetype: (archetype: BodyArchetype) => void;
  onOpenFitStudio: () => void;
}

export const FlipkartBanner: React.FC<FlipkartBannerProps> = ({
  archetypes,
  selectedArchetype,
  onSelectArchetype,
  onOpenFitStudio,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2">
      {/* Main Flipkart-Style Promotional Carousel Card */}
      <div className="bg-gradient-to-r from-[#173e87] via-[#2874f0] to-[#0d59d1] text-white p-6 sm:p-8 rounded-sm shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Background decorative graphic */}
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        {/* Left: Flipkart Big Festival Heading & Value Proposition */}
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#ffe500] text-black font-extrabold text-[11px] uppercase tracking-wider rounded-xs mb-3 shadow-xs">
            <Percent className="w-3.5 h-3.5" />
            <span>Grand Custom Fit Sale · 50% - 60% OFF</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white mb-2">
            Women's Clothing Stitched To Your Exact Shape.
          </h1>

          <p className="text-xs sm:text-sm text-blue-100 font-normal leading-relaxed mb-4">
            No more gaping waistbands, tight upper arms, or popping chest buttons. Veronica drafts each piece to your unique bust, torso length, and hip ratio with zero standard sizing charts.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenFitStudio}
              className="px-5 py-2.5 bg-[#fb641b] hover:bg-[#e8540d] text-white text-xs font-bold uppercase tracking-wider rounded-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Ruler className="w-4 h-4" />
              <span>Open Custom Fit Drafter</span>
            </button>
            <span className="text-xs text-blue-100 hidden sm:inline">
              ✦ 60-Day Free Alterations Guarantee
            </span>
          </div>
        </div>

        {/* Right: Quick Diverse Body Archetype Switcher */}
        <div className="relative z-10 w-full lg:w-96 bg-white text-stone-800 p-4 rounded-xs shadow-md">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200 mb-3">
            <span className="text-[11px] font-bold text-[#2874f0] uppercase tracking-wider">
              Select Your Silhouette:
            </span>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-xs font-semibold">
              Bespoke Fit
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {archetypes.slice(0, 6).map((arch) => (
              <button
                key={arch.id}
                onClick={() => onSelectArchetype(arch)}
                className={`p-1.5 text-center text-xs rounded-xs border transition-all cursor-pointer ${
                  selectedArchetype.id === arch.id
                    ? 'border-[#2874f0] bg-blue-50/80 font-bold text-[#2874f0]'
                    : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                }`}
              >
                <div className="truncate font-semibold">{arch.name}</div>
                <div className="text-[9px] text-stone-500 truncate">{arch.archetypeLabel.split(' ')[0]}</div>
              </button>
            ))}
          </div>

          <div className="bg-stone-50 p-2.5 rounded-xs border border-stone-200 text-xs">
            <div className="font-semibold text-stone-900 flex justify-between">
              <span>{selectedArchetype.name} ({selectedArchetype.archetypeLabel})</span>
              <span className="text-[#2874f0] font-mono">{selectedArchetype.heightStr.split(' ')[0]}</span>
            </div>
            <div className="text-[11px] text-stone-600 mt-1 line-clamp-2">
              ✓ {selectedArchetype.bespokeAdjustments[0]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

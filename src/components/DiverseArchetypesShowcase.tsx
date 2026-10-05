import React, { useState } from 'react';
import { Ruler, Sparkles, Check, AlertCircle, ArrowUpRight, UserCheck } from 'lucide-react';
import { BodyArchetype } from '../types/clothing';

interface DiverseArchetypesShowcaseProps {
  archetypes: BodyArchetype[];
  onSelectAndDraft: (archetype: BodyArchetype) => void;
  onViewGarment: (garmentId: string) => void;
}

export const DiverseArchetypesShowcase: React.FC<DiverseArchetypesShowcaseProps> = ({
  archetypes,
  onSelectAndDraft,
  onViewGarment,
}) => {
  const [activeArchetypeId, setActiveArchetypeId] = useState<string>(archetypes[0].id);

  const activeArchetype = archetypes.find((a) => a.id === activeArchetypeId) || archetypes[0];

  return (
    <section id="silhouettes" className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="bg-white border border-stone-200 rounded-xs shadow-2xs p-6 sm:p-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#2874f0] font-bold mb-1">
            <UserCheck className="w-4 h-4" />
            <span>Inclusive Anatomical Engineering</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
            How Veronica Solves Sizing Failures for Diverse Body Types
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            Standard brand sizing multiplies one Size 4 fit model equally all over. Real women have varying waist-to-hip ratios, bust fullness, and torso lengths. Click on a silhouette to see our tailor solutions:
          </p>
        </div>

        {/* Archetype Selector Tabs */}
        <div className="flex overflow-x-auto pb-2 gap-2 border-b border-stone-200 mb-6 no-scrollbar">
          {archetypes.map((archetype) => {
            const isSelected = archetype.id === activeArchetypeId;
            return (
              <button
                key={archetype.id}
                onClick={() => setActiveArchetypeId(archetype.id)}
                className={`px-4 py-2.5 text-left rounded-xs transition-all shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#2874f0] text-white border-[#2874f0] shadow-xs font-bold'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200 font-semibold'
                }`}
              >
                <div className="text-xs">{archetype.name}</div>
                <div className={`text-[10px] mt-0.5 truncate ${
                  isSelected ? 'text-blue-100' : 'text-stone-500'
                }`}>
                  {archetype.archetypeLabel.split(' ')[0]} Fit
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Archetype Dossier */}
        <div className="bg-[#f8f9fa] border border-stone-200 rounded-xs p-5 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Stats & Quote */}
            <div className="lg:col-span-6 space-y-4">
              <div className="border-b border-stone-200 pb-3">
                <div className="text-xs uppercase font-mono text-[#2874f0] font-bold">
                  BODY SILHOUETTE DOSSIER
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  {activeArchetype.name} — {activeArchetype.archetypeLabel}
                </h3>
                <div className="text-xs text-stone-600 font-mono mt-1">
                  Height: <strong>{activeArchetype.heightStr}</strong> · Stats: <strong>{activeArchetype.statsStr}</strong> · Torso: <strong>{activeArchetype.torso}</strong>
                </div>
              </div>

              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                {activeArchetype.description}
              </p>

              {/* Quote */}
              <div className="bg-white p-3.5 rounded-xs border-l-3 border-[#2874f0] text-xs text-stone-700 italic shadow-2xs">
                “{activeArchetype.quote}”
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectAndDraft(activeArchetype)}
                  className="px-4 py-2 bg-[#2874f0] hover:bg-[#1855b5] text-white text-xs font-bold uppercase rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Draft in Fit Studio</span>
                </button>
                <button
                  onClick={() => onViewGarment(activeArchetype.recommendedGarmentId)}
                  className="px-4 py-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold uppercase rounded-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>View Curated Piece</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#2874f0]" />
                </button>
              </div>
            </div>

            {/* Right: Flaws vs Solution */}
            <div className="lg:col-span-6 space-y-3 text-xs">
              <div className="p-4 bg-red-50 border border-red-200 rounded-xs">
                <div className="font-bold text-red-900 flex items-center gap-1 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span>Ready-To-Wear Sizing Failures for This Body Type</span>
                </div>
                <ul className="space-y-1.5 text-stone-700">
                  {activeArchetype.offTheRackFrustrations.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xs">
                <div className="font-bold text-emerald-900 flex items-center gap-1 mb-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Veronica Bespoke Tailor Formula</span>
                </div>
                <ul className="space-y-1.5 text-stone-800">
                  {activeArchetype.bespokeAdjustments.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

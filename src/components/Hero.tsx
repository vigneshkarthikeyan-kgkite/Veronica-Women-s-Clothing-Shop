import React from 'react';
import { ArrowRight, Scissors, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { BodyArchetype } from '../types/clothing';

interface HeroProps {
  archetypes: BodyArchetype[];
  selectedArchetype: BodyArchetype;
  onSelectArchetype: (archetype: BodyArchetype) => void;
  onExploreCollection: () => void;
  onOpenFitStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  archetypes,
  selectedArchetype,
  onSelectArchetype,
  onExploreCollection,
  onOpenFitStudio,
}) => {
  return (
    <section className="relative pt-14 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-[#21253a] bg-gradient-to-b from-[#080911] via-[#0d0f1c] to-[#080911]">
      {/* Avant-garde subtle chromatic background glow mesh */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#2045ff]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#d4ff00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top Kicker - clean unboxed typography with vibrant bullet separator */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4ff00] mb-6 font-semibold">
          <span>Non-Standard Bespoke</span>
          <span aria-hidden="true" className="text-stone-500">·</span>
          <span>Vibrant Haute Couture</span>
          <span aria-hidden="true" className="text-stone-500">·</span>
          <span>Zero Linear Sizing</span>
        </div>

        {/* Hero Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Bold Avant-Garde Headline & Manifesto */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-[1.08] tracking-tight mb-6 [text-wrap:balance]">
              Electrifying Color. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4ff00] via-[#5eff8b] to-[#20b8ff]">
                Engineered for Your Singular Form.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 font-light leading-relaxed max-w-2xl mb-8">
              Fashion sizing was built for generic cylinders. VALA destroys standard grading rules with parametric pattern drafting in saturated electric cobalt, shocking fuchsia, and solar chartreuse—sculpted to your exact bust projection, lumbar spine curvature, and torso ratio.
            </p>

            {/* Proof Points - High-Voltage Chromatic Style */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 border-y border-[#262b45] mb-8">
              <div>
                <span className="block text-3xl font-display font-bold text-[#d4ff00] tabular-nums">0.0"</span>
                <span className="text-xs uppercase tracking-wider text-stone-400 mt-1 block">Lumbar Gap Guarantee</span>
              </div>
              <div>
                <span className="block text-3xl font-display font-bold text-white">Full 3D</span>
                <span className="text-xs uppercase tracking-wider text-stone-400 mt-1 block">Cup Apex Calibration</span>
              </div>
              <div>
                <span className="block text-3xl font-display font-bold text-[#38bdf8]">100%</span>
                <span className="text-xs uppercase tracking-wider text-stone-400 mt-1 block">Saturated Pure Pigments</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenFitStudio}
                className="px-7 py-3.5 bg-[#d4ff00] text-black text-xs uppercase tracking-[0.2em] font-extrabold hover:bg-[#c2ea00] transition-all flex items-center gap-2 group cursor-pointer shadow-[0_0_20px_rgba(212,255,0,0.3)]"
              >
                <span>Launch Parametric Drafter</span>
                <Scissors className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" />
              </button>

              <button
                onClick={onExploreCollection}
                className="px-7 py-3.5 border border-[#3b4266] bg-[#121524]/80 hover:bg-[#1a1e33] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Vibrant Pieces</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#d4ff00] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Avant-Garde Archetype Silhouette Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#101322] border border-[#2b314d] p-6 md:p-8 relative shadow-2xl">
              {/* Subtle top neon accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d4ff00] via-[#20b8ff] to-[#ec0b88]" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#21263d] mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4ff00] font-bold block">
                    Parametric Silhouette Diagnostic
                  </span>
                  <h2 className="text-xl font-display font-bold text-white mt-0.5">
                    {selectedArchetype.name}’s Bespoke Draft
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#38bdf8] bg-[#171d33] px-2.5 py-1 border border-[#263156]">
                  {selectedArchetype.statsStr}
                </span>
              </div>

              {/* Archetype Quick Selector Buttons */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {archetypes.map((arch) => (
                  <button
                    key={arch.id}
                    onClick={() => onSelectArchetype(arch)}
                    className={`px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer border ${
                      selectedArchetype.id === arch.id
                        ? 'bg-[#d4ff00] text-black border-[#d4ff00] shadow-[0_0_10px_rgba(212,255,0,0.3)]'
                        : 'bg-[#181c30] hover:bg-[#222742] text-stone-300 border-[#282f4e]'
                    }`}
                  >
                    {arch.name} ({arch.archetypeLabel.split(' ')[0]})
                  </button>
                ))}
              </div>

              {/* Anatomical Comparison Visual Box */}
              <div className="space-y-3.5 text-xs">
                {/* Standard Flaw */}
                <div className="p-3.5 bg-[#261318] border-l-2 border-[#ef4444]">
                  <div className="flex items-center gap-1.5 font-bold text-[#fca5a5] mb-1 uppercase tracking-wider text-[10px]">
                    <span>Off-The-Rack Size Breakdown:</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed">
                    {selectedArchetype.offTheRackFrustrations[0]}
                  </p>
                </div>

                {/* VALA Bespoke Solution */}
                <div className="p-3.5 bg-[#14231f] border-l-2 border-[#10b981]">
                  <div className="flex items-center gap-1.5 font-bold text-[#6ee7b7] mb-1 uppercase tracking-wider text-[10px]">
                    <CheckCircle2 className="w-3 h-3 text-[#10b981]" />
                    <span>VALA Bespoke Cut Solution:</span>
                  </div>
                  <p className="text-stone-200 leading-relaxed">
                    {selectedArchetype.bespokeAdjustments[0]}
                  </p>
                </div>
              </div>

              {/* Client Quote */}
              <p className="mt-6 pt-4 border-t border-[#21263d] text-xs italic text-stone-400 leading-relaxed font-light">
                “{selectedArchetype.quote}”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

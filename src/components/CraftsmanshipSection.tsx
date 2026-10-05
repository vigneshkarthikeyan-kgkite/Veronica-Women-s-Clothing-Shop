import React from 'react';
import { Compass, Scissors, Layers, ShieldCheck, Ruler } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Parametric Vertex Drafting',
      subtitle: 'The Death of Linear Grade Rules',
      description:
        'Standard mass-market apparel grades patterns linearly—taking an idealized size 4 model and scaling every dimension by fixed increments. But human bodies do not scale linearly. Our pattern algorithms compute from your actual anatomical vertices: your true apex distance, shoulder slope, and lumbar curvature.',
    },
    {
      num: '02',
      title: 'Contoured 3-Piece Waistbands',
      subtitle: 'Eliminating the 3-Inch Lower Back Gap',
      description:
        'Straight waistbands gap on any woman with a waist-to-hip ratio greater than 8 inches. VALA waistbands are cut on a 22-degree anatomical arc with reinforced internal stay-tape, anchoring cleanly into the lumbar arch with zero hollow space.',
    },
    {
      num: '03',
      title: 'Floating Chest Canvas Architecture',
      subtitle: 'Zero Button Gaping, Full Mobility',
      description:
        'Borrowed from heritage Savile Row mens tailoring and adapted for diverse bust projections. Floating horsehair canvas is hand-padded to sculpt over the bust curve without pulling the shoulder or armhole out of alignment.',
    },
    {
      num: '04',
      title: 'True Natural Waist Alignment',
      subtitle: 'Proportions Based on Your Spine, Not Height Averages',
      description:
        'A 5’10” woman can have a short torso with long legs; a 5’3” woman can have a long torso. We locate your natural waistline through vertical skeletal measures, placing seams, pockets, and belts exactly where your body articulates.',
    },
  ];

  return (
    <section id="craftsmanship" className="py-20 md:py-28 bg-[#0a0c16] border-b border-[#21253a]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4ff00] mb-3 font-semibold">
            <span>Atelier Methodology</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span>The Science of Bespoke Proportion</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight mb-4 [text-wrap:balance]">
            Why Ready-to-Wear Sizing Was Designed to Fail You.
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            In 1941, the US Department of Agriculture surveyed 15,000 women and concluded that there was no "average woman." Yet the fashion industry defaulted to arbitrary standard sizing numbers (0–16) that treat bodies as rigid cylinders. We believe the clothing must adapt to the woman, never the woman to the clothing.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="p-8 bg-[#111424] border border-[#262c45] flex flex-col justify-between shadow-xl relative group hover:border-[#3d466d] transition-colors"
            >
              <div>
                <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-[#21263d]">
                  <span className="text-sm font-mono font-extrabold text-[#d4ff00]">
                    {pillar.num}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#38bdf8] font-mono">
                    {pillar.subtitle}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-3">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tailor Manifesto Quote */}
        <div className="mt-16 p-8 sm:p-12 bg-gradient-to-r from-[#12162a] via-[#1a1f3a] to-[#12162a] border border-[#2b314d] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4ff00]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4ff00] font-mono font-bold block">
              ATELIER CREED · BIELLA & LONDON
            </span>
            <blockquote className="text-xl sm:text-2xl font-display font-medium italic leading-relaxed text-stone-100">
              “Every woman deserves to experience the power of putting on a garment that does not pull, gap, slide, or squeeze—a luminous second skin drafted with reverence for her singular form.”
            </blockquote>
            <div className="pt-2 text-xs uppercase tracking-widest text-[#38bdf8] font-mono font-semibold">
              The Master Cutters of VALA Atelier
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

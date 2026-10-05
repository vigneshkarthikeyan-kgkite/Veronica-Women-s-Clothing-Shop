import React, { useState, useMemo } from 'react';
import {
  Ruler,
  Sliders,
  Sparkles,
  RefreshCw,
  Layers,
  Info,
  CheckCircle,
  Eye,
  Send,
  Loader2,
} from 'lucide-react';
import {
  MeasurementProfile,
  MeasurementUnit,
  BustCup,
  TorsoLength,
  ShoulderBreadth,
  HipShape,
  BicepEase,
} from '../types/clothing';
import { calculateDeterministicBespokeSpecs, consultAiMasterTailor } from '../utils/geminiFitAdvisor';

interface FitStudioProps {
  currentProfile: MeasurementProfile;
  onUpdateProfile: (profile: MeasurementProfile) => void;
  onSaveAsNewProfile: (profile: MeasurementProfile) => void;
  onExploreCollection: () => void;
}

export const FitStudio: React.FC<FitStudioProps> = ({
  currentProfile,
  onUpdateProfile,
  onSaveAsNewProfile,
  onExploreCollection,
}) => {
  const [profile, setProfile] = useState<MeasurementProfile>({ ...currentProfile });
  const [activeTab, setActiveTab] = useState<'canvas' | 'pattern' | 'consultant'>('canvas');
  const [showTensionHeatmap, setShowTensionHeatmap] = useState<boolean>(true);
  const [unit, setUnit] = useState<MeasurementUnit>(profile.unit);

  // AI Tailor State
  const [userInquiry, setUserInquiry] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  React.useEffect(() => {
    setProfile({ ...currentProfile });
    setUnit(currentProfile.unit);
  }, [currentProfile]);

  const specs = useMemo(() => calculateDeterministicBespokeSpecs(profile), [profile]);

  const handleSliderChange = (field: keyof MeasurementProfile, value: number | string) => {
    const updated = { ...profile, [field]: value };
    setProfile(updated);
    onUpdateProfile(updated);
  };

  const handleUnitToggle = (newUnit: MeasurementUnit) => {
    if (newUnit === unit) return;
    const factor = newUnit === 'cm' ? 2.54 : 1 / 2.54;
    const converted: MeasurementProfile = {
      ...profile,
      unit: newUnit,
      height: Math.round(profile.height * factor),
      bust: Math.round(profile.bust * factor),
      underbust: Math.round(profile.underbust * factor),
      waist: Math.round(profile.waist * factor),
      highHip: Math.round(profile.highHip * factor),
      fullHip: Math.round(profile.fullHip * factor),
      inseam: Math.round(profile.inseam * factor),
    };
    setUnit(newUnit);
    setProfile(converted);
    onUpdateProfile(converted);
  };

  const handleAiConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInquiry.trim()) return;
    setIsAiLoading(true);
    setAiResponse(null);
    try {
      const response = await consultAiMasterTailor(profile, userInquiry);
      setAiResponse(response);
    } catch {
      setAiResponse('Based on your silhouette measurements, our cutters draft our curved 22° waistband and French bust darts to eliminate gaping.');
    } finally {
      setIsAiLoading(false);
    }
  };

  // SVG Mannequin Geometry
  const isCm = profile.unit === 'cm';
  const bustVal = isCm ? profile.bust / 2.54 : profile.bust;
  const waistVal = isCm ? profile.waist / 2.54 : profile.waist;
  const hipVal = isCm ? profile.fullHip / 2.54 : profile.fullHip;

  const bustScale = Math.max(0.7, Math.min(1.4, bustVal / 36));
  const waistScale = Math.max(0.65, Math.min(1.45, waistVal / 28));
  const hipScale = Math.max(0.75, Math.min(1.5, hipVal / 38));

  const shoulderOffset = profile.shoulderBreadth === 'broad' ? 24 : profile.shoulderBreadth === 'narrow' ? -16 : 0;
  const torsoOffset = profile.torsoLength === 'long' ? 18 : profile.torsoLength === 'short' ? -18 : 0;

  const cx = 160;
  const shoulderY = 70;
  const shoulderHalfWidth = 65 + shoulderOffset;
  const bustY = 120 + (torsoOffset * 0.3);
  const bustHalfWidth = 52 * bustScale;
  const waistY = 185 + torsoOffset;
  const waistHalfWidth = 38 * waistScale;
  const hipY = 255 + torsoOffset;
  const hipHalfWidth = 56 * hipScale;
  const hemY = 370;

  return (
    <section id="fit-studio" className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="bg-white border border-stone-200 rounded-xs shadow-2xs p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#2874f0] font-bold mb-1">
              <span>Veronica Interactive Fit Studio</span>
              <span>·</span>
              <span>Custom Pattern Drafter</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              Anatomical Fit Calculator & Silhouette Drafter
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Drag the sliders to reflect your unique bust, waist, and hip proportions. Watch the bespoke pattern pieces adapt in real time.
            </p>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center gap-2">
            <div className="inline-flex p-1 bg-stone-100 rounded-xs border border-stone-300">
              <button
                onClick={() => handleUnitToggle('in')}
                className={`px-3 py-1 text-xs font-bold rounded-xs transition-all cursor-pointer ${
                  unit === 'in' ? 'bg-[#2874f0] text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Inches (in)
              </button>
              <button
                onClick={() => handleUnitToggle('cm')}
                className={`px-3 py-1 text-xs font-bold rounded-xs transition-all cursor-pointer ${
                  unit === 'cm' ? 'bg-[#2874f0] text-white shadow-xs' : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-stone-200 mb-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('canvas')}
            className={`pb-3 px-4 cursor-pointer transition-colors relative ${
              activeTab === 'canvas' ? 'text-[#2874f0] border-b-2 border-[#2874f0]' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <span>Morphing Silhouette & Heatmap</span>
          </button>

          <button
            onClick={() => setActiveTab('pattern')}
            className={`pb-3 px-4 cursor-pointer transition-colors relative ${
              activeTab === 'pattern' ? 'text-[#2874f0] border-b-2 border-[#2874f0]' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <span>2D Pattern Cutting Specs</span>
          </button>

          <button
            onClick={() => setActiveTab('consultant')}
            className={`pb-3 px-4 cursor-pointer transition-colors relative flex items-center gap-1.5 ${
              activeTab === 'consultant' ? 'text-[#2874f0] border-b-2 border-[#2874f0]' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2874f0]" />
            <span>AI Master Tailor Consultation</span>
          </button>
        </div>

        {/* 2-Column Work Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sliders */}
          <div className="lg:col-span-6 bg-stone-50 p-6 rounded-xs border border-stone-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#2874f0]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Body Measurements
                </h3>
              </div>
              <span className="text-xs text-[#2874f0] font-bold">
                {specs.silhouetteClass}
              </span>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              {/* Bust */}
              <div>
                <div className="flex justify-between text-xs mb-1 font-semibold">
                  <label htmlFor="fit-bust" className="text-stone-800">Full Bust Circumference</label>
                  <span className="font-mono text-[#2874f0] tabular-nums font-bold">
                    {profile.bust} {unit}
                  </span>
                </div>
                <input
                  id="fit-bust"
                  type="range"
                  min={unit === 'in' ? 30 : 76}
                  max={unit === 'in' ? 56 : 142}
                  value={profile.bust}
                  onChange={(e) => handleSliderChange('bust', Number(e.target.value))}
                  className="w-full accent-[#2874f0] cursor-pointer"
                />
              </div>

              {/* Waist */}
              <div>
                <div className="flex justify-between text-xs mb-1 font-semibold">
                  <label htmlFor="fit-waist" className="text-stone-800">Natural Waist</label>
                  <span className="font-mono text-[#2874f0] tabular-nums font-bold">
                    {profile.waist} {unit}
                  </span>
                </div>
                <input
                  id="fit-waist"
                  type="range"
                  min={unit === 'in' ? 23 : 58}
                  max={unit === 'in' ? 50 : 127}
                  value={profile.waist}
                  onChange={(e) => handleSliderChange('waist', Number(e.target.value))}
                  className="w-full accent-[#2874f0] cursor-pointer"
                />
              </div>

              {/* Full Hip */}
              <div>
                <div className="flex justify-between text-xs mb-1 font-semibold">
                  <label htmlFor="fit-hip" className="text-stone-800">Full Hip (Widest Point)</label>
                  <span className="font-mono text-[#2874f0] tabular-nums font-bold">
                    {profile.fullHip} {unit}
                  </span>
                </div>
                <input
                  id="fit-hip"
                  type="range"
                  min={unit === 'in' ? 32 : 81}
                  max={unit === 'in' ? 60 : 152}
                  value={profile.fullHip}
                  onChange={(e) => handleSliderChange('fullHip', Number(e.target.value))}
                  className="w-full accent-[#2874f0] cursor-pointer"
                />
              </div>

              {/* Height */}
              <div>
                <div className="flex justify-between text-xs mb-1 font-semibold">
                  <label htmlFor="fit-height" className="text-stone-800">Height</label>
                  <span className="font-mono text-[#2874f0] tabular-nums font-bold">
                    {unit === 'in' ? `${Math.floor(profile.height / 12)}'${profile.height % 12}"` : `${profile.height} cm`}
                  </span>
                </div>
                <input
                  id="fit-height"
                  type="range"
                  min={unit === 'in' ? 58 : 147}
                  max={unit === 'in' ? 76 : 193}
                  value={profile.height}
                  onChange={(e) => handleSliderChange('height', Number(e.target.value))}
                  className="w-full accent-[#2874f0] cursor-pointer"
                />
              </div>
            </div>

            {/* Proportion Selectors */}
            <div className="pt-3 border-t border-stone-200 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Bust Cup Size
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['A/B', 'C/D', 'DD/E', 'F+'] as BustCup[]).map((cup) => (
                    <button
                      key={cup}
                      onClick={() => handleSliderChange('bustCup', cup)}
                      className={`py-1 text-xs font-bold rounded-xs border transition-colors cursor-pointer ${
                        profile.bustCup === cup
                          ? 'bg-[#2874f0] text-white border-[#2874f0]'
                          : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      {cup}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Torso Length
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['short', 'regular', 'long'] as TorsoLength[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => handleSliderChange('torsoLength', t)}
                      className={`py-1 text-xs font-bold rounded-xs border capitalize transition-colors cursor-pointer ${
                        profile.torsoLength === t
                          ? 'bg-[#2874f0] text-white border-[#2874f0]'
                          : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      {t} Torso
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Diagnosis Snapshot */}
            <div className="p-3 bg-white border border-stone-200 rounded-xs text-xs space-y-1">
              <div className="flex justify-between text-stone-600">
                <span>Waist-to-Hip Delta:</span>
                <span className="font-bold text-[#2874f0]">{specs.waistToHipDelta} inches</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Curved Waistband Arc:</span>
                <span className="font-bold text-stone-900">{specs.keyFormulas[0].value}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mannequin / Pattern / AI */}
          <div className="lg:col-span-6 bg-white p-6 rounded-xs border border-stone-200 min-h-[460px] flex flex-col justify-between">
            {activeTab === 'canvas' && (
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                    <Eye className="w-4 h-4 text-[#2874f0]" />
                    <span>Live Silhouette Simulation</span>
                  </div>
                  <button
                    onClick={() => setShowTensionHeatmap(!showTensionHeatmap)}
                    className="px-2.5 py-1 text-xs border border-stone-300 rounded-xs text-stone-700 hover:bg-stone-50 cursor-pointer"
                  >
                    {showTensionHeatmap ? 'Hide Tension Lines' : 'Show Strain Heatmap'}
                  </button>
                </div>

                {/* SVG Mannequin on clean light background */}
                <div className="relative w-full h-[320px] bg-stone-50 border border-stone-200 rounded-xs flex items-center justify-center overflow-hidden">
                  <svg
                    viewBox="0 0 320 400"
                    className="w-full h-full max-h-[300px]"
                    aria-label="Custom Mannequin"
                  >
                    <defs>
                      <linearGradient id="fkBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#d5dbe5" />
                        <stop offset="50%" stopColor="#eef1f6" />
                        <stop offset="100%" stopColor="#d5dbe5" />
                      </linearGradient>
                    </defs>

                    {/* Stand */}
                    <ellipse cx={cx} cy="385" rx="45" ry="7" fill="#b0b7c3" />
                    <line x1={cx} y1={hemY} x2={cx} y2="385" stroke="#909aa8" strokeWidth="4" />

                    {/* Neck */}
                    <ellipse cx={cx} cy="42" rx="14" ry="18" fill="url(#fkBodyGrad)" stroke="#7d889b" strokeWidth="1.5" />

                    {/* Torso */}
                    <path
                      d={`
                        M ${cx - shoulderHalfWidth} ${shoulderY}
                        C ${cx - shoulderHalfWidth * 0.8} ${bustY - 15}, ${cx - bustHalfWidth} ${bustY - 10}, ${cx - bustHalfWidth} ${bustY}
                        C ${cx - bustHalfWidth * 0.95} ${bustY + 25}, ${cx - waistHalfWidth} ${waistY - 15}, ${cx - waistHalfWidth} ${waistY}
                        C ${cx - waistHalfWidth} ${waistY + 20}, ${cx - hipHalfWidth} ${hipY - 20}, ${cx - hipHalfWidth} ${hipY}
                        C ${cx - hipHalfWidth * 0.9} ${hipY + 40}, ${cx - 42} ${hemY - 20}, ${cx - 38} ${hemY}
                        L ${cx + 38} ${hemY}
                        C ${cx + 42} ${hemY - 20}, ${cx + hipHalfWidth * 0.9} ${hipY + 40}, ${cx + hipHalfWidth} ${hipY}
                        C ${cx + hipHalfWidth} ${hipY - 20}, ${cx + waistHalfWidth} ${waistY + 20}, ${cx + waistHalfWidth} ${waistY}
                        C ${cx + waistHalfWidth} ${waistY - 15}, ${cx + bustHalfWidth * 0.95} ${bustY + 25}, ${cx + bustHalfWidth} ${bustY}
                        C ${cx + bustHalfWidth} ${bustY - 10}, ${cx + shoulderHalfWidth * 0.8} ${bustY - 15}, ${cx + shoulderHalfWidth} ${shoulderY}
                        Z
                      `}
                      fill="url(#fkBodyGrad)"
                      stroke="#4b5563"
                      strokeWidth="2"
                    />

                    {/* Measurement Tape Lines */}
                    <line x1={cx - bustHalfWidth} y1={bustY} x2={cx + bustHalfWidth} y2={bustY} stroke="#2874f0" strokeWidth="1.5" />
                    <text x={cx + bustHalfWidth + 6} y={bustY + 3} fontSize="9" fill="#2874f0" fontFamily="sans-serif" fontWeight="bold">
                      Bust {profile.bust}{unit}
                    </text>

                    <path
                      d={`M ${cx - waistHalfWidth} ${waistY} Q ${cx} ${waistY + 5} ${cx + waistHalfWidth} ${waistY}`}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                    />
                    <text x={cx + waistHalfWidth + 6} y={waistY + 3} fontSize="9" fill="#10b981" fontFamily="sans-serif" fontWeight="bold">
                      Waist {profile.waist}{unit}
                    </text>

                    <line x1={cx - hipHalfWidth} y1={hipY} x2={cx + hipHalfWidth} y2={hipY} stroke="#f59e0b" strokeWidth="1.5" />
                    <text x={cx + hipHalfWidth + 6} y={hipY + 3} fontSize="9" fill="#f59e0b" fontFamily="sans-serif" fontWeight="bold">
                      Hip {profile.fullHip}{unit}
                    </text>

                    {showTensionHeatmap && (
                      <g>
                        <path
                          d={`M ${cx - waistHalfWidth} ${waistY} C ${cx - waistHalfWidth} ${waistY + 20}, ${cx - hipHalfWidth} ${hipY - 20}, ${cx - hipHalfWidth} ${hipY}`}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                        <path
                          d={`M ${cx + waistHalfWidth} ${waistY} C ${cx + waistHalfWidth} ${waistY + 20}, ${cx + hipHalfWidth} ${hipY - 20}, ${cx + hipHalfWidth} ${hipY}`}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                      </g>
                    )}
                  </svg>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-600 mt-3 pt-2 border-t border-stone-100">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                    <span>Veronica Zero-Gap Contoured Fit</span>
                  </div>
                  <span className="text-stone-400 font-mono text-[11px]">Precision: ±0.06"</span>
                </div>
              </div>
            )}

            {activeTab === 'pattern' && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Parametric Pattern Formulations
                </div>
                <div className="p-3 bg-stone-50 rounded-xs border border-stone-200 text-xs space-y-1">
                  <div className="font-bold text-stone-900 flex justify-between">
                    <span>1. Curved 3-Piece Waistband</span>
                    <span className="text-[#2874f0]">{specs.keyFormulas[0].value}</span>
                  </div>
                  <p className="text-stone-600 text-[11px]">{specs.keyFormulas[0].explanation}</p>
                </div>

                <div className="p-3 bg-stone-50 rounded-xs border border-stone-200 text-xs space-y-1">
                  <div className="font-bold text-stone-900 flex justify-between">
                    <span>2. Bust Apex Dart Spread (FBA)</span>
                    <span className="text-[#2874f0]">{specs.keyFormulas[1].value}</span>
                  </div>
                  <p className="text-stone-600 text-[11px]">{specs.keyFormulas[1].explanation}</p>
                </div>
              </div>
            )}

            {activeTab === 'consultant' && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Ask Master Pattern Cutter
                </div>
                <form onSubmit={handleAiConsult} className="space-y-2">
                  <textarea
                    value={userInquiry}
                    onChange={(e) => setUserInquiry(e.target.value)}
                    placeholder="e.g. 'I have a large bust and trousers always leave a 3-inch hollow at the back waist.'"
                    className="w-full h-24 p-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xs focus:border-[#2874f0] focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isAiLoading || !userInquiry.trim()}
                    className="px-4 py-2 bg-[#2874f0] text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#1855b5] cursor-pointer flex items-center gap-1.5"
                  >
                    {isAiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    <span>Get Tailor Recommendation</span>
                  </button>
                </form>

                {aiResponse && (
                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xs text-xs text-stone-800 space-y-1">
                    <span className="font-bold text-[#2874f0] block">Tailor Prescription:</span>
                    <p className="leading-relaxed text-[11px]">{aiResponse}</p>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3 mt-4">
              <button
                onClick={() => onSaveAsNewProfile(profile)}
                className="px-4 py-2 border border-stone-300 text-stone-800 hover:bg-stone-50 text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer"
              >
                Save Profile
              </button>
              <button
                onClick={onExploreCollection}
                className="px-5 py-2 bg-[#fb641b] text-white hover:bg-[#e8540d] text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer shadow-xs"
              >
                Shop Custom Clothes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

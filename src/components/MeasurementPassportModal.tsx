import React, { useState } from 'react';
import { X, Ruler, Plus, Check, Download, Info, Trash2, Edit3, BookOpen } from 'lucide-react';
import { MeasurementProfile, MeasurementUnit, BustCup, TorsoLength, ShoulderBreadth, HipShape } from '../types/clothing';

interface MeasurementPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: MeasurementProfile[];
  activeProfile: MeasurementProfile;
  onSelectActiveProfile: (profile: MeasurementProfile) => void;
  onSaveProfile: (profile: MeasurementProfile) => void;
  onDeleteProfile: (profileId: string) => void;
}

export const MeasurementPassportModal: React.FC<MeasurementPassportModalProps> = ({
  isOpen,
  onClose,
  profiles,
  activeProfile,
  onSelectActiveProfile,
  onSaveProfile,
  onDeleteProfile,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'profiles' | 'guide' | 'create'>('profiles');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // New Profile Form State
  const [newProfile, setNewProfile] = useState<MeasurementProfile>({
    id: `profile-${Date.now()}`,
    name: 'Personal Custom Fit',
    unit: 'in',
    height: 66,
    bust: 36,
    underbust: 30,
    waist: 28,
    highHip: 35,
    fullHip: 40,
    torsoLength: 'regular',
    shoulderBreadth: 'standard',
    bustCup: 'C/D',
    bicepEase: 'standard',
    hipShape: 'hourglass',
    inseam: 30,
    notes: '',
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(newProfile);
    onSelectActiveProfile(newProfile);
    setActiveTab('profiles');
  };

  const handleExportText = () => {
    const summary = `VALA ATELIER BESPOKE FIT PASSPORT
Client: ${activeProfile.name}
Height: ${activeProfile.height} ${activeProfile.unit}
Bust: ${activeProfile.bust} ${activeProfile.unit} (Cup: ${activeProfile.bustCup})
Underbust: ${activeProfile.underbust} ${activeProfile.unit}
Natural Waist: ${activeProfile.waist} ${activeProfile.unit}
High Hip: ${activeProfile.highHip} ${activeProfile.unit}
Full Hip: ${activeProfile.fullHip} ${activeProfile.unit}
Inseam: ${activeProfile.inseam} ${activeProfile.unit}
Torso: ${activeProfile.torsoLength} | Shoulders: ${activeProfile.shoulderBreadth}
Hip Shape: ${activeProfile.hipShape} | Bicep Ease: ${activeProfile.bicepEase}
Notes: ${activeProfile.notes || 'None'}`;

    navigator.clipboard.writeText(summary);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#101322] border border-[#2b314d] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden my-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#21263d] bg-[#0c0e1a]">
          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5 text-[#d4ff00]" />
            <div>
              <h2 className="text-xl font-display font-bold text-white">
                Measurement Passport & Fit Directory
              </h2>
              <p className="text-xs text-stone-400 font-light mt-0.5">
                Saved anatomical profiles used by our cutters to generate bespoke patterns.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-[#21263d] px-6 bg-[#0e111f]">
          <button
            onClick={() => setActiveTab('profiles')}
            className={`py-3 px-4 text-xs uppercase tracking-wider font-bold cursor-pointer transition-colors relative ${
              activeTab === 'profiles' ? 'text-[#d4ff00]' : 'text-stone-400 hover:text-white'
            }`}
          >
            <span>Saved Profiles ({profiles.length})</span>
            {activeTab === 'profiles' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4ff00]" />}
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`py-3 px-4 text-xs uppercase tracking-wider font-bold cursor-pointer transition-colors relative flex items-center gap-1.5 ${
              activeTab === 'create' ? 'text-[#d4ff00]' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Profile</span>
            {activeTab === 'create' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4ff00]" />}
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-4 text-xs uppercase tracking-wider font-bold cursor-pointer transition-colors relative flex items-center gap-1.5 ${
              activeTab === 'guide' ? 'text-[#d4ff00]' : 'text-stone-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Anatomical Measuring Guide</span>
            {activeTab === 'guide' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4ff00]" />}
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto bg-[#101322]">
          {activeTab === 'profiles' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3">
                <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
                  Active Baseline for Garment Drafting:
                </span>
                <button
                  onClick={handleExportText}
                  className="text-xs text-[#d4ff00] hover:text-[#c2ea00] flex items-center gap-1.5 underline cursor-pointer font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{copiedNotification ? 'Copied to Clipboard!' : 'Export Fit Ticket'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profiles.map((p) => {
                  const isActive = p.id === activeProfile.id;
                  return (
                    <div
                      key={p.id}
                      className={`p-5 border transition-all ${
                        isActive
                          ? 'border-[#d4ff00] bg-[#171c33] shadow-[0_0_15px_rgba(212,255,0,0.15)]'
                          : 'border-[#262c45] hover:border-[#384166] bg-[#121526]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-display text-lg font-bold text-white">
                          {p.name}
                        </div>
                        {isActive ? (
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-black bg-[#d4ff00] px-2 py-0.5 shadow-sm">
                            Active
                          </span>
                        ) : (
                          <button
                            onClick={() => onSelectActiveProfile(p)}
                            className="text-xs uppercase tracking-wider text-[#38bdf8] hover:text-white underline font-semibold cursor-pointer"
                          >
                            Set as Active
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#262c45] my-3 text-xs font-mono">
                        <div>
                          <span className="text-[10px] text-stone-400 block font-sans uppercase">Bust</span>
                          <span className="text-[#d4ff00] font-bold">{p.bust} {p.unit}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-400 block font-sans uppercase">Waist</span>
                          <span className="text-white font-bold">{p.waist} {p.unit}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-400 block font-sans uppercase">Hip</span>
                          <span className="text-[#38bdf8] font-bold">{p.fullHip} {p.unit}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-stone-300 space-y-1">
                        <div>Shape: <span className="capitalize text-white font-semibold">{p.hipShape}</span> · Cup: <span className="text-white font-semibold">{p.bustCup}</span></div>
                        <div>Torso: <span className="capitalize text-white font-semibold">{p.torsoLength}</span> · Height: <span className="text-white font-semibold">{p.unit === 'in' ? `${Math.floor(p.height / 12)}'${p.height % 12}"` : `${p.height}cm`}</span></div>
                        {p.notes && <div className="italic text-stone-400 truncate mt-1">“{p.notes}”</div>}
                      </div>

                      {profiles.length > 1 && !p.isDefault && (
                        <div className="mt-4 pt-2 border-t border-[#21263d] flex justify-end">
                          <button
                            onClick={() => onDeleteProfile(p.id)}
                            className="text-[11px] text-stone-400 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <form onSubmit={handleCreateSubmit} className="space-y-6">
              <div className="border-b border-[#21263d] pb-4">
                <h3 className="text-base font-display font-bold text-white">
                  New Custom Measurement Profile
                </h3>
                <p className="text-xs text-stone-400 mt-0.5 font-light">
                  Record exact anatomical dimensions for flawless bespoke drafting.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Profile Name / Nickname
                  </label>
                  <input
                    type="text"
                    required
                    value={newProfile.name}
                    onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                    className="w-full p-2.5 text-xs bg-[#0b0d17] border border-[#2b314d] text-white focus:border-[#d4ff00] focus:outline-none"
                    placeholder="e.g. Maya (Vibrant Capsule)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Measurement System
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setNewProfile({ ...newProfile, unit: 'in' })}
                      className={`flex-1 py-2 text-xs font-mono font-bold border cursor-pointer ${
                        newProfile.unit === 'in' ? 'bg-[#d4ff00] text-black border-[#d4ff00]' : 'bg-[#151829] text-stone-300 border-[#2b314d]'
                      }`}
                    >
                      Inches (in)
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewProfile({ ...newProfile, unit: 'cm' })}
                      className={`flex-1 py-2 text-xs font-mono font-bold border cursor-pointer ${
                        newProfile.unit === 'cm' ? 'bg-[#d4ff00] text-black border-[#d4ff00]' : 'bg-[#151829] text-stone-300 border-[#2b314d]'
                      }`}
                    >
                      Centimeters (cm)
                    </button>
                  </div>
                </div>
              </div>

              {/* Exact Numbers */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Full Bust</label>
                  <input
                    type="number"
                    value={newProfile.bust}
                    onChange={(e) => setNewProfile({ ...newProfile, bust: Number(e.target.value) })}
                    className="w-full p-2 text-xs bg-[#0b0d17] border border-[#2b314d] font-mono text-[#d4ff00] font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Underbust</label>
                  <input
                    type="number"
                    value={newProfile.underbust}
                    onChange={(e) => setNewProfile({ ...newProfile, underbust: Number(e.target.value) })}
                    className="w-full p-2 text-xs bg-[#0b0d17] border border-[#2b314d] font-mono text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Natural Waist</label>
                  <input
                    type="number"
                    value={newProfile.waist}
                    onChange={(e) => setNewProfile({ ...newProfile, waist: Number(e.target.value) })}
                    className="w-full p-2 text-xs bg-[#0b0d17] border border-[#2b314d] font-mono text-[#d4ff00] font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">High Hip</label>
                  <input
                    type="number"
                    value={newProfile.highHip}
                    onChange={(e) => setNewProfile({ ...newProfile, highHip: Number(e.target.value) })}
                    className="w-full p-2 text-xs bg-[#0b0d17] border border-[#2b314d] font-mono text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Full Hip</label>
                  <input
                    type="number"
                    value={newProfile.fullHip}
                    onChange={(e) => setNewProfile({ ...newProfile, fullHip: Number(e.target.value) })}
                    className="w-full p-2 text-xs bg-[#0b0d17] border border-[#2b314d] font-mono text-[#38bdf8] font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Inseam</label>
                  <input
                    type="number"
                    value={newProfile.inseam}
                    onChange={(e) => setNewProfile({ ...newProfile, inseam: Number(e.target.value) })}
                    className="w-full p-2 text-xs bg-[#0b0d17] border border-[#2b314d] font-mono text-white font-bold"
                  />
                </div>
              </div>

              {/* Archetype & Proportions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Torso Length</label>
                  <select
                    value={newProfile.torsoLength}
                    onChange={(e) => setNewProfile({ ...newProfile, torsoLength: e.target.value as TorsoLength })}
                    className="w-full p-2 text-xs bg-[#0b0d17] border border-[#2b314d] text-white capitalize"
                  >
                    <option value="short">Short Torso</option>
                    <option value="regular">Regular Torso</option>
                    <option value="long">Long Torso</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Bust Cup Volume</label>
                  <select
                    value={newProfile.bustCup}
                    onChange={(e) => setNewProfile({ ...newProfile, bustCup: e.target.value as BustCup })}
                    className="w-full p-2 text-xs bg-[#0b0d17] border border-[#2b314d] font-mono text-white"
                  >
                    <option value="A/B">A/B Cup</option>
                    <option value="C/D">C/D Cup</option>
                    <option value="DD/E">DD/E Cup</option>
                    <option value="F+">F+ Cup (Deep FBA)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Hip Silhouette</label>
                  <select
                    value={newProfile.hipShape}
                    onChange={(e) => setNewProfile({ ...newProfile, hipShape: e.target.value as HipShape })}
                    className="w-full p-2 text-xs bg-[#0b0d17] border border-[#2b314d] text-white capitalize"
                  >
                    <option value="hourglass">Hourglass</option>
                    <option value="pear">Pear / High Hip Shelf</option>
                    <option value="rectangle">Athletic Column</option>
                    <option value="inverted_triangle">Broad Shoulder / Narrow Hip</option>
                    <option value="apple">Round Midsection Balance</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('profiles')}
                  className="px-4 py-2 border border-[#3b4266] text-stone-300 text-xs uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#d4ff00] hover:bg-[#c2ea00] text-black text-xs uppercase tracking-wider font-extrabold cursor-pointer shadow-[0_0_10px_rgba(212,255,0,0.3)]"
                >
                  Save & Activate Profile
                </button>
              </div>
            </form>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-6">
              <div className="border-b border-[#21263d] pb-3">
                <h3 className="text-base font-display font-bold text-white">
                  How to Measure with Tailor Precision
                </h3>
                <p className="text-xs text-stone-400 mt-0.5 font-light">
                  Use a flexible fabric measuring tape. Keep the tape parallel to the floor without pulling tight or letting it sag.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-300">
                <div className="p-4 bg-[#141829] border border-[#2b314d] space-y-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#d4ff00] text-black flex items-center justify-center text-[10px] font-bold">1</span>
                    <span>Full Bust (Apex)</span>
                  </div>
                  <p className="leading-relaxed text-stone-400 font-light">
                    Measure around the fullest part of your chest, directly across the nipples / bust apex, wearing your preferred everyday bra. Keep tape level across shoulder blades.
                  </p>
                </div>

                <div className="p-4 bg-[#141829] border border-[#2b314d] space-y-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#d4ff00] text-black flex items-center justify-center text-[10px] font-bold">2</span>
                    <span>Underbust (Ribcage)</span>
                  </div>
                  <p className="leading-relaxed text-stone-400 font-light">
                    Directly under your breast tissue around the ribcage. This measurement determines the chest canvas anchor and ensures zero restriction when inhaling deeply.
                  </p>
                </div>

                <div className="p-4 bg-[#141829] border border-[#2b314d] space-y-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#d4ff00] text-black flex items-center justify-center text-[10px] font-bold">3</span>
                    <span>Natural Waist</span>
                  </div>
                  <p className="leading-relaxed text-stone-400 font-light">
                    Bend sideways to find your natural crease. This is your anatomical waist (typically 1 to 2 inches above your navel). Do NOT suck your stomach in.
                  </p>
                </div>

                <div className="p-4 bg-[#141829] border border-[#2b314d] space-y-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#d4ff00] text-black flex items-center justify-center text-[10px] font-bold">4</span>
                    <span>High Hip & Full Hip</span>
                  </div>
                  <p className="leading-relaxed text-stone-400 font-light">
                    High Hip: Around the top of your iliac crest bones (~3" below waist). Full Hip: Stand with heels together and measure around the widest point of your buttocks.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

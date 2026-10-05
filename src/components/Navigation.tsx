import React from 'react';
import { ShoppingBag, Search, Ruler, Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';
import { MeasurementProfile } from '../types/clothing';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  activeProfile: MeasurementProfile;
  cartCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onOpenCart: () => void;
  onOpenPassport: () => void;
  onOpenFitStudio: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  setActiveSection,
  activeProfile,
  cartCount,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onOpenCart,
  onOpenPassport,
  onOpenFitStudio,
}) => {
  const categoryStrip = [
    { id: 'All', label: 'All Tailored' },
    { id: 'Blazers & Suits', label: 'Blazers & Suits' },
    { id: 'Trousers & Pants', label: 'Trousers' },
    { id: 'Dresses', label: 'Silk Dresses' },
    { id: 'Tops & Shirts', label: 'Anti-Gape Shirts' },
    { id: 'Skirts', label: 'Wrap Skirts' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-stone-200">
      {/* Primary Flipkart-Style Blue Top Bar */}
      <div className="bg-[#2874f0] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-6">
          {/* Logo with Plus tagline */}
          <div className="flex items-center gap-6 shrink-0">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex flex-col leading-none"
            >
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight italic font-sans text-white">
                Veronica
              </span>
              <span className="text-[10px] italic text-stone-200 font-medium flex items-center gap-1">
                Explore <span className="text-[#ffe500] font-bold">Custom Fit</span>
                <span className="text-[#ffe500] text-xs">✦</span>
              </span>
            </a>
          </div>

          {/* Search Box - Signature Flipkart Center Component */}
          <div className="flex-1 max-w-2xl relative hidden sm:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for custom tailored blazers, trousers, dresses, shirts..."
              className="w-full h-10 pl-4 pr-10 bg-white text-stone-800 text-sm rounded-xs shadow-inner focus:outline-none placeholder:text-stone-400 font-normal"
            />
            <button
              className="absolute right-0 top-0 bottom-0 px-3.5 text-[#2874f0] hover:text-[#1855b5] transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Right Action Icons: Fit Studio, Passport, Cart */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            {/* Fit Studio Trigger Button */}
            <button
              onClick={onOpenFitStudio}
              className="px-3.5 py-1.5 bg-white text-[#2874f0] hover:bg-stone-50 text-xs font-bold rounded-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Fit Studio</span>
            </button>

            {/* Profile Dropdown */}
            <button
              onClick={onOpenPassport}
              className="text-white hover:text-stone-100 flex items-center gap-1 text-xs font-semibold cursor-pointer whitespace-nowrap"
            >
              <span className="hidden md:inline text-stone-200 font-normal">Shape:</span>
              <span className="underline decoration-white/40">{activeProfile.name.split(' ')[0]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-200" />
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1.5 text-white hover:text-stone-100 text-xs font-bold cursor-pointer whitespace-nowrap"
              aria-label="Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 stroke-[2]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex items-center justify-center min-w-[17px] h-[17px] px-1 text-[10px] font-extrabold text-[#2874f0] bg-[#ffe500] rounded-full tabular-nums">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Box */}
      <div className="p-2 bg-[#2874f0] sm:hidden border-t border-blue-400/40">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search custom fitted clothes..."
            className="w-full h-9 pl-3 pr-9 bg-white text-stone-800 text-xs rounded-xs focus:outline-none"
          />
          <Search className="w-4 h-4 text-[#2874f0] absolute right-2.5 top-2.5" />
        </div>
      </div>

      {/* Secondary Flipkart Category Strip */}
      <div className="bg-white border-b border-stone-200 shadow-2xs overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 py-2.5 text-xs text-stone-700 font-semibold whitespace-nowrap">
          {categoryStrip.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'text-[#2874f0] font-bold border-b-2 border-[#2874f0]'
                  : 'hover:text-[#2874f0]'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}

          <div className="ml-auto hidden lg:flex items-center gap-4 text-[11px] text-stone-500 font-medium">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Veronica Assured Tailoring</span>
            </span>
            <span>·</span>
            <span className="text-stone-600">Zero Waist Gap Guarantee</span>
          </div>
        </div>
      </div>
    </header>
  );
};

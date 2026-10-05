import React, { useState } from 'react';
import { Filter, Star, CheckCircle, RotateCcw, Sparkles } from 'lucide-react';
import { GarmentProduct, FabricOption, MeasurementProfile } from '../types/clothing';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: GarmentProduct[];
  activeProfile: MeasurementProfile;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  onSelectProduct: (product: GarmentProduct) => void;
  onQuickConfigure: (product: GarmentProduct, fabric: FabricOption) => void;
  onOpenFitStudio: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  activeProfile,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  onSelectProduct,
  onQuickConfigure,
  onOpenFitStudio,
}) => {
  const [selectedSilhouetteFilter, setSelectedSilhouetteFilter] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [assuredOnly, setAssuredOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'price_low' | 'price_high' | 'rating'>('relevance');

  // Filter & Search logic
  const filteredProducts = products.filter((product) => {
    // Category match
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;

    // Search query match
    const searchMatch =
      !searchQuery.trim() ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Silhouette match
    const silhouetteMatch =
      selectedSilhouetteFilter === 'all' || product.recommendedFor.includes(selectedSilhouetteFilter as any);

    // Rating match
    const ratingMatch = product.rating >= minRating;

    // Assured match
    const assuredMatch = !assuredOnly || product.isAssured;

    return categoryMatch && searchMatch && silhouetteMatch && ratingMatch && assuredMatch;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_low') return a.basePrice - b.basePrice;
    if (sortBy === 'price_high') return b.basePrice - a.basePrice;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // relevance
  });

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedSilhouetteFilter('all');
    setMinRating(0);
    setAssuredOnly(false);
    setSortBy('relevance');
  };

  return (
    <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Flipkart-Style Sidebar Filters (3 Cols) */}
        <aside className="lg:col-span-3 bg-white border border-stone-200 rounded-xs shadow-2xs p-4 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h2 className="text-base font-bold text-stone-900 uppercase tracking-tight">
              Filters
            </h2>
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-[#2874f0] hover:underline cursor-pointer"
            >
              CLEAR ALL
            </button>
          </div>

          {/* Active Silhouette Fit Filter */}
          <div className="space-y-2 pb-4 border-b border-stone-100">
            <div className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center justify-between">
              <span>Body Silhouette Fit</span>
              <span className="text-[10px] text-[#2874f0] font-normal cursor-pointer" onClick={onOpenFitStudio}>
                Measure
              </span>
            </div>
            <div className="space-y-1.5 text-xs text-stone-700">
              {[
                { id: 'all', label: 'All Body Shapes' },
                { id: 'pear', label: 'Pear / High Hip Shelf' },
                { id: 'hourglass', label: 'Sculpted Hourglass' },
                { id: 'apple', label: 'Plus / Midsection Ease' },
                { id: 'inverted_triangle', label: 'Athletic / Broad Shoulder' },
                { id: 'rectangle', label: 'Tall / Balanced Column' },
              ].map((s) => (
                <label key={s.id} className="flex items-center gap-2 cursor-pointer py-0.5">
                  <input
                    type="radio"
                    name="silhouette"
                    checked={selectedSilhouetteFilter === s.id}
                    onChange={() => setSelectedSilhouetteFilter(s.id)}
                    className="accent-[#2874f0]"
                  />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Veronica Assured Filter */}
          <div className="pb-4 border-b border-stone-100">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={assuredOnly}
                onChange={(e) => setAssuredOnly(e.target.checked)}
                className="w-4 h-4 accent-[#2874f0]"
              />
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#2874f0]">Veronica</span>
                <span className="text-[10px] bg-blue-50 text-[#2874f0] font-extrabold px-1.5 py-0.2 rounded-xs border border-blue-200">
                  Assured
                </span>
              </div>
            </label>
            <p className="text-[11px] text-stone-500 mt-1 pl-6">
              Guarantees zero-waist-gap and free 60-day tailor bench adjustments.
            </p>
          </div>

          {/* Customer Rating Filter */}
          <div className="space-y-2 pb-4 border-b border-stone-100">
            <div className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Customer Ratings
            </div>
            <div className="space-y-1 text-xs text-stone-700">
              {[4, 4.5].map((r) => (
                <label key={r} className="flex items-center gap-2 cursor-pointer py-0.5">
                  <input
                    type="radio"
                    name="ratings"
                    checked={minRating === r}
                    onChange={() => setMinRating(minRating === r ? 0 : r)}
                    className="accent-[#2874f0]"
                  />
                  <span className="flex items-center gap-1">
                    <span>{r}★ & above</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Tailored Benefits Card */}
          <div className="bg-blue-50/70 p-3 rounded-xs border border-blue-100 text-xs space-y-1.5">
            <div className="font-bold text-[#2874f0] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Veronica Custom Guarantee</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Every garment is individually cut to your bust, waist, and hip specs. Free doorstep trial and alterations included!
            </p>
          </div>
        </aside>

        {/* Right Column: Products Grid (9 Cols) */}
        <main className="lg:col-span-9 bg-white border border-stone-200 rounded-xs shadow-2xs p-4 sm:p-5">
          {/* Header Bar with Sort By Tabs (Flipkart Style) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200 mb-5">
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                Custom Tailored Women's Wear{' '}
                <span className="text-stone-400 font-normal">
                  ({sortedProducts.length} items found)
                </span>
              </h3>
            </div>

            {/* Sort By Tabs */}
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 overflow-x-auto">
              <span className="text-stone-400 font-normal shrink-0">Sort By:</span>
              <button
                onClick={() => setSortBy('relevance')}
                className={`px-2.5 py-1 rounded-xs cursor-pointer whitespace-nowrap ${
                  sortBy === 'relevance'
                    ? 'text-[#2874f0] font-bold border-b-2 border-[#2874f0]'
                    : 'hover:text-[#2874f0]'
                }`}
              >
                Relevance
              </button>
              <button
                onClick={() => setSortBy('price_low')}
                className={`px-2.5 py-1 rounded-xs cursor-pointer whitespace-nowrap ${
                  sortBy === 'price_low'
                    ? 'text-[#2874f0] font-bold border-b-2 border-[#2874f0]'
                    : 'hover:text-[#2874f0]'
                }`}
              >
                Price -- Low to High
              </button>
              <button
                onClick={() => setSortBy('price_high')}
                className={`px-2.5 py-1 rounded-xs cursor-pointer whitespace-nowrap ${
                  sortBy === 'price_high'
                    ? 'text-[#2874f0] font-bold border-b-2 border-[#2874f0]'
                    : 'hover:text-[#2874f0]'
                }`}
              >
                Price -- High to Low
              </button>
              <button
                onClick={() => setSortBy('rating')}
                className={`px-2.5 py-1 rounded-xs cursor-pointer whitespace-nowrap ${
                  sortBy === 'rating'
                    ? 'text-[#2874f0] font-bold border-b-2 border-[#2874f0]'
                    : 'hover:text-[#2874f0]'
                }`}
              >
                Customer Rating
              </button>
            </div>
          </div>

          {/* Product Grid (3 columns on desktop) */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  activeProfile={activeProfile}
                  onSelectProduct={onSelectProduct}
                  onQuickConfigure={onQuickConfigure}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-stone-50 rounded-xs border border-stone-200 p-8 space-y-3">
              <p className="text-stone-700 text-sm font-semibold">
                No matching garments found for your selected filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-[#2874f0] text-white text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

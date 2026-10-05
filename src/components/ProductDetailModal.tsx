import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingBag, Zap, Star, ShieldCheck, Ruler, Truck, CheckCircle2, RotateCcw } from 'lucide-react';
import { GarmentProduct, FabricOption, MeasurementProfile, CartItem } from '../types/clothing';

interface ProductDetailModalProps {
  product: GarmentProduct | null;
  activeProfile: MeasurementProfile;
  availableProfiles: MeasurementProfile[];
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  onDirectBuy: (item: CartItem) => void;
  onOpenFitStudio: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  activeProfile,
  availableProfiles,
  onClose,
  onAddToCart,
  onDirectBuy,
  onOpenFitStudio,
}) => {
  if (!product) return null;

  const [selectedFabric, setSelectedFabric] = useState<FabricOption>(product.fabrics[0]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.customizations.forEach((c) => {
      initial[c.id] = c.defaultOption;
    });
    return initial;
  });
  const [chosenProfile, setChosenProfile] = useState<MeasurementProfile>(activeProfile);
  const [monogram, setMonogram] = useState<string>('');
  const [fitNotes, setFitNotes] = useState<string>('');
  const [addedToast, setAddedToast] = useState<boolean>(false);

  useEffect(() => {
    setChosenProfile(activeProfile);
  }, [activeProfile]);

  const finalPrice = product.basePrice + selectedFabric.priceDelta;
  const discountPercent = Math.round(((product.originalPrice - finalPrice) / product.originalPrice) * 100);

  const handleOptionChange = (optionId: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: value }));
  };

  const createCartItem = (): CartItem => ({
    cartItemId: `${product.id}-${Date.now()}`,
    product,
    selectedFabric,
    selectedOptions,
    measurementProfile: chosenProfile,
    monogram: monogram.trim() ? monogram.trim().toUpperCase() : undefined,
    price: finalPrice,
    quantity: 1,
    customFitNotes: fitNotes.trim() || undefined,
  });

  const handleAdd = () => {
    onAddToCart(createCartItem());
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 600);
  };

  const handleBuyNow = () => {
    onDirectBuy(createCartItem());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-5xl bg-white rounded-xs shadow-2xl overflow-hidden my-6 border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 text-stone-400 hover:text-stone-900 bg-white/90 hover:bg-white rounded-full shadow-xs transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Image Showcase + Flipkart Action Buttons (5 Cols) */}
          <div className="lg:col-span-5 p-6 bg-white border-b lg:border-b-0 lg:border-r border-stone-200 flex flex-col justify-between">
            <div>
              {/* Product Big Image Frame */}
              <div className="relative aspect-[3/4] bg-[#f8f9fa] border border-stone-200 rounded-xs flex items-center justify-center p-6 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20 transition-colors duration-300"
                  style={{ backgroundColor: selectedFabric.colorHex }}
                />

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                  {product.id === 'blazer-architectural' && (
                    <svg viewBox="0 0 200 250" className="w-52 h-64 filter drop-shadow-lg">
                      <path d="M 60 40 L 100 80 L 140 40 L 100 30 Z" fill="#212121" />
                      <polygon points="50,45 80,115 100,115 70,60 95,50" fill={selectedFabric.colorHex} stroke="#111" strokeWidth="1" />
                      <polygon points="150,45 120,115 100,115 130,60 105,50" fill={selectedFabric.colorHex} stroke="#111" strokeWidth="1" />
                      <path
                        d="M 50 45 L 35 110 L 30 180 C 45 185 85 185 100 182 C 115 185 155 185 170 180 L 165 110 L 150 45 Z"
                        fill={selectedFabric.colorHex}
                        stroke="#111"
                        strokeWidth="1.2"
                      />
                      <circle cx="92" cy="115" r="3.5" fill="#fff" stroke="#333" />
                      <circle cx="108" cy="115" r="3.5" fill="#fff" stroke="#333" />
                      <circle cx="92" cy="138" r="3.5" fill="#fff" stroke="#333" />
                      <circle cx="108" cy="138" r="3.5" fill="#fff" stroke="#333" />
                    </svg>
                  )}

                  {product.id === 'trousers-wideleg' && (
                    <svg viewBox="0 0 200 250" className="w-52 h-64 filter drop-shadow-lg">
                      <path d="M 65 35 Q 100 42 135 35 L 135 48 Q 100 55 65 48 Z" fill="#212121" stroke="#111" />
                      <path
                        d="M 65 48 L 45 220 L 92 220 L 98 90 L 102 90 L 108 220 L 155 220 L 135 48 Z"
                        fill={selectedFabric.colorHex}
                        stroke="#111"
                        strokeWidth="1.2"
                      />
                      <line x1="80" y1="52" x2="68" y2="220" stroke="#000" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                      <line x1="120" y1="52" x2="132" y2="220" stroke="#000" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                    </svg>
                  )}

                  {product.id === 'dress-bias-silk' && (
                    <svg viewBox="0 0 200 250" className="w-52 h-64 filter drop-shadow-lg">
                      <line x1="82" y1="20" x2="82" y2="45" stroke="#111" strokeWidth="1.5" />
                      <line x1="118" y1="20" x2="118" y2="45" stroke="#111" strokeWidth="1.5" />
                      <path
                        d="M 80 45 Q 100 55 120 45 C 130 75 140 120 135 150 C 130 180 145 210 142 230 L 58 230 C 55 210 70 180 65 150 C 60 120 70 75 80 45 Z"
                        fill={selectedFabric.colorHex}
                        stroke="#111"
                        strokeWidth="1.2"
                      />
                    </svg>
                  )}

                  {product.id === 'shirt-poplin' && (
                    <svg viewBox="0 0 200 250" className="w-52 h-64 filter drop-shadow-lg">
                      <polygon points="100,45 75,30 90,65" fill="#f8fafc" stroke="#111" />
                      <polygon points="100,45 125,30 110,65" fill="#f8fafc" stroke="#111" />
                      <path
                        d="M 60 45 L 45 100 L 50 180 C 70 185 130 185 150 180 L 155 100 L 140 45 Z"
                        fill={selectedFabric.colorHex}
                        stroke="#111"
                        strokeWidth="1.2"
                      />
                      <line x1="100" y1="50" x2="100" y2="182" stroke="#111" strokeWidth="2" />
                    </svg>
                  )}

                  {product.id === 'skirt-wrap-wool' && (
                    <svg viewBox="0 0 200 250" className="w-52 h-64 filter drop-shadow-lg">
                      <path d="M 70 45 Q 100 52 130 45 L 130 55 Q 100 62 70 55 Z" fill="#212121" stroke="#111" />
                      <path
                        d="M 70 55 L 55 180 L 115 180 L 130 80 Z"
                        fill={selectedFabric.colorHex}
                        stroke="#111"
                        strokeWidth="1.2"
                      />
                    </svg>
                  )}

                  {product.id === 'coat-trench-cashmere' && (
                    <svg viewBox="0 0 200 250" className="w-52 h-64 filter drop-shadow-lg">
                      <path d="M 55 35 L 100 65 L 145 35 L 100 25 Z" fill="#212121" />
                      <polygon points="100,55 140,55 130,105 100,85" fill={selectedFabric.colorHex} stroke="#111" />
                      <path
                        d="M 50 40 L 35 120 L 30 225 L 170 225 L 165 120 L 150 40 Z"
                        fill={selectedFabric.colorHex}
                        stroke="#111"
                        strokeWidth="1.2"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* Signature Flipkart Dual Action Buttons: Yellow Add to Cart + Orange Buy Now */}
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-stone-100">
              <button
                onClick={handleAdd}
                className="py-3.5 px-4 bg-[#ff9f00] hover:bg-[#f39700] text-white font-extrabold text-xs uppercase tracking-wider rounded-xs shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 fill-white" />
                <span>ADD TO CART</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3.5 px-4 bg-[#fb641b] hover:bg-[#e8540d] text-white font-extrabold text-xs uppercase tracking-wider rounded-xs shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>BUY NOW</span>
              </button>
            </div>
          </div>

          {/* Right Column: PDP Details & Custom Fitting Specifications (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-5 bg-white">
            {/* Header info */}
            <div>
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
                {product.brand}
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                {product.name}
              </h1>
              <p className="text-xs text-stone-600 mt-1">
                {product.tagline}
              </p>
            </div>

            {/* Rating badge & Veronica Assured */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 bg-[#388e3c] text-white text-xs font-bold px-2 py-0.5 rounded-xs">
                <span>{product.rating}</span>
                <Star className="w-3 h-3 fill-white" />
              </span>
              <span className="text-xs font-semibold text-stone-500">
                {product.reviewCount.toLocaleString()} Ratings & Reviews
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-[#2874f0] bg-blue-50 px-2 py-0.5 rounded-xs">
                <span>Veronica Assured</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2874f0]" />
              </div>
            </div>

            {/* Price display with discount */}
            <div className="p-3 bg-stone-50 rounded-xs border border-stone-200">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-extrabold text-stone-900 tabular-nums">
                  ₹{finalPrice.toLocaleString()}
                </span>
                <span className="text-sm text-stone-400 line-through tabular-nums">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-sm font-extrabold text-[#388e3c]">
                  {discountPercent}% off
                </span>
              </div>
              <div className="text-xs text-stone-600 mt-1 flex items-center gap-2">
                <span className="text-[#388e3c] font-semibold">Special Custom Fitting Price:</span>
                <span>Includes free tailoring & 60-day alterations!</span>
              </div>
            </div>

            {/* Flipkart-Style Available Offers */}
            <div className="space-y-1.5 text-xs text-stone-700">
              <div className="font-bold text-stone-900">Available Offers</div>
              <div className="flex items-start gap-2 text-stone-600">
                <span className="text-emerald-700 font-bold">🏷 Bank Offer:</span>
                <span>5% Unlimited Cashback on Flipkart Axis Bank Card</span>
              </div>
              <div className="flex items-start gap-2 text-stone-600">
                <span className="text-emerald-700 font-bold">✂ Custom Fit Offer:</span>
                <span>Get individual pattern drafting & shoulder pitch alignment for FREE (Worth ₹1,499)</span>
              </div>
              <div className="flex items-start gap-2 text-stone-600">
                <span className="text-emerald-700 font-bold">🚚 Free Delivery:</span>
                <span>{product.deliveryInfo}</span>
              </div>
            </div>

            {/* Custom Fit Profile Selector (Flipkart Fit Box) */}
            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#2874f0]" />
                  <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Stitch Pattern For Silhouette:
                  </span>
                </div>
                <button
                  onClick={onOpenFitStudio}
                  className="text-xs font-bold text-[#2874f0] underline cursor-pointer"
                >
                  Adjust Measurements
                </button>
              </div>

              <select
                value={chosenProfile.id}
                onChange={(e) => {
                  const found = availableProfiles.find((p) => p.id === e.target.value);
                  if (found) setChosenProfile(found);
                }}
                className="w-full p-2 text-xs bg-white border border-stone-300 font-semibold text-stone-800 rounded-xs cursor-pointer focus:border-[#2874f0] focus:outline-none"
              >
                {availableProfiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.bust}" Bust / {p.waist}" Waist / {p.fullHip}" Hip)
                  </option>
                ))}
              </select>

              <div className="text-[11px] text-stone-600 flex items-center gap-3">
                <span>Torso: <strong className="capitalize">{chosenProfile.torsoLength}</strong></span>
                <span>·</span>
                <span>Cup Volume: <strong>{chosenProfile.bustCup}</strong></span>
                <span>·</span>
                <span>Shoulders: <strong className="capitalize">{chosenProfile.shoulderBreadth}</strong></span>
              </div>
            </div>

            {/* Fabric Swatch Options */}
            <div>
              <div className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                Color & Fabric Swatch
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {product.fabrics.map((fabric) => {
                  const isSelected = selectedFabric.id === fabric.id;
                  return (
                    <button
                      key={fabric.id}
                      onClick={() => setSelectedFabric(fabric)}
                      className={`p-2.5 text-left border rounded-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#2874f0] bg-blue-50/50 ring-1 ring-[#2874f0]'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-stone-300 shrink-0"
                          style={{ backgroundColor: fabric.colorHex }}
                        />
                        <span className="text-xs font-bold text-stone-900 truncate">
                          {fabric.colorName}
                        </span>
                      </div>
                      <div className="text-[10px] text-stone-500">
                        {fabric.weight}
                      </div>
                      {fabric.priceDelta > 0 && (
                        <div className="text-[10px] font-bold text-[#388e3c] mt-0.5">
                          +₹{fabric.priceDelta}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customization Details */}
            <div className="space-y-3 pt-1">
              <div className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Tailor Finishes
              </div>
              {product.customizations.slice(0, 2).map((custom) => (
                <div key={custom.id}>
                  <div className="text-xs text-stone-600 mb-1 font-medium">{custom.label}</div>
                  <div className="grid grid-cols-3 gap-2">
                    {custom.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionChange(custom.id, opt)}
                        className={`p-2 text-xs text-center border rounded-xs transition-colors cursor-pointer truncate ${
                          selectedOptions[custom.id] === opt
                            ? 'bg-[#2874f0] text-white border-[#2874f0] font-bold'
                            : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200'
                        }`}
                      >
                        {opt.split('(')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Solved Flaw Notice */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xs text-xs space-y-1">
              <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Ready-To-Wear Defects Solved:</span>
              </div>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                {product.solvedFlaws[0].bespokeSolution}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

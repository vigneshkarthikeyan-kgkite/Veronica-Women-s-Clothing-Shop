import React, { useState } from 'react';
import { Heart, Star, CheckCircle, ShieldCheck, Scissors } from 'lucide-react';
import { GarmentProduct, FabricOption, MeasurementProfile } from '../types/clothing';

interface ProductCardProps {
  product: GarmentProduct;
  activeProfile: MeasurementProfile;
  onSelectProduct: (product: GarmentProduct) => void;
  onQuickConfigure: (product: GarmentProduct, fabric: FabricOption) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  activeProfile,
  onSelectProduct,
  onQuickConfigure,
}) => {
  const [selectedFabric, setSelectedFabric] = useState<FabricOption>(product.fabrics[0]);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  const finalPrice = product.basePrice + selectedFabric.priceDelta;
  const discountPercent = Math.round(((product.originalPrice - finalPrice) / product.originalPrice) * 100);

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group bg-white border border-stone-200 rounded-xs p-4 flex flex-col justify-between hover:shadow-lg transition-all duration-200 cursor-pointer relative"
    >
      <div>
        {/* Top Image Frame with Wishlist Heart */}
        <div className="relative aspect-[3/4] bg-[#f8f9fa] rounded-xs overflow-hidden flex items-center justify-center p-4 border border-stone-100 mb-3">
          {/* Subtle vibrant fabric background aura */}
          <div
            className="absolute inset-0 opacity-15 transition-colors duration-300"
            style={{ backgroundColor: selectedFabric.colorHex }}
          />

          {/* Wishlist Heart Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-2.5 right-2.5 z-20 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-xs text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-stone-400'}`}
            />
          </button>

          {/* "Veronica Assured" pill badge on top left */}
          <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-xs border border-stone-200 text-[10px] font-bold text-[#2874f0] shadow-xs">
            <span>Assured</span>
            <CheckCircle className="w-3 h-3 text-[#2874f0] fill-[#2874f0] text-white" />
          </div>

          {/* Garment Saturated Architectural Illustration */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
            {product.id === 'blazer-architectural' && (
              <svg viewBox="0 0 200 250" className="w-40 h-52 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md">
                <path d="M 60 40 L 100 80 L 140 40 L 100 30 Z" fill="#212121" />
                <polygon points="50,45 80,115 100,115 70,60 95,50" fill={selectedFabric.colorHex} stroke="#111" strokeWidth="1" />
                <polygon points="150,45 120,115 100,115 130,60 105,50" fill={selectedFabric.colorHex} stroke="#111" strokeWidth="1" />
                <path
                  d="M 50 45 L 35 110 L 30 180 C 45 185 85 185 100 182 C 115 185 155 185 170 180 L 165 110 L 150 45 Z"
                  fill={selectedFabric.colorHex}
                  stroke="#111"
                  strokeWidth="1.2"
                />
                <circle cx="92" cy="115" r="3" fill="#ffffff" stroke="#333" />
                <circle cx="108" cy="115" r="3" fill="#ffffff" stroke="#333" />
                <circle cx="92" cy="138" r="3" fill="#ffffff" stroke="#333" />
                <circle cx="108" cy="138" r="3" fill="#ffffff" stroke="#333" />
                <line x1="45" y1="145" x2="75" y2="148" stroke="#111" strokeWidth="1.5" />
                <line x1="125" y1="148" x2="155" y2="145" stroke="#111" strokeWidth="1.5" />
              </svg>
            )}

            {product.id === 'trousers-wideleg' && (
              <svg viewBox="0 0 200 250" className="w-40 h-52 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md">
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
              <svg viewBox="0 0 200 250" className="w-40 h-52 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md">
                <line x1="82" y1="20" x2="82" y2="45" stroke="#111" strokeWidth="1.5" />
                <line x1="118" y1="20" x2="118" y2="45" stroke="#111" strokeWidth="1.5" />
                <path
                  d="M 80 45 Q 100 55 120 45 C 130 75 140 120 135 150 C 130 180 145 210 142 230 L 58 230 C 55 210 70 180 65 150 C 60 120 70 75 80 45 Z"
                  fill={selectedFabric.colorHex}
                  stroke="#111"
                  strokeWidth="1.2"
                />
                <path d="M 75 90 Q 95 110 125 105" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
                <path d="M 68 140 Q 100 165 132 150" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
              </svg>
            )}

            {product.id === 'shirt-poplin' && (
              <svg viewBox="0 0 200 250" className="w-40 h-52 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md">
                <polygon points="100,45 75,30 90,65" fill="#f8fafc" stroke="#111" />
                <polygon points="100,45 125,30 110,65" fill="#f8fafc" stroke="#111" />
                <path
                  d="M 60 45 L 45 100 L 50 180 C 70 185 130 185 150 180 L 155 100 L 140 45 Z"
                  fill={selectedFabric.colorHex}
                  stroke="#111"
                  strokeWidth="1.2"
                />
                <line x1="100" y1="50" x2="100" y2="182" stroke="#111" strokeWidth="1.8" />
                <line x1="50" y1="120" x2="80" y2="110" stroke="#fff" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="150" y1="120" x2="120" y2="110" stroke="#fff" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
            )}

            {product.id === 'skirt-wrap-wool' && (
              <svg viewBox="0 0 200 250" className="w-40 h-52 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md">
                <path d="M 70 45 Q 100 52 130 45 L 130 55 Q 100 62 70 55 Z" fill="#212121" stroke="#111" />
                <path
                  d="M 70 55 L 55 180 L 115 180 L 130 80 Z"
                  fill={selectedFabric.colorHex}
                  stroke="#111"
                  strokeWidth="1.2"
                  opacity="0.85"
                />
                <path
                  d="M 65 55 L 130 55 L 145 180 L 90 180 L 65 55 Z"
                  fill={selectedFabric.colorHex}
                  stroke="#111"
                  strokeWidth="1.2"
                />
                <line x1="68" y1="58" x2="90" y2="180" stroke="#000" strokeWidth="2" />
              </svg>
            )}

            {product.id === 'coat-trench-cashmere' && (
              <svg viewBox="0 0 200 250" className="w-40 h-52 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md">
                <path d="M 55 35 L 100 65 L 145 35 L 100 25 Z" fill="#212121" />
                <polygon points="100,55 140,55 130,105 100,85" fill={selectedFabric.colorHex} stroke="#111" />
                <path
                  d="M 50 40 L 35 120 L 30 225 L 170 225 L 165 120 L 150 40 Z"
                  fill={selectedFabric.colorHex}
                  stroke="#111"
                  strokeWidth="1.2"
                />
                <rect x="42" y="115" width="116" height="12" fill="#212121" rx="2" />
                <rect x="94" y="113" width="12" height="16" fill="#f8fafc" stroke="#111" />
              </svg>
            )}
          </div>
        </div>

        {/* Brand & Title */}
        <div className="text-[11px] text-stone-500 font-bold uppercase tracking-wider mb-0.5">
          {product.brand}
        </div>
        <h3 className="text-sm font-semibold text-stone-900 group-hover:text-[#2874f0] transition-colors line-clamp-1 mb-1.5">
          {product.name}
        </h3>

        {/* Flipkart-Style Rating Star Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-0.5 bg-[#388e3c] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-xs">
            <span>{product.rating}</span>
            <Star className="w-2.5 h-2.5 fill-white text-white" />
          </span>
          <span className="text-[11px] text-stone-500 font-medium">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Pricing Flipkart View: Final Price + Original Struck-through + Discount % */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-base font-extrabold text-stone-900 tabular-nums">
            ₹{finalPrice.toLocaleString()}
          </span>
          <span className="text-xs text-stone-400 line-through tabular-nums">
            ₹{product.originalPrice.toLocaleString()}
          </span>
          <span className="text-xs font-bold text-[#388e3c]">
            {discountPercent}% off
          </span>
        </div>

        {/* Free Delivery text & Flaw solved */}
        <div className="text-[11px] text-stone-600 mb-2">
          <span className="font-semibold text-stone-800">{product.deliveryInfo.split(',')[0]}</span>
        </div>

        {/* Fabric Swatch Circles */}
        <div className="flex items-center gap-1.5 py-1.5 border-t border-stone-100">
          <span className="text-[10px] text-stone-400 font-medium">Colors:</span>
          {product.fabrics.map((fabric) => (
            <button
              key={fabric.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFabric(fabric);
              }}
              title={fabric.colorName}
              className={`w-3.5 h-3.5 rounded-full border transition-transform cursor-pointer ${
                selectedFabric.id === fabric.id
                  ? 'ring-2 ring-[#2874f0] scale-110 border-white'
                  : 'border-stone-300 hover:scale-110'
              }`}
              style={{ backgroundColor: fabric.colorHex }}
            />
          ))}
          <span className="text-[10px] text-stone-500 truncate ml-1">
            {selectedFabric.colorName.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
        <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded-xs">
          Custom Fit Stitched
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickConfigure(product, selectedFabric);
          }}
          className="text-xs font-bold text-[#2874f0] hover:text-[#1855b5] flex items-center gap-1 cursor-pointer py-1"
        >
          <Scissors className="w-3 h-3" />
          <span>Customize Fit</span>
        </button>
      </div>
    </div>
  );
};

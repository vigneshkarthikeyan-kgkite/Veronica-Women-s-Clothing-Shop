import React from 'react';
import { X, Trash2, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types/clothing';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  onOpenFitStudio: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onOpenFitStudio,
}) => {
  if (!isOpen) return null;

  const totalMRP = items.reduce((sum, item) => sum + item.product.originalPrice * item.quantity, 0);
  const totalSellingPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalSavings = totalMRP - totalSellingPrice;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-[#f1f2f4] shadow-2xl flex flex-col justify-between">
          {/* Flipkart Header */}
          <div className="p-4 px-6 bg-[#2874f0] text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 fill-white text-[#2874f0]" />
              <h2 className="text-base font-bold tracking-tight">
                My Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="bg-white p-10 rounded-xs border border-stone-200 text-center space-y-3 mt-4">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="text-base font-bold text-stone-800">Your cart is empty!</h3>
                <p className="text-xs text-stone-500">
                  Explore Veronica's made-to-measure clothing tailored to your body type.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenFitStudio();
                  }}
                  className="mt-2 px-6 py-2.5 bg-[#2874f0] text-white text-xs font-bold uppercase rounded-xs hover:bg-[#1855b5] cursor-pointer"
                >
                  Shop Custom Tailored
                </button>
              </div>
            ) : (
              items.map((item) => {
                const discount = Math.round(
                  ((item.product.originalPrice - item.price) / item.product.originalPrice) * 100
                );
                return (
                  <div
                    key={item.cartItemId}
                    className="p-4 bg-white rounded-xs border border-stone-200 shadow-2xs space-y-3"
                  >
                    <div className="flex gap-4">
                      {/* Image Thumbnail */}
                      <div
                        className="w-16 h-20 rounded-xs border border-stone-200 flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${item.selectedFabric.colorHex}20` }}
                      >
                        <div
                          className="w-8 h-8 rounded-full border border-white shadow-xs"
                          style={{ backgroundColor: item.selectedFabric.colorHex }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-stone-500 font-bold uppercase">
                          {item.product.brand}
                        </div>
                        <h4 className="text-sm font-semibold text-stone-900 truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-stone-600">
                          Color: <span className="font-semibold text-stone-800">{item.selectedFabric.colorName}</span>
                        </div>
                        <div className="text-xs text-stone-600 mt-0.5">
                          Fit: <span className="font-semibold text-[#2874f0]">{item.measurementProfile.name}</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-sm font-extrabold text-stone-900">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                          <span className="text-xs text-stone-400 line-through">
                            ₹{(item.product.originalPrice * item.quantity).toLocaleString()}
                          </span>
                          <span className="text-xs font-bold text-[#388e3c]">
                            {discount}% Off
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper & Remove */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-stone-500">Qty:</span>
                        <div className="flex items-center border border-stone-300 rounded-xs bg-white">
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}
                            className="px-2 py-0.5 text-stone-700 hover:bg-stone-100 font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                            className="px-2 py-0.5 text-stone-700 hover:bg-stone-100 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-xs font-bold uppercase text-stone-600 hover:text-red-600 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>REMOVE</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}

            {/* Signature Flipkart "PRICE DETAILS" Box */}
            {items.length > 0 && (
              <div className="bg-white rounded-xs border border-stone-200 p-4 shadow-2xs space-y-3">
                <div className="text-xs font-bold uppercase text-stone-500 tracking-wider pb-2 border-b border-stone-100">
                  PRICE DETAILS
                </div>

                <div className="space-y-2 text-xs text-stone-700">
                  <div className="flex justify-between">
                    <span>Price ({items.length} items)</span>
                    <span className="font-mono">₹{totalMRP.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-[#388e3c]">
                    <span>Discount</span>
                    <span className="font-mono font-bold">-₹{totalSavings.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Custom Pattern Drafting</span>
                    <span className="text-[#388e3c] font-bold">FREE</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="text-[#388e3c] font-bold">FREE</span>
                  </div>

                  <div className="flex justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                    <span>Total Amount</span>
                    <span className="font-mono">₹{totalSellingPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 text-xs font-bold text-[#388e3c] flex items-center gap-1">
                  <span>You will save ₹{totalSavings.toLocaleString()} on this order</span>
                </div>
              </div>
            )}
          </div>

          {/* Flipkart Checkout Bottom Bar */}
          {items.length > 0 && (
            <div className="p-4 bg-white border-t border-stone-200 shadow-md flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-semibold">
                  Total Payable
                </span>
                <span className="text-lg font-extrabold text-stone-900 font-mono">
                  ₹{totalSellingPrice.toLocaleString()}
                </span>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="py-3 px-8 bg-[#fb641b] hover:bg-[#e8540d] text-white font-extrabold text-xs uppercase tracking-wider rounded-xs shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>PLACE ORDER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
